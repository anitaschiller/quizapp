function toggleAnswer(button) {
    button.addEventListener('click', () => {
        const answer = button.parentNode.querySelector('.card__answer');
        answer.classList.toggle('hidden');

        changeButtonText(button, answer)

        visualizeRightAnswer(button)
    })
}

function toggleBookmark(bookmark) {
    bookmark.addEventListener('click', () => {
        bookmark.classList.toggle('far')
        bookmark.classList.toggle('fas')
    })
}

function changeButtonText(button, answer) {
    button.innerText = answer.classList.contains('hidden') ? 'Show Answer' : 'Hide Answer';
}

function visualizeRightAnswer(button) {
    const rightAnswer = button.parentNode.querySelector('.right-answer')
    rightAnswer.classList.toggle('bigger');
}


export { toggleAnswer, toggleBookmark, changeButtonText, visualizeRightAnswer };
