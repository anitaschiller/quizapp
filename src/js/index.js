const buttons = document.querySelectorAll('.card__button');
const answers = document.querySelectorAll('.card__answer');

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    answers[index].classList.toggle('hidden');
  });
});
