var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['green','red', 'yellow', 'blue'];
var level = 0;
var playingGame = false;

// ANIMATIONS AND SOUND --------------------------------------------------------
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout( function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// GAMEPLAY --------------------------------------------------------------------



// START GAME
$(document).keypress(function() {
  if (!playingGame) {
    $("#level-title").text("Level " + level);
    nextSequence();
    playingGame = true;
  }
});

// NEXT ITEM
function nextSequence() {
  var min = 0;
  var max = 3;
  var randomNumber = Math.floor( (Math.random() * (max - min + 1)) + min);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeTo("slow", 0.2).fadeTo("slow", 1);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  console.log("Level: " + level + "\n\t" + "Sequence: " + gamePattern);
}

// USER CLICK
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("\t\tCurrent Pattern: \t\t" + userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});

// CHECK USER INPUT
function checkAnswer(userGuessPosition) {
  // if correct
  if (userClickedPattern[userGuessPosition] === gamePattern[userGuessPosition]) {
    // if last element
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout( function() {
        nextSequence();
      }, 1000);
    }
  }
  // if wrong
  else {
    endGame();
    startOver();
  }
}

function endGame() {
  $("#level-title").text("Game Over! Press any key to restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout( function() {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  playingGame = false;
}
