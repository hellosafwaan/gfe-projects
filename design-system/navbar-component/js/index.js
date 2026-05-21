const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.navbar__hamburger');
const closeButton = document.querySelector('.mobile-menu__close');

const focusableSelectors = 'a[href], button:not([disabled])';

function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    closeButton.focus();
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
}

hamburger.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
    }
});

mobileMenu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusable = [...mobileMenu.querySelectorAll(focusableSelectors)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
});
