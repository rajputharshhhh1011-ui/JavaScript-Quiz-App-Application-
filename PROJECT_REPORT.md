# Project Report: JavaScript Quiz App

**Submitted by:** Md Adnan Ashraf  
**Project title:** JavaScript Quiz App  
**Technology stack:** HTML5, CSS3, JavaScript

## 1. Introduction

The JavaScript Quiz App is a browser-based application that allows users to answer multiple-choice questions about web-development fundamentals. It provides immediate feedback, tracks the score and displays a review after the quiz is completed.

## 2. Objectives

- Build an interactive web application using core front-end technologies.
- Practise DOM manipulation and JavaScript event handling.
- Display quiz questions and multiple-choice answers dynamically.
- Calculate and display the user's score.
- Create a responsive interface with light and dark themes.

## 3. Tools and technologies

| Tool / technology | Purpose |
|---|---|
| HTML5 | Defines the page structure |
| CSS3 | Provides layout, colours and responsive styling |
| JavaScript | Controls quiz logic and user interaction |
| Browser localStorage | Stores the best score on the same browser |

## 4. Main modules

1. **Question module:** Stores the questions, options, correct answers and explanations.
2. **Display module:** Shows the current question and its four options.
3. **Answer module:** Checks the selected answer and prevents multiple selections.
4. **Score module:** Updates the score and progress indicator.
5. **Result module:** Displays the final score, percentage and answer review.
6. **Theme module:** Switches between light and dark appearance.

## 5. Working process

1. The application loads the question data from `script.js`.
2. The first question and its options are displayed.
3. The user selects one option.
4. The app checks the selected option against the correct answer.
5. The score and feedback are updated.
6. The user moves to the next question.
7. After the final question, the result and answer review are displayed.
8. The best score is saved in browser localStorage.

## 6. Testing

| Test case | Expected result |
|---|---|
| Open `index.html` | Quiz screen appears |
| Select a correct option | Correct feedback and score update |
| Select an incorrect option | Correct option is highlighted |
| Try selecting a second option | Further selection is prevented |
| Click Next Question | Next question appears |
| Complete all questions | Final score and review appear |
| Click Restart Quiz | Quiz starts again from question one |
| Toggle theme | Light/dark appearance changes |
| Complete a quiz with a higher score | Best score is updated |

## 7. Advantages

- Simple and easy-to-use interface.
- Works directly in a modern browser.
- No backend or database setup is required.
- Responsive on mobile and desktop.
- Helps learners practise basic web-development concepts.

## 8. Limitations

- Questions are stored in the JavaScript file.
- The best score is stored only in the current browser.
- There is no login system or online leaderboard.

## 9. Future scope

- Add categories and difficulty levels.
- Add a countdown timer.
- Allow users to add their own questions.
- Add a backend and database for accounts and leaderboards.
- Add a larger question bank.

## 10. Conclusion

The JavaScript Quiz App demonstrates how HTML, CSS and JavaScript can be combined to create an interactive browser application. It provides practice with DOM manipulation, events, arrays, conditional logic and localStorage.
