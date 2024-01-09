document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const title = document.querySelector(".title");
    let currentPlayer = "X";
    let gameBoard = new Array(9).fill("");
    let winningCells = [];

    cells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    function handleCellClick(cell) {
        const index = cell.getAttribute("data-index");
        if (gameBoard[index] === "") {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                title.innerHTML = `${currentPlayer} wins`;
                highlightWinnerCells();
                resetGame();
            } else if (gameBoard.every((cell) => cell !== "")) {
                title.innerHTML = "It's a draw";
                resetGame();
            } else {
                // currentPlayer = currentPlayer === "X" ? "O" : "X";
                currentPlayer = "O";
                setTimeout(() => {
                    robotTurn();
                }, 1000);
            }
        }
    }

    function robotTurn() {
        const emptyCells = gameBoard.reduce((acc, value, index) => {
            if (value === "") {
                acc.push(index);
            }
            return acc;
        }, []);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const robotMove = emptyCells[randomIndex];
            gameBoard[robotMove] = currentPlayer;
            cells[robotMove].textContent = currentPlayer;
            if (checkWinner()) {
                title.innerHTML = `${currentPlayer} wins`;
                highlightWinnerCells();
                resetGame();
            } else if (gameBoard.every((cell) => cell !== "")) {
                title.innerHTML = "It's a draw";
                resetGame();
            } else {
                currentPlayer = "X";
            }
        }
    }


    function checkWinner() {
        const winerPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winerPatterns.some((pattern) => {
            const [num1, num2, num3] = pattern;
            if (
                gameBoard[num1] === gameBoard[num2] && gameBoard[num2] === gameBoard[num3] && gameBoard[num1] !== "") {
                winningCells = [num1, num2, num3];
                return true;
            }
            return false;
        });

    }

    function highlightWinnerCells() {
        winningCells.forEach((index) => {
            cells[index].style.background = "#4c4c97";
        });
    }

    function resetGame() {
        let intervalId = setInterval(() => { title.innerHTML += "." }, 1000);
        setTimeout(() => {
            gameBoard = new Array(9).fill("");
            currentPlayer = "X";
            cells.forEach((cell) => {
                cell.textContent = "";
                cell.style.backgroundColor = "";
            });
            clearInterval(intervalId);
            title.innerHTML = "X - O Game"
        }, 4000);
    }
});

var currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;
