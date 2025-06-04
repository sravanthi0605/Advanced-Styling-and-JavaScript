// Handle all three quiz questions and color feedback
function checkAllQuizzes() {
  const results = [
    { name: "q1", resultId: "quizResult", questionId: "quiz" },
    { name: "q2", resultId: "quizResult2", questionId: "quiz2" },
    { name: "q3", resultId: "quizResult3", questionId: "quiz3" }
  ];

  results.forEach(item => {
    const options = document.getElementsByName(item.name);
    let resultText = "Please select an answer.";
    let isCorrect = false;
    for (const opt of options) {
      if (opt.checked) {
        if (opt.value === "correct") {
          resultText = "Correct! 🎉";
          isCorrect = true;
        } else {
          resultText = "Incorrect. Try again.";
          isCorrect = false;
        }
        break;
      }
    }
    const resultElement = document.getElementById(item.resultId);
    resultElement.innerText = resultText;

    // Color the feedback text green for correct, red for incorrect
    if (isCorrect) {
      resultElement.classList.add("correct-answer");
      resultElement.classList.remove("incorrect-answer");
    } else {
      resultElement.classList.add("incorrect-answer");
      resultElement.classList.remove("correct-answer");
    }

    // Color the question text red (always)
    const questionElement = document.querySelector(`#${item.questionId} p.question-text`);
    if (questionElement) {
      questionElement.style.color = "red";
    }
  });
}

// Fetch quote from API with animation
function fetchQuote() {
  const quoteBox = document.getElementById("quoteBox");

  // Remove animation class before updating
  quoteBox.classList.remove("animated");

  fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
      quoteBox.innerText = `"${data.content}" — ${data.author}`;
      setTimeout(() => quoteBox.classList.add("animated"), 100);
    })
    .catch(() => {
      quoteBox.innerText = "Failed to fetch quote. Try again.";
    });
}

// Live Time Clock
function updateTime() {
  const now = new Date();
  document.getElementById("liveTime").innerText = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);

// Dark Mode Toggle
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}
