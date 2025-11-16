class Timer {
    constructor(pomodoro) {
        this.pomodoro = pomodoro;
    }
    
    toggleTimer() {
        if (this.pomodoro.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }
    
    startTimer() {
        if (this.pomodoro.isRunning) return;
        
        this.pomodoro.isRunning = true;
        this.pomodoro.lastUpdateTime = Date.now();
        this.pomodoro.lastStatsUpdate = Date.now();
        this.updateMainButton();
        
        const tick = () => {
            if (!this.pomodoro.isRunning) return;
            
            const now = Date.now();
            const delta = Math.floor((now - this.pomodoro.lastUpdateTime) / 1000);
            
            if (delta >= 1) {
                this.pomodoro.lastUpdateTime = now;
                this.pomodoro.currentTime -= delta;
                this.pomodoro.currentStepTime -= delta;
                
                const statsDelta = Math.floor((now - this.pomodoro.lastStatsUpdate) / 1000);
                if (statsDelta >= 1) {
                    this.pomodoro.lastStatsUpdate = now;
                    this.pomodoro.totalSeconds += 1;
                    this.pomodoro.statistics.updateStats();
                }
                
                this.updateDisplay();
                
                if (this.pomodoro.mode === 'practice' && this.pomodoro.currentPractice && this.pomodoro.currentStepTime <= 0) {
                    this.pomodoro.practices.nextStep();
                }
                
                if (this.pomodoro.currentTime <= 0) {
                    this.completeSession();
                    return;
                }
            }
            
            if (this.pomodoro.isRunning) {
                requestAnimationFrame(tick);
            }
        };
        
        tick();
    }
    
    pauseTimer() {
        this.pomodoro.isRunning = false;
        this.updateMainButton();
    }
    
    resetTimer() {
        this.pauseTimer();
        this.pomodoro.mode = 'work';
        this.pomodoro.currentTime = this.pomodoro.workTime * 60;
        this.pomodoro.currentPractice = null;
        this.pomodoro.currentStepIndex = 0;
        this.pomodoro.currentStepTime = 0;
        
        document.getElementById('sessionInfo').innerHTML = `💼 Сессия ${this.pomodoro.sessionCount + 1} • Сфокусируйтесь!`;
        document.getElementById('practiceInfo').textContent = '';
        document.getElementById('currentStepInfo').textContent = '';
        document.getElementById('stepInstruction').textContent = 'Нажмите "Старт" для начала работы';
        document.getElementById('practiceSteps').classList.remove('active');
        document.getElementById('nextStepPreview').style.display = 'none';
        
        this.updateDisplay();
        this.updateMainButton();
        this.pomodoro.showNotification(`Таймер сброшен до ${this.pomodoro.workTime} минут`, '🔄');
    }
    
    completeSession() {
        this.pauseTimer();
        
        if (this.pomodoro.mode === 'work') {
    // УВЕДОМЛЕНИЕ: Работа закончена
    if (typeof notificationManager !== 'undefined') {
        notificationManager.notifyWorkEnd();
    }
            this.pomodoro.addSessionToHistory();
            const nextPractice = this.pomodoro.practices.getNextPractice();
            this.pomodoro.startPractice(nextPractice);
        } else if (this.pomodoro.mode === 'practice') {
    // УВЕДОМЛЕНИЕ: Перерыв закончен
    if (typeof notificationManager !== 'undefined') {
        notificationManager.notifyBreakEnd();
    }
            this.pomodoro.addSessionToHistory();
            this.pomodoro.mode = 'work';
            this.pomodoro.currentTime = this.pomodoro.workTime * 60;
            this.pomodoro.currentPractice = null;
            this.pomodoro.currentStepIndex = 0;
            this.pomodoro.currentStepTime = 0;
            
            document.getElementById('practiceSteps').classList.remove('active');
            document.getElementById('stepInstruction').textContent = 'Практика завершена! Нажмите "Старт" для новой сессии';
            document.getElementById('nextStepPreview').style.display = 'none';
            document.getElementById('currentStepInfo').textContent = '';
            
            this.pomodoro.showNotification('💼 Практика завершена! Готовы к работе?', '🔔');
        }
        
        this.updateDisplay();
        this.updateMainButton();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.pomodoro.currentTime / 60);
        const seconds = this.pomodoro.currentTime % 60;
        document.getElementById('timerDisplay').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (this.pomodoro.mode === 'work') {
    // УВЕДОМЛЕНИЕ: Работа закончена
    if (typeof notificationManager !== 'undefined') {
        notificationManager.notifyWorkEnd();
    }
            document.getElementById('sessionInfo').innerHTML = `💼 Сессия ${this.pomodoro.sessionCount + 1} • Сфокусируйтесь!`;
            document.getElementById('practiceInfo').textContent = '';
            document.getElementById('progress').className = 'progress-fill progress-work';
            const totalWorkTime = this.pomodoro.workTime * 60;
            document.getElementById('progress').style.width = `${((totalWorkTime - this.pomodoro.currentTime) / totalWorkTime) * 100}%`;
        } else if (this.pomodoro.mode === 'practice') {
    // УВЕДОМЛЕНИЕ: Перерыв закончен
    if (typeof notificationManager !== 'undefined') {
        notificationManager.notifyBreakEnd();
    }
            document.getElementById('sessionInfo').innerHTML = '🌿 Практика восстановления';
            document.getElementById('progress').className = 'progress-fill progress-practice';
            document.getElementById('progress').style.width = `${((this.pomodoro.currentPractice.duration - this.pomodoro.currentTime) / this.pomodoro.currentPractice.duration) * 100}%`;
            
            this.pomodoro.practices.updateCurrentStepInfo();
        }
        
        document.getElementById('timerSection').className = `timer-section ${this.pomodoro.mode}-active`;
    }
    
    updateMainButton() {
        const button = document.getElementById('mainButton');
        button.innerHTML = this.pomodoro.isRunning ? '<span>⏸</span> Стоп' : `<span>▶</span> Старт`;
    }
}
