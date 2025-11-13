class Achievements {
    constructor(pomodoro) {
        this.pomodoro = pomodoro;
        this.achievements = [
            { id: 'first_session', name: 'Первая сессия', description: 'Завершите первую рабочую сессию', icon: '🎯', unlocked: false },
            { id: 'practice_master', name: 'Мастер практик', description: 'Используйте 5 различных практик', icon: '🌿', unlocked: false, progress: 0, target: 5 },
            { id: 'time_tracker', name: 'Трекер времени', description: 'Накопите 60 минут работы', icon: '⏱️', unlocked: false, progress: 0, target: 3600 },
            { id: 'breathing_guru', name: 'Гуру дыхания', description: 'Выполните 10 дыхательных практик', icon: '🌬️', unlocked: false, progress: 0, target: 10 },
            { id: 'streak_3', name: 'Серия из 3', description: 'Завершите 3 сессии подряд', icon: '🔥', unlocked: false, progress: 0, target: 3 }
        ];
        
        this.loadAchievements();
    }
    
    checkAchievements() {
        let unlockedNew = false;
        
        if (this.pomodoro.sessionCount >= 1 && !this.achievements[0].unlocked) {
            this.unlockAchievement(0);
            unlockedNew = true;
        }
        
        const uniquePractices = new Set(Object.values(this.pomodoro.practiceUsageCount).filter(count => count > 0)).size;
        this.achievements[1].progress = uniquePractices;
        if (uniquePractices >= 5 && !this.achievements[1].unlocked) {
            this.unlockAchievement(1);
            unlockedNew = true;
        }
        
        this.achievements[2].progress = this.pomodoro.totalSeconds;
        if (this.pomodoro.totalSeconds >= 3600 && !this.achievements[2].unlocked) {
            this.unlockAchievement(2);
            unlockedNew = true;
        }
        
        const breathingPractices = (this.pomodoro.practiceUsageCount['breathing-478'] || 0) + 
                                 (this.pomodoro.practiceUsageCount['box-breathing'] || 0) + 
                                 (this.pomodoro.practiceUsageCount['alternate-nostril'] || 0);
        this.achievements[3].progress = breathingPractices;
        if (breathingPractices >= 10 && !this.achievements[3].unlocked) {
            this.unlockAchievement(3);
            unlockedNew = true;
        }
        
        if (this.pomodoro.sessionCount >= 3 && !this.achievements[4].unlocked) {
            this.achievements[4].progress = Math.min(this.pomodoro.sessionCount, 3);
            if (this.pomodoro.sessionCount >= 3) {
                this.unlockAchievement(4);
                unlockedNew = true;
            }
        }
        
        if (unlockedNew) {
            this.saveAchievements();
        }
    }
    
    unlockAchievement(index) {
        this.achievements[index].unlocked = true;
        this.pomodoro.showNotification(`🏆 Достижение разблокировано: ${this.achievements[index].name}`, this.achievements[index].icon);
    }
    
    saveAchievements() {
        localStorage.setItem('pomodoroAchievements', JSON.stringify(this.achievements));
    }
    
    loadAchievements() {
        const savedAchievements = localStorage.getItem('pomodoroAchievements');
        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
        }
    }
}