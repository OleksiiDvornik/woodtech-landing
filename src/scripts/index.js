// Burger menu

const burgerMenu = document.querySelector('.menu__burger');
const menuContent = document.querySelector('.menu__content');

burgerMenu.addEventListener("click", function () {
    burgerMenu.classList.toggle('active');
    menuContent.classList.toggle('active');
    document.body.classList.toggle('lock');
});

// Main slider

const mainSlider = new Swiper('.header__slider', {
    speed: 800,
	effect: 'fade',
    loop: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            let indT = total >= 10 ? total : `0${total}`
            let indC = current >= 10 ? current : `0${current}`
            return `<span class="slider__control-pages-current">${indC}</span>
                    <span class="slider__control-pages-separator"></span>
                    <span class="slider__control-pages-all">${indT}</span>`
        }
    },
    navigation: {
        nextEl: '.slider__control-navigation-next',
        prevEl: '.slider__control-navigation-prev',
    },
    scrollbar: {
        el: '.slider__control-scrollbar',
        draggable: true
    },
});
