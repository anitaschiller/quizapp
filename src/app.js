/*

// Button 1

const button1 = document.querySelector('.button1');
const answer1 = document.querySelector('.answer1');

button1.addEventListener('click', () => {
    answer1.classList.toggle('hidden')
})

// Button 2

const button2 = document.querySelector('.button2');
const answer2 = document.querySelector('.answer2');

button2.addEventListener('click', () => {
    answer2.classList.toggle('hidden')
})

// Button 3

const button3 = document.querySelector('.button3');
const answer3 = document.querySelector('.answer3');

button3.addEventListener('click', () => {
    answer3.classList.toggle('hidden')
})

// Button 4

const button4 = document.querySelector('.button4');
const answer4 = document.querySelector('.answer4');

button4.addEventListener('click', () => {
    answer4.classList.toggle('hidden')
})

// Button 5

const button5 = document.querySelector('.button5');
const answer5 = document.querySelector('.answer5');

button5.addEventListener('click', () => {
    answer5.classList.toggle('hidden')
})

*/

const buttons = document.querySelectorAll('.card__button');

buttons.forEach(button =>
    button.addEventListener('click', () => {
        const answer = button.parentNode.querySelector('.card__answer');
        answer.classList.toggle('hidden');
        button.innerText = answer.classList.contains('hidden') ? 'Show Answer' : 'Hide Answer';
    }))



const bookmarks = document.querySelectorAll('.card__bookmark');

bookmarks.forEach(bookmark =>
    bookmark.addEventListener('click', () => {
        bookmark.classList.toggle('far')
        bookmark.classList.toggle('fas')
    }))