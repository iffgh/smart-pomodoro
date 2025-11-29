// practices-data.js
const practices = {
    breathing: {
        title: "Дыхание 4-7-8",
        description: "Техника релаксации для снижения стресса",
        duration: 300, // 5 минут
        steps: [
            { name: "Вдох", duration: 4, instruction: "Медленно вдыхайте через нос" },
            { name: "Задержка", duration: 7, instruction: "Задержите дыхание" },
            { name: "Выдох", duration: 8, instruction: "Медленно выдыхайте через рот" }
        ],
        color: "#4CAF50"
    },
    stretching: {
        title: "Растяжка шеи",
        description: "Упражнения для расслабления мышц шеи",
        duration: 180, // 3 минуты
        steps: [
            { name: "Наклон вперед", duration: 15, instruction: "Медленно наклоните голову вперед" },
            { name: "Наклон назад", duration: 15, instruction: "Медленно запрокиньте голову назад" },
            { name: "Поворот влево", duration: 15, instruction: "Поверните голову влево" },
            { name: "Поворот вправо", duration: 15, instruction: "Поверните голову вправо" }
        ],
        color: "#2196F3"
    },
    eyes: {
        title: "Отдых для глаз",
        description: "Упражнения для снятия напряжения с глаз",
        duration: 120, // 2 минуты
        steps: [
            { name: "Пальминг", duration: 30, instruction: "Закройте глаза ладонями" },
            { name: "Взгляд вдаль", duration: 30, instruction: "Смотрите вдаль 30 секунд" },
            { name: "Круговые движения", duration: 30, instruction: "Выполняйте круговые движения глазами" }
        ],
        color: "#FF9800"
    }
};