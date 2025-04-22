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
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 600,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        breakpoints: {
            // Mobile (1 card)
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true
            },
            // Tablet (2 cards)
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
                centeredSlides: false
            },
            // Desktop médio (3 cards)
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
                centeredSlides: false
            },
            // Desktop grande (3 cards com mais espaço)
            1440: {
                slidesPerView: 3,
                spaceBetween: 50,
                centeredSlides: false
            }
        },
        // Efeito de transição suave
        on: {
            init: function() {
                this.slides.forEach(slide => {
                    slide.style.transform = 'scale(0.9)';
                    slide.style.transition = 'transform 0.3s ease';
                });
            },
            slideChange: function() {
                this.slides.forEach((slide, index) => {
                    if (index === this.activeIndex) {
                        slide.style.transform = 'scale(1)';
                    } else {
                        slide.style.transform = 'scale(0.9)';
                    }
                });
            }
        }
    });
});

// FORMULÁRIO DE CONTATO
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            try {
                // Mostrar estado de carregamento
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    throw new Error('Erro ao enviar mensagem');
                }
            } catch (error) {
                formStatus.textContent = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde ou entre em contato por WhatsApp.';
                formStatus.className = 'form-status error';
                console.error('Error:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Rolagem suave para mostrar o status
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Esconder a mensagem após 5 segundos
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.style.opacity = '1';
                    }, 500);
                }, 5000);
            }
        });
    }
});