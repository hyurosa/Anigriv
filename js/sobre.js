// Funcionalidades específicas da seção Sobre
document.addEventListener('DOMContentLoaded', function() {
    // Animação dos números das estatísticas
    const statsSection = document.querySelector('.sobre');
    const statNumbers = document.querySelectorAll('.sobre-stat .number');
    let animated = false;
    
    function animateNumbers() {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const targetText = stat.textContent;
            const target = parseInt(targetText);
            
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 50; // 50 frames de animação
            const duration = 2000; // 2 segundos
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (targetText.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (targetText.includes('+') ? '+' : '');
                }
            }, stepTime);
        });
        
        animated = true;
    }
    
    // Observer para quando a seção entrar na tela
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Animação de entrada suave para os elementos
    const fadeElements = document.querySelectorAll('.sobre-text > *');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});