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

    // --- LÓGICA DE FILTRAGEM DA GALERIA ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe ativa de todos e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });

    // --- LÓGICA DO LIGHTBOX MODAL ---
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const mediaSrc = item.getAttribute('data-src');
            const isVideo = item.getAttribute('data-type') === 'video';

            lightboxContent.innerHTML = ''; // Limpa conteúdo anterior

            if (isVideo) {
                // Injeta elemento de vídeo com controles
                lightboxContent.innerHTML = `<video src="${mediaSrc}" controls autoplay></video>`;
            } else {
                // Injeta elemento de imagem
                lightboxContent.innerHTML = `<img src="${mediaSrc}" alt="Visualização">`;
            }

            lightboxModal.style.display = 'flex';
        });
    });

    // Fechar Modal
    lightboxClose.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
        lightboxContent.innerHTML = ''; // Pausa o vídeo se estiver tocando ao fechar
    });

    // Fechar ao clicar fora do conteúdo
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
            lightboxContent.innerHTML = '';
        }
    });
});