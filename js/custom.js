class Custom {
    constructor(pomodoro) {
        this.pomodoro = pomodoro;
    }
    
    saveSettings() {
        const settings = {
            workTime: this.pomodoro.workTime,
            breakTime: this.pomodoro.breakTime
        };
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    }
    
    loadSettings() {
        const savedSettings = localStorage.getItem('pomodoroSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.pomodoro.workTime = settings.workTime || 25;
            this.pomodoro.breakTime = settings.breakTime || 30;
            
            document.getElementById('workTime').value = this.pomodoro.workTime;
            document.getElementById('breakTime').value = this.pomodoro.breakTime;
            
            if (this.pomodoro.mode === 'work') {
                this.pomodoro.currentTime = this.pomodoro.workTime * 60;
            }
            
            this.pomodoro.timer.updateDisplay();
        }
    }
}
