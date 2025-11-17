// 🎨 ПРОСТАЯ И НАДЕЖНАЯ СИСТЕМА ТЕМ
console.log('🎨 Инициализация системы тем...');

let currentTheme = 'gray';
let soundEnabled = true;

// ФУНКЦИЯ СМЕНЫ ТЕМЫ
function changeTheme(theme) {
    console.log('🔄 Смена темы на:', theme);
    currentTheme = theme;
    
    // УДАЛЯЕМ ВСЕ СТАРЫЕ КЛАССЫ ТЕМ И ДОБАВЛЯЕМ НОВЫЙ
    document.body.className = theme + '-theme';
    
    // ОБНОВЛЯЕМ АКТИВНУЮ ТЕМУ В МЕНЮ
    document.querySelectorAll('.theme-option').forEach(function(option) {
        option.classList.remove('active');
    });
    const activeOption = document.querySelector('.theme-option[data-theme=\"' + theme + '\"]');
    if (activeOption) {
        activeOption.classList.add('active');
    }
    
    // СОХРАНЯЕМ В LOCALSTORAGE
    localStorage.setItem('currentTheme', theme);
    console.log('✅ Тема сохранена:', theme);
}

// ФУНКЦИЯ ОТКРЫТИЯ НАСТРОЕК
function openSettings() {
    console.log('📱 Открываем меню настроек');
    const menu = document.getElementById('settingsMenu');
    if (menu) {
        menu.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// ФУНКЦИЯ ЗАКРЫТИЯ НАСТРОЕК  
function closeSettings() {
    console.log('📱 Закрываем меню настроек');
    const menu = document.getElementById('settingsMenu');
    if (menu) {
        menu.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// СОХРАНЕНИЕ НАСТРОЕК
function saveSettings() {
    console.log('💾 Сохраняем настройки');
    
    const soundCheckbox = document.getElementById('soundEnabled');
    if (!soundCheckbox) {
        console.error('❌ Не найден чекбокс звука');
        return;
    }
    
    // СОХРАНЯЕМ НАСТРОЙКИ
    soundEnabled = soundCheckbox.checked;
    localStorage.setItem('soundEnabled', soundEnabled);
    localStorage.setItem('currentTheme', currentTheme);
    
    // ПРИМЕНЯЕМ НАСТРОЙКИ ЗВУКА
    if (window.notificationManager) {
        window.notificationManager.soundEnabled = soundEnabled;
        console.log('🔊 Звук установлен:', soundEnabled);
    }
    
    closeSettings();
    showNotification('✅ Настройки сохранены!');
}

// СБРОС НАСТРОЕК
function resetSettings() {
    console.log('🔄 Сбрасываем настройки');
    if (confirm('Сбросить все настройки к默认ным?')) {
        const soundCheckbox = document.getElementById('soundEnabled');
        if (soundCheckbox) {
            soundCheckbox.checked = true;
        }
        
        changeTheme('gray');
        
        localStorage.removeItem('soundEnabled');
        localStorage.removeItem('currentTheme');
        
        soundEnabled = true;
        if (window.notificationManager) {
            window.notificationManager.soundEnabled = true;
        }
        
        closeSettings();
        showNotification('✅ Настройки сброшены!');
    }
}

// ИНИЦИАЛИЗАЦИЯ НАСТРОЕК
function initSettings() {
    console.log('🔧 Инициализация настроек...');
    
    // ЗАГРУЖАЕМ СОХРАНЕННЫЕ НАСТРОЙКИ
    const savedSound = localStorage.getItem('soundEnabled');
    const savedTheme = localStorage.getItem('currentTheme');
    
    // НАСТРОЙКА ЗВУКА
    const soundCheckbox = document.getElementById('soundEnabled');
    if (soundCheckbox) {
        soundEnabled = savedSound !== null ? savedSound === 'true' : true;
        soundCheckbox.checked = soundEnabled;
        
        if (window.notificationManager) {
            window.notificationManager.soundEnabled = soundEnabled;
        }
    }
    
    // НАСТРОЙКА ТЕМЫ
    const themeToSet = savedTheme || 'gray';
    changeTheme(themeToSet);
    
    console.log('✅ Настройки инициализированы');
}

// УВЕДОМЛЕНИЯ
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.innerHTML = '✅ ' + message;
        notification.className = 'notification show';
        setTimeout(function() {
            notification.className = 'notification';
        }, 2000);
    }
}

// ГЛОБАЛЬНЫЕ ФУНКЦИИ
window.getSoundEnabled = function() {
    return soundEnabled;
};

window.setSoundEnabled = function(enabled) {
    soundEnabled = enabled;
    const soundCheckbox = document.getElementById('soundEnabled');
    if (soundCheckbox) {
        soundCheckbox.checked = enabled;
    }
    localStorage.setItem('soundEnabled', enabled);
};

// ЗАПУСК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', function() {
    initSettings();
    console.log('🚀 Система тем готова!');
});
