// ⏱️ ТАЙМЕР ПРАКТИК
class PracticeTimer {
    constructor() {
        this.currentPractice = null;
        this.currentStep = 0;
        this.isRunning = false;
        this.currentTime = 0;
        this.totalTime = 0;
        this.stepStartTime = 0;
        this.init();
    }

    init() {
        console.log('⏱️ Таймер практик инициализирован');
    }

    startPractice(category, practiceId) {
        if (!window.practices) {
            console.error('❌ Система практик не загружена');
            return;
        }

        this.currentPractice = practices.getPractice(category, practiceId);
        if (!this.currentPractice) {
            console.error('❌ Практика не найдена:', category, practiceId);
            return;
        }

        this.currentStep = 0;
        this.isRunning = false;
        this.totalTime = this.currentPractice.duration;
        
        this.updatePracticeDisplay();
        this.renderSteps();
        
        console.log('🧘 Начата практика:', this.currentPractice.name);
    }

    startTimer() {
        if (!this.currentPractice || this.currentStep >= this.currentPractice.steps.length) {
            console.error('❌ Нет активной практики или все шаги завершены');
            return;
        }

        this.isRunning = true;
        this.stepStartTime = Date.now();
        this.currentTime = this.currentPractice.steps[this.currentStep].duration;
        
        this.updateButtons();
        this.updateStepDisplay();

        const tick = () => {
            if (!this.isRunning) return;

            const now = Date.now();
            const delta = Math.floor((now - this.stepStartTime) / 1000);
            
            if (delta >= 1) {
                this.stepStartTime = now;
                this.currentTime -= delta;
                
                this.updateStepDisplay();
                
                if (this.currentTime <= 0) {
                    this.completeStep();
                    return;
                }
            }

            if (this.isRunning) {
                requestAnimationFrame(tick);
            }
        };

        tick();
    }

    stopTimer() {
        this.isRunning = false;
        this.updateButtons();
    }

    resetTimer() {
        this.isRunning = false;
        this.currentStep = 0;
        this.currentTime = 0;
        
        this.updatePracticeDisplay();
        this.updateButtons();
        this.renderSteps();
    }

    completeStep() {
        this.isRunning = false;
        this.currentStep++;
        
        if (this.currentStep < this.currentPractice.steps.length) {
            // Переход к следующему шагу
            setTimeout(() => {
                this.startTimer();
            }, 1000);
        } else {
            // Все шаги завершены
            this.completePractice();
        }
        
        this.renderSteps();
    }

    completePractice() {
        console.log('✅ Практика завершена:', this.currentPractice.name);
        
        if (window.statistics) {
            statistics.addPractice();
        }
        
        if (window.notificationManager) {
            notificationManager.showNotification(`Практика "${this.currentPractice.name}" завершена!`, 'success');
        }
        
        this.updateButtons();
    }

    updatePracticeDisplay() {
        document.getElementById('practiceTimeDisplay').textContent = this.formatTime(this.totalTime);
        document.getElementById('practiceCurrentStep').textContent = this.currentPractice ? this.currentPractice.name : 'Выберите практику';
    }

    updateStepDisplay() {
        if (!this.currentPractice) return;

        const currentStepData = this.currentPractice.steps[this.currentStep];
        document.getElementById('practiceTimeDisplay').textContent = this.formatTime(this.currentTime);
        document.getElementById('practiceCurrentStep').textContent = currentStepData.instruction;
        document.getElementById('practiceStepInfo').textContent = `Шаг ${this.currentStep + 1}/${this.currentPractice.steps.length}`;
        
        // Обновляем прогресс
        const progressFill = document.getElementById('practiceProgressFill');
        if (progressFill && currentStepData.duration > 0) {
            const progress = ((currentStepData.duration - this.currentTime) / currentStepData.duration) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    updateButtons() {
        const startBtn = document.getElementById('practiceStartBtn');
        const stopBtn = document.getElementById('practiceStopBtn');
        
        if (this.isRunning) {
            startBtn.style.display = 'none';
            stopBtn.style.display = 'block';
        } else {
            startBtn.style.display = 'block';
            stopBtn.style.display = 'none';
        }
    }

    renderSteps() {
        if (!this.currentPractice) return;

        const stepList = document.getElementById('practiceStepList');
        stepList.innerHTML = '';

        this.currentPractice.steps.forEach((step, index) => {
            const li = document.createElement('li');
            li.className = 'step-item';
            
            if (index < this.currentStep) {
                li.classList.add('completed');
            } else if (index === this.currentStep) {
                li.classList.add('current');
            } else if (index === this.currentStep + 1) {
                li.classList.add('next');
            } else {
                li.classList.add('pending');
            }

            li.innerHTML = `
                <span>${step.name}</span>
                <span class="step-time">${step.duration} сек</span>
            `;
            
            stepList.appendChild(li);
        });
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

// Инициализация таймера практик
document.addEventListener('DOMContentLoaded', function() {
    window.practiceTimer = new PracticeTimer();
});