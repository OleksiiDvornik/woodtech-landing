// Burger menu

const burgerMenu = document.querySelector('.menu__burger');
const menuContent = document.querySelector('.menu__content');

burgerMenu.addEventListener("click", function () {
    burgerMenu.classList.toggle('active');
    menuContent.classList.toggle('active');
    document.body.classList.toggle('lock');
});
