let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

let gameStarted = false;
let level = 0;

$(document).keypress(function() {
    if (!gameStarted) {
        $("#level-title").text("level " + level);
        nextSequence();
        gameStarted = true;
    }
});

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn();
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("level " + level);
    userClickedPattern = []
};

$(".btn").click(function() {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor)

    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

function playSound(color) {
    let sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
    
}

function startOver() {
    level = 0
    gamePattern = []
    gameStarted = false
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
    } else {
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
    }

    if (userClickedPattern.length == gamePattern.length) {
        setTimeout(function() {
            nextSequence()
        }, 1000)
    }

    $("#level-title").text("Game Over, Press any key to restart")

    startOver()
}