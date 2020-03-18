const app = {};

// cached selectors
const $buttons = $(".colourButton");
const $background = $("body");
const $colorValue = $("#colourValue");
const $answerMessage = $("#answer");
const $gamePage = $(".gamePage");
const $startPage = $(".startPage");
const $next = $(".nextQuestion");
const $final = $(".finalScore");
const $score = $(".finalScoreMessage");

// **** APP STARTING PAGE ****
app.landingPage = function() {
  $gamePage.hide();
  $final.hide();
};

// resets background to original color
const resetBackGround = () => {
  $background.attr("style", "background-color: #adadad");
};

// resets answerMessage under color $buttons to original message
const answerMessageReset = () => {
  $answerMessage.html("Choose carefully!");
};

// resets background color and answer message
const resetPlay = () => {
  resetBackGround();
  answerMessageReset();
};

// starts score at 0
let score = 0;

const resetScore = () => {
  score = 0;
  return score;
};

// Sets max number of questions played per round
const maxQuestions = 10;
let questionCounter = 0;

// Move user to next question. Called when "next color" button is clicked
const setNextQ = () => {
  resetPlay();
  questionCounter++;
  endGame();
};

// Function called when the correct answer is selected in each mode
const correctAnswer = function(colorValue) {
  score++;
  $answerMessage.html("Correct!");
  $background.css(`background-color`, colorValue); // changes bg colour to correct colour
  $buttons.css(`background-color`, colorValue); //changes all colour buttons to the correct colour
  $buttons.off("click"); // disables all answer buttons once one answer has been submitted
};

// Wrong answer function
const wrongAnswer = () => {
  $answerMessage.html("Wrong answer!");
  $buttons.css(`background-color`, `#adadad`); // changes all colour buttons to grey
  resetBackGround();
  $buttons.off("click"); // disables all answer buttons once one answer has been submitted
};

// Function called after user answers 10 questions; displays final score screen
const endGame = () => {
  if (questionCounter === maxQuestions) {
    $gamePage.hide();
    $final.show();
    $score.html(`Your final score is: </br>
    <span class="bold">${score} / 10</span>`);
  }
};

// resets questionCounter to 0
const resetCounter = () => {
  questionCounter = 0;
  return questionCounter;
};

// **** RESETS GAME TO START PAGE *****
app.reset = () => {
  app.landingPage();
  $startPage.show();
  resetPlay();
  resetScore();
  resetCounter();
};

//  ****** SETS UP GAME IN RGB/EASY MODE *******
const rgbMode = function() {
  // a function to set the button color using an rgb value
  const setRGBButtonColour = function(button, red, green, blue) {
    $(button).css(`background-color`, `rgb(${red}, ${green}, ${blue})`);
  };

  // a function to generate a random number between 0 and 255
  const makeRGBValue = () => {
    return Math.floor(Math.random() * 256);
  };

  // generates a random numer between 0 and 3 or number of buttons - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  // a loop to set each button to a random rgb value
  for (let i = 0; i < $buttons.length; i++) {
    const red = makeRGBValue();
    const green = makeRGBValue();
    const blue = makeRGBValue();
    setRGBButtonColour($buttons[i], red, green, blue);

    // if value of answerButton equals index of $buttons displays the corresponding colour code in the h2 with the class of colorValue
    if (i === answerButton) {
      $colorValue.html(`Guess which colour matches this colour code: </br>
  <span class="bold">rgb(${red}, ${green}, ${blue})</span>`);
    }

    // event handler that displays "Correct" or "Wrong" based on user input.
    $($buttons[i])
      .off() // .off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
      .one("click", function() {
        if (this === $buttons[answerButton]) {
          correctAnswer(`rgb(${red}, ${green}, ${blue})`);
        } else {
          wrongAnswer();
        }
      });
  }
};

//  ****** SETS UP GAME IN HSL/MEDIUM MODE *******
const hslMode = function() {
  // a function to set the button color using an hsl value
  const setHSLButtonColour = function(button, h, s, l) {
    $(button).css(`background-color`, `hsl(${h}, ${s}%, ${l}%)`);
  };

  // a function to generate a random number between 0 and 360 for the hue value
  const makeHValue = () => {
    return Math.floor(Math.random() * 361);
  };

  // a function to generate a random number between 0 and 100 for the saturation and lightness values
  const makeSLValues = () => {
    return Math.floor(Math.random() * 101);
  };

  // generates a random numer between 0 and 3 or number of buttons - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  // a loop to set each button to a random hsl value
  for (let i = 0; i < $buttons.length; i++) {
    const hue = makeHValue();
    const saturation = makeSLValues();
    const light = makeSLValues();
    setHSLButtonColour($buttons[i], hue, saturation, light);

    // if value of answerButton equals index of $buttons displays the corresponding colour code in the h2 with the class of colorValue
    if (i === answerButton) {
      $colorValue.html(`Guess which colour matches this colour code: </br> 
   <span class="bold">hsl(${hue}, ${saturation}%, ${light}%)</span>`);
    }

    // event handler that displays "Correct" or "Wrong" based on user input.
    $($buttons[i])
      .off() // .off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
      .one("click", function() {
        if (this === $buttons[answerButton]) {
          correctAnswer(`hsl(${hue}, ${saturation}%, ${light}%)`);
        } else {
          wrongAnswer();
        }
      });
  }
};

// ****** SETS UP GAME IN HEX/HARD MODE *******
const hexMode = function() {
  // a function to set the button color using a hex value
  const setHexButtonColour = function(button, hex) {
    $(button).css(`background-color`, `${hex}`);
  };

  // a function to generate a random hex value by iterating over a string
  const makeHexValue = () => {
    let hexCode = "#";
    const hexValues = "0123456789abcdef";

    while (hexCode.length < 7) {
      hexCode += hexValues[Math.floor(Math.random() * hexValues.length)];
    }
    return hexCode;
  };

  // generates a random numer between 0 and 3 or number of button - 1. ** Must be inside this function to keep the correct answer random
  const answerButton = Math.floor(Math.random() * ($buttons.length - 1));

  // a loop to set each button to a random hex value
  for (let i = 0; i < $buttons.length; i++) {
    const hexVal = makeHexValue();
    setHexButtonColour($buttons[i], hexVal);

    // if value of answerButton equals index of $buttons displays the corresponding colour code in the h2 with the class of colorValue
    if (i === answerButton) {
      $colorValue.html(`Guess which colour matches this colour code: </br> 
   <span class="bold">Hex ${hexVal}</span>`);
    }

    // event handler that displays "Correct" or "Wrong" based on user input.
    $($buttons[i])
      .off() //.off keeps click from firing multiple times, .one makes correct answer only clickable once to accumulate a point.
      .one("click", function() {
        if (this === $buttons[answerButton]) {
          correctAnswer(`${hexVal}`);
        } else {
          wrongAnswer();
        }
      });
  }
};

// ********* INFO MODAL FUNCTIONALITY ***********
app.modal = () => {
  // Gets the modal
  const $modal = $(".infoModal");

  // Opens the modal when the user clicks on the button
  $("#infoBtn").on("click", function() {
    $modal.css("display", "block");
  });

  // Closes the modal when the user clicks on <span> (x)
  $(".close").click(function() {
    $modal.css("display", "none");
  });

  // Closes the modal when the user clicks anywhere outside of it
  $(window).click(function(event) {
    if ($(event.target).is($modal)) {
      $modal.css("display", "none");
    }
  });
};

// ****** STARTS GAME WHEN LEVELE BUTTON IS CLICKED *******
app.startGame = () => {
  //sets the answer message to "choose carefully"
  answerMessageReset();

  // hides the landing page and reveals the game page
  $(".levelButton").on("click", function() {
    $startPage.hide();
    $gamePage.show();
  });

  // takes users to easy/rgb mode of the game when easy button is clicked
  $(".easy").on("click", function() {
    rgbMode();
    $next.off("click").on("click", function() {
      rgbMode();
      setNextQ();
    });
  });

  // takes users to medium/hsl mode of the game when medium button is clicked
  $(".medium").on("click", function() {
    hslMode();
    $next.off("click").on("click", function() {
      hslMode();
      setNextQ();
    });
  });

  // takes users to hard/hex mode of the game when hard button is clicked
  $(".hard").on("click", function() {
    hexMode();
    $next.off("click").on("click", function() {
      hexMode();
      setNextQ();
    });
  });

  // resets game to landing page when restart or start over buttons are clicked
  $(".resetButton")
    .off("click")
    .on("click", app.reset);

  $(".restart")
    .off("click")
    .on("click", function() {
      app.reset();
    });
};

// game initilization function
app.init = function() {
  app.landingPage();
  app.startGame();
  app.modal();
};

// document ready function
$(function() {
  app.init();
});
