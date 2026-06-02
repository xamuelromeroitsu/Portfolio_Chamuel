export function startCountdown(durationInSeconds, onTick, onComplete) {
    let timeLeft = durationInSeconds;
    
    // Ejecutar el primer tick inmediatamente para no esperar 1 segundo
    onTick(timeLeft);

    const intervalId = setInterval(() => {
        timeLeft--;
        
        if (timeLeft > 0) {
            onTick(timeLeft);
        } else {
            clearInterval(intervalId);
            onComplete();
        }
    }, 1000);
    
    return intervalId;
}