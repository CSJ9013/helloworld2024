// 전역 변수
let currentFolder = null;
let currentNote = null;
let notes = {};
let editor = null;
let folderSortable;
let noteSortable;

// DOM 요소
const themeToggle = document.getElementById('themeToggle');
const newFolder = document.getElementById('newFolder');
const folderList = document.getElementById('folderList');
const newNote = document.getElementById('newNote');
const noteList = document.getElementById('noteList');
const saveNote = document.getElementById('saveNote');
const shareNote = document.getElementById('shareNote');
const importNote = document.getElementById('importNote');
const exportNote = document.getElementById('exportNote');
const saveAllNotes = document.getElementById('saveAllNotes');
const refreshApp = document.getElementById('refreshApp');
const searchInput = document.getElementById('searchInput');
const tagInput = document.getElementById('tagInput');
const tagContainer = document.getElementById('tagContainer');
const folderSort = document.getElementById('folderSort');
const noteSort = document.getElementById('noteSort');
const saveNotification = document.getElementById('saveNotification');

// 에디터 초기화
function initializeEditor() {
    editor = new EasyMDE({
        element: document.getElementById('editorContainer'),
        spellChecker: false,
        autosave: {
            enabled: true,
            delay: 1000,
            uniqueId: "SimpleMemoAutosave"
        }
    });
}

// 테마 변경
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// 저장된 테마 적용
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// 폴더 생성
newFolder.addEventListener('click', () => createFolder());

function createFolder(name = '') {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="item-container">
            <span class="item-name">${name}</span>
            <div class="item-actions">
                <span class="item-action delete-folder"><i class="fas fa-trash"></i></span>
            </div>
        </div>
    `;
    const nameSpan = li.querySelector('.item-name');
    
    nameSpan.addEventListener('dblclick', () => {
        nameSpan.contentEditable = true;
        nameSpan.focus();
    });

    nameSpan.addEventListener('blur', () => {
        nameSpan.contentEditable = false;
        const newName = nameSpan.textContent.trim();
        if (newName && newName !== name) {
            if (name) {
                notes[newName] = notes[name];
                delete notes[name];
            } else {
                notes[newName] = { notes: {}, createdAt: Date.now() };
            }
            saveToLocalStorage();
        }
        updateFolderList();
    });

    nameSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            nameSpan.blur();
        }
    });

    li.querySelector('.delete-folder').addEventListener('click', (e) => {
        e.stopPropagation();
        showDeleteConfirm(li, name, true);
    });

    li.addEventListener('click', (e) => {
        if (e.target === li || e.target.classList.contains('item-container') || e.target === nameSpan) {
            selectFolder(name);
        }
    });

    folderList.appendChild(li);
    if (!name) {
        nameSpan.contentEditable = true;
        nameSpan.focus();
    }
}

function selectFolder(name) {
    currentFolder = name;
    updateNoteList();
    document.querySelectorAll('#folderList li').forEach(li => li.classList.remove('active'));
    event.target.closest('li').classList.add('active');
}

// 메모 생성
newNote.addEventListener('click', () => {
    if (currentFolder) {
        createNote();
    } else {
        showSaveNotification('먼저 폴더를 선택해주세요.');
    }
});

function createNote(name = '') {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="item-container">
            <span class="item-name">${name}</span>
            <div class="item-actions">
                <span class="item-action favorite-note"><i class="far fa-star"></i></span>
                <span class="item-action delete-note"><i class="fas fa-trash"></i></span>
            </div>
        </div>
    `;
    const nameSpan = li.querySelector('.item-name');
    
    nameSpan.addEventListener('dblclick', () => {
        nameSpan.contentEditable = true;
        nameSpan.focus();
    });

    nameSpan.addEventListener('blur', () => {
        nameSpan.contentEditable = false;
        const newName = nameSpan.textContent.trim();
        if (newName && newName !== name) {
            if (name) {
                notes[currentFolder].notes[newName] = notes[currentFolder].notes[name];
                delete notes[currentFolder].notes[name];
            } else {
                notes[currentFolder].notes[newName] = {
                    content: '',
                    tags: [],
                    favorite: false,
                    createdAt: Date.now()
                };
            }
            saveToLocalStorage();
        }
        updateNoteList();
    });

    nameSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            nameSpan.blur();
        }
    });

    const favoriteButton = li.querySelector('.favorite-note');
    favoriteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isFavorite = notes[currentFolder].notes[name].favorite;
        notes[currentFolder].notes[name].favorite = !isFavorite;
        favoriteButton.innerHTML = isFavorite ? '<i class="far fa-star"></i>' : '<i class="fas fa-star"></i>';
        saveToLocalStorage();
    });

    if (notes[currentFolder].notes[name] && notes[currentFolder].notes[name].favorite) {
        favoriteButton.innerHTML = '<i class="fas fa-star"></i>';
    }

    li.querySelector('.delete-note').addEventListener('click', (e) => {
        e.stopPropagation();
        showDeleteConfirm(li, name, false);
    });

    li.addEventListener('click', (e) => {
        if (e.target === li || e.target.classList.contains('item-container') || e.target === nameSpan) {
            selectNote(name);
        }
    });

    noteList.appendChild(li);
    if (!name) {
        nameSpan.contentEditable = true;
        nameSpan.focus();
    }
}

function selectNote(name) {
    currentNote = name;
    editor.value(notes[currentFolder].notes[name].content);
    document.querySelectorAll('#noteList li').forEach(li => li.classList.remove('active'));
    event.target.closest('li').classList.add('active');
    updateTags();
}

// 메모 저장
saveNote.addEventListener('click', () => {
    if (currentFolder && currentNote) {
        notes[currentFolder].notes[currentNote].content = editor.value();
        showSaveNotification('메모가 저장되었습니다.');
        saveToLocalStorage();
    } else {
        showSaveNotification('폴더와 메모를 선택해주세요.');
    }
});

// 메모 공유
shareNote.addEventListener('click', () => {
    if (currentFolder && currentNote) {
        const content = encodeURIComponent(notes[currentFolder].notes[currentNote].content);
        const url = `${window.location.origin}?folder=${encodeURIComponent(currentFolder)}&note=${encodeURIComponent(currentNote)}&content=${content}`;
        navigator.clipboard.writeText(url).then(() => {
            showSaveNotification('공유 링크가 클립보드에 복사되었습니다.');
        });
    } else {
        showSaveNotification('공유할 메모를 선택해주세요.');
    }
});

// 파일 가져오기
importNote.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        if (currentFolder && currentNote) {
            notes[currentFolder].notes[currentNote].content = e.target.result;
            editor.value(e.target.result);
            saveToLocalStorage();
        } else {
            showSaveNotification('먼저 폴더와 메모를 선택해주세요.');
        }
    };
    reader.readAsText(file);
});

// 파일 내보내기
exportNote.addEventListener('click', () => {
    if (currentFolder && currentNote) {
        const content = notes[currentFolder].notes[currentNote].content;
        const blob = new Blob([content], {type: 'text/markdown'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentNote}.md`;
        a.click();
        URL.revokeObjectURL(url);
    } else {
        showSaveNotification('내보낼 메모를 선택해주세요.');
    }
});

// 모든 메모 저장
saveAllNotes.addEventListener('click', () => {
    saveToLocalStorage();
    showSaveNotification('모든 메모가 저장되었습니다.');
});

// 앱 새로고침
refreshApp.addEventListener('click', () => {
    showRefreshConfirm();
});

function showRefreshConfirm() {
    const confirmDiv = document.createElement('div');
    confirmDiv.className = 'refresh-confirm';
    confirmDiv.innerHTML = `
        <span>정말 모든 데이터를 삭제하고<br>앱을 초기화하시겠습니까?</span>
        <div class="confirm-buttons">
            <button class="confirm-yes">예</button>
            <button class="confirm-no">아니오</button>
        </div>
    `;
    
    confirmDiv.querySelector('.confirm-yes').addEventListener('click', () => {
        localStorage.removeItem('notes');
        localStorage.removeItem('theme');
        location.reload();
    });

    confirmDiv.querySelector('.confirm-no').addEventListener('click', () => {
        confirmDiv.remove();
    });

    document.body.appendChild(confirmDiv);
}

// LocalStorage에 저장
function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// LocalStorage에서 불러오기
function loadFromLocalStorage() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
        updateFolderList();
    }
}

// 검색 기능
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const allNotes = document.querySelectorAll('#noteList li');
    allNotes.forEach(noteElement => {
        const noteName = noteElement.querySelector('.item-name').textContent.toLowerCase();
        const noteContent = notes[currentFolder].notes[noteName].content.toLowerCase();
        const noteTags = notes[currentFolder].notes[noteName].tags.join(' ').toLowerCase();
        if (noteName.includes(searchTerm) || noteContent.includes(searchTerm) || noteTags.includes(searchTerm)) {
            noteElement.style.display = '';
        } else {
            noteElement.style.display = 'none';
        }
    });
});

// 태그 기능
tagInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && currentFolder && currentNote) {
        const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        notes[currentFolder].notes[currentNote].tags = [...new Set([...notes[currentFolder].notes[currentNote].tags, ...tags])];
        updateTags();
        e.target.value = '';
        saveToLocalStorage();
    }
});

function updateTags() {
    tagContainer.innerHTML = '';
    if (currentFolder && currentNote) {
        notes[currentFolder].notes[currentNote].tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('tag');
            tagElement.textContent = tag;
            tagElement.addEventListener('click', () => removeTag(tag));
            tagContainer.appendChild(tagElement);
        });
    }
}

function removeTag(tag) {
    if (currentFolder && currentNote) {
        notes[currentFolder].notes[currentNote].tags = notes[currentFolder].notes[currentNote].tags.filter(t => t !== tag);
        updateTags();
        saveToLocalStorage();
    }
}

// 정렬 및 드래그 앤 드롭 기능
function initializeSortable() {
    folderSortable = new Sortable(folderList, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        handle: '.item-name',
        onEnd: function (evt) {
            if (folderSort.value === 'custom') {
                const folderNames = Array.from(folderList.children).map(li => li.querySelector('.item-name').textContent);
                const newNotes = {};
                folderNames.forEach(name => {
                    newNotes[name] = notes[name];
                });
                notes = newNotes;
                saveToLocalStorage();
            }
        }
    });

    noteSortable = new Sortable(noteList, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        handle: '.item-name',
        onEnd: function (evt) {
            if (noteSort.value === 'custom' && currentFolder) {
                const noteNames = Array.from(noteList.children).map(li => li.querySelector('.item-name').textContent);
                const newNotes = {};
                noteNames.forEach(name => {
                    newNotes[name] = notes[currentFolder].notes[name];
                });
                notes[currentFolder].notes = newNotes;
                saveToLocalStorage();
            }
        }
    });
}

folderSort.addEventListener('change', () => {
    if (folderSort.value === 'custom') {
        folderSortable.option("disabled", false);
    } else {
        folderSortable.option("disabled", true);
        sortFolders();
    }
});

noteSort.addEventListener('change', () => {
    if (noteSort.value === 'custom') {
        noteSortable.option("disabled", false);
    } else {
        noteSortable.option("disabled", true);
        sortNotes();
    }
});

function sortFolders() {
    const sortBy = folderSort.value;
    let sortedFolders;

    if (sortBy === 'custom') {
        folderSortable.option("disabled", false);
        return;
    } else {
        folderSortable.option("disabled", true);
        sortedFolders = Object.keys(notes).sort((a, b) => {
            if (sortBy === 'name') {
                return a.localeCompare(b);
            } else {
                return notes[a].createdAt - notes[b].createdAt;
            }
        });
    }

    const newNotes = {};
    sortedFolders.forEach(folder => {
        newNotes[folder] = notes[folder];
    });
    notes = newNotes;
    updateFolderList();
}

function sortNotes() {
    if (!currentFolder) return;

    const sortBy = noteSort.value;
    let sortedNotes;

    if (sortBy === 'custom') {
        noteSortable.option("disabled", false);
        return;
    } else {
        noteSortable.option("disabled", true);
        sortedNotes = Object.keys(notes[currentFolder].notes).sort((a, b) => {
            if (sortBy === 'name') {
                return a.localeCompare(b);
            } else {
                return notes[currentFolder].notes[a].createdAt - notes[currentFolder].notes[b].createdAt;
            }
        });
    }

    const newNotes = {};
    sortedNotes.forEach(note => {
        newNotes[note] = notes[currentFolder].notes[note];
    });
    notes[currentFolder].notes = newNotes;
    updateNoteList();
}

function updateFolderList() {
    folderList.innerHTML = '';
    for (let folderName in notes) {
        createFolder(folderName);
    }
    if (folderSort.value !== 'custom') {
        sortFolders();
    }
}

function updateNoteList() {
    noteList.innerHTML = '';
    if (currentFolder && notes[currentFolder].notes) {
        for (let noteName in notes[currentFolder].notes) {
            createNote(noteName);
        }
        if (noteSort.value !== 'custom') {
            sortNotes();
        }
    }
}

// 삭제 확인 UI 표시 함수
function showDeleteConfirm(li, name, isFolder) {
    const confirmDiv = document.createElement('div');
    confirmDiv.className = 'delete-confirm';
    confirmDiv.innerHTML = `
        <span>정말<br>삭제하시겠습니까?</span>
        <div class="confirm-buttons">
            <button class="confirm-yes">예</button>
            <button class="confirm-no">아니오</button>
        </div>
    `;
    
    confirmDiv.querySelector('.confirm-yes').addEventListener('click', () => {
        if (isFolder) {
            delete notes[name];
            updateFolderList();
        } else {
            delete notes[currentFolder].notes[name];
            updateNoteList();
        }
        saveToLocalStorage();
        li.remove();
    });

    confirmDiv.querySelector('.confirm-no').addEventListener('click', () => {
        confirmDiv.remove();
    });

    li.appendChild(confirmDiv);
}

// 저장 알림 표시 함수
function showSaveNotification(message) {
    saveNotification.textContent = message;
    saveNotification.style.display = 'block';
    setTimeout(() => {
        saveNotification.style.display = 'none';
    }, 2000);
}

// URL 파라미터 처리
function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder');
    const note = urlParams.get('note');
    const content = urlParams.get('content');

    if (folder && note && content) {
        if (!notes[folder]) {
            notes[folder] = { notes: {}, createdAt: Date.now() };
        }
        notes[folder].notes[note] = {
            content: decodeURIComponent(content),
            tags: [],
            favorite: false,
            createdAt: Date.now()
        };
        selectFolder(folder);
        selectNote(note);
        saveToLocalStorage();
    }
}

// 초기화
function initialize() {
    initializeEditor();
    loadFromLocalStorage();
    handleUrlParams();
    initializeSortable();
    
    // 폴더가 있으면 첫 번째 폴더 선택
    if (Object.keys(notes).length > 0) {
        selectFolder(Object.keys(notes)[0]);
    }

    updateFolderList();
    updateNoteList();

    // 초기 정렬 설정
    if (folderSort.value !== 'custom') {
        sortFolders();
    }
    if (noteSort.value !== 'custom') {
        sortNotes();
    }
}

// 앱 시작
initialize();