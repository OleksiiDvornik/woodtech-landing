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

// Sub slider

const advSlider = new Swiper('.sub-slider', { 
    speed: 1400,
    effect: 'fade',
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    }
});
