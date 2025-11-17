[// 🎵 СИСТЕМА УВЕДОМЛЕНИЙ С МЕХАНИЧЕСКИМ ТИКАНЬЕМ ЧАСОВ
class NotificationManager {
    constructor() {
        this.soundEnabled = true;
        this.soundActivated = false;
        this.audioContext = null;
        this.tickInterval = null;
        this.isTicking = false;
        this.init();
    }

    init() {
        console.log("🔊 Инициализация менеджера уведомлений");
        this.loadSettings();
        this.setupAudioContext();
    }

    loadSettings() {
        const savedSound = localStorage.getItem("soundEnabled");
        if (savedSound !== null) {
            this.soundEnabled = savedSound === "true";
        }
        console.log("🔊 Настройки звука загружены:", this.soundEnabled);
    }

    setupAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log("🔊 AudioContext инициализирован");
        } catch (error) {
            console.error("❌ Ошибка инициализации AudioContext:", error);
        }
    }

    activateSound() {
        if (!this.soundActivated && this.audioContext) {
            this.audioContext.resume().then(() => {
                console.log("🔊 Звук активирован по первому клику");
                this.soundActivated = true;
            });
        }
    }

    // ⏰ МЕХАНИЧЕСКОЕ ТИКАНЬЕ ЧАСОВ
    startTick() {
        if (!this.soundEnabled || this.isTicking) {
            return;
        }

        console.log("⏰ ЗАПУСК МЕХАНИЧЕСКОГО ТИКАНЬЯ");
        this.isTicking = true;
        this.activateSound();

        // Тикаем каждую секунду
        this.tickInterval = setInterval(() => {
            if (this.soundEnabled && this.audioContext) {
                this.playMechanicalTick();
            }
        }, 1000);
    }

    stopTick() {
        if (this.tickInterval) {
            console.log("⏰ ОСТАНОВКА ТИКАНЬЯ");
            clearInterval(this.tickInterval);
            this.tickInterval = null;
            this.isTicking = false;
        }
    }

    // 🎵 НАСТОЯЩИЙ МЕХАНИЧЕСКИЙ ЗВУК ТИКАНЬЯ
    playMechanicalTick() {
        if (!this.audioContext) return;

        // Создаем основной осциллятор для щелчка
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Настройки для механического щелчка
        oscillator.type = "sawtooth"; // Пилообразная волна для металлического звука
        oscillator.frequency.setValueAtTime(1800, this.audioContext.currentTime); // Высокая частота
        
        // Фильтр для создания "щелчка"
        filter.type = "bandpass";
        filter.frequency.value = 2000;
        filter.Q.value = 10; // Высокая добротность для резкого звука
        
        // Очень короткий и резкий звук
        const now = this.audioContext.currentTime;
        
        // Быстрое нарастание и очень быстрое затухание
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.002); // Очень быстрое нарастание (2ms)
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05); // Быстрое затухание
        
        oscillator.start(now);
        oscillator.stop(now + 0.05);

        // Добавляем второй осциллятор для низкочастотного отзвука
        setTimeout(() => {
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode2 = this.audioContext.createGain();
            
            oscillator2.connect(gainNode2);
            gainNode2.connect(this.audioContext.destination);
            
            oscillator2.type = "sine";
            oscillator2.frequency.setValueAtTime(120, this.audioContext.currentTime); // Низкая частота для отзвука
            
            const now2 = this.audioContext.currentTime;
            gainNode2.gain.setValueAtTime(0.03, now2);
            gainNode2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.1);
            
            oscillator2.start(now2);
            oscillator2.stop(now2 + 0.1);
        }, 10);
    }

    // 🔔 ОСНОВНЫЕ ФУНКЦИИ
    notifyWorkEnd() {
        console.log("🔊 Завершение работы");
        this.stopTick();
        if (this.soundEnabled) {
            this.playWorkEndSound();
        }
    }

    notifyBreakEnd() {
        console.log("🔊 Завершение перерыва");
        this.stopTick();
        if (this.soundEnabled) {
            this.playBreakEndSound();
        }
    }

    notifySessionComplete() {
        console.log("🔊 Завершение сессии");
        this.stopTick();
        if (this.soundEnabled) {
            this.playSessionCompleteSound();
        }
    }

    // 🎵 ПРОСТЫЕ И ПРИЯТНЫЕ ЗВУКИ

    playWorkEndSound() {
        if (!this.soundEnabled || !this.audioContext) return;
        console.log("🔔 Воспроизведение звука завершения работы");
        this.activateSound();

        // Два тона - сигнал завершения
        this.playSimpleTone(523.25, 0.3, 0.2); // C5
        setTimeout(() => this.playSimpleTone(659.25, 0.3, 0.15), 200); // E5
    }

    playBreakEndSound() {
        if (!this.soundEnabled || !this.audioContext) return;
        console.log("🔔 Воспроизведение звука завершения перерыва");
        this.activateSound();

        // Мягкий переходный звук
        this.playSimpleTone(392.00, 0.5, 0.15); // G4
    }

    playSessionCompleteSound() {
        if (!this.soundEnabled || !this.audioContext) return;
        console.log("🔔 Воспроизведение звука завершения сессии");
        this.activateSound();

        // Три тона - маленькое достижение
        this.playSimpleTone(659.25, 0.2, 0.15); // E5
        setTimeout(() => this.playSimpleTone(783.99, 0.2, 0.15), 150); // G5
        setTimeout(() => this.playSimpleTone(1046.50, 0.3, 0.2), 300); // C6
    }

    playSimpleTone(frequency, duration, volume) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = "sine";
        
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(volume, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
        
        oscillator.start(now);
        oscillator.stop(now + duration);
    }

    // 🔔 СИСТЕМА УВЕДОМЛЕНИЙ
    showNotification(message, type = "info") {
        console.log("🔔 Уведомление:", message);
        
        const notification = document.getElementById("notification");
        if (!notification) return;

        const icon = document.getElementById("notificationIcon");
        const text = document.getElementById("notificationText");
        
        if (icon && text) {
            switch(type) {
                case "success":
                    icon.textContent = "✅";
                    if (this.soundEnabled) this.playSimpleTone(1046.50, 0.2, 0.1);
                    break;
                case "warning":
                    icon.textContent = "⚠️";
                    break;
                case "error":
                    icon.textContent = "❌";
                    break;
                default:
                    icon.textContent = "🔔";
            }
            text.textContent = message;
        }

        notification.classList.add("show");
        
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    // 🔧 ОБНОВЛЕНИЕ НАСТРОЕК
    updateSoundSettings(enabled) {
        console.log("🔧 Обновление настроек звука:", enabled);
        this.soundEnabled = enabled;
        localStorage.setItem("soundEnabled", enabled);
        
        if (!enabled) {
            this.stopTick();
        }
        
        if (enabled && !this.soundActivated && this.audioContext) {
            this.audioContext.resume().then(() => {
                this.soundActivated = true;
                console.log("🔊 Звук активирован");
            });
        }
    }

    // 🧪 ТЕСТ ТИКАНЬЯ
    testTick() {
        if (!this.soundEnabled) {
            console.log("🔇 Звук выключен");
            return;
        }
        console.log("⏰ Тестируем механическое тиканье...");
        this.startTick();
        setTimeout(() => {
            this.stopTick();
            console.log("⏰ Тест завершен");
        }, 5000);
    }
}

// 🚀 ИНИЦИАЛИЗАЦИЯ
document.addEventListener("DOMContentLoaded", function() {
    window.notificationManager = new NotificationManager();
    
    document.addEventListener("click", function() {
        if (window.notificationManager && !window.notificationManager.soundActivated) {
            window.notificationManager.activateSound();
        }
    }, { once: true });
    
    window.testTick = function() {
        if (window.notificationManager) {
            window.notificationManager.testTick();
        }
    };
    
    console.log("🚀 Менеджер уведомлений с механическим тиканьем готов!");
    console.log("💡 Команда: testTick() - протестировать тиканье (5 секунд)");
});]
