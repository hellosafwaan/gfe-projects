const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.navbar__hamburger');
const closeButton = document.querySelector('.mobile-menu__close')

hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
})

closeButton.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
})