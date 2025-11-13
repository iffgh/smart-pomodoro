class Statistics {
    constructor(pomodoro) {
        this.pomodoro = pomodoro;
    }
    
    updateStats() {
        document.getElementById('miniSessionsCompleted').textContent = this.pomodoro.sessionCount;
        const totalMinutes = Math.floor(this.pomodoro.totalSeconds / 60);
        const totalSecondsRemaining = this.pomodoro.totalSeconds % 60;
        document.getElementById('miniTotalTime').textContent = `${totalMinutes}:${totalSecondsRemaining.toString().padStart(2, '0')}`;
        document.getElementById('miniTechniquesUsed').textContent = this.pomodoro.techniquesUsed;
    }
    
    updateHistory() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        
        if (this.pomodoro.completedSessions.length === 0) {
            historyList.innerHTML = '<li class="history-item">Пока нет завершенных сессий</li>';
            return;
        }
        
        this.pomodoro.completedSessions.forEach(session => {
            const historyItem = document.createElement('li');
            historyItem.className = 'history-item';
            
            if (session.type === 'work') {
                historyItem.innerHTML = `
                    <div>
                        <strong>💼 Рабочая сессия ${session.duration} мин</strong>
                        <div>Завершено в ${session.time}</div>
                    </div>
                    <div class="history-time">${session.date}</div>
                `;
            } else if (session.type === 'practice') {
                historyItem.innerHTML = `
                    <div>
                        <strong>${session.practiceEmoji} ${session.practice}</strong>
                        <div>⏱️ ${session.duration} мин • ${session.time}</div>
                        <div style="font-size: 0.7rem; opacity: 0.7; margin-top: 2px;">
                            📊 Всего: ${session.totalUsageCount} раз
                        </div>
                    </div>
                    <div class="history-time">${session.date}</div>
                `;
            }
            
            historyList.appendChild(historyItem);
        });
    }
    
    toggleHistory() {
        this.pomodoro.historyExpanded = !this.pomodoro.historyExpanded;
        const historyContent = document.getElementById('historyContent');
        const historyToggle = document.querySelector('.history-toggle');
        
        if (this.pomodoro.historyExpanded) {
            historyContent.classList.add('expanded');
            historyToggle.classList.add('rotated');
        } else {
            historyContent.classList.remove('expanded');
            historyToggle.classList.remove('rotated');
        }
    }
    
    saveStatistics() {
        const stats = {
            sessionCount: this.pomodoro.sessionCount,
            totalSeconds: this.pomodoro.totalSeconds,
            techniquesUsed: this.pomodoro.techniquesUsed,
            practiceUsageCount: this.pomodoro.practiceUsageCount,
            completedSessions: this.pomodoro.completedSessions
        };
        localStorage.setItem('pomodoroStatistics', JSON.stringify(stats));
    }
    
    loadStatistics() {
        const savedStats = localStorage.getItem('pomodoroStatistics');
        if (savedStats) {
            const stats = JSON.parse(savedStats);
            this.pomodoro.sessionCount = stats.sessionCount || 0;
            this.pomodoro.totalSeconds = stats.totalSeconds || 0;
            this.pomodoro.techniquesUsed = stats.techniquesUsed || 0;
            this.pomodoro.practiceUsageCount = stats.practiceUsageCount || {};
            this.pomodoro.completedSessions = stats.completedSessions || [];
            
            this.updateStats();
            this.updateHistory();
        }
    }
}