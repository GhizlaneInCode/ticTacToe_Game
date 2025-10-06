document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const title = document.querySelector(".title");
    const modal = document.getElementById("emojiModal");
    const emojiButtons = document.querySelectorAll(".emoji-btn");

    let gameBoard = new Array(9).fill("");
    let winningCells = [];
    let playerEmoji;
    let robotEmoji;
    let currentPlayer;

    emojiButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            playerEmoji = btn.textContent;

            const allEmojis = Array.from(emojiButtons).map(b => b.textContent);
            const filtered = allEmojis.filter(e => e !== playerEmoji);
            robotEmoji = filtered[Math.floor(Math.random() * filtered.length)];

            currentPlayer = playerEmoji;
            title.innerHTML = `You are ${playerEmoji}, Robot is ${robotEmoji}`;

            modal.style.display = "none"; 
        });
    });

    cells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    function handleCellClick(cell) {
        const index = cell.getAttribute("data-index");
        if (gameBoard[index] === "" && playerEmoji) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                title.innerHTML = `${currentPlayer} wins 🎉`;
                highlightWinnerCells();
                launchConfetti();
                resetGame();
            } else if (gameBoard.every((cell) => cell !== "")) {
                title.innerHTML = "It's a draw 🤝";
                resetGame();
            } else {
                currentPlayer = robotEmoji;
                setTimeout(() => {
                    robotTurn();
                }, 800);
            }
        }
    }

    function robotTurn() {
        const emptyCells = gameBoard.reduce((acc, value, index) => {
            if (value === "") acc.push(index);
            return acc;
        }, []);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const robotMove = emptyCells[randomIndex];
            gameBoard[robotMove] = currentPlayer;
            cells[robotMove].textContent = currentPlayer;
            if (checkWinner()) {
                title.innerHTML = `${currentPlayer} wins 🤖`;
                highlightWinnerCells();
                launchConfetti();
                resetGame();
            } else if (gameBoard.every((cell) => cell !== "")) {
                title.innerHTML = "It's a draw 🤝";
                resetGame();
            } else {
                currentPlayer = playerEmoji;
            }
        }
    }

    function checkWinner() {
        const winerPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winerPatterns.some((pattern) => {
            const [a, b, c] = pattern;
            if (
                gameBoard[a] === gameBoard[b] &&
                gameBoard[b] === gameBoard[c] &&
                gameBoard[a] !== ""
            ) {
                winningCells = [a, b, c];
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

    function launchConfetti() {
        confetti({
            particleCount: 550,
            spread: 200,
            origin: { y: 0.6 }
        });
    };

    function resetGame() {
        let intervalId = setInterval(() => { title.innerHTML += "." }, 1000);
        setTimeout(() => {
            gameBoard = new Array(9).fill("");
            cells.forEach((cell) => {
                cell.textContent = "";
                cell.style.backgroundColor = "";
            });
            clearInterval(intervalId);
            title.innerHTML = "New Round 🎮";
            currentPlayer = playerEmoji;
        }, 3000);
    }
});

var currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;


