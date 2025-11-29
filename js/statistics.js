// 📊 СИСТЕМА СТАТИСТИКИ
class Statistics {
    constructor() {
        this.stats = {
            totalSessions: 0,
            totalWorkTime: 0,
            totalPractices: 0,
            sessionHistory: []
        };
        this.init();
    }

    init() {
        this.loadStats();
        console.log('📊 Система статистики инициализирована');
    }

    loadStats() {
        const savedStats = localStorage.getItem('pomodoroStats');
        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
    }

    saveStats() {
        localStorage.setItem('pomodoroStats', JSON.stringify(this.stats));
    }

    addSession(type, duration) {
        this.stats.totalSessions++;
        
        if (type === 'work') {
            this.stats.totalWorkTime += duration;
        }
        
        this.stats.sessionHistory.unshift({
            type: type,
            duration: duration,
            timestamp: Date.now()
        });

        // Ограничиваем историю последними 50 сессиями
        if (this.stats.sessionHistory.length > 50) {
            this.stats.sessionHistory = this.stats.sessionHistory.slice(0, 50);
        }

        this.saveStats();
        console.log(`📊 Добавлена сессия: ${type}, длительность: ${duration} сек`);
    }

    addPractice() {
        this.stats.totalPractices++;
        this.saveStats();
    }

    getStats() {
        return this.stats;
    }

    getSessionHistory() {
        return this.stats.sessionHistory;
    }

    resetStats() {
        this.stats = {
            totalSessions: 0,
            totalWorkTime: 0,
            totalPractices: 0,
            sessionHistory: []
        };
        this.saveStats();
        console.log('📊 Статистика сброшена');
    }
}

// Инициализация статистики
document.addEventListener('DOMContentLoaded', function() {
    window.statistics = new Statistics();
});