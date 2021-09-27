// Local Storage

const getQuestions = () => {
  let questions;

  if (localStorage.getItem('questions')) {
    questions = JSON.parse(localStorage.getItem('questions'));
  } else {
    questions = [
      {
        question: 'Question 1',
        answer: 'Answer 1',
        tags: 'tag1, tag2, tag3, tag4',
        isBookmarked: false,
      },
      {
        question: 'Question 2',
        answer: 'Answer 2',
        tags: 'tag1, tag2, tag3, tag4, tag5, tag6',
        isBookmarked: true,
      },
    ]; // <-- initial value goes here
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  return questions;
};

const setQuestions = (newQuestions) => {
  localStorage.setItem('questions', JSON.stringify(newQuestions));
};

// Weitere Funktionen

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
    setQuestions(array);
  });
}

function changeButtonText(button, answer) {
  button.innerText = answer.classList.contains('hidden')
    ? 'Show Answer'
    : 'Hide Answer';
}

// Navigation Single Page App
const navigationItems = document.querySelectorAll('a');
const pages = document.querySelectorAll('.page');

navigationItems.forEach((navigationItem) => {
  navigationItem.addEventListener('click', (event) => {
    pages.forEach((page) => {
      page.classList.remove('current');
    });
    const hrefAttribute = event.target.getAttribute('href');
    const currentPage = document.querySelector(hrefAttribute);
    currentPage.classList.add('current');
  });
});

// Save form input in global variable

let questions = getQuestions();

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  const newQuestion = {
    question: form.elements.question.value, //gibt Input Element mit dem Namen question aus
    answer: form.elements.answer.value,
    tags: form.elements.tags.value,
    isBookmarked: false,
  };
  questions.push(newQuestion);
  renderQuestions();
  form.reset();
  setQuestions(questions);
  event.preventDefault();
});

// Create Questions via form

const createTagListHtml = (tags) => {
  let tagsHtml = '';
  tags.forEach((tag) => {
    tagsHtml = tagsHtml + `<li>${tag}</li>`;
  });
  return tagsHtml;
};

const createQuestionsHtml = (questions) => {
  let html = '';

  questions.forEach((question, index) => {
    const tags = question.tags.split(', ');
    const tagsHtml = createTagListHtml(tags);
    const bookmarkedClass = question.isBookmarked ? 'fas' : '';

    html =
      html +
      `
    <section class="card">
      <i class="card__bookmark fa-bookmark far ${bookmarkedClass}" data-index=${index}></i>
      <p class="card__paragraph">
        ${question.question}
      </p>
      <button class="card__button" data-index=${index}>Show Answer</button>
      <p class="card__paragraph answer hidden">${question.answer}</p>
      <ul class="card__tags">${tagsHtml}</ul>
    </section>`;
  });

  return html;
};

const renderQuestions = () => {
  const cardContainer = document.querySelector('.card__container');
  const cardContainerBookmarked = document.querySelector(
    '.card__container_bookmarked'
  );
  const bookmarkedQuestions = questions.filter((question) => {
    return question.isBookmarked;
  });

  const allQuestionsHtml = createQuestionsHtml(questions);
  const bookmarkedQuestionsHtml = createQuestionsHtml(bookmarkedQuestions);

  cardContainer.innerHTML = allQuestionsHtml;
  cardContainerBookmarked.innerHTML = bookmarkedQuestionsHtml;

  const bookmarks = document.querySelectorAll('.card__bookmark');
  bookmarks.forEach((bookmark) => toggleBookmark(bookmark, questions));

  const buttons = document.querySelectorAll('.card__button');
  buttons.forEach(toggleAnswer);
};

renderQuestions();

export { setQuestions };
