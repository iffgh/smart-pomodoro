// 🍅 ПОЛНОСТЬЮ РАБОЧИЙ POMODORO ТАЙМЕР
class UnifiedPomodoro {
    constructor() {
        this.workTime = 25; // минуты
        this.breakTime = 300; // секунды
        this.currentTime = this.workTime * 60;
        this.isRunning = false;
        this.mode = 'work';
        this.sessionCount = 0;
        this.intervalId = null;
        this.sessionHistory = [];
        
        this.init();
    }

    init() {
        console.log('🍅 Pomodoro инициализирован');
        this.loadSettings();
        this.setupEventListeners();
        this.updateDisplay();
        this.updateInterface();
        this.addToHistory('Система готова к работе');
    }

    setupEventListeners() {
        // Основные кнопки таймера
        this.addEventListener('mainTimerButton', 'click', () => this.toggleTimer());
        this.addEventListener('resetTimerButton', 'click', () => this.resetTimer());

        // Кнопки настроек времени
        this.addEventListener('applyTimeSettings', 'click', () => this.applyTimeSettings());
        this.addEventListener('resetTimeSettings', 'click', () => this.resetTimeSettings());

        // Переключение панели настроек
        this.addEventListener('settingsToggle', 'click', () => this.toggleSettingsPanel());

        // Авто-применение при изменении значений
        this.addEventListener('workTime', 'change', () => this.applyTimeSettings());
        this.addEventListener('breakTime', 'change', () => this.applyTimeSettings());

        console.log('✅ Обработчики событий установлены');
    }

    addEventListener(elementId, event, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener(event, handler);
        } else {
            console.log('❌ Элемент не найден:', elementId);
        }
    }

    toggleSettingsPanel() {
        const settingsPanel = document.getElementById('timeSettingsPanel');
        const toggleButton = document.getElementById('settingsToggle');
        
        if (settingsPanel && toggleButton) {
            settingsPanel.classList.toggle('active');
            
            if (settingsPanel.classList.contains('active')) {
                toggleButton.innerHTML = '<span class="btn-icon">▼</span><span class="btn-text">Скрыть</span>';
            } else {
                toggleButton.innerHTML = '<span class="btn-icon">⚙️</span><span class="btn-text">Настройки</span>';
            }
            
            console.log('⚙️ Панель настроек:', settingsPanel.classList.contains('active') ? 'открыта' : 'закрыта');
        }
    }

    loadSettings() {
        try {
            const savedWorkTime = localStorage.getItem('pomodoroWorkTime');
            const savedBreakTime = localStorage.getItem('pomodoroBreakTime');
            
            if (savedWorkTime) {
                this.workTime = parseInt(savedWorkTime);
                const workInput = document.getElementById('workTime');
                if (workInput) workInput.value = this.workTime;
            }
            if (savedBreakTime) {
                this.breakTime = parseInt(savedBreakTime);
                const breakInput = document.getElementById('breakTime');
                if (breakInput) breakInput.value = this.breakTime;
            }
            
            this.currentTime = this.mode === 'work' ? this.workTime * 60 : this.breakTime;
            this.updateDisplay();
            
            console.log('⚙️ Настройки загружены');
        } catch (error) {
            console.error('❌ Ошибка загрузки настроек:', error);
        }
    }

    saveSettings() {
        localStorage.setItem('pomodoroWorkTime', this.workTime);
        localStorage.setItem('pomodoroBreakTime', this.breakTime);
    }

    toggleTimer() {
        console.log('🔄 Toggle timer:', this.isRunning ? 'STOP' : 'START');
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        if (this.isRunning) {
            console.log('⚠️ Таймер уже запущен');
            return;
        }
        
        this.isRunning = true;
        this.updateMainButton();
        
        const action = this.mode === 'work' ? 'Начало работы' : 'Начало отдыха';
        this.addToHistory(action);
        
        console.log('⏰ Таймер запущен, режим:', this.mode);
        
        // Добавляем пульсацию
        const timerSection = document.getElementById('timerSection');
        if (timerSection) {
            timerSection.classList.add('timer-active');
        }
        
        // Запускаем звук тиканья
        if (window.notificationManager) {
            notificationManager.startTick();
        }
        
        // Очищаем предыдущий интервал
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            this.currentTime--;
            this.updateDisplay();
            
            if (this.currentTime <= 0) {
                this.completeSession();
            }
        }, 1000);
    }
    
    pauseTimer() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.updateMainButton();
        
        // Убираем пульсацию
        const timerSection = document.getElementById('timerSection');
        if (timerSection) {
            timerSection.classList.remove('timer-active');
        }
        
        this.addToHistory('Таймер остановлен');
        console.log('⏸ Таймер остановлен');
        
        if (window.notificationManager) {
            notificationManager.stopTick();
        }
    }
    
    resetTimer() {
        console.log('🔄 Сброс таймера');
        this.pauseTimer();
        this.mode = 'work';
        this.currentTime = this.workTime * 60;
        this.updateInterface();
        this.updateDisplay();
        
        this.addToHistory('Таймер сброшен');
        this.showNotification('Таймер сброшен', '🔄');
    }

    completeSession() {
        console.log('🔔 Сессия завершена:', this.mode);
        this.pauseTimer();
        
        // Анимация перехода
        this.animateModeTransition();
        
        setTimeout(() => {
            if (this.mode === 'work') {
                // Работа завершена
                this.sessionCount++;
                this.addToHistory(`Сессия ${this.sessionCount} завершена`);
                
                if (window.notificationManager) {
                    notificationManager.notifyWorkEnd();
                }
                
                // Переходим к отдыху
                this.mode = 'break';
                this.currentTime = this.breakTime;
                this.updateInterface();
                this.updateDisplay();
                
                this.showNotification('Время отдыха! 🎉', '🔄');
                
                // Автозапуск отдыха
                setTimeout(() => {
                    this.startTimer();
                    this.showNotification('Отдых начался автоматически', '⏰');
                }, 1500);
                
            } else {
                // Отдых завершен
                this.addToHistory('Отдых завершен');
                
                if (window.notificationManager) {
                    notificationManager.notifyBreakEnd();
                }
                
                // Возвращаемся к работе
                this.mode = 'work';
                this.currentTime = this.workTime * 60;
                this.updateInterface();
                this.updateDisplay();
                
                this.showNotification('Время работать! 💼', '🔔');
                
                // Автозапуск работы
                setTimeout(() => {
                    this.startTimer();
                    this.showNotification('Работа началась автоматически', '⏰');
                }, 1500);
            }
        }, 300);
    }

    animateModeTransition() {
        const timerSection = document.getElementById('timerSection');
        const timerDisplay = document.getElementById('timerDisplay');
        
        if (timerSection && timerDisplay) {
            timerSection.classList.add('mode-changing');
            timerDisplay.style.transform = 'scale(1.1)';
            timerDisplay.style.opacity = '0.8';
            
            setTimeout(() => {
                timerSection.classList.remove('mode-changing');
                timerDisplay.style.transform = 'scale(1)';
                timerDisplay.style.opacity = '1';
            }, 600);
        }
    }

    updateInterface() {
        const sessionInfo = document.getElementById('sessionInfo');
        const stepInstruction = document.getElementById('stepInstruction');
        const timerSection = document.getElementById('timerSection');
        const timerMode = document.getElementById('timerMode');
        
        if (sessionInfo) {
            if (this.mode === 'work') {
                sessionInfo.innerHTML = `💼 Сессия ${this.sessionCount + 1} • Сфокусируйтесь!`;
            } else {
                sessionInfo.innerHTML = '🔄 Перерыв • Расслабьтесь!';
            }
        }
        
        if (timerMode) {
            timerMode.textContent = this.mode === 'work' ? 'Работа' : 'Отдых';
            timerMode.style.color = this.mode === 'work' ? '#e74c3c' : '#3498db';
        }
        
        if (stepInstruction) {
            stepInstruction.textContent = this.isRunning ? 
                (this.mode === 'work' ? 'Работа в процессе...' : 'Отдых в процессе...') :
                (this.mode === 'work' ? 'Нажмите "Старт" для начала работы' : 'Нажмите "Старт" для начала отдыха');
        }
        
        if (timerSection) {
            timerSection.className = `timer-section ${this.mode}-active`;
        }
    }
    
    updateDisplay() {
        const timerDisplay = document.getElementById('timerDisplay');
        const progressCircle = document.querySelector('.progress-ring-circle');
        
        if (timerDisplay) {
            const minutes = Math.floor(this.currentTime / 60);
            const seconds = this.currentTime % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (progressCircle) {
            this.updateCircularProgress(progressCircle);
        }
    }

 updateCircularProgress(progressCircle) {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    
    // Устанавливаем stroke-dasharray один раз при инициализации
    if (!progressCircle.getAttribute('data-initialized')) {
        progressCircle.setAttribute('stroke-dasharray', circumference);
        progressCircle.setAttribute('stroke-dashoffset', circumference);
        progressCircle.setAttribute('data-initialized', 'true');
    }
    
    const totalTime = this.mode === 'work' ? this.workTime * 60 : this.breakTime;
    const progress = (totalTime - this.currentTime) / totalTime;
    const offset = circumference - (progress * circumference);
    
    // Плавно анимируем изменение offset
    progressCircle.style.transition = 'stroke-dashoffset 0.5s ease';
    progressCircle.style.strokeDashoffset = offset;
    
    // Обновляем цвет
    progressCircle.setAttribute('class', 
        `progress-ring-circle ${this.mode === 'work' ? 'progress-work' : 'progress-break'}`);
}
    
    updateMainButton() {
        const button = document.getElementById('mainTimerButton');
        if (!button) return;
        
        if (this.isRunning) {
            button.innerHTML = '<span class="btn-icon">⏸️</span><span class="btn-text">Стоп</span>';
            button.classList.add('active');
        } else {
            button.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Старт</span>';
            button.classList.remove('active');
        }
    }

    applyTimeSettings() {
        console.log('⚙️ Применение настроек времени');
        
        const workInput = document.getElementById('workTime');
        const breakInput = document.getElementById('breakTime');
        
        if (!workInput || !breakInput) return;
        
        let workTime = parseInt(workInput.value) || 25;
        let breakTime = parseInt(breakInput.value) || 300;
        
        // Валидация
        workTime = Math.max(1, Math.min(120, workTime));
        breakTime = Math.max(10, Math.min(600, breakTime));
        
        workInput.value = workTime;
        breakInput.value = breakTime;
        
        this.workTime = workTime;
        this.breakTime = breakTime;
        
        // Обновляем текущее время если таймер не запущен
        if (!this.isRunning) {
            this.currentTime = this.mode === 'work' ? workTime * 60 : breakTime;
            this.updateDisplay();
        }
        
        this.saveSettings();
        this.addToHistory(`Настройки: работа ${workTime} мин, отдых ${breakTime} сек`);
        this.showNotification(`Настройки применены!`, '✅');
        
        console.log('⚙️ Настройки обновлены:', { workTime, breakTime });
    }

    resetTimeSettings() {
        console.log('🔄 Сброс настроек к значениям по умолчанию');
        
        this.workTime = 25;
        this.breakTime = 300;
        
        const workInput = document.getElementById('workTime');
        const breakInput = document.getElementById('breakTime');
        
        if (workInput) workInput.value = this.workTime;
        if (breakInput) breakInput.value = this.breakTime;
        
        this.applyTimeSettings();
        this.resetTimer();
    }

    addToHistory(action) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        this.sessionHistory.unshift({
            action: action,
            time: timeString,
            mode: this.mode
        });
        
        // Держим только последние 3 записи
        if (this.sessionHistory.length > 3) {
            this.sessionHistory = this.sessionHistory.slice(0, 3);
        }
    }

    showNotification(message, icon = '🔔') {
        console.log(`${icon} ${message}`);
        if (window.notificationManager) {
            notificationManager.showNotification(message, 'info');
        }
    }
}

// Запуск при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация Pomodoro системы...');
    window.pomodoro = new UnifiedPomodoro();
    console.log('✅ Pomodoro система запущена!');
});