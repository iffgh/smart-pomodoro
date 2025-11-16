class NotificationManager {
    constructor() {
        console.log("🔧 NotificationManager создан");
        this.browserNotificationsEnabled = false;
        this.soundEnabled = true;
        this.audioContext = null;
        this.soundActivated = false;
        this.init();
    }

    init() {
        console.log("🔧 Инициализация NotificationManager");
        
        if (!("Notification" in window)) {
            console.log("❌ Браузер не поддерживает уведомления");
            return;
        }

        if (Notification.permission === "granted") {
            this.browserNotificationsEnabled = true;
            console.log("✅ Разрешение на уведомления есть");
        } else {
            console.log("⚠️ Разрешения на уведомления нет");
        }

        this.setupSoundActivation();
    }

    setupSoundActivation() {
        console.log("🔧 Настройка активации звуков");
        
        const activateSounds = () => {
            console.log("🎯 Пользователь кликнул - активируем звуки");
            if (!this.soundActivated) {
                this.soundActivated = true;
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                console.log("✅ AudioContext создан, звуки активированы!");
            }
        };

        document.addEventListener("click", activateSounds, { once: true });
        console.log("🔧 Обработчик клика установлен");
    }

    playSound(frequency, duration, volume = 0.1, type = "sine") {
        console.log(`🔊 Пытаемся воспроизвести звук: ${frequency}Hz`);
        
        if (!this.soundActivated) {
            console.log("❌ Звуки не активированы (нужен клик)");
            return;
        }
        
        if (!this.audioContext) {
            console.log("❌ AudioContext не создан");
            return;
        }

        try {
            console.log(`🔊 AudioContext состояние: ${this.audioContext.state}`);
            
            if (this.audioContext.state === "suspended") {
                console.log("🔊 Возобновляем AudioContext...");
                this.audioContext.resume();
            }
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            const now = this.audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(volume, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
            
            console.log("✅ Звук успешно воспроизведен!");
            
        } catch (error) {
            console.log("❌ Ошибка воспроизведения звука:", error);
        }
    }

    playWorkEndSound() {
        console.log("🎵 Воспроизводим звук окончания работы");
        this.playSound(784, 0.8, 0.08);
        setTimeout(() => this.playSound(1047, 0.6, 0.06), 200);
    }

    playBreakEndSound() {
        console.log("🎵 Воспроизводим звук окончания перерыва");
        this.playSound(523, 1.0, 0.07);
    }

    playSessionCompleteSound() {
        console.log("🎵 Воспроизводим звук завершения сессии");
        this.playSound(523, 0.5, 0.06);
        setTimeout(() => this.playSound(659, 0.5, 0.06), 200);
        setTimeout(() => this.playSound(784, 0.7, 0.07), 400);
    }

    notifyWorkEnd() {
        console.log("🚀 ВЫЗВАН notifyWorkEnd()");
        
        if (this.browserNotificationsEnabled && document.hidden) {
            new Notification("Время работы закончено!", {
                body: "Переходите к перерыву и выберите практику восстановления."
            });
        }

        if (this.soundEnabled) {
            this.playWorkEndSound();
        }
    }

    notifyBreakEnd() {
        console.log("🚀 ВЫЗВАН notifyBreakEnd()");
        
        if (this.browserNotificationsEnabled && document.hidden) {
            new Notification("Перерыв закончен!", {
                body: "Возвращайтесь к работе. Вы отлично отдохнули!"
            });
        }

        if (this.soundEnabled) {
            this.playBreakEndSound();
        }
    }

    notifySessionComplete() {
        console.log("🚀 ВЫЗВАН notifySessionComplete()");
        
        if (this.browserNotificationsEnabled && document.hidden) {
            new Notification("Сессия завершена!", {
                body: "Вы завершили полную Pomodoro сессию. Отличная работа!"
            });
        }

        if (this.soundEnabled) {
            this.playSessionCompleteSound();
        }
    }
}

console.log("🔧 Создаем глобальный notificationManager...");
const notificationManager = new NotificationManager();
console.log("✅ notificationManager создан глобально");
