const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('game-status');
const restartButton = document.getElementById('restartButton');
let isCircleTurn;

const winningCombinations = [
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
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    statusText.innerHTML = "X's turn";
}

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'o' : 'x';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    statusText.innerHTML = isCircleTurn ? "O's turn" : "X's turn";
}

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

const endGame = (draw) => {
    if (draw) {
        statusText.innerHTML = "Draw!";
    } else {
        statusText.innerHTML = `${isCircleTurn ? "O" : "X"} wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

restartButton.addEventListener('click', startGame);

startGame();
