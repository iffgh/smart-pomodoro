class Timer {
    constructor(pomodoro) {
        this.pomodoro = pomodoro;
        this.MODES = {
            WORK: 'work',
            BREAK: 'break'
        };
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
        this.updateMainButton();
        
        console.log('⏰ Таймер запущен, режим:', this.pomodoro.mode, 'время:', this.pomodoro.currentTime);
        
        const tick = () => {
            if (!this.pomodoro.isRunning) return;
            
            const now = Date.now();
            const delta = Math.floor((now - this.pomodoro.lastUpdateTime) / 1000);
            
            if (delta >= 1) {
                this.pomodoro.lastUpdateTime = now;
                this.pomodoro.currentTime -= delta;
                
                this.updateDisplay();
                
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
        console.log('⏸ Таймер остановлен');
        this.pomodoro.isRunning = false;
        this.updateMainButton();
    }
    
    resetTimer() {
        this.pauseTimer();
        this.pomodoro.mode = this.MODES.WORK;
        this.pomodoro.currentTime = this.pomodoro.workTime * 60;
        
        this.updateInterface();
        this.pomodoro.showNotification(`Таймер сброшен: работа ${this.pomodoro.workTime} мин`, '🔄');
    }
    
    completeSession() {
        this.pauseTimer();
        
        console.log('🔔 Завершение сессии, режим:', this.pomodoro.mode);
        console.log('📊 modernSettings:', window.modernSettings);
        
        if (this.pomodoro.mode === this.MODES.WORK) {
            // РАБОТА ЗАВЕРШЕНА
            if (typeof notificationManager !== 'undefined') {
                notificationManager.notifyWorkEnd();
            }
            
            this.pomodoro.addSessionToHistory();
            
            // 🔥 УЛУЧШЕННАЯ ПРОВЕРКА АВТОЗАПУСКА
            let autoStartEnabled = false;
            
            if (window.modernSettings && window.modernSettings.settings) {
                autoStartEnabled = window.modernSettings.settings.autoStartBreaks;
                console.log('🔄 Настройка autoStartBreaks:', autoStartEnabled);
            } else {
                console.log('❌ modernSettings не найден, проверяем localStorage');
                // Проверяем напрямую в localStorage
                const savedSettings = localStorage.getItem('modernPomodoroSettings');
                if (savedSettings) {
                    const settings = JSON.parse(savedSettings);
                    autoStartEnabled = settings.autoStartBreaks;
                    console.log('📁 Настройка из localStorage:', autoStartEnabled);
                }
            }
            
            console.log('🎯 Финальное значение автозапуска:', autoStartEnabled);
            
            if (autoStartEnabled) {
                // АВТОМАТИЧЕСКИ ЗАПУСКАЕМ ОТДЫХ
                console.log('🚀 ЗАПУСКАЕМ АВТООТДЫХ');
                this.startBreak(true);
            } else {
                // ПЕРЕХОДИМ В РЕЖИМ ОТДЫХА БЕЗ АВТОЗАПУСКА
                console.log('💤 Отдых без автозапуска');
                this.startBreak(false);
            }
            
        } else if (this.pomodoro.mode === this.MODES.BREAK) {
            // ОТДЫХ ЗАВЕРШЕН
            if (typeof notificationManager !== 'undefined') {
                notificationManager.notifyBreakEnd();
            }
            
            console.log('💼 Переход к работе после отдыха');
            // АВТОМАТИЧЕСКИ ПЕРЕХОДИМ К РАБОТЕ
            this.startWork();
        }
        
        this.updateDisplay();
        this.updateMainButton();
    }
    
    startBreak(autoStart = false) {
        console.log('🔄 Запуск отдыха, автозапуск:', autoStart);
        
        this.pomodoro.mode = this.MODES.BREAK;
        this.pomodoro.currentTime = this.pomodoro.breakTime;
        
        this.updateInterface();
        this.pomodoro.showNotification('Время отдыха! 🎉', '🔄');
        
        // 🔥 УЛУЧШЕННЫЙ АВТОЗАПУСК
        if (autoStart) {
            console.log('⏰ Автозапуск отдыха через 1.5 секунды');
            setTimeout(() => {
                console.log('🚀 ЗАПУСКАЕМ ТАЙМЕР ОТДЫХА');
                this.startTimer();
                this.pomodoro.showNotification('Отдых начался автоматически ⏰', '🔄');
            }, 1500);
        } else {
            console.log('💤 Отдых готов, ждем ручной запуск');
        }
    }
    
    startWork() {
        console.log('💼 Запуск работы');
        
        this.pomodoro.mode = this.MODES.WORK;
        this.pomodoro.currentTime = this.pomodoro.workTime * 60;
        
        this.updateInterface();
        this.pomodoro.showNotification('💼 Время работать! Сфокусируйтесь!', '🔔');
    }
    
    updateInterface() {
        console.log('🎨 Обновление интерфейса, режим:', this.pomodoro.mode);
        
        if (this.pomodoro.mode === this.MODES.WORK) {
            document.getElementById('sessionInfo').innerHTML = `💼 Сессия ${this.pomodoro.sessionCount + 1} • Сфокусируйтесь!`;
            document.getElementById('practiceInfo').textContent = '';
            document.getElementById('stepInstruction').textContent = 'Нажмите "Старт" для начала работы';
        } else if (this.pomodoro.mode === this.MODES.BREAK) {
            document.getElementById('sessionInfo').innerHTML = '🔄 Перерыв • Расслабьтесь!';
            document.getElementById('practiceInfo').textContent = '';
            document.getElementById('stepInstruction').textContent = 'Нажмите "Старт" для начала отдыха';
        }
        
        // Скрываем элементы практик
        const elementsToHide = ['currentStepInfo', 'practiceSteps', 'nextStepPreview'];
        elementsToHide.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'none';
        });
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.pomodoro.currentTime / 60);
        const seconds = this.pomodoro.currentTime % 60;
        document.getElementById('timerDisplay').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (this.pomodoro.mode === this.MODES.WORK) {
            document.getElementById('progress').className = 'progress-fill progress-work';
            const totalWorkTime = this.pomodoro.workTime * 60;
            document.getElementById('progress').style.width = `${((totalWorkTime - this.pomodoro.currentTime) / totalWorkTime) * 100}%`;
        } else if (this.pomodoro.mode === this.MODES.BREAK) {
            document.getElementById('progress').className = 'progress-fill progress-break';
            const totalBreakTime = this.pomodoro.breakTime;
            document.getElementById('progress').style.width = `${((totalBreakTime - this.pomodoro.currentTime) / totalBreakTime) * 100}%`;
        }
        
        document.getElementById('timerSection').className = `timer-section ${this.pomodoro.mode}-active`;
    }
    
    updateMainButton() {
        const button = document.getElementById('mainButton');
        if (button) {
            button.innerHTML = this.pomodoro.isRunning ? '<span>⏸</span> Стоп' : `<span>▶</span> Старт`;
        }
    }
    
    applySettings() {
        const workTimeInput = document.getElementById('workTime');
        const breakTimeInput = document.getElementById('breakTime');
        
        let workTime = parseInt(workTimeInput.value) || 25;
        let breakTime = parseInt(breakTimeInput.value) || 300;
        
        // ЛИМИТЫ
        workTime = Math.max(1, Math.min(120, workTime));
        breakTime = Math.max(10, Math.min(1800, breakTime));
        
        workTimeInput.value = workTime;
        breakTimeInput.value = breakTime;
        
        this.pomodoro.workTime = workTime;
        this.pomodoro.breakTime = breakTime;
        
        if (this.pomodoro.mode === this.MODES.WORK) {
            this.pomodoro.currentTime = workTime * 60;
        } else if (this.pomodoro.mode === this.MODES.BREAK) {
            this.pomodoro.currentTime = breakTime;
        }
        
        this.updateDisplay();
        this.pomodoro.showNotification(
            `Настройки: работа ${workTime} мин, отдых ${Math.floor(breakTime/60)} мин ⏰`, 
            '✅'
        );
    }
}