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
        
        // Fechar menu ao clicar em link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });