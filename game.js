var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['green','red', 'yellow', 'blue'];

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
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
}
// Check which buttons are clicked
$(".btn").click (function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
});



// $(".btn").on("click", function() {
//   var userChosenColor = this.id;
//   console.log(userChosenColor);
//   userClickedPattern.push(userChosenColor);
//   console.log(userClickedPattern);
// });
