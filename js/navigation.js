// 🧭 СИСТЕМА НАВИГАЦИИ
class Navigation {
    constructor() {
        this.currentPage = 'timer';
        this.init();
    }

    init() {
        console.log('🧭 Инициализация навигации...');
        this.setupNavigation();
        this.loadCurrentSettings();
        console.log('🧭 Система навигации загружена');
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetPage = e.currentTarget.getAttribute('data-page');
                this.switchPage(targetPage);
            });
        });

        // Обработчики для страницы настроек
        this.setupSettingsHandlers();
    }

    switchPage(pageId) {
        // Скрываем все страницы
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Убираем активный класс со всех кнопок
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Показываем целевую страницу
        const targetPage = document.getElementById(`${pageId}Page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Активируем кнопку навигации
        const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        this.currentPage = pageId;
        console.log(`🧭 Переключение на страницу: ${pageId}`);

        // Особые действия для страницы настроек
        if (pageId === 'settings') {
            this.loadCurrentSettings();
        }
    }

    setupSettingsHandlers() {
        // Звуковые уведомления
        const soundEnabled = document.getElementById('soundEnabled');
        const testSoundBtn = document.getElementById('testSoundBtn');
        
        if (soundEnabled) {
            soundEnabled.addEventListener('change', (e) => {
                this.updateSoundSettings(e.target.checked);
            });
        }

        if (testSoundBtn) {
            testSoundBtn.addEventListener('click', () => {
                this.testSound();
            });
        }

        // Автозапуск отдыха
        const autoStartBreak = document.getElementById('autoStartBreak');
        if (autoStartBreak) {
            autoStartBreak.addEventListener('change', (e) => {
                this.updateAutoStartSettings(e.target.checked);
            });
        }

        // Темы оформления
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.currentTarget.getAttribute('data-theme');
                this.changeTheme(theme);
            });
        });

        // Сброс настроек
        const resetAllSettingsBtn = document.getElementById('resetAllSettingsBtn');
        if (resetAllSettingsBtn) {
            resetAllSettingsBtn.addEventListener('click', () => {
                this.resetAllSettings();
            });
        }

        // Сохранение настроек
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                this.saveAllSettings();
            });
        }
    }

    loadCurrentSettings() {
        console.log('🔧 Загрузка текущих настроек...');
        
        // Звуковые настройки
        const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
        const soundCheckbox = document.getElementById('soundEnabled');
        if (soundCheckbox) {
            soundCheckbox.checked = soundEnabled;
        }
        this.updateSoundSettings(soundEnabled);

        // Автозапуск отдыха
        const autoStartEnabled = localStorage.getItem('autoStartBreak') !== 'false';
        const autoStartCheckbox = document.getElementById('autoStartBreak');
        if (autoStartCheckbox) {
            autoStartCheckbox.checked = autoStartEnabled;
        }

        // Тема оформления
        const currentTheme = localStorage.getItem('currentTheme') || 'gray';
        this.setActiveTheme(currentTheme);

        console.log('✅ Настройки загружены');
    }

   updateSoundSettings(enabled) {
    console.log(`🔊 Обновление настроек звука: ${enabled}`);
    
    if (window.notificationManager) {
        // Используем правильный метод
        notificationManager.updateSoundSettings(enabled);
    }
    
    localStorage.setItem('soundEnabled', enabled);
}

    updateAutoStartSettings(enabled) {
        console.log(`🔄 Обновление автозапуска: ${enabled}`);
        localStorage.setItem('autoStartBreak', enabled);
    }

    changeTheme(theme) {
        console.log(`🎨 Смена темы на: ${theme}`);
        
        // Убираем активный класс со всех тем
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });

        // Активируем выбранную тему
        const activeTheme = document.querySelector(`[data-theme="${theme}"]`);
        if (activeTheme) {
            activeTheme.classList.add('active');
        }

        // Применяем тему
        document.body.className = `${theme}-theme`;
        localStorage.setItem('currentTheme', theme);

        console.log(`✅ Тема сохранена: ${theme}`);
    }

    setActiveTheme(theme) {
        const themeOption = document.querySelector(`[data-theme="${theme}"]`);
        if (themeOption) {
            themeOption.classList.add('active');
        }
        document.body.className = `${theme}-theme`;
    }

    testSound() {
        console.log('🔊 Тест звука...');
        if (window.notificationManager) {
            notificationManager.testAllSounds();
        }
    }

    resetAllSettings() {
        console.log('🔄 Сброс всех настроек...');
        
        if (confirm('Вы уверены, что хотите сбросить все настройки?')) {
            // Сбрасываем настройки таймера
            if (window.pomodoro && window.pomodoro.resetTimeSettings) {
                window.pomodoro.resetTimeSettings();
            }
            
            // Сбрасываем звуковые настройки
            localStorage.removeItem('soundEnabled');
            localStorage.removeItem('autoStartBreak');
            localStorage.removeItem('currentTheme');
            
            // Перезагружаем настройки
            this.loadCurrentSettings();
            
            console.log('✅ Все настройки сброшены');
            if (window.notificationManager) {
                notificationManager.showNotification('Все настройки сброшены', 'success');
            }
        }
    }

    saveAllSettings() {
        console.log('💾 Сохранение всех настроек...');
        
        // Сохраняем настройки звука
        const soundEnabled = document.getElementById('soundEnabled').checked;
        this.updateSoundSettings(soundEnabled);
        
        // Сохраняем автозапуск
        const autoStartBreak = document.getElementById('autoStartBreak').checked;
        this.updateAutoStartSettings(autoStartBreak);
        
        console.log('✅ Все настройки сохранены');
        if (window.notificationManager) {
            notificationManager.showNotification('Настройки сохранены', 'success');
        }
    }
}

// Инициализация навигации
document.addEventListener('DOMContentLoaded', function() {
    window.navigation = new Navigation();
});