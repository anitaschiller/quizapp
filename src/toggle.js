function toggleAnswer(button) {
  button.addEventListener('click', () => {
    const answer = button.parentNode.querySelector('.answer');
    answer.classList.toggle('hidden');

    changeButtonText(button, answer);
  });
}

function toggleBookmark(bookmark, array) {
  bookmark.addEventListener('click', () => {
    const index = bookmark.dataset.index;
    array[index].isBookmarked = !array[index].isBookmarked;
    bookmark.classList.toggle('fas');
  });
}

function changeButtonText(button, answer) {
  button.innerText = answer.classList.contains('hidden')
    ? 'Show Answer'
    : 'Hide Answer';
}

function visualizeRightAnswer(button) {
  const rightAnswer = button.parentNode.querySelector('.right-answer');
  rightAnswer.classList.toggle('bigger');
}

export { toggleAnswer, toggleBookmark, changeButtonText, visualizeRightAnswer };
