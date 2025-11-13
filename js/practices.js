class Practices {
    constructor(pomodoro) {
        this.pomodoro = pomodoro;
        
        this.categoryDescriptions = {
            'breathing': '<strong>🌬️ Дыхательные практики:</strong> Техники управления дыханием для снятия стресса, улучшения концентрации и восстановления энергетического баланса.',
            'physical': '<strong>💪 Физические практики:</strong> Упражнения для снятия мышечного напряжения, улучшения осанки и циркуляции крови.',
            'vision': '<strong>👀 Практики для зрения:</strong> Техники расслабления глазных мышц и профилактики цифрового перенапряжения.',
            'cognitive': '<strong>🧠 Когнитивные практики:</strong> Методы для перезагрузки ума, развития осознанности и улучшения ментального состояния.',
            'energy': '<strong>⚡ Энергетические практики:</strong> Быстрые техники для восстановления энергии, повышения бодрости и мотивации.'
        };
        
        this.techniques = {
            'breathing': [
                {id: 'breathing-478',name: 'Дыхание 4-7-8',emoji: '🌬️',duration: 110,description: 'Метод релаксации для быстрого успокоения нервной системы',
                 steps: [
                    {name: 'Подготовка',duration: 15,instruction: 'Сядьте удобно с прямой спиной, закройте глаза'},
                    {name: 'Цикл 1',duration: 25,instruction: 'Вдох через нос на 4 счета, задержка 7 счетов, выдох через рот на 8 счетов'},
                    {name: 'Отдых',duration: 10,instruction: 'Расслабьтесь и почувствуйте спокойствие'},
                    {name: 'Цикл 2',duration: 25,instruction: 'Повторите дыхательный цикл 4-7-8'},
                    {name: 'Отдых',duration: 10,instruction: 'Наслаждайтесь состоянием покоя'},
                    {name: 'Цикл 3',duration: 25,instruction: 'Завершающий цикл дыхания 4-7-8'}
                 ]},
                {id: 'box-breathing',name: 'Боксовое дыхание',emoji: '🔲',duration: 80,description: 'Техника спецназа для мгновенной фокусировки',
                 steps: [
                    {name: 'Настройка',duration: 10,instruction: 'Закройте глаза и расслабьтесь'},
                    {name: 'Цикл 1',duration: 20,instruction: 'Вдох на 4 счета, задержка на 4 счета, выдох на 4 счета, пауза на 4 счета'},
                    {name: 'Отдых',duration: 5,instruction: 'Отдохните и почувствуйте ясность'},
                    {name: 'Цикл 2',duration: 20,instruction: 'Повторите цикл боксового дыхания'},
                    {name: 'Отдых',duration: 5,instruction: 'Наслаждайтесь состоянием баланса'},
                    {name: 'Цикл 3',duration: 20,instruction: 'Завершающий цикл дыхания'}
                 ]},
                {id: 'alternate-nostril',name: 'Попеременное дыхание',emoji: '👃',duration: 90,description: 'Балансировка правого и левого полушарий мозга',
                 steps: [
                    {name: 'Подготовка',duration: 15,instruction: 'Сядьте прямо, закройте правую ноздрю большим пальцем'},
                    {name: 'Цикл 1',duration: 20,instruction: 'Вдох через левую ноздрю, закройте ее, выдох через правую'},
                    {name: 'Цикл 2',duration: 20,instruction: 'Вдох через правую ноздрю, закройте ее, выдох через левую'},
                    {name: 'Повтор',duration: 20,instruction: 'Повторите цикл 5-7 раз'},
                    {name: 'Завершение',duration: 15,instruction: 'Дышите нормально, почувствуйте баланс'}
                 ]}
            ],
            'physical': [
                {id: 'desk-stretch',name: 'Стретчинг за столом',emoji: '💆',duration: 80,description: 'Быстрая разминка для снятия мышечного напряжения',
                 steps: [
                    {name: 'Шея и плечи',duration: 25,instruction: 'Медленные повороты головы и вращения плечами'},
                    {name: 'Отдых',duration: 5,instruction: 'Почувствуйте расслабление'},
                    {name: 'Спина и руки',duration: 25,instruction: 'Скручивания спины и вытягивание рук вверх'},
                    {name: 'Отдых',duration: 5,instruction: 'Наслаждайтесь легкостью'},
                    {name: 'Кисти и ноги',duration: 20,instruction: 'Сжатие-разжатие кистей и выпрямление ног'}
                 ]},
                {id: 'posture-correction',name: 'Коррекция осанки',emoji: '🚶',duration: 75,description: 'Упражнения для улучшения позы и снятия напряжения',
                 steps: [
                    {name: 'Расправление плеч',duration: 20,instruction: 'Отведите плечи назад и вниз, сведите лопатки'},
                    {name: 'Вытяжение позвоночника',duration: 25,instruction: 'Тянитесь макушкой вверх, представляя рост'},
                    {name: 'Расслабление',duration: 15,instruction: 'Мягко покачайтесь из стороны в сторону'},
                    {name: 'Закрепление',duration: 15,instruction: 'Зафиксируйте правильную осанку'}
                 ]},
                {id: 'wrist-relief',name: 'Расслабление кистей',emoji: '🤲',duration: 60,description: 'Профилактика туннельного синдрома запястий',
                 steps: [
                    {name: 'Разминка',duration: 15,instruction: 'Сожмите и разожмите кулаки 10 раз'},
                    {name: 'Вращения',duration: 20,instruction: 'Медленно вращайте кистями по кругу'},
                    {name: 'Растяжка',duration: 15,instruction: 'Аккуратно потяните пальцы другой рукой'},
                    {name: 'Встряхивание',duration: 10,instruction: 'Легко встряхните кисти рук'}
                 ]}
            ],
            'vision': [
                {id: 'eye-health',name: 'Правило 20-20-20',emoji: '👁️',duration: 50,description: 'Профилактика цифрового перенапряжения глаз',
                 steps: [
                    {name: 'Отвлечение',duration: 20,instruction: 'Смотрите на объект в 6 метрах от вас'},
                    {name: 'Вращения',duration: 15,instruction: 'Медленно вращайте глазами по часовой и против часовой стрелки'},
                    {name: 'Фокусировка',duration: 15,instruction: 'Фокусируйтесь на близком объекте, затем на далеком'}
                 ]},
                {id: 'palming',name: 'Пальминг для глаз',emoji: '👐',duration: 70,description: 'Техника глубокого расслабления глазных мышц',
                 steps: [
                    {name: 'Подготовка',duration: 15,instruction: 'Разотрите ладони до появления тепла'},
                    {name: 'Накрыение',duration: 30,instruction: 'Накройте глаза ладонями без давления'},
                    {name: 'Расслабление',duration: 20,instruction: 'Представьте черный цвет и глубоко дышите'},
                    {name: 'Возвращение',duration: 5,instruction: 'Медленно откройте глаза'}
                 ]},
                {id: 'eye-yoga',name: 'Йога для глаз',emoji: '🧘‍♂️',duration: 85,description: 'Комплекс упражнений для укрепления глазных мышц',
                 steps: [
                    {name: 'Вверх-вниз',duration: 15,instruction: 'Медленно двигайте глазами вверх и вниз'},
                    {name: 'Влево-вправо',duration: 15,instruction: 'Двигайте глазами влево и вправо'},
                    {name: 'Диагонали',duration: 20,instruction: 'Двигайте глазами по диагоналям'},
                    {name: 'Круги',duration: 20,instruction: 'Вращайте глазами по кругу'},
                    {name: 'Расслабление',duration: 15,instruction: 'Закройте глаза и глубоко дышите'}
                 ]}
            ],
            'cognitive': [
                {id: 'mindfulness',name: 'Мини-медитация',emoji: '🧘',duration: 80,description: 'Краткая практика осознанности для перезагрузки ума',
                 steps: [
                    {name: 'Настройка',duration: 15,instruction: 'Сядьте удобно, закройте глаза, дышите естественно'},
                    {name: 'Осознание тела',duration: 25,instruction: 'Просканируйте тело от макушки до пяток'},
                    {name: 'Наблюдение за дыханием',duration: 25,instruction: 'Просто наблюдайте за вдохами и выдохами'},
                    {name: 'Возвращение',duration: 15,instruction: 'Медленно верните внимание в комнату'}
                 ]},
                {id: 'gratitude-practice',name: 'Практика благодарности',emoji: '🙏',duration: 75,description: 'Фокусировка на позитивных аспектах жизни',
                 steps: [
                    {name: 'Настройка',duration: 15,instruction: 'Закройте глаза и расслабьтесь'},
                    {name: 'Вспоминание',duration: 25,instruction: 'Вспомните 3 вещи, за которые вы благодарны сегодня'},
                    {name: 'Чувствование',duration: 25,instruction: 'Почувствуйте благодарность в сердце'},
                    {name: 'Возвращение',duration: 10,instruction: 'Медленно откройте глаза с улыбкой'}
                 ]},
                {id: 'mental-reset',name: 'Ментальный сброс',emoji: '🔄',duration: 65,description: 'Быстрая техника очистки мыслей и перефокусировки',
                 steps: [
                    {name: 'Осознание',duration: 15,instruction: 'Осознайте текущие мысли без оценки'},
                    {name: 'Визуализация',duration: 25,instruction: 'Представьте, как мысли уходят как облака'},
                    {name: 'Фокусировка',duration: 20,instruction: 'Сфокусируйтесь на дыхании или телесных ощущениях'},
                    {name: 'Намерение',duration: 5,instruction: 'Сформулируйте намерение для следующей задачи'}
                 ]}
            ],
            'energy': [
                {id: 'power-breathing',name: 'Энергетическое дыхание',emoji: '⚡',duration: 60,description: 'Быстрая техника для повышения энергии и бодрости',
                 steps: [
                    {name: 'Подготовка',duration: 10,instruction: 'Сядьте прямо, сделайте глубокий вдох'},
                    {name: 'Активация',duration: 25,instruction: 'Быстрые короткие вдохи и выдохи через нос'},
                    {name: 'Пауза',duration: 10,instruction: 'Задержите дыхание на 5-10 секунд'},
                    {name: 'Выдох',duration: 15,instruction: 'Медленный полный выдох через рот'}
                 ]},
                {id: 'tapping',name: 'Техника таппинга',emoji: '👆',duration: 70,description: 'Стимуляция энергетических точек для повышения тонуса',
                 steps: [
                    {name: 'Начало',duration: 15,instruction: 'Легко постучите по точке между бровями'},
                    {name: 'Линия',duration: 25,instruction: 'Перейдите к точкам под глазами, над губами'},
                    {name: 'Тело',duration: 20,instruction: 'Постучите по ключицам и под мышками'},
                    {name: 'Завершение',duration: 10,instruction: 'Сделайте глубокий вдох и выдох'}
                 ]},
                {id: 'quick-stretch',name: 'Экспресс-растяжка',emoji: '🦵',duration: 55,description: 'Мгновенное пробуждение тела и снятие застойных явлений',
                 steps: [
                    {name: 'Верх тела',duration: 20,instruction: 'Потянитесь руками вверх и в стороны'},
                    {name: 'Спина',duration: 15,instruction: 'Наклонитесь вперед, расслабляя спину'},
                    {name: 'Ноги',duration: 15,instruction: 'Поднимите колени, походите на месте'},
                    {name: 'Завершение',duration: 5,instruction: 'Встряхните все тело'}
                 ]}
            ]
        };
    }
    
    shufflePracticeQueue() {
        this.pomodoro.practiceQueue = [];
        for (const category in this.techniques) {
            this.pomodoro.practiceQueue.push(...this.techniques[category]);
        }
        this.pomodoro.practiceQueue.sort(() => Math.random() - 0.5);
    }
    
    getNextPractice() {
        if (this.pomodoro.practiceQueue.length === 0) {
            this.shufflePracticeQueue();
        }
        return this.pomodoro.practiceQueue.shift();
    }
    
    startPractice(practice) {
        this.pomodoro.currentPractice = practice;
        this.pomodoro.mode = 'practice';
        this.pomodoro.currentTime = practice.duration;
        this.pomodoro.currentStepIndex = 0;
        this.pomodoro.currentStepTime = practice.steps[0].duration;
        
        document.getElementById('practiceInfo').innerHTML = `${practice.emoji} ${practice.name}`;
        
        this.pomodoro.timer.updateDisplay();
        this.pomodoro.timer.updateMainButton();
        this.showPracticeSteps();
        this.updateCurrentStepInfo();
        this.pomodoro.showNotification(`🌿 Начата практика: ${practice.name}`, practice.emoji);
    }
    
    selectPractice(techId) {
        for (const category in this.techniques) {
            for (const practice of this.techniques[category]) {
                if (practice.id === techId) {
                    this.pomodoro.timer.pauseTimer();
                    this.pomodoro.currentPractice = practice;
                    this.pomodoro.mode = 'practice';
                    this.pomodoro.currentTime = practice.duration;
                    this.pomodoro.currentStepIndex = 0;
                    this.pomodoro.currentStepTime = practice.steps[0].duration;
                    
                    this.pomodoro.timer.updateDisplay();
                    this.pomodoro.timer.updateMainButton();
                    this.showPracticeSteps();
                    this.updateCurrentStepInfo();
                    
                    this.pomodoro.showNotification(`🌿 Выбрана практика: ${practice.name}`, practice.emoji);
                    document.getElementById('practiceInfo').innerHTML = `${practice.emoji} ${practice.name}`;
                    return;
                }
            }
        }
    }
    
    showPracticeSteps() {
        if (!this.pomodoro.currentPractice) return;
        
        const stepList = document.getElementById('stepList');
        stepList.innerHTML = '';
        
        this.pomodoro.currentPractice.steps.forEach((step, index) => {
            const stepItem = document.createElement('li');
            stepItem.className = 'step-item pending';
            stepItem.innerHTML = `
                <div>
                    <strong>${step.name}</strong>
                    <div>${step.instruction}</div>
                </div>
                <div class="step-time">⏱️ ${step.duration} сек</div>
            `;
            stepList.appendChild(stepItem);
        });
        
        document.getElementById('practiceSteps').classList.add('active');
        this.updateCurrentStep();
    }
    
    nextStep() {
        if (!this.pomodoro.currentPractice || this.pomodoro.currentStepIndex >= this.pomodoro.currentPractice.steps.length - 1) {
            return;
        }
        
        this.pomodoro.currentStepIndex++;
        this.pomodoro.currentStepTime = this.pomodoro.currentPractice.steps[this.pomodoro.currentStepIndex].duration;
        this.updateCurrentStep();
        this.updateCurrentStepInfo();
    }
    
    updateCurrentStep() {
        if (!this.pomodoro.currentPractice || this.pomodoro.currentStepIndex >= this.pomodoro.currentPractice.steps.length) return;
        
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach((item, index) => {
            item.className = 'step-item ';
            if (index < this.pomodoro.currentStepIndex) {
                item.classList.add('completed');
            } else if (index === this.pomodoro.currentStepIndex) {
                item.classList.add('current');
            } else if (index === this.pomodoro.currentStepIndex + 1) {
                item.classList.add('next');
            } else {
                item.classList.add('pending');
            }
        });
        
        this.showNextStepPreview();
    }
    
    updateCurrentStepInfo() {
        const currentStepInfo = document.getElementById('currentStepInfo');
        if (this.pomodoro.mode === 'practice' && this.pomodoro.currentPractice && this.pomodoro.currentStepIndex < this.pomodoro.currentPractice.steps.length) {
            const currentStep = this.pomodoro.currentPractice.steps[this.pomodoro.currentStepIndex];
            currentStepInfo.innerHTML = `📋 Текущий шаг: <strong>${currentStep.name}</strong> • ${currentStep.instruction} • Осталось: ${this.pomodoro.currentStepTime} сек`;
        } else {
            currentStepInfo.textContent = '';
        }
    }
    
    showNextStepPreview() {
        const nextStepPreview = document.getElementById('nextStepPreview');
        if (this.pomodoro.currentStepIndex + 1 < this.pomodoro.currentPractice.steps.length) {
            const nextStep = this.pomodoro.currentPractice.steps[this.pomodoro.currentStepIndex + 1];
            nextStepPreview.innerHTML = `Далее: <strong>${nextStep.name}</strong> (${nextStep.duration} сек)`;
            nextStepPreview.style.display = 'block';
        } else {
            nextStepPreview.style.display = 'none';
        }
    }
    
    renderTechniques() {
        const grid = document.getElementById('techniquesGrid');
        grid.innerHTML = '';
        
        this.techniques[this.pomodoro.currentCategory].forEach(practice => {
            const card = document.createElement('div');
            card.className = 'technique-card';
            card.onclick = () => this.selectPractice(practice.id);
            
            const totalUsageCount = this.pomodoro.practiceUsageCount[practice.id] || 0;
            const sessionUsageCount = this.pomodoro.currentSessionPractices.filter(id => id === practice.id).length;
            
            card.innerHTML = `
                <div class="technique-name">
                    <span>${practice.emoji}</span>
                    <span>${practice.name}</span>
                </div>
                <div class="technique-duration">
                    <span>⏱️</span>
                    <span>${Math.floor(practice.duration / 60)}:${(practice.duration % 60).toString().padStart(2, '0')}</span>
                </div>
                <div class="technique-description">${practice.description}</div>
                <div class="technique-stats">
                    <span>📊 Всего: ${totalUsageCount}</span>
                    <span>🔄 ${practice.steps.length} шагов</span>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }
    
    showCategory(category) {
        this.pomodoro.currentCategory = category;
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        document.getElementById('categoryDescription').innerHTML = this.categoryDescriptions[category];
        this.renderTechniques();
    }
}