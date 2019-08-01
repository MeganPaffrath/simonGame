var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['green','red', 'yellow', 'blue'];
var level = 0;

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

function nextSequence() {
  var min = 0;
  var max = 3;
  var randomNumber = Math.floor( (Math.random() * (max - min + 1)) + min);
  console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeTo("slow", 0.2).fadeTo("slow", 1);

  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  console.log("Level: " + level + "\n\t" + "Sequence: " + gamePattern);
}

function endGame() {
  $("#level-title").text("Game Over! Press any key to restart");
  // inPlay = false;
  playSound("wrong");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  $(document).one("keypress", function() {
    nextSequence();
    $("#level-title").text("Level " + level);
    // inPlay = true;
  });
}

function checkAnswer(currentLevel) {
  var userPatternLength = userClickedPattern.length;
  if (userPatternLength > currentLevel) {
    endGame();
  }
  if (userClickedPattern[userPatternLength-1] != gamePattern[userPatternLength-1]) {
    endGame();
  }
  if (userPatternLength == currentLevel) {
    userClickedPattern = [];
    setTimeout( function() {
      nextSequence();
    }, 1000);
  }
}


// Check which buttons are clicked
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("\t\tCurrent Pattern: \t\t" + userClickedPattern);
  checkAnswer(level);
});

$(document).one("keypress", function() {
  nextSequence();
  $("#level-title").text("Level " + level);
});
