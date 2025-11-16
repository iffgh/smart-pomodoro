// 📋 КОНФИГУРАЦИЯ POMODORO ТАЙМЕРА
const POMODORO_CONFIG = {
    // ⏱️ Временные интервалы (в минутах)
    TIMER: {
        WORK: 25,           // Время работы
        SHORT_BREAK: 5,     // Короткий перерыв
        LONG_BREAK: 15,     // Длинный перерыв
        SESSIONS_BEFORE_LONG_BREAK: 4  // Сессий до длинного перерыва
    },
    
    // 🔊 Настройки звуков
    SOUND: {
        ENABLED: true,
        VOLUME: 0.1,        // Громкость (0.1 - 1.0)
        WORK_END_FREQ: 784, // Частота звука окончания работы
        BREAK_END_FREQ: 523 // Частота звука окончания перерыва
    },
    
    // 🔔 Настройки уведомлений
    NOTIFICATIONS: {
        ENABLED: true,
        BROWSER_NOTIFICATIONS: true,
        DESKTOP_NOTIFICATIONS: false
    },
    
    // 🎨 Настройки темы
    THEME: {
        PRIMARY: '#2c3e50',
        WORK_COLOR: '#e74c3c',
        BREAK_COLOR: '#3498db',
        PRACTICE_COLOR: '#2ecc71'
    },
    
    // 💾 Настройки сохранения
    STORAGE: {
        ENABLED: true,
        STATISTICS_DAYS: 30  // Хранить статистику за N дней
    }
};

// Экспортируем конфигурацию
if (typeof module !== 'undefined' && module.exports) {
    module.exports = POMODORO_CONFIG;
}
