// URL의 해시값을 가져오는 함수
function getHash() {
    return window.location.hash.substring(1);
  }
  
  // 메모를 URL의 해시값으로 설정하는 함수
  function setHash(hash) {
    window.location.hash = hash;
  }
  
  // 저장 버튼을 클릭했을 때 실행되는 함수
  function saveMemo() {
    const memoText = document.getElementById('memo').value;
    setHash(encodeURIComponent(memoText)); // URL에 메모 저장
    updateShareUrl(); // 공유 URL 업데이트
  }
  
  // 지우기 버튼을 클릭했을 때 실행되는 함수
  function clearMemo() {
    document.getElementById('memo').value = '';
    setHash(''); // URL의 해시값을 비움
    updateShareUrl(); // 공유 URL 업데이트
  }
  
  /* // 공유 URL을 업데이트하는 함수
  function updateShareUrl() {
    const memoText = document.getElementById('memo').value;
    const encodedMemo = encodeURIComponent(memoText);
    const baseUrl = window.location.href.split('#')[0];
    document.getElementById('shareUrl').textContent = `메모 공유 URL: ${baseUrl}#${encodedMemo}`;
  } */

  // 공유 URL을 업데이트하는 함수
  /* function updateShareUrl() {
    const memoText = document.getElementById('memo').value;
    const encodedMemo = encodeURIComponent(memoText);
    const baseUrl = window.location.href.split('#')[0];
    const shareUrl = `${baseUrl}#${encodedMemo}`;
    document.getElementById('shareUrl').innerHTML = `메모 공유 URL: <a href="${shareUrl}" target="_blank">${shareUrl}</a>`;
  } */

  // 공유 URL을 업데이트하는 함수
function updateShareUrl() {
    const memoText = document.getElementById('memo').value;
    const encodedMemo = encodeURIComponent(memoText);
    const baseUrl = window.location.href.split('#')[0];
    const fullUrl = `${baseUrl}#${encodedMemo}`;
    const maxUrlLength = 50; // 최대 URL 길이
  
    // URL 길이가 최대 길이를 초과하면 생략된 URL을 만듦
    let displayUrl = fullUrl;
    if (fullUrl.length > maxUrlLength) {
      displayUrl = fullUrl.substr(0, maxUrlLength) + '...';
    }
  
    // 공유 URL을 표시하고 생략된 URL을 title 속성에 추가
    const shareUrlElement = document.getElementById('shareUrl');
    shareUrlElement.innerHTML = `메모 공유 URL: <a href="${fullUrl}" target="_blank" title="${fullUrl}">${displayUrl}</a>`;
  }
  
  // 페이지가 로드될 때 실행되는 함수
  window.onload = function() {
    const savedMemo = decodeURIComponent(getHash());
    document.getElementById('memo').value = savedMemo; // 저장된 메모 불러오기
    updateShareUrl(); // 공유 URL 업데이트
  
    // 마우스를 버튼 위에 올렸을 때 새 탭에서 열기 메시지 표시
    const shareUrlElement = document.getElementById('shareUrl');
    shareUrlElement.addEventListener('mouseover', function() {
      shareUrlElement.setAttribute('target', '_blank');
      shareUrlElement.setAttribute('title', '새 탭에서 열기');
    });
  
    // 마우스를 버튼 밖으로 옮겼을 때 타겟과 title 속성 제거
    shareUrlElement.addEventListener('mouseout', function() {
      shareUrlElement.removeAttribute('target');
      shareUrlElement.removeAttribute('title');
    });
  
    document.getElementById('saveBtn').addEventListener('click', saveMemo);
    document.getElementById('clearBtn').addEventListener('click', clearMemo);
  };  
  
  // 페이지가 로드될 때 실행되는 함수
  window.onload = function() {
    const savedMemo = decodeURIComponent(getHash());
    document.getElementById('memo').value = savedMemo; // 저장된 메모 불러오기
    updateShareUrl(); // 공유 URL 업데이트
  
    document.getElementById('saveBtn').addEventListener('click', saveMemo);
    document.getElementById('clearBtn').addEventListener('click', clearMemo);
  };
  
  // 저장 버튼을 클릭했을 때 실행되는 함수
  /* function saveMemo() {
    const memoText = document.getElementById('memo').value;
    const baseUrl = window.location.href.split('#')[0];
    const shareUrl = `${baseUrl}#${encodeURIComponent(memoText)}`;
    copyToClipboard(shareUrl); // 클립보드에 URL 복사
  } */
  // 저장 버튼을 클릭했을 때 실행되는 함수
  /* function saveMemo() {
    const memoText = document.getElementById('memo').value;
    setHash(encodeURIComponent(memoText)); // URL에 메모 저장
    updateShareUrl(); // 공유 URL 업데이트
    copyToClipboard(); // 클립보드에 URL 복사
  }
  
  // 클립보드에 내용을 복사하는 함수
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      // 클립보드 복사 성공 메시지를 표시하고 일정 시간 후에 숨기기
      document.getElementById('copyMessage').textContent = 'URL이 클립보드에 복사되었습니다.';
      setTimeout(hideMessage, 2000); // 2초 후에 숨기는 함수 호출
      console.log('URL이 클립보드에 복사되었습니다.');
    }, function(err) {
      // 클립보드 복사 실패 메시지를 표시하고 일정 시간 후에 숨기기
      document.getElementById('copyMessage').textContent = '클립보드 복사 중 오류가 발생했습니다.';
      setTimeout(hideMessage, 2000); // 2초 후에 숨기는 함수 호출
      console.error('클립보드에 복사하는 중 오류가 발생했습니다:', err);
    });
  }
  // 테마 변경 버튼을 클릭했을 때 실행되는 함수
  function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme'); // dark-theme 클래스를 toggle하여 테마 변경
  }
  
  // 페이지가 로드될 때 실행되는 함수
  window.onload = function() {
    // 테마 변경 버튼에 이벤트 리스너 추가
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  }; */

  // 테마 변경 버튼을 클릭했을 때 실행되는 함수
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme'); // dark-theme 클래스를 toggle하여 테마 변경
  }
  
  // 저장 버튼을 클릭했을 때 실행되는 함수
  function saveMemo() {
    const memoText = document.getElementById('memo').value;
    setHash(encodeURIComponent(memoText)); // URL에 메모 저장
    updateShareUrl(); // 공유 URL 업데이트
    copyToClipboard(); // 클립보드에 URL 복사
  }
  
  // 클립보드에 내용을 복사하는 함수
  function copyToClipboard() {
    const memoText = document.getElementById('memo').value;
    const baseUrl = window.location.href.split('#')[0];
    const shareUrl = `${baseUrl}#${encodeURIComponent(memoText)}`;
    navigator.clipboard.writeText(shareUrl).then(function() {
      // 클립보드 복사 성공 메시지를 표시하고 일정 시간 후에 숨기기
      document.getElementById('copyMessage').textContent = 'URL이 클립보드에 복사되었습니다.';
      setTimeout(hideMessage, 3000); // 3초 후에 숨기는 함수 호출
      console.log('URL이 클립보드에 복사되었습니다.');
    }, function(err) {
      // 클립보드 복사 실패 메시지를 표시하고 일정 시간 후에 숨기기
      document.getElementById('copyMessage').textContent = '클립보드 복사 중 오류가 발생했습니다.';
      setTimeout(hideMessage, 3000); // 3초 후에 숨기는 함수 호출
      console.error('클립보드에 복사하는 중 오류가 발생했습니다:', err);
    });
  }
  
  // 페이지가 로드될 때 실행되는 함수
  window.onload = function() {
    const savedMemo = decodeURIComponent(getHash());
    document.getElementById('memo').value = savedMemo; // 저장된 메모 불러오기
    updateShareUrl(); // 공유 URL 업데이트
  
    // 테마 변경 버튼에 이벤트 리스너 추가
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  
    // 저장 버튼에 이벤트 리스너 추가
    document.getElementById('saveBtn').addEventListener('click', saveMemo);
  
    // 지우기 버튼에 이벤트 리스너 추가
    document.getElementById('clearBtn').addEventListener('click', clearMemo);
  };
  
  // 테마 변경 버튼을 클릭했을 때 실행되는 함수
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme'); // dark-theme 클래스를 toggle하여 테마 변경
  }
  
  // 저장 버튼을 클릭했을 때 실행되는 함수
  function saveMemo() {
    const memoText = document.getElementById('memo').value;
    setHash(encodeURIComponent(memoText)); // URL에 메모 저장
    updateShareUrl(); // 공유 URL 업데이트
    copyToClipboard(); // 클립보드에 URL 복사
  }
  
  // 클립보드에 내용을 복사하는 함수
  function copyToClipboard() {
    const memoText = document.getElementById('memo').value;
    const baseUrl = window.location.href.split('#')[0];
    const shareUrl = `${baseUrl}#${encodeURIComponent(memoText)}`;
    navigator.clipboard.writeText(shareUrl).then(function() {
      // 클립보드 복사 성공 메시지를 표시하고 일정 시간 후에 숨기기
      document.getElementById('copyMessage').textContent = 'URL이 클립보드에 복사되었습니다.';
      setTimeout(hideMessage, 3000); // 3초 후에 숨기는 함수 호출
      console.log('URL이 클립보드에 복사되었습니다.');
    }, function(err) {
      // 클립보드 복사 실패 메시지를 표시하고 일정 시간 후에 숨기기
      document.getElementById('copyMessage').textContent = '클립보드 복사 중 오류가 발생했습니다.';
      setTimeout(hideMessage, 3000); // 3초 후에 숨기는 함수 호출
      console.error('클립보드에 복사하는 중 오류가 발생했습니다:', err);
    });
  }
  
  // 페이지가 로드될 때 실행되는 함수
  window.onload = function() {
    const savedMemo = decodeURIComponent(getHash());
    document.getElementById('memo').value = savedMemo; // 저장된 메모 불러오기
    updateShareUrl(); // 공유 URL 업데이트
  
    // 테마 변경 버튼에 이벤트 리스너 추가
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  
    // 저장 버튼에 이벤트 리스너 추가
    document.getElementById('saveBtn').addEventListener('click', saveMemo);
  
    // 지우기 버튼에 이벤트 리스너 추가
    document.getElementById('clearBtn').addEventListener('click', clearMemo);
  };
  
  
  // 메시지를 숨기는 함수
  function hideMessage() {
    document.getElementById('copyMessage').textContent = '';
  }