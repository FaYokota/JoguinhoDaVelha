const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'T'; // T for Tie
};

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (board[index] === '') {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            if (winner === 'T') {
                alert('Empate!');
            } else {
                alert(`Jogador ${winner} venceu!`);
            }
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
    });
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
