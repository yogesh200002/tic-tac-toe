const gameboard = (() => {
    const board = document.querySelector('.grid');
    function createBoard(){
        for (let index = 0; index <= 8; index++) {
            let cell = document.createElement('div');
            cell.classList.add('cells');
            board.appendChild(cell);
        }
    }
    function playBoard(player1,player2){
        const cells = document.querySelectorAll('.cells');
        let currentPlayer = player1;
        console.log(cells)
        cells.forEach(cell => {
            cell.addEventListener('click', function(){
                if(currentPlayer === player1 && this.textContent === ''){
                    console.log(currentPlayer)
                    cell.textContent = 'X';
                    currentPlayer = player2;
                    gameValidation(player1,player2);
                }
                else if(currentPlayer === player2 && this.textContent === ''){
                    console.log(currentPlayer)
                    cell.textContent = 'O';
                    currentPlayer = player1;
                    gameValidation(player1,player2);
                }
                else{
                    return;
                }
            })})
    }
    function gameValidation(player1,player2){
        const cells = document.querySelectorAll('.cells');
        let winCheck = false;
        winningConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for (let index = 0; index < winningConditions.length; index++) {
            const firstElement = cells[winningConditions[index][0]];
            const secondElement = cells[winningConditions[index][1]];
            const thirdElement = cells[winningConditions[index][2]];
            if(firstElement.textContent === secondElement.textContent && secondElement.textContent === thirdElement.textContent && firstElement.textContent !== ''){
                if(firstElement.textContent === 'X'){
                    console.log(player1+'wins!');
                    winCheck = true;
                }
                else if(firstElement.textContent === 'O'){
                    console.log(player2+'wins!');
                    winCheck = true;
                }
            }
            else if(winCheck == false && Array.from(cells).every(cell => cell.textContent !== '')){
                console.log('tie');
                break;
            }
        }
    }
    return {
        createBoard,
        playBoard,
        gameValidation
    }
})();

gameboard.createBoard();
gameboard.playBoard('Player1','player2');
