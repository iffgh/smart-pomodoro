// 🎛️ УЛУЧШЕННЫЙ МЕНЕДЖЕР ОБЩИХ НАСТРОЕК
class EnhancedGeneralSettings {
    constructor() {
        this.defaultSettings = {
            // 🌐 ОБЩИЕ НАСТРОЙКИ
            appLanguage: 'ru',
            colorTheme: 'default',
            accentColor: '#4CAF50',
            
            // 🔔 УВЕДОМЛЕНИЯ
            enableDesktopNotifications: true,
            enableSoundNotifications: true,
            enableVibration: false,
            notificationVolume: 50,
            
            // ⚡ ПРОИЗВОДИТЕЛЬНОСТЬ
            hardwareAcceleration: true,
            reduceAnimations: false,
            lowPowerMode: false,
            
            // 📊 ДАННЫЕ И АНАЛИТИКА
            collectAnonymousStats: false,
            errorReporting: true,
            autoSaveProgress: true,
            
            // 🎯 ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
            enableKeyboardShortcuts: true,
            showAchievementAlerts: true,
            dailyProgressReports: true,
            focusAssistMode: false
        };
        
        this.currentSettings = { ...this.defaultSettings };
        this.isPanelVisible = false;
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.applyCurrentSettings();
        console.log('🎛️ Улучшенные настройки инициализированы');
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('generalAppSettings');
            if (saved) {
                this.currentSettings = { ...this.defaultSettings, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('Не удалось загрузить настройки, используются значения по умолчанию');
        }
    }

    saveSettings() {
        try {
            this.updateFromUI();
            localStorage.setItem('generalAppSettings', JSON.stringify(this.currentSettings));
            this.applyCurrentSettings();
            
            // Уведомляем другие компоненты
            this.dispatchSettingsChange();
            
            this.showToast('Настройки сохранены ✅', 'success');
            return true;
        } catch (error) {
            this.showToast('Ошибка сохранения настроек ❌', 'error');
            return false;
        }
    }

    updateFromUI() {
        // Обновляем настройки из элементов UI
        const elements = {
            appLanguage: 'languageSelect',
            colorTheme: 'themeSelect',
            enableDesktopNotifications: 'desktopNotifications',
            enableSoundNotifications: 'soundNotifications',
            notificationVolume: 'globalVolume',
            reduceAnimations: 'reduceAnimations',
            collectAnonymousStats: 'anonymousStats',
            enableKeyboardShortcuts: 'keyboardShortcuts',
            showAchievementAlerts: 'achievementAlerts'
        };

        for (const [setting, elementId] of Object.entries(elements)) {
            const element = document.getElementById(elementId);
            if (element) {
                if (element.type === 'checkbox') {
                    this.currentSettings[setting] = element.checked;
                } else if (element.type === 'range') {
                    this.currentSettings[setting] = parseInt(element.value);
                } else {
                    this.currentSettings[setting] = element.value;
                }
            }
        }
    }

    applyCurrentSettings() {
        this.applyTheme(this.currentSettings.colorTheme);
        this.applyLanguage(this.currentSettings.appLanguage);
        this.applyPerformanceSettings();
        this.applyNotificationSettings();
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        console.log('🎨 Тема применена:', theme);
    }

    applyLanguage(lang) {
        document.documentElement.lang = lang;
    }

    applyPerformanceSettings() {
        if (this.currentSettings.reduceAnimations) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
        
        if (this.currentSettings.lowPowerMode) {
            document.body.classList.add('low-power-mode');
        } else {
            document.body.classList.remove('low-power-mode');
        }
    }

    applyNotificationSettings() {
        if (window.notificationManager) {
            window.notificationManager.setMasterVolume(this.currentSettings.notificationVolume / 100);
        }
    }

    dispatchSettingsChange() {
        window.dispatchEvent(new CustomEvent('appSettingsChanged', {
            detail: this.currentSettings
        }));
    }

    showToast(message, type = 'info') {
        // Простая реализация toast уведомлений
        const toast = document.createElement('div');
        toast.className = 'settings-toast settings-toast-' + type;
        toast.textContent = message;
        toast.style.cssText = \
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: \;
            color: white;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        \;
        
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Управление видимостью панели
    toggleSettingsPanel() {
        this.isPanelVisible = !this.isPanelVisible;
        const panel = document.getElementById('generalSettingsPanel');
        if (panel) {
            panel.style.display = this.isPanelVisible ? 'block' : 'none';
            if (this.isPanelVisible) {
                this.updateUI();
            }
        }
    }

    resetToDefaults() {
        if (confirm('Сбросить все общие настройки к значениям по умолчанию?')) {
            this.currentSettings = { ...this.defaultSettings };
            this.saveSettings();
            this.updateUI();
        }
    }

    updateUI() {
        // Обновляем UI в соответствии с текущими настройками
        const elements = {
            appLanguage: 'languageSelect',
            colorTheme: 'themeSelect',
            enableDesktopNotifications: 'desktopNotifications',
            enableSoundNotifications: 'soundNotifications',
            notificationVolume: 'globalVolume',
            reduceAnimations: 'reduceAnimations',
            collectAnonymousStats: 'anonymousStats',
            enableKeyboardShortcuts: 'keyboardShortcuts',
            showAchievementAlerts: 'achievementAlerts'
        };

        for (const [setting, elementId] of Object.entries(elements)) {
            const element = document.getElementById(elementId);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = this.currentSettings[setting];
                } else if (element.type === 'range') {
                    element.value = this.currentSettings[setting];
                    // Обновляем отображение значения
                    const valueDisplay = element.nextElementSibling;
                    if (valueDisplay && valueDisplay.classList.contains('volume-value')) {
                        valueDisplay.textContent = this.currentSettings[setting] + '%';
                    }
                } else {
                    element.value = this.currentSettings[setting];
                }
            }
        }
    }

    setupEventListeners() {
        // Глобальные обработчики для быстрого доступа
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === ',' && this.currentSettings.enableKeyboardShortcuts) {
                e.preventDefault();
                this.toggleSettingsPanel();
            }
        });
    }
}

// Глобальная инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.generalSettings = new EnhancedGeneralSettings();
    window.generalSettings.init();
});
