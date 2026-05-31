const dropdownTriggerElement = document.querySelector('.dropdown__trigger')
const dropdownMenuElement = document.querySelector('.dropdown__menu')
const dropdownItemElements = document.querySelectorAll('.dropdown__item')


const closeDropdown = () => {
	dropdownMenuElement.classList.remove('show')
	dropdownTriggerElement.setAttribute('aria-expanded', 'false')
}

const selectItem = (item) => {
	dropdownItemElements.forEach((element) => {
		element.classList.remove('dropdown__item--selected')
		element.setAttribute('aria-selected', 'false')
	})
	item.classList.add('dropdown__item--selected')
	item.setAttribute('aria-selected', 'true')
	closeDropdown()
}

dropdownTriggerElement.addEventListener('click', () => {
  dropdownMenuElement.classList.toggle('show');
  const isOpen = dropdownMenuElement.classList.contains('show');
  dropdownTriggerElement.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
})

dropdownTriggerElement.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDropdown();
  }
});


dropdownMenuElement.addEventListener('click', (event) => {
	const item = event.target.closest('.dropdown__item')
	if(!item) return;
	selectItem(item)

})

dropdownMenuElement.addEventListener('keydown', (event) => {
	const currentFocusedElement = document.activeElement
	const items = Array.from(dropdownItemElements);
	const index = items.indexOf(currentFocusedElement);
  if (event.key === 'ArrowDown') {
		if (index < items.length - 1) items[index + 1].focus();

  }
  if (event.key === 'ArrowUp') {
		if (index > 0) items[index - 1].focus();
  }
  if (event.key === 'Enter') {
		if (!currentFocusedElement) return;
		selectItem(currentFocusedElement)
  }
	if (event.key === 'Escape') {
		closeDropdown();
	}
});

document.addEventListener('click', (event) => {
  if (!dropdownMenuElement.contains(event.target) && !dropdownTriggerElement.contains(event.target)) {
    closeDropdown();
  }
});