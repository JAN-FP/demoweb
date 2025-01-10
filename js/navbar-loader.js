// 載入導航欄
document.addEventListener('DOMContentLoaded', function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // 重新綁定語言切換按鈕的事件監聽器
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    setLanguage(btn.dataset.lang);
                });
            });

            // 確保導航欄的語言設置正確
            if (typeof setLanguage === 'function' && translations[currentLang]) {
                setLanguage(currentLang);
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
});
