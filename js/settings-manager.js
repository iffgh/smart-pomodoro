// 🎛️ УПРОЩЕННЫЙ МЕНЕДЖЕР НАСТРОЕК БЕЗ ГРОМКОСТИ
class SettingsManager {
    constructor() {
        this.defaultSettings = {
            soundEnabled: true,
            theme: 'default',
            desktopNotifications: true,
            autoStartBreaks: true
        };
        this.currentSettings = {...this.defaultSettings};
        this.soundActivated = false;
    }

    init() {
        this.loadSettings();
        this.applyAllSettings();
        this.setupEventListeners();
        this.setupSoundActivation();
        console.log('🎛️ SettingsManager инициализирован');
    }

    setupSoundActivation() {
        // Активируем звуки при любом клике по странице
        const activateSounds = () => {
            if (!this.soundActivated && window.notificationManager) {
                console.log('🎯 Активируем звуковую систему...');
                window.notificationManager.activateSounds();
                this.soundActivated = true;
            }
        };

        document.addEventListener('click', activateSounds);
        document.addEventListener('keydown', activateSounds);
        document.addEventListener('touchstart', activateSounds);
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('pomodoroSettings');
            if (saved) {
                this.currentSettings = {...this.defaultSettings, ...JSON.parse(saved)};
            }
        } catch (e) {
            console.warn('Ошибка загрузки настроек:', e);
        }
    }

    saveSettings() {
        try {
            this.getSettingsFromUI();
            localStorage.setItem('pomodoroSettings', JSON.stringify(this.currentSettings));
            this.applyAllSettings();
            this.showNotification('Настройки сохранены! ✅');
        } catch (e) {
            this.showNotification('Ошибка сохранения! ❌', 'error');
        }
    }

    getSettingsFromUI() {
        const soundEnabled = document.getElementById('soundEnabled');
        const themeSelect = document.getElementById('themeSelect');
        const desktopNotifications = document.getElementById('desktopNotifications');
        const autoStartBreaks = document.getElementById('autoStartBreaks');

        if (soundEnabled) this.currentSettings.soundEnabled = soundEnabled.checked;
        if (themeSelect) this.currentSettings.theme = themeSelect.value;
        if (desktopNotifications) this.currentSettings.desktopNotifications = desktopNotifications.checked;
        if (autoStartBreaks) this.currentSettings.autoStartBreaks = autoStartBreaks.checked;
    }

    applyAllSettings() {
        // Применяем тему
        if (window.themeManager) {
            window.themeManager.applyTheme(this.currentSettings.theme);
        }
        
        // Применяем звуки
        this.applySoundSettings();
    }

    applySoundSettings() {
        if (window.notificationManager) {
            console.log('🔊 Применяем настройки звука:', {
                enabled: this.currentSettings.soundEnabled
            });
            
            // ВКЛЮЧАЕМ/ВЫКЛЮЧАЕМ звуки
            window.notificationManager.soundEnabled = this.currentSettings.soundEnabled;
            
            // Если звуки выключены, принудительно останавливаем все звуки
            if (!this.currentSettings.soundEnabled && window.notificationManager.audioContext) {
                try {
                    window.notificationManager.audioContext.suspend();
                    console.log('🔇 Аудиоконтекст приостановлен');
                } catch (e) {
                    console.log('⚠️ Не удалось приостановить аудиоконтекст');
                }
            }
        }
    }

    updateUI() {
        const soundEnabled = document.getElementById('soundEnabled');
        const themeSelect = document.getElementById('themeSelect');
        const desktopNotifications = document.getElementById('desktopNotifications');
        const autoStartBreaks = document.getElementById('autoStartBreaks');

        if (soundEnabled) soundEnabled.checked = this.currentSettings.soundEnabled;
        if (themeSelect) themeSelect.value = this.currentSettings.theme;
        if (desktopNotifications) desktopNotifications.checked = this.currentSettings.desktopNotifications;
        if (autoStartBreaks) autoStartBreaks.checked = this.currentSettings.autoStartBreaks;
    }

    setupEventListeners() {
        // Обработчик включения/выключения звука - ПРИМЕНЯЕМ СРАЗУ
        const soundEnabled = document.getElementById('soundEnabled');
        if (soundEnabled) {
            soundEnabled.addEventListener('change', (e) => {
                console.log('🔊 Переключение звуков:', e.target.checked);
                
                // ПРИМЕНЯЕМ настройку сразу
                this.currentSettings.soundEnabled = e.target.checked;
                this.applySoundSettings();
                localStorage.setItem('pomodoroSettings', JSON.stringify(this.currentSettings));
                
                if (e.target.checked) {
                    this.showNotification('Звуки включены 🔊');
                } else {
                    this.showNotification('Звуки выключены 🔇');
                }
            });
        }

        // Обработчики для других чекбоксов
        const desktopNotifications = document.getElementById('desktopNotifications');
        const autoStartBreaks = document.getElementById('autoStartBreaks');

        if (desktopNotifications) {
            desktopNotifications.addEventListener('change', (e) => {
                this.currentSettings.desktopNotifications = e.target.checked;
                localStorage.setItem('pomodoroSettings', JSON.stringify(this.currentSettings));
            });
        }

        if (autoStartBreaks) {
            autoStartBreaks.addEventListener('change', (e) => {
                this.currentSettings.autoStartBreaks = e.target.checked;
                localStorage.setItem('pomodoroSettings', JSON.stringify(this.currentSettings));
            });
        }

        // Обработчик темы
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.currentSettings.theme = e.target.value;
                localStorage.setItem('pomodoroSettings', JSON.stringify(this.currentSettings));
                this.applyAllSettings();
            });
        }
    }

    toggleSettingsPanel() {
        const panel = document.getElementById('settingsPanel');
        const isVisible = panel.style.display === 'block';
        panel.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) this.updateUI();
    }

    resetSettings() {
        if (confirm('Сбросить настройки?')) {
            this.currentSettings = {...this.defaultSettings};
            this.saveSettings();
            this.updateUI();
        }
    }

    showNotification(message, type = 'success') {
        // Удаляем предыдущие уведомления
        document.querySelectorAll('.settings-notification').forEach(el => el.remove());
        
        const note = document.createElement('div');
        note.className = 'settings-notification';
        note.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'error' ? '#f44336' : '#4CAF50'};
            color: white;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: 500;
        `;
        note.textContent = message;
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 3000);
    }
}

// Глобальные функции
function toggleSettings() { 
    if (window.settingsManager) {
        window.settingsManager.toggleSettingsPanel();
    }
}

function saveSettings() { 
    if (window.settingsManager) {
        window.settingsManager.saveSettings();
    }
}

function resetSettings() { 
    if (window.settingsManager) {
        window.settingsManager.resetSettings();
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.settingsManager = new SettingsManager();
    window.settingsManager.init();
});