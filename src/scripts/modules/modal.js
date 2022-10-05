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
        const { modalElement } = this.elements;
        document.body.classList.add('lock');
        modalElement.classList.add('active');
        window.addEventListener('keydown', this.closeModalWindow);
    };

    this.closeModalWindow = (event) => {
        const { modalElement, closeButton } = this.elements;
        if (event.target === modalElement || 
            event.target === closeButton ||
            event.type === "submit" ||
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
