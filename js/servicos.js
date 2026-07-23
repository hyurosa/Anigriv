document.addEventListener("DOMContentLoaded", () => {
    
    // --- GERENCIAMENTO DE TEMA (DARK / LIGHT) ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') { 
        body.classList.add('dark-mode'); 
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // --- MENU MOBILE ---
    const menuMobile = document.getElementById('menuMobile');
    const navLinks = document.getElementById('navLinks');
    
    if (menuMobile && navLinks) {
        menuMobile.addEventListener('click', () => {
            menuMobile.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- BOTÃO VOLTAR AO TOPO (BACK TO TOP) ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });
        backToTop.addEventListener('click', () => { 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
    }
    
    // --- ANIMAÇÃO SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const servicoCards = document.querySelectorAll('.scroll-reveal');
    
    if (servicoCards.length > 0) {
        const observerOptions = {
            root: null, 
            threshold: 0.1, 
            rootMargin: "0px 0px -20px 0px"
        };

        const servicoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        servicoCards.forEach(card => {
            servicoObserver.observe(card);
        });
    }
});