let currentLang = localStorage.getItem('language') || 'en';
let translations = {};

// 載入語言檔
async function loadTranslations() {
    try {
        const response = await fetch('languages.json');
        translations = await response.json();
        // 初始化語言設置
        setLanguage(currentLang);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// 設置語言
function setLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // 更新語言按鈕狀態
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // 更新所有帶有 data-translate 屬性的元素
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 載入語言文件
    loadTranslations();
    
    // 添加語言切換事件監聽
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(btn.dataset.lang);
        });
    });
});