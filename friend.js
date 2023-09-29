const board = document.getElementById('board');
const cells = [];
const resetButton = document.getElementById('reset-button');
const messageElement = document.getElementById('message'); // Declare message element

let currentPlayer = 'X';
let gameActive = true;

// Create the cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cells.push(cell);
    board.appendChild(cell);
    cell.addEventListener('click', handleCellClick);
}

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (cells[index].textContent !== '' || !gameActive) {
        return;
    }

    cells[index].textContent = currentPlayer;
    cells[index].style.pointerEvents = 'none';

    if (checkWin()) {
        gameActive = false;
        messageElement.textContent = `Player ${currentPlayer} wins!`; // Update message
    } else if (checkTie()) {
        gameActive = false;
        messageElement.textContent = "It's a tie!"; // Update message
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].style.backgroundColor = 'lightgreen';
            cells[b].style.backgroundColor = 'lightgreen';
            cells[c].style.backgroundColor = 'lightgreen';
            return true;
        }
    }

    return false;
}

function checkTie() {
    return cells.every(cell => cell.textContent !== '');
}

function resetGame() {
    // Clear cell content and styles
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
        cell.style.backgroundColor = '';
    });

    // Reset game variables
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = ''; // Clear the message
}