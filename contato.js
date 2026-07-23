// 1. Executa IMEDIATAMENTE para evitar o "flash" branco caso o tema seja dark
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

document.addEventListener("DOMContentLoaded", () => {
    // === GESTÃO DE TEMA (DARK / LIGHT MODE) ===
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // === MENU MOBILE ===
    const menuMobile = document.getElementById('menuMobile');
    const navLinks = document.getElementById('navLinks');
    
    if (menuMobile && navLinks) {
        menuMobile.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita bugar eventos de clique externos
            menuMobile.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fecha o menu ao clicar em qualquer link de navegação
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuMobile.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Fecha o menu se o utilizador clicar em qualquer parte vazia do site
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuMobile.contains(e.target)) {
                menuMobile.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // === BOTÃO VOLTAR AO TOPO ===
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Uso de ticking com requestAnimationFrame para não sobrecarregar o scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY || window.pageYOffset;
                    if (scrolled > 300) {
                        backToTop.style.display = 'flex';
                    } else {
                        backToTop.style.display = 'none';
                    }
                    scrollTimeout = null;
                });
                scrollTimeout = true;
            }
        }, { passive: true }); // passive: true melhora a performance de scroll no mobile

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});