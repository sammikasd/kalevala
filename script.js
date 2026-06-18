/* ==========================================================================
   1. НАСТРОЙКА ОБЪЕДИНЕННЫХ РУН (СТРУКТУРА НА ВСЕ 50 РУН)
   ========================================================================== */
const volumesConfig = {
    
    "volume-1":     { title: "РУНА 1",       part: "ЧАСТЬ I • СОТВОРЕНИЕ МИРА" }, // длинная, ничего не пишем
    "volume-2-3":   { title: "РУНЫ 2 – 3",   part: "ЧАСТЬ II • ВЫЗОВ ЙОУКАХАЙНЕНА", isShort: true },
    "volume-4-6":   { title: "РУНЫ 4 – 6",   part: "ЧАСТЬ III • СУДЬБА КРАСАВИЦЫ АЙНО", isShort: true },
    "volume-7":     { title: "РУНА 7",       part: "ЧАСТЬ IV • ПЛЕННИК СЕВЕРНОЙ ПОХЪЁЛЫ" },
    
    // А вот пошли наши заглушки! Помечаем их как isShort: true
    "volume-8-10":  { title: "РУНЫ 8 – 10",  part: "ЧАСТЬ V • МАГИЧЕСКАЯ КУЗНИЦА", isShort: true },
    "volume-11-15": { title: "РУНЫ 11 – 15", part: "ЧАСТЬ VI • УДАЛОЙ ЛЕММИНКЯЙНЕН", isShort: true },
    "volume-16-20": { title: "РУНЫ 16 – 20", part: "ЧАСТЬ VII • ПОГОНЯ ЗА НЕВЕСТОЙ", isShort: true },
    "volume-21-25": { title: "РУНЫ 21 – 25", part: "ЧАСТЬ VIII • ВЕЛИКАЯ СВАДЬБА ВЕКА", isShort: true },
    "volume-26-30": { title: "РУНЫ 26 – 30", part: "ЧАСТЬ IX • МЕСТЬ ЛЕММИНКЯЙНЕНА", isShort: true },
    "volume-31-36": { title: "РУНЫ 31 – 36", part: "ЧАСТЬ X • ТРАГИЧЕСКИЙ РОК КУЛЛЕРВО", isShort: true },
    "volume-37-38": { title: "РУНЫ 37 – 38", part: "ЧАСТЬ XI • ЗОЛОТАЯ ДЕВА", isShort: true },
    "volume-39-44": { title: "РУНЫ 39 – 44", part: "ЧАСТЬ XII • ПОХИЩЕНИЕ САМПО", isShort: true },
    "volume-45-49": { title: "РУНЫ 45 – 49", part: "ЧАСТЬ XIII • БИТВА ЗА СВЕТ", isShort: true },
    "volume-50":    { title: "РУНА 50",       part: "ЧАСТЬ XIV • УХОД ПРОРОКА", isShort: true }

};

const volumeOrder = Object.keys(volumesConfig);
let currentIdx = 0; // Начинаем с первой доступной главы

/* --- Функция переключения тома (по ID) --- */
function selectRune(volumeId) {
    // Проверяем, есть ли вообще такие блоки на текущей странице, чтобы не вызвать ошибку
    if (!document.getElementById(volumeId)) return;
    
    currentIdx = volumeOrder.indexOf(volumeId);
    
    // 1. Прячем все тома и показываем нужный
    document.querySelectorAll('.rune-volume').forEach(vol => {
        vol.classList.add('hidden');
    });
    document.getElementById(volumeId).classList.remove('hidden');
    
    // 2. Обновляем тексты в шапке
    const titleEl = document.getElementById('current-rune-title');
    const partEl = document.getElementById('current-part-label');
    if (titleEl) titleEl.innerText = volumesConfig[volumeId].title;
    if (partEl) partEl.innerText = volumesConfig[volumeId].part;
    
    // 3. Подсвечиваем активную строку в меню
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === volumeId) {
            item.classList.add('active');



    // НАШЕ ОБНОВЛЕНИЕ: Ищем внешний контейнер страницы
    const pageWrapper = document.querySelector('section.kalevala-page');
    if (pageWrapper) {
        // Если у текущей руны в конфиге стоит флаг isShort, добавляем класс короткого декора
       if (volumesConfig[volumeId] && volumesConfig[volumeId].isShort) {
    // Если руна короткая, вешаем класс на всю страницу body
    document.body.classList.add('short-decor');
} else {
    // Если длинная — убираем
    document.body.classList.remove('short-decor');
}
    }

    // ... остальной твой код (скролл наверх, закрытие меню рун и т.д.) ...

        }
    });
    
    
    // 4. Управляем стрелочками навигации
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.style.visibility = (currentIdx === 0) ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = (currentIdx === volumeOrder.length - 1) ? 'hidden' : 'visible';
    
   
    
    // Закрываем выпадающее меню рун
    const menu = document.getElementById('kalevala-overlay-menu');
    if (menu) menu.classList.remove('open');
    const chevron = document.querySelector('.dropdown-chevron');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
}

/* --- Перелистывание стрелочками комикса (+1 вперед, -1 назад) --- */
function navigateRune(direction) {
    let newIdx = currentIdx + direction;
    if (newIdx >= 0 && newIdx < volumeOrder.length) {
        selectRune(volumeOrder[newIdx]);
    }
}

/* --- Открытие/закрытие выпадающего списка рун --- */
function toggleRuneMenu() {
    const menu = document.getElementById('kalevala-overlay-menu');
    if (!menu) return;
    
    menu.classList.toggle('open');
    
    const chevron = document.querySelector('.dropdown-chevron');
    if (chevron) {
        if (menu.classList.contains('open')) {
            chevron.style.transform = 'rotate(180deg)';
        } else {
            chevron.style.transform = 'rotate(0deg)';
        }
    }
}


/* ==========================================================================
   2. ГЛОБАЛЬНЫЕ ИНТЕРФЕЙСНЫЕ ФУНКЦИИ (ДЛЯ ВСЕХ СТРАНИЦ)
   ========================================================================== */

/* --- Главное бургер-меню сайта --- */
function toggleMenu() {
    const menu = document.getElementById('overlay-menu');
    if (menu) {
        menu.classList.toggle('open'); 
    }
}

/* --- Переключение карточек персонажей --- */
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

/* --- Переключение исторических маршрутов --- */
function switchRoute(year, element) {
    document.querySelectorAll('.route-layer').forEach(r => r.classList.remove('active'));
    document.querySelectorAll('[class^="date-item"]').forEach(d => d.classList.remove('active'));

    const targetRoute = document.getElementById('route-' + year);
    if (targetRoute) targetRoute.classList.add('active');
    if (element) element.classList.add('active');
}

/* --- Карточки-перевертыши слов --- */
function toggleWord(card) {
    card.classList.toggle('flipped');
}

/* --- Диалоговые баблы --- */
function toggleKalevalaBubble(target) {
    if (target === 'vaina') {
        const b1 = document.getElementById('bubble-vaina-1');
        const b2 = document.getElementById('bubble-vaina-2');
        if (b1) b1.classList.toggle('active');
        if (b2) b2.classList.toggle('active');
    } else {
        const b = document.getElementById('bubble-' + target);
        if (b) b.classList.toggle('active');
    }
}

/* --- Музыкальный слайдер (Граммофон) --- */
let currentSlideIndex = 0;
function moveSlider(direction) {
    const viewport = document.getElementById('musicSlider');
    const slides = document.querySelectorAll('.music-slide');
    if (!viewport || slides.length === 0) return;

    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

    const offset = viewport.clientWidth * currentSlideIndex;
    viewport.scrollTo({ left: offset, behavior: 'smooth' });
}

/* --- Интерактивная карта Калевалы --- */
let currentMapSlideIndex = 0;
const slideToMapRoute = [4, 2, 3, null, 5, 4, 6];

function changeMapPicture(mapNumber) {
    if (mapNumber === null) return; 
    const mapImage = document.getElementById('mainMapImage');
    if (!mapImage) return;

    mapImage.style.opacity = '0.3'; 
    setTimeout(() => {
        mapImage.src = `картинки/карта калевала${mapNumber}.png`;
        mapImage.style.opacity = '1'; 
    }, 150);
}

function selectPlace(slideIndex, mapNumber) {
    changeMapPicture(mapNumber);
    currentMapSlideIndex = slideIndex;
    updateMapSliderPosition();
}

function moveMapSlider(direction) {
    const slides = document.querySelectorAll('.map-slide-card');
    if (slides.length === 0) return;

    currentMapSlideIndex += direction;
    if (currentMapSlideIndex >= slides.length) currentMapSlideIndex = 0;
    if (currentMapSlideIndex < 0) currentMapSlideIndex = slides.length - 1;

    const associatedMapNumber = slideToMapRoute[currentMapSlideIndex];
    changeMapPicture(associatedMapNumber);
    updateMapSliderPosition();
}

function updateMapSliderPosition() {
    const viewport = document.getElementById('mapSlider');
    const track = viewport ? viewport.querySelector('.map-slider-track') : null;
    if (!viewport || !track) return;

    const offset = viewport.clientWidth * currentMapSlideIndex;
    track.style.transform = `translateX(-${offset}px)`;
}


/* ==========================================================================
   3. ИНИЦИАЛИЗАЦИЯ И СЛУШАТЕЛИ ПРИ ЗАГРУЗКЕ DOM (БЕЗОПАСНЫЕ БЛОКИ)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script fully loaded and DOM ready');

    // А) Автоматический запуск первой руны (работает только на странице пересказа)
    if (document.querySelector('.rune-volume')) {
        selectRune(volumeOrder[currentIdx]);
    }

    // Б) Анимация проявления блоков при скролле
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-on-scroll').forEach(el => revealObserver.observe(el));

    // В) Параллакс эффект для Главного экрана (Hero)
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
        hero.classList.add('loaded');
    }

    // Г) Кнопка возврата "НАВЕРХ"
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.style.display = (window.scrollY > 300) ? "block" : "none";
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Д) Интерактивные точки на Кантеле
    const infoBox = document.querySelector('.kantele-info-box');
    const infoText = document.getElementById('kantele-text');
    if (infoBox && infoText) {
        const descriptions = {
            korpus: "<b>Корпус:</b> Традиционно выдолблен из единого куска дерева — березы, сосны или поющей лесной ели.",
            deka: "<b>Резонаторное отверстие:</b> Вырезалось в форме сердца, креста <br> или круга. Считалось, что через него «вылетает душа» песни.",
            otverstie: "<b>Дека:</b> Верхняя часть инструмента. Ей уделялось особое внимание, <br> ведь именно она отражает и усиливает звук рун.",
            struny: "<b>Струны:</b> В древности изготавливались из конского волоса — об этом сложено немало <br> карельских легенд. Позже их заменили на металлические.",
            kolki: "<b>Колки:</b> Деревянные элементы для натяжения струн. Каждый колок <br> тщательно вытачивался мастером вручную."
        };

        infoBox.classList.add('visible');

        document.querySelectorAll('.hotspot').forEach(spot => {
            spot.addEventListener('click', function() {
                const infoKey = this.getAttribute('data-info');
                infoBox.classList.remove('visible');
                setTimeout(() => {
                    if (descriptions[infoKey]) {
                        infoText.innerHTML = descriptions[infoKey];
                    }
                    infoBox.classList.add('visible');
                }, 200); 
            });
        });
    }

    // Е) Слайдер исполнителей рун (карточки)
    const musicCards = document.querySelectorAll(".music-card");
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");
    
    if (musicCards.length > 0 && prevBtn && nextBtn) {
        let currentCardIndex = 0;
        function changeCard(newIndex) {
            musicCards[currentCardIndex].classList.remove("active");
            if (newIndex >= musicCards.length) currentCardIndex = 0;
            else if (newIndex < 0) currentCardIndex = musicCards.length - 1;
            else currentCardIndex = newIndex;
            musicCards[currentCardIndex].classList.add("active");
        }
        nextBtn.addEventListener("click", () => changeCard(currentCardIndex + 1));
        prevBtn.addEventListener("click", () => changeCard(currentCardIndex - 1));
    }

    // Ж) Звуковой эффект шуршания винила при ховере
    const musicCardSingle = document.querySelector('.music-card');
    if (musicCardSingle) {
        const audio = new Audio('звуки/vinyl_scratch.mp3');
        musicCardSingle.addEventListener('mouseenter', () => {
            audio.currentTime = 0;
            audio.play().catch(() => console.log("Интеракция со звуком заблокирована браузером до первого клика."));
        });
        musicCardSingle.addEventListener('mouseleave', () => {
            audio.pause();
        });
    }
});