// modern-settings.js - ПОЛНОСТЬЮ ИСПРАВЛЕННЫЙ
class ModernSettingsManager {
  constructor() {
    this.settings = this.loadSettings();
    this.tempSettings = {...this.settings};
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadCurrentSettings();
    this.applyAllSettings();
  }

  bindEvents() {
    // КНОПКИ ГРОМКОСТИ - исправленные
    document.querySelectorAll('.volume-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setVolume(e.currentTarget.dataset.volume);
      });
    });

    // КНОПКИ ТЕМ - исправленные
    document.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.selectTheme(e.currentTarget.dataset.theme);
      });
    });

    // ГАЛОЧКИ - исправленные
    document.querySelectorAll('.modern-checkbox input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.updateTempSetting(e.target.id, e.target.checked);
      });
    });

    // КНОПКИ СОХРАНЕНИЯ И СБРОСА - исправленные
    const saveBtn = document.getElementById('saveSettingsBtn');
    const resetBtn = document.getElementById('resetSettingsBtn');
    
    if (saveBtn) {
      saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.saveSettings();
      });
    }
    
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.resetSettings();
      });
    }

    // Слушаем изменения темы
    this.setupThemeObserver();
  }

  setupThemeObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          this.applyThemeToSettings();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  applyThemeToSettings() {
    const currentTheme = this.getCurrentTheme();
    this.updateSettingsTheme(currentTheme);
  }

  getCurrentTheme() {
    if (document.body.classList.contains('dark-theme')) return 'dark';
    if (document.body.classList.contains('light-theme')) return 'light';
    return 'gray';
  }

  updateSettingsTheme(theme) {
    const settingsMenu = document.querySelector('.settings-menu');
    if (settingsMenu) {
      settingsMenu.setAttribute('data-theme', theme);
    }
  }

  setVolume(volume) {
    const volumeValue = parseFloat(volume);
    
    // Обновляем ВСЕ кнопки громкости
    document.querySelectorAll('.volume-btn').forEach(btn => {
      const btnVolume = parseFloat(btn.dataset.volume);
      const isActive = btnVolume === volumeValue;
      btn.classList.toggle('active', isActive);
      
      // Анимация переключения
      if (isActive) {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      }
    });
    
    this.updateTempSetting('volume', volumeValue);
    this.applyVolume(volumeValue);
  }

  selectTheme(theme) {
    // Обновляем ВСЕ карточки тем
    document.querySelectorAll('.theme-card').forEach(card => {
      const isActive = card.dataset.theme === theme;
      card.classList.toggle('active', isActive);
      
      // Анимация переключения
      if (isActive) {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.transform = '';
        }, 150);
      }
    });
    
    this.updateTempSetting('theme', theme);
    this.applyTheme(theme);
  }

  applyTheme(theme) {
    document.body.className = `${theme}-theme`;
    document.documentElement.setAttribute('data-theme', theme);
    this.updateSettingsTheme(theme);
    
    console.log('🎨 Тема применена:', theme);
  }

  applyVolume(volume) {
    if (window.audioManager) {
      if (volume === 0) {
        window.audioManager.setEnabled(false);
        console.log('🔇 Звук отключен');
      } else {
        window.audioManager.setEnabled(true);
        window.audioManager.setVolume(volume);
        console.log('🔊 Громкость установлена:', volume);
        
        // Тестовый звук
        if (this.tempSettings.notificationsEnabled) {
          setTimeout(() => {
            window.audioManager.playNotification('test');
          }, 100);
        }
      }
    }
  }

  updateTempSetting(key, value) {
    this.tempSettings[key] = value;
    console.log('📝 Настройка изменена:', key, value);
  }

  loadCurrentSettings() {
    // Загружаем настройки в интерфейс
    Object.keys(this.settings).forEach(key => {
      const element = document.getElementById(key);
      if (element && element.type === 'checkbox') {
        element.checked = this.settings[key];
      }
    });

    // Обновляем кнопки громкости
    document.querySelectorAll('.volume-btn').forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.dataset.volume) === this.settings.volume);
    });

    // Обновляем карточки тем
    document.querySelectorAll('.theme-card').forEach(card => {
      card.classList.toggle('active', card.dataset.theme === this.settings.theme);
    });
  }

  saveSettings() {
    // Анимация кнопки сохранения
    const saveBtn = document.getElementById('saveSettingsBtn');
    if (saveBtn) {
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = '<span class="btn-icon">⏳</span> Сохранение...';
      saveBtn.classList.add('loading');
      
      setTimeout(() => {
        this.settings = {...this.tempSettings};
        localStorage.setItem('modernPomodoroSettings', JSON.stringify(this.settings));
        this.applyAllSettings();
        
        console.log('💾 Настройки сохранены:', this.settings);
        this.showToast('Настройки сохранены! 🎉', 'success');
        
        // Восстанавливаем кнопку
        saveBtn.innerHTML = originalText;
        saveBtn.classList.remove('loading');
        
        // Закрываем настройки через секунду
        setTimeout(() => {
          if (typeof closeSettings === 'function') {
            closeSettings();
          }
        }, 1000);
        
      }, 800);
    }
  }

  applyAllSettings() {
    // Применяем тему
    this.applyTheme(this.settings.theme);
    
    // Применяем звук
    this.applyVolume(this.settings.volume);
    
    // Применяем автозапуск отдыха в таймере
    this.applyAutoStartSettings();
    
    // Применяем остальные настройки
    if (window.audioManager && window.audioManager.setTickingEnabled) {
      window.audioManager.setTickingEnabled(this.settings.tickingEnabled);
    }
    
    this.applyCompactMode(this.settings.compactMode);
    this.applyAnimations(this.settings.animationsEnabled);
    this.applyProgressBar(this.settings.progressBarEnabled);
    
    console.log('⚙️ Все настройки применены');
  }

  applyAutoStartSettings() {
    // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: применяем настройку автозапуска отдыха
    if (window.pomodoro) {
      window.pomodoro.autoStartBreaks = this.settings.autoStartBreaks;
      console.log('🔄 Автозапуск отдыха:', this.settings.autoStartBreaks ? 'ВКЛЮЧЕН' : 'ВЫКЛЮЧЕН');
      
      // Принудительно обновляем настройки таймера
      if (window.pomodoro.applySettings) {
        window.pomodoro.applySettings();
      }
    }
  }

  applyCompactMode(enabled) {
    document.body.classList.toggle('compact-mode', enabled);
  }

  applyAnimations(enabled) {
    document.body.classList.toggle('no-animations', !enabled);
  }

  applyProgressBar(enabled) {
    const progressBar = document.querySelector('.progress-container');
    if (progressBar) {
      progressBar.style.display = enabled ? 'block' : 'none';
    }
  }

  loadSettings() {
    const saved = localStorage.getItem('modernPomodoroSettings');
    const defaultSettings = {
      tickingEnabled: true,
      notificationsEnabled: true,
      volume: 0.7,
      theme: 'gray',
      compactMode: false,
      animationsEnabled: true,
      progressBarEnabled: true,
      autoStartBreaks: false, // Теперь будет работать!
      longBreakEnabled: true,
      autoPracticeEnabled: true,
      autoSaveStats: true,
      showAchievements: true
    };
    
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  }

  resetSettings() {
    if (confirm('Вы уверены, что хотите сбросить ВСЕ настройки к значениям по умолчанию?')) {
      // Анимация кнопки сброса
      const resetBtn = document.getElementById('resetSettingsBtn');
      if (resetBtn) {
        const originalText = resetBtn.innerHTML;
        resetBtn.innerHTML = '<span class="btn-icon">🔄</span> Сброс...';
        
        setTimeout(() => {
          localStorage.removeItem('modernPomodoroSettings');
          this.settings = this.loadSettings();
          this.tempSettings = {...this.settings};
          this.loadCurrentSettings();
          this.applyAllSettings();
          this.showToast('Все настройки сброшены! 🔄', 'info');
          
          // Восстанавливаем кнопку
          resetBtn.innerHTML = originalText;
        }, 800);
      }
    }
  }

  showToast(message, type = 'info') {
    document.querySelectorAll('.settings-toast').forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `settings-toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 14px 22px;
      background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
      color: white;
      border-radius: 12px;
      z-index: 10000;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
}

// Глобальные функции - исправленные
function saveAllSettings() {
  if (window.modernSettings) {
    window.modernSettings.saveSettings();
  }
}

function resetAllSettings() {
  if (window.modernSettings) {
    window.modernSettings.resetSettings();
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  window.modernSettings = new ModernSettingsManager();
});
// ОБНОВЛЕННАЯ ФУНКЦИЯ applyAutoStartSettings в modern-settings.js
applyAutoStartSettings() 
{
    // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: применяем настройку автозапуска отдыха
    console.log('🔄 Применяем настройки автозапуска:', this.settings.autoStartBreaks);
    
    // Обновляем глобальную переменную для доступа из timer.js
    window.autoStartBreaks = this.settings.autoStartBreaks;
    
    // Принудительно обновляем настройки таймера
    if (window.pomodoro && window.pomodoro.applySettings) {
        window.pomodoro.applySettings();
    }
    
    // Показываем статус в консоли
    if (this.settings.autoStartBreaks) {
        console.log('✅ Автозапуск отдыха ВКЛЮЧЕН - после работы начнется перерыв');
    } else {
        console.log('❌ Автозапуск отдыха ВЫКЛЮЧЕН - после работы начнется практика');
    }
}