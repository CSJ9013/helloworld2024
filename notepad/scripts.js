// scripts.js
// 가상의 메모 데이터
const memos = [
    { title: "첫 번째 메모", content: "이 메모는 예시입니다.\n원하는 내용을 작성하세요." },
    { title: "두 번째 메모", content: "이 메모는 두 번째 예시입니다." }
];

// 초기화 함수 호출
init();

// 초기화 함수 정의
function init() {
    // 메모 목록과 첫 번째 메모 표시
    displayMemoList();
    displayMemo(0);

    // 메모 목록 항목 클릭 시 해당 메모 표시
    document.querySelectorAll('.memo-list li').forEach((item, index) => {
        item.addEventListener('click', () => {
            displayMemo(index);
        });
    });

    // 새 메모 작성 버튼 클릭 시 빈 메모 표시
    document.querySelector('.compose-button').addEventListener('click', () => {
        displayEmptyMemo();
    });
}

// 메모 목록을 표시하는 함수 정의
function displayMemoList() {
    const memoListContainer = document.querySelector('.memo-list');
    memoListContainer.innerHTML = '';
    memos.forEach((memo, index) => {
        const li = document.createElement('li');
        li.textContent = memo.title;
        memoListContainer.appendChild(li);
    });
}

// 특정 인덱스에 해당하는 메모를 표시하는 함수 정의
function displayMemo(index) {
    const memoTitle = document.querySelector('.memo-title');
    const memoContent = document.querySelector('.memo-content');
    memoTitle.textContent = memos[index].title;
    memoContent.textContent = memos[index].content;
}

// 새로운 빈 메모를 표시하는 함수 정의
function displayEmptyMemo() {
    const memoTitle = document.querySelector('.memo-title');
    const memoContent = document.querySelector('.memo-content');
    memoTitle.textContent = '새 메모';
    memoContent.textContent = '';
}
