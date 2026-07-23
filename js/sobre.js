// 1. Executa IMEDIATAMENTE para evitar o "flash" branco se o tema for dark
if (localStorage.getItem('theme') === 'dark') { 
    document.body.classList.add('dark-mode'); 
}

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Alternância de Tema (Dark / Light)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // Menu Mobile Hamburguer
    const menuMobile = document.getElementById('menuMobile');
    const navLinks = document.getElementById('navLinks');
    
    if (menuMobile && navLinks) {
        menuMobile.addEventListener('click', () => {
            menuMobile.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // [Melhoria UX] Fecha o menu mobile automaticamente ao clicar em qualquer link dele
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuMobile.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});