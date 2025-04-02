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
            }, index * 150);
        });
    }

    // Verifica se já está visível
    function isSectionVisible() {
        const rect = partnersSection.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 0.75 &&
            rect.bottom >= 0
        );
    }

    // Observer para disparar quando a seção entrar na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCards();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(partnersSection);

    // Se já estiver visível ao carregar
    if (isSectionVisible()) {
        animateCards();
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initPartnersAnimation);