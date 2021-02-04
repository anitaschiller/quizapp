import { toggleAnswer, toggleBookmark, changeButtonText, visualizeRightAnswer } from './toggle.js';

const buttons = document.querySelectorAll('.card__button');
buttons.forEach(toggleAnswer)

const bookmarks = document.querySelectorAll('.card__bookmark');
bookmarks.forEach(toggleBookmark)