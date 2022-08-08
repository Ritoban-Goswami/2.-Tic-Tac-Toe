let display = document.getElementById("display");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--wining-blocks');
const O_TEXT = 'O';
const X_TEXT = 'X';
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
const winingCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

const boxClicked = (e) => {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (playerHasWon()) {
            display.innerText = `${currentPlayer} has won!`;
            let wining_blocks = playerHasWon();
            wining_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            boxes.forEach(box => box.style.pointerEvents = "none");
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

const playerHasWon = () => {
    for (const combo of winingCombos) {
        let [a, b, c] = combo;
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[b] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}
restartBtn.addEventListener('click', restart);
function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = ''
        box.style.pointerEvents = "auto"
    });
    display.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
}
startGame();

