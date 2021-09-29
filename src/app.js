// Functions Local Storage

const getQuestions = () => {
  let questions;

  if (localStorage.getItem('questions')) {
    questions = JSON.parse(localStorage.getItem('questions'));
  } else {
    questions = [
      {
        id: 0,
        question: 'Question 1',
        answer: 'Answer 1',
        tags: 'tag1, tag2, tag3, tag4',
        isBookmarked: false,
      },
      {
        id: 1,
        question: 'Question 2',
        answer: 'Answer 2',
        tags: 'tag1, tag2, tag3, tag4, tag5, tag6',
        isBookmarked: true,
      },
    ];
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  return questions;
};

const setQuestions = (newQuestions) => {
  localStorage.setItem('questions', JSON.stringify(newQuestions));
};

//Function Toggle Bookmark
function toggleBookmark(bookmark, questions) {
  bookmark.addEventListener('click', () => {
    const id = bookmark.dataset.id;
    const questionToToggle = questions.find((question) => question.id == id);
    questionToToggle.isBookmarked = !questionToToggle.isBookmarked;
    bookmark.classList.toggle('fas');
    setQuestions(questions);
    renderQuestions(); //wir haben was am questions array verädert => Karten müssen neu gerendered werden, um aktuellen Stand zu zeigen
  });
}

// Function Toggle Answer after button click
function toggleAnswer(button) {
  button.addEventListener('click', () => {
    const answer = button.parentNode.querySelector('.answer');
    answer.classList.toggle('hidden');
  });
}

// Function Button Text: Show -> Hide Answer
function changeButtonText(button) {
  button.addEventListener('click', () => {
    const answer = button.parentNode.querySelector('.answer');
    button.innerHTML = answer.classList.contains('hidden')
      ? 'Show Answer'
      : 'Hide Answer';
  });
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

// Save form input in questions Array
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  const questions = getQuestions();
  const newQuestion = {
    id: questions.length, //id-Nummerierung fängt bei 0 an, neue Frage soll bei z.B. bereits zwei Einträgen in der Liste (mit den ids 0 und 1) die id 2 haben
    question: form.elements.question.value, //gibt Input Element mit dem Namen question aus
    answer: form.elements.answer.value,
    tags: form.elements.tags.value,
    isBookmarked: false,
  };
  questions.push(newQuestion);
  setQuestions(questions);

  renderQuestions();
  form.reset();
  event.preventDefault();
});

// Functions :Create Questions via form input
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
      <i class="card__bookmark fa-bookmark far ${bookmarkedClass}" data-id=${question.id}></i>
      <p class="card__paragraph">
        ${question.question}
      </p>
      <button class="card__button" data-id=${question.id}>Show Answer</button>
      <p class="card__paragraph answer hidden">${question.answer}</p>
      <ul class="card__tags">${tagsHtml}</ul>
    </section>`;
  });

  return html;
};

// Function: Rendering the questions
const renderQuestions = () => {
  // Variables "Home" page
  const questions = getQuestions();
  const cardContainer = document.querySelector('.card__container');
  const allQuestionsHtml = createQuestionsHtml(questions);

  // Variables "Bookmarked" page
  const bookmarkedQuestions = questions.filter((question) => {
    return question.isBookmarked;
  });
  const cardContainerBookmarked = document.querySelector(
    '.card__container_bookmarked'
  );
  const bookmarkedQuestionsHtml = createQuestionsHtml(bookmarkedQuestions);

  // Paint cards on the "Home" and "Bookmarks" page
  cardContainer.innerHTML = allQuestionsHtml;
  cardContainerBookmarked.innerHTML = bookmarkedQuestionsHtml;

  // Add Event Listeners
  const bookmarks = document.querySelectorAll('.card__bookmark');
  bookmarks.forEach((bookmark) => toggleBookmark(bookmark, questions));

  const buttons = document.querySelectorAll('.card__button');
  buttons.forEach((button) => toggleAnswer(button));
  buttons.forEach((button) => changeButtonText(button));
};

renderQuestions();
