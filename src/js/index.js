const buttons = document.querySelectorAll('.card__button');

// **Variante 1**

/* 
const answers = document.querySelectorAll('.card__answer');

buttons.forEach(tton, index) => {
  button.addEventListener('click', () => {
    answers[index].classList.toggle('hidden');
  });
}); 
*/

// **Variante 2**

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.parentNode.querySelector('.card__answer');
    answer.classList.toggle('hidden');
  });
});

// Bookmark Toggle
const bookmarks = document.querySelectorAll('.card__bookmark');
bookmarks.forEach((bookmark) => {
  bookmark.addEventListener('click', () => {
    bookmark.classList.toggle('far');
    bookmark.classList.toggle('fas');
  });
});
