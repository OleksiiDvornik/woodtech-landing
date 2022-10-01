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

// Modal window

function ModalWindow(elements) {
    this.elements = elements;

    this.init = () => {
        const { modalElement, openButtons, form } = this.elements;
        openButtons.forEach(button => button.addEventListener('click', this.openModalWindow));
        modalElement.addEventListener('click', this.closeModalWindow);
        form.addEventListener('submit', this.submitModalForm);
    };

    this.openModalWindow = () => {
        const { modalElement, form } = this.elements;
        document.body.classList.add('lock');
        modalElement.classList.add('active');
        window.addEventListener('keydown', this.closeModalWindow);
    };

    this.closeModalWindow = (event) => {
        const { modalElement, closeButton, form} = this.elements;
        if (event.target === modalElement || 
            event.target === closeButton ||
            event.target === form ||
            event.code === 'Escape') {
            modalElement.classList.remove('active');
            document.body.classList.remove('lock');
            window.removeEventListener('keydown', this.closeModalWindow);
        };
    };

    this.submitModalForm = (event) => {
        const { form } = this.elements;
        event.preventDefault();
        const data = {
            name: form.name.value,
            phone: form.phone.value,
            comment: form.comments.value
        }
        console.log(data); 
        form.name.value = '';
        form.phone.value = '';
        form.comments.value = '';
        this.closeModalWindow(event);
    };
};

const elements = {
    modalElement: document.querySelector('[data-id="modalWindow"]'),
    openButtons: document.querySelectorAll('[data-id="modalOpen"]'),
    closeButton: document.querySelector('[data-id="modalClose"]'),
    form: document.querySelector('.modal__form')
}

const modalWindow = new ModalWindow(elements);

modalWindow.init();
