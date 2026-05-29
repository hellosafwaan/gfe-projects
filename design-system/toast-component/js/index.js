function showToast(duration = 7500) {
    const toastElement = document.querySelector("#toast-demo");
    toastElement.classList.add('show')

    setTimeout(() => {
        toastElement.classList.remove('show');
        toastElement.classList.add('hide');
    }, duration)

    toastElement.addEventListener('transitionend', () => {
        if (toastElement.classList.contains('hide')) {
            toastElement.classList.remove('hide');
        }
    });
}