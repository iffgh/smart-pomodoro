// 🌿 СИСТЕМА ПРАКТИК ВОССТАНОВЛЕНИЯ
class Practices {
    constructor() {
        this.techniques = {
            breathing: [
                {
                    id: 'breathing_478',
                    name: 'Дыхание 4-7-8',
                    description: 'Техника релаксации для снижения стресса',
                    icon: '🌬️',
                    duration: 57, // 4+7+8 = 19 секунд на цикл, 3 цикла
                    steps: [
                        { name: 'Вдох', instruction: 'Медленно вдыхайте через нос', duration: 4 },
                        { name: 'Задержка', instruction: 'Задержите дыхание', duration: 7 },
                        { name: 'Выдох', instruction: 'Медленно выдыхайте через рот', duration: 8 }
                    ]
                },
                {
                    id: 'breathing_box',
                    name: 'Квадратное дыхание',
                    description: 'Равномерное дыхание для успокоения',
                    icon: '⬜',
                    duration: 80, // 4 шага по 5 секунд, 4 цикла
                    steps: [
                        { name: 'Вдох', instruction: 'Плавно вдыхайте 5 секунд', duration: 5 },
                        { name: 'Задержка', instruction: 'Задержите дыхание', duration: 5 },
                        { name: 'Выдох', instruction: 'Плавно выдыхайте', duration: 5 },
                        { name: 'Пауза', instruction: 'Отдохните перед следующим вдохом', duration: 5 }
                    ]
                }
            ],
            physical: [
                {
                    id: 'neck_stretch',
                    name: 'Растяжка шеи',
                    description: 'Упражнения для расслабления мышц шеи',
                    icon: '💪',
                    duration: 120,
                    steps: [
                        { name: 'Наклон вперед', instruction: 'Медленно наклоните голову вперед', duration: 15 },
                        { name: 'Пауза', instruction: 'Отдохните', duration: 5 },
                        { name: 'Наклон назад', instruction: 'Медленно запрокиньте голову назад', duration: 15 },
                        { name: 'Пауза', instruction: 'Отдохните', duration: 5 },
                        { name: 'Поворот влево', instruction: 'Поверните голову влево', duration: 15 },
                        { name: 'Пауза', instruction: 'Отдохните', duration: 5 },
                        { name: 'Поворот вправо', instruction: 'Поверните голову вправо', duration: 15 },
                        { name: 'Пауза', instruction: 'Отдохните', duration: 5 }
                    ]
                },
                {
                    id: 'shoulder_roll',
                    name: 'Вращение плечами',
                    description: 'Снятие напряжения с плечевого пояса',
                    icon: '🔄',
                    duration: 60,
                    steps: [
                        { name: 'Вращение вперед', instruction: 'Вращайте плечами вперед', duration: 15 },
                        { name: 'Пауза', instruction: 'Отдохните', duration: 5 },
                        { name: 'Вращение назад', instruction: 'Вращайте плечами назад', duration: 15 },
                        { name: 'Пауза', instruction: 'Отдохните', duration: 5 }
                    ]
                }
            ],
            vision: [
                {
                    id: 'eye_rest',
                    name: 'Отдых для глаз',
                    description: 'Упражнения для снятия напряжения с глаз',
                    icon: '👀',
                    duration: 120,
                    steps: [
                        { name: 'Пальминг', instruction: 'Закройте глаза ладонями', duration: 30 },
                        { name: 'Взгляд вдаль', instruction: 'Смотрите вдаль', duration: 30 },
                        { name: 'Круговые движения', instruction: 'Выполняйте круговые движения глазами', duration: 30 }
                    ]
                },
                {
                    id: 'eye_focus',
                    name: 'Смена фокуса',
                    description: 'Тренировка аккомодации глаз',
                    icon: '🎯',
                    duration: 90,
                    steps: [
                        { name: 'Ближний фокус', instruction: 'Смотрите на палец перед собой', duration: 15 },
                        { name: 'Дальний фокус', instruction: 'Смотрите вдаль', duration: 15 },
                        { name: 'Отдых', instruction: 'Закройте глаза и отдохните', duration: 10 }
                    ]
                }
            ],
            cognitive: [
                {
                    id: 'mindful_breathing',
                    name: 'Осознанное дыхание',
                    description: 'Медитация для ментального восстановления',
                    icon: '🧠',
                    duration: 180,
                    steps: [
                        { name: 'Наблюдение', instruction: 'Наблюдайте за дыханием', duration: 60 },
                        { name: 'Счет вдохов', instruction: 'Считайте вдохи от 1 до 10', duration: 60 },
                        { name: 'Возвращение', instruction: 'Мягко верните внимание к дыханию', duration: 60 }
                    ]
                }
            ],
            energy: [
                {
                    id: 'power_pose',
                    name: 'Силовая поза',
                    description: 'Техника для быстрого прилива энергии',
                    icon: '⚡',
                    duration: 60,
                    steps: [
                        { name: 'Поза победителя', instruction: 'Встаньте в позу победителя на 30 секунд', duration: 30 },
                        { name: 'Глубокий вдох', instruction: 'Сделайте 3 глубоких вдоха', duration: 30 }
                    ]
                }
            ]
        };
        
        this.currentCategory = 'breathing';
        this.init();
    }

    init() {
        console.log('🌿 Система практик инициализирована');
        this.renderTechniques('breathing');
    }

    renderTechniques(category) {
        const grid = document.getElementById('practicesGrid');
        if (!grid) {
            console.error('❌ Элемент practicesGrid не найден');
            return;
        }

        const techniques = this.techniques[category];
        if (!techniques) {
            console.error(`❌ Категория ${category} не найдена`);
            return;
        }

        grid.innerHTML = '';

        techniques.forEach(tech => {
            const techCard = document.createElement('div');
            techCard.className = 'technique-card';
            techCard.innerHTML = `
                <div class="tech-icon">${tech.icon}</div>
                <div class="tech-content">
                    <h4>${tech.name}</h4>
                    <p>${tech.description}</p>
                    <div class="tech-meta">
                        <span class="tech-duration">${tech.duration} сек</span>
                        <span class="tech-steps">${tech.steps.length} шага</span>
                    </div>
                </div>
                <button class="tech-start-btn" onclick="practiceTimer.startPractice('${category}', '${tech.id}')">
                    ▶ Начать
                </button>
            `;
            grid.appendChild(techCard);
        });

        this.updateCategoryDescription(category);
    }

    updateCategoryDescription(category) {
        const descriptions = {
            breathing: "🌬️ <strong>Дыхательные практики:</strong> Техники управления дыханием для снятия стресса, улучшения концентрации и восстановления энергетического баланса.",
            physical: "💪 <strong>Физические упражнения:</strong> Легкие физические активности для снятия мышечного напряжения и улучшения кровообращения.",
            vision: "👀 <strong>Упражнения для глаз:</strong> Техники для снятия зрительного напряжения и улучшения фокусировки.",
            cognitive: "🧠 <strong>Когнитивные практики:</strong> Упражнения для ментального восстановления и улучшения концентрации.",
            energy: "⚡ <strong>Энергетические практики:</strong> Техники для быстрого восстановления энергии и бодрости."
        };

        const descElement = document.getElementById('categoryDescription');
        if (descElement) {
            descElement.innerHTML = descriptions[category] || '';
        }
    }

    getPractice(category, practiceId) {
        const categoryPractices = this.techniques[category];
        if (!categoryPractices) return null;
        
        return categoryPractices.find(practice => practice.id === practiceId);
    }
}

// Инициализация системы практик
document.addEventListener('DOMContentLoaded', () => {
    window.practices = new Practices();
});
// Отслеживание прогресса по практикам
this.userProgress = {
    favoritePractices: [],
    completedCount: {},
    skillLevel: {
        breathing: 'beginner',
        physical: 'beginner', 
        vision: 'beginner',
        cognitive: 'beginner',
        energy: 'beginner'
    }
};
