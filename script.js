// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded and DOM ready');

    /* --- 1. АНИМАЦИЯ ПОЯВЛЕНИЯ (REVEAL) --- */
    // Создаем ОДИН наблюдатель для всех блоков на всех страницах
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Если нужно, чтобы анимация была один раз, раскомментируй:
                // revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    /* --- 2. ПАРАЛЛАКС (ТОЛЬКО ДЛЯ ГЛАВНОЙ) --- */
    const hero = document.querySelector('.hero');
    if (hero) {
        const bg = document.querySelector('.layer-bg');
        const trees = document.querySelector('.layer-trees');
        const whaaa = document.querySelector('.layer-whaaa');
        const deer = document.querySelector('.layer-deer');

        hero.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth) - 0.5;
            const moveY = (e.clientY / window.innerHeight) - 0.5;

            const layers = [
                { el: bg, x: 20, y: 10 },
                { el: trees, x: 50, y: 20 },
                { el: whaaa, x: 60, y: 30 },
                { el: deer, x: 80, y: 35 }
            ];

            layers.forEach(layer => {
                if (layer.el) {
                    layer.el.style.transition = "transform 0.1s ease-out";
                    layer.el.style.transform = `translate(${moveX * layer.x}px, ${moveY * layer.y}px)`;
                }
            });
        });

        hero.addEventListener('mouseleave', () => {
            [bg, trees, whaaa, deer].forEach(el => {
                if (el) el.style.transform = `translate(0, 0)`;
            });
        });
        
        // Добавляем класс загрузки для hero
        hero.classList.add('loaded');
    }


    /* --- 3. КНОПКА "НАВЕРХ" --- */
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});



/* --- 5. СЛАЙДЕР (МУЗЫКАЛЬНЫЙ ГРАММОФОН) --- */
let currentSlideIndex = 0;

function moveSlider(direction) {
    const viewport = document.getElementById('musicSlider');
    const slides = document.querySelectorAll('.music-slide');
    
    if (!viewport || slides.length === 0) return;

    currentSlideIndex += direction;

    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

    const offset = viewport.clientWidth * currentSlideIndex;
    
    viewport.scrollTo({
        left: offset,
        behavior: 'smooth'
    });
}


/* --- 6. ПЕРЕКЛЮЧЕНИЕ ПЕРСОНАЖЕЙ / КАРТОЧЕК --- */
function showHero(heroId, btn) {
    const parentSection = btn.closest('section');
    if (!parentSection) return;

    parentSection.querySelectorAll('.hero-card').forEach(card => card.classList.remove('active'));
    parentSection.querySelectorAll('.hero-btn').forEach(b => b.classList.remove('active'));

    const target = document.getElementById(heroId);
    if (target) target.classList.add('active');
    btn.classList.add('active');
}

function showSinger(singerId, btn) {
    document.querySelectorAll('.singer-card').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.singer-btn').forEach(b => b.classList.remove('active'));
    
    const target = document.getElementById(singerId);
    if (target) target.classList.add('active');
    btn.classList.add('active');
}

/* --- 7. КАРТЫ И МАРШРУТЫ --- */
function switchRoute(year, element) {
    document.querySelectorAll('.route-layer').forEach(r => r.classList.remove('active'));
    document.querySelectorAll('[class^="date-item"]').forEach(d => d.classList.remove('active'));

    const targetRoute = document.getElementById('route-' + year);
    if (targetRoute) targetRoute.classList.add('active');
    if (element) element.classList.add('active');
}

function toggleWord(card) {
    card.classList.toggle('flipped');
}

function toggleKalevalaBubble(target) {
    if (target === 'vaina') {
        // Переключаем сразу оба баббла Вяйнямёйнена
        document.getElementById('bubble-vaina-1').classList.toggle('active');
        document.getElementById('bubble-vaina-2').classList.toggle('active');
    } else if (target === 'izba') {
        // Переключаем баббл избы
        document.getElementById('bubble-izba').classList.toggle('active');
    } else if (target === 'sampo') {
        // Переключаем баббл горы Сампо
        document.getElementById('bubble-sampo').classList.toggle('active');
    }
}

/* --- 4. МЕНЮ (BURGER) --- */
function toggleMenu() {
    const menu = document.getElementById('overlay-menu');
    if (menu) {
        // Если в CSS у тебя рабочим остался класс .open, то напиши 'open' вместо 'active'
        menu.classList.toggle('open'); 
    }
}