const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language"
    ],
    answer: 0,
    explanation: "HTML means HyperText Markup Language. It defines the structure of a web page."
  },
  {
    question: "Which language is mainly used to style web pages?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: 1,
    explanation: "CSS controls the appearance and layout of HTML elements."
  },
  {
    question: "Which symbol starts a single-line comment in JavaScript?",
    options: ["<!--", "//", "##", "**"],
    answer: 1,
    explanation: "A JavaScript single-line comment starts with two forward slashes: //."
  },
  {
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["const", "static", "let", "class"],
    answer: 2,
    explanation: "let declares a block-scoped variable whose value can be reassigned."
  },
  {
    question: "Which command writes a message to the browser console?",
    options: ["print()", "console.log()", "show()", "echo()"],
    answer: 1,
    explanation: "console.log() is commonly used to display debugging information in the console."
  },
  {
    question: "Which HTML element creates a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
    explanation: "The anchor element, written as <a>, creates a hyperlink using its href attribute."
  },
  {
    question: "Which CSS property changes the colour of text?",
    options: ["font-style", "background-color", "color", "text-size"],
    answer: 2,
    explanation: "The CSS color property sets the foreground colour of text."
  },
  {
    question: "Which array method adds an item to the end of an array?",
    options: ["push()", "pop()", "shift()", "slice()"],
    answer: 0,
    explanation: "push() adds one or more items to the end of an array."
  },
  {
    question: "Which keyword is used to declare a variable that cannot be reassigned?",
    options: ["let", "var", "const", "new"],
    answer: 2,
    explanation: "const prevents reassignment of the variable binding after it has been initialized."
  },
  {
    question: "Which event is commonly used to respond to a button press?",
    options: ["change", "click", "load", "resize"],
    answer: 1,
    explanation: "The click event runs a handler when the user clicks an element."
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswers = Array(questions.length).fill(null);

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progress = document.getElementById("progress");
const progressTrack = document.querySelector(".progress-track");
const feedback = document.getElementById("feedback");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const themeToggle = document.getElementById("theme-toggle");

function showQuestion() {
  const current = questions[currentQuestion];

  questionElement.textContent = current.question;
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreElement.textContent = `Score: ${score}`;

  const progressPercent = (currentQuestion / questions.length) * 100;
  progress.style.width = `${progressPercent}%`;
  progressTrack.setAttribute("aria-valuenow", String(progressPercent));

  answerButtons.replaceChildren();
  feedback.textContent = "";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1
    ? "See Results →"
    : "Next Question →";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (selectedAnswers[currentQuestion] !== null) return;

  const current = questions[currentQuestion];
  selectedAnswers[currentQuestion] = selectedIndex;

  if (selectedIndex === current.answer) {
    score += 1;
    feedback.textContent = `Correct! ${current.explanation}`;
  } else {
    feedback.textContent = `Not quite. ${current.explanation}`;
  }

  Array.from(answerButtons.children).forEach((button, index) => {
    button.disabled = true;

    if (index === current.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  scoreElement.textContent = `Score: ${score}`;
  nextButton.disabled = false;
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);
  const previousBest = Number(localStorage.getItem("javascriptQuizBest") || 0);
  const bestScore = Math.max(score, previousBest);
  localStorage.setItem("javascriptQuizBest", String(bestScore));

  const summary = document.createElement("div");
  summary.className = "result-summary";

  const heading = document.createElement("p");
  heading.className = "eyebrow";
  heading.textContent = "QUIZ COMPLETED";

  const scoreHeading = document.createElement("h2");
  scoreHeading.textContent = `Your Score: ${score}/${questions.length}`;

  const percentageText = document.createElement("p");
  percentageText.className = "result-score";
  percentageText.textContent = `${percentage}%`;

  const message = document.createElement("p");
  message.className = "result-message";
  message.textContent = percentage >= 80
    ? "Excellent work! You have a strong understanding of these topics."
    : percentage >= 50
      ? "Good effort! Review the explanations and keep practising."
      : "Keep practising. Review the answers and try again.";

  const best = document.createElement("p");
  best.className = "best-score";
  best.textContent = `Best score: ${bestScore}/${questions.length}`;

  summary.append(heading, scoreHeading, percentageText, message, best);

  const reviewHeading = document.createElement("h3");
  reviewHeading.className = "review-title";
  reviewHeading.textContent = "Answer Review";

  const reviewList = document.createElement("div");

  questions.forEach((item, index) => {
    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";

    const questionText = document.createElement("strong");
    questionText.textContent = `${index + 1}. ${item.question}`;

    const yourAnswer = document.createElement("p");
    const chosen = selectedAnswers[index];
    yourAnswer.textContent = `Your answer: ${chosen === null ? "Not answered" : item.options[chosen]}`;

    const correctAnswer = document.createElement("p");
    correctAnswer.textContent = `Correct answer: ${item.options[item.answer]}`;
    correctAnswer.className = chosen === item.answer ? "review-correct" : "review-wrong";

    reviewItem.append(questionText, yourAnswer, correctAnswer);
    reviewList.appendChild(reviewItem);
  });

  const actions = document.createElement("div");
  actions.className = "result-actions";

  const restartButton = document.createElement("button");
  restartButton.type = "button";
  restartButton.className = "primary-btn";
  restartButton.textContent = "↻ Restart Quiz";
  restartButton.addEventListener("click", restartQuiz);

  actions.appendChild(restartButton);
  resultScreen.replaceChildren(summary, reviewHeading, reviewList, actions);

  progress.style.width = "100%";
  progressTrack.setAttribute("aria-valuenow", "100");
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswers = Array(questions.length).fill(null);
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

nextButton.addEventListener("click", () => {
  if (selectedAnswers[currentQuestion] === null) return;

  currentQuestion += 1;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const darkModeEnabled = document.body.classList.contains("dark-mode");
  themeToggle.textContent = darkModeEnabled ? "☀️ Light Mode" : "🌙 Dark Mode";
  themeToggle.setAttribute(
    "aria-label",
    darkModeEnabled ? "Switch to light theme" : "Switch to dark theme"
  );
});

showQuestion();
