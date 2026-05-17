let boxes = document.getElementsByClassName("box");
let result = document.getElementById("result");
let turn = document.getElementById("turn");

let gameOver = false;

// User = X
// Computer = O

function play(index) {

    // Stop if already filled or game finished
    if (boxes[index].innerHTML != "" || gameOver) {
        return;
    }

    // User move
    boxes[index].innerHTML = "X";

    checkWinner();

    if (gameOver) {
        return;
    }

    // Computer turn message
    turn.innerHTML = "Computer Turn (O)";

    // Computer plays after small delay
    setTimeout(computerMove, 500);
}

function computerMove() {

    let emptyBoxes = [];

    // Find empty boxes
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerHTML == "") {
            emptyBoxes.push(i);
        }
    }

    // Random move
    let randomIndex =
        emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

    // Computer move
    if (randomIndex != undefined) {
        boxes[randomIndex].innerHTML = "O";
    }

    checkWinner();

    if (!gameOver) {
        turn.innerHTML = "Your Turn (X)";
    }
}

function checkWinner() {

    let patterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < patterns.length; i++) {

        let a = patterns[i][0];
        let b = patterns[i][1];
        let c = patterns[i][2];

        if (
            boxes[a].innerHTML != "" &&
            boxes[a].innerHTML == boxes[b].innerHTML &&
            boxes[b].innerHTML == boxes[c].innerHTML
        ) {

            result.innerHTML = boxes[a].innerHTML + " Wins!";
            gameOver = true;
            turn.innerHTML = "";
            return;
        }
    }

    // Draw check
    let filled = 0;

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerHTML != "") {
            filled++;
        }
    }

    if (filled == 9) {
        result.innerHTML = "Match Draw!";
        gameOver = true;
        turn.innerHTML = "";
    }
}

function restartGame() {

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
    }

    result.innerHTML = "";
    turn.innerHTML = "Your Turn (X)";
    gameOver = false;
}