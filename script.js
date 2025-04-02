// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');
const header = document.querySelector('header');

// Toggle Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
});

// Fechar Menu ao Clicar em Link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Scroll Suave
document.querySelectorAll('.nav-list a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const offsetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar Classe Ativa ao Scroll
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
});

// Fechar Menu ao Clicar Fora (Mobile)
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
    }
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
});

setTimeout(() => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
        loadingOverlay.classList.add('hidden');
    }
}, 3000);

// ========== ANIMAÇÃO DOS PARCEIROS ==========
function initPartnersAnimation() {
    const partnersSection = document.querySelector('.partners');
    if (!partnersSection) return;

    const partnerCards = document.querySelectorAll('.partner-card');
    if (partnerCards.length === 0) return;

    // Reset inicial
    partnerCards.forEach(card => card.classList.remove('animated'));

    function animateCards() {
        partnerCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 400); // Atraso aumentado para 400ms por logo
        });
    }

    // Observer para disparar quando a seção entrar na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCards, 300); // Espera 300ms antes de iniciar
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Agora espera que pelo menos 30% da seção esteja visível
        rootMargin: '0px 0px -50px 0px' // Reduz a margem inferior para iniciar a animação um pouco depois
    });

    observer.observe(partnersSection);
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initPartnersAnimation);

document.addEventListener('DOMContentLoaded', function() {
    // Carrossel de Feedbacks
    const carousel = document.querySelector('.testimonials-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots-container');
    
    if (carousel) {
        const cards = document.querySelectorAll('.testimonial-card');
        const cardWidth = cards[0].offsetWidth + 48; // width + gap
        
        // Criar dots de navegação
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer?.appendChild(dot);
        });
        
        let currentIndex = 0;
        const dots = document.querySelectorAll('.dot');
        
        function updateCarousel() {
            carousel.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
            
            // Atualizar dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        nextBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        });
        
        prevBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        });
        
        // Auto-rotate (opcional)
        setInterval(() => {
            nextBtn?.click();
        }, 5000);
        
        // Atualizar dots ao scroll manual
        carousel.addEventListener('scroll', () => {
            const newIndex = Math.round(carousel.scrollLeft / cardWidth);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
        });
    }
});