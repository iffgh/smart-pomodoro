// ⚙️ ИСПРАВЛЕННЫЙ FLOATING SETTINGS
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    if (panel) {
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    }
}

function changeTheme(theme) {
    document.body.style.background = getThemeColor(theme);
    console.log("Тема изменена на:", theme);
}

function getThemeColor(theme) {
    const themes = {
        'default': 'linear-gradient(135deg, #1a2a3a, #2c3e50)',
        'dark': 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
        'nature': 'linear-gradient(135deg, #27ae60, #2ecc71)'
    };
    return themes[theme] || themes['default'];
}

function testSound() {
    if (window.notificationManager && window.notificationManager.soundActivated) {
        window.notificationManager.playWorkEndSound();
    } else {
        alert("Сначала кликните по странице для активации звуков!");
    }
}

function saveSettings() {
    const soundEnabled = document.getElementById('soundEnabled')?.checked || true;
    const soundVolume = document.getElementById('soundVolume')?.value || 5;
    
    if (window.notificationManager) {
        window.notificationManager.soundEnabled = soundEnabled;
    }
    
    localStorage.setItem('soundEnabled', soundEnabled);
    localStorage.setItem('soundVolume', soundVolume);
    
    toggleSettings();
    alert("Настройки сохранены!");
}

function resetSettings() {
    if (confirm("Сбросить настройки?")) {
        const soundEnabled = document.getElementById('soundEnabled');
        const soundVolume = document.getElementById('soundVolume');
        const volumeValue = document.getElementById('volumeValue');
        
        if (soundEnabled) soundEnabled.checked = true;
        if (soundVolume) soundVolume.value = 5;
        if (volumeValue) volumeValue.textContent = '50%';
        
        changeTheme('default');
        localStorage.removeItem('soundEnabled');
        localStorage.removeItem('soundVolume');
        alert("Настройки сброшены!");
    }
}

// Безопасная инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка сохраненных настроек
    const savedSound = localStorage.getItem('soundEnabled');
    const soundEnabled = document.getElementById('soundEnabled');
    if (soundEnabled && savedSound !== null) {
        soundEnabled.checked = savedSound === 'true';
    }
    
    const savedVolume = localStorage.getItem('soundVolume');
    const soundVolume = document.getElementById('soundVolume');
    if (soundVolume && savedVolume !== null) {
        soundVolume.value = savedVolume;
    }
    
    // Безопасная установка обработчиков
    const volumeSlider = document.getElementById('soundVolume');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function(e) {
            const volumeValue = document.getElementById('volumeValue');
            if (volumeValue) {
                volumeValue.textContent = (e.target.value * 10) + '%';
            }
        });
    }
    
    console.log('✅ Floating settings инициализирован безопасно');
});
