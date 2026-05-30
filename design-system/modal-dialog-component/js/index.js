const triggerButton = document.querySelector(".trigger-button")
const closeIcon = document.querySelector(".modal__close")
const modalOverlayElement = document.querySelector('.modal-overlay')
const modal = document.getElementById('modal')
const modalTitle = document.getElementById('modal-title')
const modalDescription = document.getElementById('modalDescription')
const modalAction = document.getElementById('modalPrimaryAction')
const modalCancelButton = document.getElementById('modalCancelAction')

function showModal(variant, title, description) {
	modalTitle.textContent = title;
	modalDescription.textContent = description;

	modalAction.classList.add(`btn--${variant}`)
	modalAction.textContent = variant === 'primary' ? 'Yes' : 'Delete';

	modal.setAttribute('aria-hidden', 'false');

	modalOverlayElement.classList.add('show')
}

function closeModal() {
	modal.setAttribute('aria-hidden', 'true')
	modalOverlayElement.classList.remove('show')
}

closeIcon.addEventListener('click', closeModal)
modalCancelButton.addEventListener('click', closeModal)
triggerButton.addEventListener('click', () => {
	showModal(
	'primary',
	'Are you sure you want to leave the process?',
	'Your upgrade plan process will be cancelled. You need to start again if you leave the process.',
)
})

modalOverlayElement.addEventListener('click', (event) => {
  if (event.target === modalOverlayElement) {
    closeModal()
  }
})

showModal(
	'primary',
	'Are you sure you want to leave the process?',
	'Your upgrade plan process will be cancelled. You need to start again if you leave the process.',
)
