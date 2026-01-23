function initGauge(gaugeBox, targetPercentage) {
    const gaugeFill = gaugeBox.querySelector('.gauge-fill');
    const percentageText = gaugeBox.querySelector('.percentage');
    const circumference = Math.PI * 60;
    
    // Bắt đầu: ẩn hoàn toàn thanh xanh (offset = toàn bộ chiều dài)
    gaugeFill.style.strokeDasharray = circumference;
    gaugeFill.style.strokeDashoffset = circumference;
    percentageText.textContent = '0%';
    
    // Animation: giảm offset để thanh hiện dần từ trái sang phải
    setTimeout(function() {
        const offset = circumference * (1 - targetPercentage / 100);
        gaugeFill.style.strokeDashoffset = offset;
        
        // Đếm số từ 0 đến targetPercentage
        let currentPercentage = 0;
        const duration = 1000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = targetPercentage / steps;
        
        const counter = setInterval(function() {
            currentPercentage += increment;
            if (currentPercentage >= targetPercentage) {
                currentPercentage = targetPercentage;
                clearInterval(counter);
            }
            percentageText.textContent = currentPercentage.toFixed(1) + '%';
        }, stepTime);
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    initGauge(document.querySelector('.gauge-box'), 87.6);
});