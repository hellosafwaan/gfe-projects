const textAreaDefault = document.querySelector("#textarea-default")
const textareaCounter = document.querySelector('.textarea-group__character-count')
textAreaDefault.addEventListener('input', (event) => {
  const characterCount = event.target.value.length;
  textareaCounter.textContent = `${characterCount}/500`
  let textAreaGroup = event.target.closest('.textarea-group')
  if(characterCount > 500) {
    textAreaGroup.classList.add('textarea-group--exceeded');
  } else {
    textAreaGroup.classList.remove('textarea-group--exceeded');
  }
})