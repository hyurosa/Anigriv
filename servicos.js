

        // Menu Mobile
        const menuMobile = document.getElementById('menuMobile');
        const navLinks = document.getElementById('navLinks');
        
        if (menuMobile) {
            menuMobile.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
        
        // Back to Top
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Animação de entrada dos cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.servico-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            cardObserver.observe(card);
        });
        
        // Animação dos diferenciais
        const diffObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 150);
                    diffObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.diferencial-item').forEach((item, index) => {
            item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            item.style.transitionDelay = `${index * 0.1}s`;
            diffObserver.observe(item);
        });
        
        // Filtro por categoria
        const filterButtons = document.querySelectorAll('.categoria-btn');
        const cards = document.querySelectorAll('.servico-card');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active de todos
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                cards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'rotateIn 0.5s ease';
                        setTimeout(() => {
                            card.style.animation = '';
                        }, 500);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Fechar menu ao clicar em link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });