
function beginQuiz(questionNumber) {
  $('.start-form').on('click', '.start-button', function(event) {
    event.preventDefault();
    // Remove the intro div
    $('.quiz-intro').remove();
    // Make the first question visible
    $('.questionAnswer').css('display', 'block');
    $('.qNum').text(questionNumber + 1);
    //retrieveAnswer();
  });
}

function renderQuestion(questionNumber, score) {
  // Appending question html to questionAnswer div
  $('.questionAnswer').append(`<section class="row" role="region">
    <img src="${STORE[questionNumber].image}" alt="${STORE[questionNumber].alt}" width=${STORE[questionNumber].width} class="centered col-12">
  </section>
  <section class="question-div div-colors centered col-12" role="region">
    <form>
      <fieldset>
        <legend>${STORE[questionNumber].question}</legend>
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="a" id="a" class="block-answer" required>
        <label class="block-answer" for="a">${STORE[questionNumber].answers[0]} </label>
        <br>
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="a" id="a" class="block-answer" required>    
        <label class="block-answer" for="a">${STORE[questionNumber].answers[1]}
        </label>
        <br>
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="a" id="a" class="block-answer" required>
        <label class="block-answer" for="a">${STORE[questionNumber].answers[2]} 
        </label>
        <br>
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="a" id="a" class="block-answer" required>
        <label class="block-answer" for="a">${STORE[questionNumber].answers[3]}
        </label>
        <br>
      </fieldset>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </section>`);
  retrieveAnswer(questionNumber, score);
}

// Getting answer from the user and determining whether it's correct
function retrieveAnswer(questionNumber, score) {
  $('form').on('submit', function(event) {
    event.preventDefault();
    const selectedButton = $('input:checked');
    const userAnswer = selectedButton.val();
    const correctA = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswer').empty();
    if (userAnswer === correctA) {
      renderCorrectFeedback(questionNumber, score);
      score++;
    }
    else {
      renderIncorrectFeedback(questionNumber);
    }
    nextQuestion(questionNumber, score);
  });
}

// Render feedback for a correct answer, incrementing the score
function renderCorrectFeedback(questionNumber, score) {
  $('.questionAnswer').append(`<section class="row" role="region">
    <img src="${STORE[questionNumber].image}" alt="${STORE[questionNumber].alt}" width=${STORE[questionNumber].width} class="centered col-12">
  </section>
  <form class="feedback-form div-colors centered col-12">
    <p>Correct!</p>
    <button type="button" class="next-button">Next</button>
  </form>`);
  $('.score').text(score + 1);
}

// Render feedback for an incorrect answer
function renderIncorrectFeedback(questionNumber) {
  $('.questionAnswer').append(`<section class="row" role="region">
    <img src="${STORE[questionNumber].image}" alt="${STORE[questionNumber].alt}" width=${STORE[questionNumber].width} class="centered col-12">
  </section>
  <form class="feedback-form div-colors centered col-12">
    <p>Sorry, that's not correct.</p>
    <p>The correct answer is "${STORE[questionNumber].correctAnswer}."</p>
    <button type="button" class="next-button">Next</button>
  </form>`);
}

// Move on to the next question when "Next" is clicked or go to the final results page
function nextQuestion(questionNumber, score) {
  $('.feedback-form').on('click', '.next-button', function(event) {
    $('.questionAnswer').empty();
    if (questionNumber < 9) {
      questionNumber++;
      $('.qNum').text(questionNumber + 1);
      renderQuestion(questionNumber, score);
    }
    else {
      endOfQuiz(questionNumber, score);
    }
  });
}

// Display feedback based on how the user did
function endOfQuiz(questionNumber, score) {
  if (score > 8) {
    $('.questionAnswer').append(`<section class="row" role="region">
      <section class="feedback-form div-colors centered col-12" role="region">
        <p>Great job! You're well on your way to being an art historian. Your score is ${score} points.  You got ${score}/10 questions right.</p>
        <form>
          <button type="submit" class="retake-button">Retake quiz</button>
        </form>
      </section>
    </section>`);
  }
  else if (score > 5) {
    $('.questionAnswer').append(`<section class="row" role="region">
      <section class="feedback-form div-colors centered col-12" role="region">
        <p>Nice work- you clearly enjoy art. Your score is ${score} points.  You got ${score}/10 questions right.</p>
        <form>
          <button type="submit" class="retake-button">Retake quiz</button>
        </form>
      </section>
    </section>`);
  }
  else if (score == 1) {
    $('.questionAnswer').append(`<section class="row" role="region">
      <section class="feedback-form div-colors centered col-12" role="region">
        <p>Keep studying and going to museums, and soon you'll ace the quiz! Your score is ${score} point.  You got ${score}/10 questions right.</p>
        <form>
          <button type="submit" class="retake-button">Retake quiz</button>
        </form>
      </section>
    </section>`);
  }
  else {
    $('.questionAnswer').append(`<section class="row" role="region">
      <section class="feedback-form div-colors centered col-12" role="region">
        <p>Keep studying and going to museums, and soon you'll ace the quiz! Your score is ${score} points.  You got ${score}/10 questions right.</p>
        <form>
          <button type="submit" class="retake-button">Retake quiz</button>
        </form>
      </section>
    </section>`);
  }
}

function runQuiz() {
  let questionNumber = 0;
  let score = 0;
  beginQuiz(questionNumber);
  renderQuestion(questionNumber, score);
}

$(runQuiz);