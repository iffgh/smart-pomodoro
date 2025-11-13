class UnifiedPomodoro {
    constructor() {
        this.mode = 'work';
        this.isRunning = false;
        this.sessionCount = 0;
        this.totalSeconds = 0;
        this.techniquesUsed = 0;
        this.workTime = 25;
        this.breakTime = 30;
        this.currentTime = this.workTime * 60;
        this.currentPractice = null;
        this.currentStepIndex = 0;
        this.currentStepTime = 0;
        this.practiceQueue = [];
        this.lastUpdateTime = null;
        this.lastStatsUpdate = null;
        this.completedSessions = [];
        this.currentCategory = 'breathing';
        this.historyExpanded = false;
        this.practiceUsageCount = {};
        this.currentSessionPractices = [];
        
        // Создаем экземпляры модулей
        this.timer = new Timer(this);
        this.practices = new Practices(this);
        this.statistics = new Statistics(this);
        this.achievements = new Achievements(this);
        this.custom = new Custom(this);
        
        this.init();
    }

    initializePracticeCounters() {
        for (const category in this.practices.techniques) {
            for (const practice of this.practices.techniques[category]) {
                this.practiceUsageCount[practice.id] = 0;
            }
        }
    }
    
    init() {
        this.initializePracticeCounters();
        this.practices.renderTechniques();
        this.timer.updateDisplay();
        this.statistics.updateStats();
        this.timer.updateMainButton();
        this.statistics.updateHistory();
        this.practices.shufflePracticeQueue();
        
        // Загрузка сохраненных данных
        this.custom.loadSettings();
        this.statistics.loadStatistics();
    }
    
    applySettings() {
        const workTimeInput = document.getElementById('workTime');
        const breakTimeInput = document.getElementById('breakTime');
        
        let workTime = parseInt(workTimeInput.value) || 25;
        let breakTime = parseInt(breakTimeInput.value) || 30;
        
        // Ограничения
        workTime = Math.min(Math.max(workTime, 1), 120);
        breakTime = Math.min(Math.max(breakTime, 1), 600);
        
        workTimeInput.value = workTime;
        breakTimeInput.value = breakTime;
        
        this.workTime = workTime;
        this.breakTime = breakTime;
        
        if (this.mode === 'work') {
            this.currentTime = this.workTime * 60;
        }
        
        this.timer.updateDisplay();
        this.showNotification('Настройки применены!', '💾');
        this.custom.saveSettings();
    }
    
    addSessionToHistory() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString('ru-RU');
        
        if (this.mode === 'work') {
            this.completedSessions.unshift({
                id: Date.now(),
                time: timeString,
                date: dateString,
                duration: this.workTime,
                type: 'work',
                practice: null
            });
            this.sessionCount++;
            this.currentSessionPractices = [];
            
            // Проверка достижений
            this.achievements.checkAchievements();
        } else if (this.mode === 'practice' && this.currentPractice) {
            // Каждая практика считается за 1 сессию
            this.sessionCount++;
            this.techniquesUsed++;
            
            this.practiceUsageCount[this.currentPractice.id]++;
            this.currentSessionPractices.push(this.currentPractice.id);
            
            const practiceInSessionCount = this.currentSessionPractices.filter(id => id === this.currentPractice.id).length;
            
            this.completedSessions.unshift({
                id: Date.now(),
                time: timeString,
                date: dateString,
                duration: Math.floor(this.currentPractice.duration / 60),
                type: 'practice',
                practice: this.currentPractice.name,
                practiceEmoji: this.currentPractice.emoji,
                practiceId: this.currentPractice.id,
                totalUsageCount: this.practiceUsageCount[this.currentPractice.id],
                sessionUsageCount: practiceInSessionCount
            });
            
            // Проверка достижений
            this.achievements.checkAchievements();
        }
        
        if (this.completedSessions.length > 10) {
            this.completedSessions = this.completedSessions.slice(0, 10);
        }
        
        this.statistics.updateHistory();
        this.statistics.updateStats();
        this.statistics.saveStatistics();
    }
    
    toggleTimer() {
        this.timer.toggleTimer();
    }
    
    resetTimer() {
        this.timer.resetTimer();
    }
    
    startPractice(practice) {
        this.practices.startPractice(practice);
    }
    
    selectPractice(techId) {
        this.practices.selectPractice(techId);
    }
    
    showCategory(category) {
        this.practices.showCategory(category);
    }
    
    toggleHistory() {
        this.statistics.toggleHistory();
    }
    
    showNotification(text, icon) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        const notificationIcon = document.getElementById('notificationIcon');
        
        notificationText.textContent = text;
        notificationIcon.textContent = icon;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Создаем глобальный экземпляр для доступа из HTML
const pomodoro = new UnifiedPomodoro();