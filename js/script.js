document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GERENCIAMENTO DE TEMA (CLARO / ESCURO) ---
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = currentTheme !== 'dark' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- 2. MENU MOBILE ---
    const menuMobileBtn = document.querySelector('.menu-mobile');
    const navLinksContainer = document.getElementById('navLinks');
    if (menuMobileBtn && navLinksContainer) {
        menuMobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksContainer.classList.toggle('active');
        });
    }

    const menuLinks = document.querySelectorAll('.nav-links a');
    if (menuLinks.length > 0 && navLinksContainer) {
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                }
            });
        });
    }

    // --- 3. BOTÃO VOLTAR AO TOPO ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#25D366';
            formMessage.style.color = 'white';
            formMessage.innerHTML = '✨ Mensagem enviada com sucesso! Entraremos em contato em breve.';
            contactForm.reset();
            setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
        });
    }
});

// --- 5. CONTROLE UNIFICADO DO PORTFÓLIO (CARDS LATERAIS) ---
(() => {
    const cards = document.querySelectorAll('.pa-card');
    const titleEl = document.getElementById('dyn-title');
    const catEl   = document.getElementById('dyn-cat');
    const descEl  = document.getElementById('dyn-desc');
    const rightContainer = document.getElementById('pa-right');
    
    if (!titleEl || !catEl || !descEl || cards.length === 0) return;

    let timeoutId;
    let currentIndex = 0;
    let autoCycleTimer = null;

    // Função para trocar o texto com efeito de fade
    function swapText(title, cat, desc) {
        const textElements = [titleEl, catEl, descEl];
        textElements.forEach(el => el.classList.add('fading'));
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            titleEl.textContent = title;
            catEl.textContent   = cat;
            descEl.textContent  = desc;
            textElements.forEach(el => el.classList.remove('fading'));
        }, 210);
    }

    // Ativa o card visualmente e atualiza o texto
    function activateCard(index) {
        cards.forEach(c => c.classList.remove('active'));
        cards[index].classList.add('active');
        
        const card = cards[index];
        swapText(card.dataset.title, card.dataset.cat, card.dataset.desc);
    }

    // Inicia a rotação automática suave de 3 segundos
    function startAutoCycle() {
        stopAutoCycle(); // Garante que não haja múltiplos intervalos rodando
        autoCycleTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            activateCard(currentIndex);
        }, 3000);
    }

    // Para o temporizador automático
    function stopAutoCycle() {
        if (autoCycleTimer) {
            clearInterval(autoCycleTimer);
            autoCycleTimer = null;
        }
    }

    // Configura os ouvintes de evento de mouse e foco nos cards
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            stopAutoCycle();
            currentIndex = index;
            activateCard(index);
        });
    });

    // Quando o mouse sai da seção do portfólio, redefine para o estado inicial e retoma a rotação
    if (rightContainer) {
        rightContainer.addEventListener('mouseleave', () => {
            stopAutoCycle();
            cards.forEach(c => c.classList.remove('active'));
            cards[0].classList.add('active');
            currentIndex = 0;
            swapText('Projetos Recentes', 'Portfólio', 'Passe o cursor sobre cada projeto para explorar o nosso trabalho criativo.');
            
            // Pequeno atraso para retomar o ciclo automático após o usuário retirar o cursor
            setTimeout(startAutoCycle, 1000);
        });
    }

    // Inicializa o ciclo automático do portfólio
    startAutoCycle();
})();

// --- 6. CARROSSEL 3D DA SEÇÃO DE SERVIÇOS ---
(() => {
    const servicesItems = [
        { 
            id: 1, 
            title: "Produção Audiovisual", 
            description: "Criamos vídeos institucionais de alta qualidade, campanhas e materiais em vídeo impactantes de padrão cinematográfico.", 
            videoSrc: "vids/Editado1.mp4"
        },
        { 
            id: 2, 
            title: "Marketing Digital", 
            description: "Posicionamento estratégico de marca focado em engajamento, consistência visual e crescimento de comunidades orgânicas.", 
            imageSrc: "img/anig2.jpeg"
        },
        { 
            id: 3, 
            title: "Design Gráfico", 
            description: "Criação de identidades visuais corporativas, logótipos minimalistas, panfletos, cartazes e peças publicitárias exclusivas.", 
            imageSrc: "img/hartbeat.jpeg"
        },
        { 
            id: 4, 
            title: "Gestão de Tráfego Pago", 
            description: "Configuração e otimização de anúncios patrocinados para maximizar leads, vendas e o retorno do seu investimento real.", 
            imageSrc: "img/anig1.jpeg"
        },
        { 
            id: 5, 
            title: "Impressão e Produção Gráfica", 
            description: "Materialização da sua comunicação em suportes físicos com acabamento premium e excelente fidelidade de cores.", 
            imageSrc: "img/anig3.jpeg"
        }
    ];

    let activeIndex = 0;
    const maxVisible = 5; 
    const cardWidth = 520;
    const cardSpacing = Math.round(cardWidth * (1 - 0.52)); 
    const spreadDeg = 50;
    const maxOffset = Math.floor(maxVisible / 2);
    const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;
    const depthPx = 130;
    const tiltXDeg = 14;
    const activeLiftPx = 25;
    const activeScale = 1.03;
    const inactiveScale = 0.92;

    const stage = document.getElementById('servicesStage');
    const dotsContainer = document.getElementById('servicesDotsContainer');

    if (!stage || !dotsContainer) return;

    let createdCards = [];
    let createdDots = [];

    function getSignedOffset(i, active, len) {
        let raw = i - active;
        let alt = raw > 0 ? raw - len : raw + len;
        return Math.abs(alt) < Math.abs(raw) ? alt : raw;
    }

    function initServices() {
        stage.innerHTML = '';
        dotsContainer.innerHTML = '';
        createdCards = [];
        createdDots = [];

        const btnPrev = document.createElement('button');
        btnPrev.className = 'nav-arrow prev';
        btnPrev.setAttribute('aria-label', 'Serviço Anterior');
        btnPrev.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
        btnPrev.addEventListener('click', prevService);
        dotsContainer.appendChild(btnPrev);

        const dotsGroup = document.createElement('div');
        dotsGroup.className = 'dots-group';

        servicesItems.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'card-service';

            let mediaTag = item.videoSrc 
                ? `<video src="${item.videoSrc}" autoplay loop muted playsinline></video>`
                : `<img src="${item.imageSrc}" alt="${item.title}">`;

            card.innerHTML = `
                <div class="card-service-content">
                    ${mediaTag}
                    <div class="card-service-overlay"></div>
                    <div class="card-service-info">
                        <div class="card-service-title">${item.title}</div>
                        <div class="card-service-description">${item.description}</div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                if (i === activeIndex) {
                    window.location.href = 'servicos.html';
                } else {
                    activeIndex = i;
                    updateServicesStack();
                }
            });

            stage.appendChild(card);
            createdCards.push(card);

            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('aria-label', `Ir para serviço ${item.title}`);
            dot.addEventListener('click', () => {
                activeIndex = i;
                updateServicesStack();
            });
            dotsGroup.appendChild(dot);
            createdDots.push(dot);
        });

        dotsContainer.appendChild(dotsGroup);

        const btnNext = document.createElement('button');
        btnNext.className = 'nav-arrow next';
        btnNext.setAttribute('aria-label', 'Próximo Serviço');
        btnNext.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
        btnNext.addEventListener('click', nextService);
        dotsContainer.appendChild(btnNext);

        updateServicesStack();
    }
    
    function updateServicesStack() {
        servicesItems.forEach((item, i) => {
            const card = createdCards[i];
            const dot = createdDots[i];
            
            const off = getSignedOffset(i, activeIndex, servicesItems.length);
            const abs = Math.abs(off);
            const visible = abs <= maxOffset;

            if (!visible) {
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
                return;
            }

            const rotateZ = off * stepDeg;
            const x = off * cardSpacing;
            const y = abs * 12; 
            const z = -abs * depthPx;
            const isActive = off === 0;
            const scale = isActive ? activeScale : inactiveScale;
            const lift = isActive ? -activeLiftPx : 0;
            const rotateX = isActive ? 0 : tiltXDeg;
            const zIndex = 100 - abs;

            card.style.pointerEvents = 'auto';
            card.style.opacity = '1';
            card.style.zIndex = zIndex;
            card.style.transform = `translateX(${x}px) translateY(${y + lift}px) rotateZ(${rotateZ}deg) rotateX(${rotateX}deg) scale(${scale})`;
            
            const content = card.querySelector('.card-service-content');
            if (content) {
                content.style.transform = `translateZ(${z}px)`;
                content.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }

            if (isActive) {
                card.classList.add('active');
                dot.classList.add('active');
            } else {
                card.classList.remove('active');
                dot.classList.remove('active');
            }
        });
    }

    function nextService() {
        activeIndex = (activeIndex + 1) % servicesItems.length;
        updateServicesStack();
    }

    function prevService() {
        activeIndex = (activeIndex - 1 + servicesItems.length) % servicesItems.length;
        updateServicesStack();
    }

  // --- Código existente acima dentro da IIFE 6 ---

    stage.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextService();
        if (e.key === 'ArrowLeft') prevService();
    });

    // NOVO: Rotação automática para a direita a cada 5 segundos
    let servicesAutoCycle = setInterval(nextService, 5000);

    // Pausa o carrossel se o usuário passar o mouse por cima para não atrapalhar a leitura
    stage.addEventListener('mouseenter', () => clearInterval(servicesAutoCycle));
    stage.addEventListener('mouseleave', () => {
        clearInterval(servicesAutoCycle);
        servicesAutoCycle = setInterval(nextService, 5000);
    });

    initServices();
})();;

// --- DIRECIONAMENTO DO PORTFÓLIO PARA A GALERIA ---
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os cards de projeto e o botão principal da esquerda
    const portfolioCards = document.querySelectorAll('#portfolio .pa-card');
    const viewProjectBtn = document.querySelector('#portfolio .view-btn');

    // Faz com que o clique em qualquer card abra a galeria
    portfolioCards.forEach(card => {
        // Altera o cursor para a mãozinha de clique ao passar o mouse
        card.style.cursor = 'pointer'; 
        
        card.addEventListener('click', () => {
            window.location.href = 'galeria.html';
        });
    });

    // Aproveita e faz com que o botão "Ver projeto →" também leve à galeria
    if (viewProjectBtn) {
        viewProjectBtn.addEventListener('click', () => {
            window.location.href = 'galeria.html';
        });
    }
});