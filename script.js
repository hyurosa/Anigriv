document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SISTEMA DE TEMA CLARO / ESCURO (DARK MODE)
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggle');
    
    if (themeToggleBtn) {
        // Verifica se há alguma preferência salva no navegador
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Se não houver, verifica se o sistema do usuário prefere dark
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }

        // Evento de clique para mudar o tema
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'light';
            
            if (currentTheme !== 'dark') {
                newTheme = 'dark';
            }
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ==========================================
    // 2. MENU MOBILE (HAMBÚRGUER)
    // ==========================================
    const menuMobileBtn = document.querySelector('.menu-mobile');
    const navLinksContainer = document.getElementById('navLinks');

    if (menuMobileBtn && navLinksContainer) {
        menuMobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita bugs de clique
            navLinksContainer.classList.toggle('active');
        });
    }

    // ==========================================
    // 3. FECHAR MENU MOBILE AO CLICAR EM UM LINK
    // ==========================================
    const menuLinks = document.querySelectorAll('.nav-links a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // ==========================================
    // 4. BOTÃO VOLTAR AO TOPO (BACK TO TOP)
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Mostra o botão apenas quando rolar 400px para baixo
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        // Evento de clique para subir suavemente
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 5. LOGICA DE ENVIO DO FORMULÁRIO DE CONTATO
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede a página de atualizar
            
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = '#25D366';
                formMessage.style.color = 'white';
                formMessage.innerHTML = '✨ Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                contactForm.reset(); // Limpa os campos do formulário
                
                // Esconde a mensagem após 5 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
});

//Animações do Portifólio
 (function() {
    const cards = document.querySelectorAll('.pa-card');
    const titleEl = document.getElementById('dyn-title');
    const catEl   = document.getElementById('dyn-cat');
    const descEl  = document.getElementById('dyn-desc');
    let t;
 
    function swap(title, cat, desc) {
      [titleEl, catEl, descEl].forEach(el => el.classList.add('fading'));
      clearTimeout(t);
      t = setTimeout(() => {
        titleEl.textContent = title;
        catEl.textContent   = cat;
        descEl.textContent  = desc;
        [titleEl, catEl, descEl].forEach(el => el.classList.remove('fading'));
      }, 210);
    }
 
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        swap(card.dataset.title, card.dataset.cat, card.dataset.desc);
      });
    });
 
    document.getElementById('pa-right').addEventListener('mouseleave', () => {
      cards.forEach(c => c.classList.remove('active'));
      cards[0].classList.add('active');
      swap('Projetos Recentes', 'Portfólio', 'Passe o cursor sobre cada projeto para explorar o nosso trabalho criativo.');
    });
  })();