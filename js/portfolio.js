// Funcionalidades específicas da seção Portfólio
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.pa-card');
    const titleEl = document.getElementById('dyn-title');
    const catEl = document.getElementById('dyn-cat');
    const descEl = document.getElementById('dyn-desc');
    const viewBtn = document.getElementById('viewProjectBtn');
    
    let currentProjectUrl = '#';
    let fading = false;
    
    function updateContent(card) {
        if (fading) return;
        
        fading = true;
        
        // Aplica fade out
        [titleEl, catEl, descEl].forEach(el => {
            if (el) el.classList.add('fading');
        });
        
        setTimeout(() => {
            // Atualiza o conteúdo
            const newTitle = card.getAttribute('data-title') || 'Projetos Recentes';
            const newCat = card.getAttribute('data-cat') || 'Portfólio';
            const newDesc = card.getAttribute('data-desc') || 'Passe o cursor sobre cada projeto para explorar o nosso trabalho criativo.';
            const newUrl = card.getAttribute('data-link') || '#';
            
            if (titleEl) titleEl.textContent = newTitle;
            if (catEl) catEl.textContent = newCat;
            if (descEl) descEl.textContent = newDesc;
            
            currentProjectUrl = newUrl;
            
            // Remove fade out e aplica fade in
            [titleEl, catEl, descEl].forEach(el => {
                if (el) el.classList.remove('fading');
            });
            
            fading = false;
        }, 220);
    }
    
    // Adiciona evento de clique nos cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove classe active de todos
            cards.forEach(c => c.classList.remove('active'));
            // Adiciona ao card clicado
            this.classList.add('active');
            // Atualiza o conteúdo
            updateContent(this);
        });
    });
    
    // Evento para o botão "Ver projeto"
    if (viewBtn) {
        viewBtn.addEventListener('click', function() {
            if (currentProjectUrl && currentProjectUrl !== '#') {
                window.open(currentProjectUrl, '_blank');
            } else {
                // Mostra mensagem ou abre modal com mais informações
                alert('Em breve você poderá ver mais detalhes deste projeto!');
            }
        });
    }
    
    // Inicializa com o primeiro card ativo
    const activeCard = document.querySelector('.pa-card.active');
    if (activeCard) {
        updateContent(activeCard);
    }
    
    // Adiciona suporte para teclado (acessibilidade)
    cards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ver projeto: ${card.getAttribute('data-title')}`);
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});