// Funcionalidades específicas da seção Serviços
document.addEventListener('DOMContentLoaded', function() {
    // Configuração do scroll infinito - ajusta duplicação se necessário
    const servicosGrid = document.querySelector('.servicos-grid');
    
    if (servicosGrid) {
        // Verifica se existe conteúdo suficiente para scroll infinito
        const tracks = document.querySelectorAll('.servicos-track');
        if (tracks.length < 2) {
            // Se só tem uma track, duplica para criar o efeito infinito
            const firstTrack = tracks[0];
            if (firstTrack) {
                const clone = firstTrack.cloneNode(true);
                servicosGrid.appendChild(clone);
            }
        }
        
        // Pausa animação quando o mouse sai da tela (performance)
        let scrollTimeout;
        servicosGrid.addEventListener('mouseenter', () => {
            const tracks = document.querySelectorAll('.servicos-track');
            tracks.forEach(track => {
                track.style.animationPlayState = 'paused';
            });
        });
        
        servicosGrid.addEventListener('mouseleave', () => {
            const tracks = document.querySelectorAll('.servicos-track');
            tracks.forEach(track => {
                track.style.animationPlayState = 'running';
            });
        });
    }
    
    // Animação de entrada dos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplica animação aos cards
    const cards = document.querySelectorAll('.servico-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
});