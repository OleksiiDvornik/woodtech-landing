// "Up" button animation

function scrollOnTop () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

const upButton = document.querySelector('.footer__button');

upButton.addEventListener('mouseover', () => upButton.classList.add('animated'));
upButton.addEventListener('mouseout', () => upButton.classList.remove('animated'));
upButton.addEventListener('click', scrollOnTop)
