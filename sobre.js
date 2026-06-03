    // Menu Mobile
        const menuMobile = document.getElementById('menuMobile');
        const navLinks = document.getElementById('navLinks');
        
        if (menuMobile) {
            menuMobile.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
        
        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Animação dos números ao scroll
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };
        
        const animateNumbers = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    numbers.forEach(num => {
                        const target = parseInt(num.textContent);
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                num.textContent = target + '+';
                                clearInterval(timer);
                            } else {
                                num.textContent = Math.floor(current) + '+';
                            }
                        }, 40);
                    });
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const observer = new IntersectionObserver(animateNumbers, observerOptions);
        const statsSection = document.querySelector('.sobre-stats');
        if (statsSection) observer.observe(statsSection.parentElement.parentElement);