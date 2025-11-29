// Создаем файл timer-worker.js
let timerInterval;
let startTime;
let remainingTime;

self.onmessage = function(e) {
    const { type, duration } = e.data;
    
    if (type === 'start') {
        startTime = Date.now();
        remainingTime = duration * 1000; // в миллисекундах
        
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            remainingTime = duration * 1000 - elapsed;
            
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                self.postMessage({ type: 'completed' });
            } else {
                self.postMessage({ 
                    type: 'tick', 
                    remaining: Math.ceil(remainingTime / 1000) 
                });
            }
        }, 1000);
    }
    
    if (type === 'stop') {
        clearInterval(timerInterval);
    }
};