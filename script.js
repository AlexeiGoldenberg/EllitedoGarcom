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
    
        if (navList.classList.contains('active')) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        }
    }
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Esconde o loading após 1s (ou quando tudo estiver carregado)
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
});

// Fallback: Caso o evento 'load' não dispare
setTimeout(() => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
        loadingOverlay.classList.add('hidden');
    }
}, 3000);
