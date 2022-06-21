const gameboard = (() => {
    const board = document.querySelector('.grid');
    const container = document.querySelector('.container')
    container.style.display = 'none';
    const selection = document.querySelector('.selection');
    const display = document.querySelector('.playerDisplay > h2');
    let winCheck = false;
    function createBoard(){
        for (let index = 0; index <= 8; index++) {
            let cell = document.createElement('div');
            cell.classList.add('cells');
            board.appendChild(cell);
        }
    }
    function choiceSelection(){
        const playerButton = document.querySelector('#playerButton');
        const botButton = document.querySelector('#botButton');
        playerButton.addEventListener('click', () => {
            selection.style.display = 'none';
            container.style.display = 'grid';
            playBoard('player1','player2');
            display.textContent = 'Player X Turn';
        });
        botButton.addEventListener('click', () => {
            selection.style.display = 'none';
            container.style.display = 'grid';
            playBoard('player1','bot');
            display.textContent = 'Player X Turn';
        });
    }
    function playBoard(player1,player2){
        const cells = document.querySelectorAll('.cells');
        let currentPlayer = player1;
        cells.forEach(cell => {
            if(player2 !== 'bot'){
                cell.addEventListener('click', function(){
                    if(currentPlayer === player1 && this.textContent === '' && winCheck === false){
                        console.log(currentPlayer)
                        cell.textContent = 'X';
                        display.textContent = 'Player O Turn';
                        gameValidation(player1,player2);
                        currentPlayer = player2;
                    }
                    else if(currentPlayer === player2 && this.textContent === '' && winCheck === false){
                        console.log(currentPlayer)
                        cell.textContent = 'O';
                        display.textContent = 'Player X Turn';
                        gameValidation(player1,player2);
                        currentPlayer = player1;
                    }
                })
            }
            else{
                cell.addEventListener('click', function(){
                    if(currentPlayer === player1 && this.textContent === ''){
                        console.log(currentPlayer)
                        cell.textContent = 'X';
                        currentPlayer = player2;
                        display.textContent = 'Player O Turn';
                        gameValidation(player1,player2);
                        setTimeout( () => {
                            if(winCheck != true){
                                botPlay(currentPlayer,player1);
                                gameValidation(player1,player2);
                                display.textContent = 'Player X Turn';
                                playBoard(player1,player2);
                            }
                        },1000);
                    }
                })
            }
        })
    }
    function botPlay(currentPlayer,player1){
        const cells = document.querySelectorAll('.cells');
        let botSelection = cells[randomNumber()];
        console.log(currentPlayer)
        if(botSelection.textContent === '' && winCheck === false){
            botSelection.textContent = 'O';
            currentPlayer = player1;
        }
        else if(botSelection.textContent === 'X' || 'O' && winCheck === false){
            botSelection = cells[randomNumber()];
            botPlay(currentPlayer,player1);
        }
        else{
            return;
        }
    }
    function randomNumber(){
        return Math.floor(Math.random() * 9);
    }
    function gameValidation(player1,player2){
        const cells = document.querySelectorAll('.cells');
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
                    display.textContent = player1+' Wins!';
                }
                else if(firstElement.textContent === 'O'){
                    console.log(player2+'wins!');
                    winCheck = true;
                    display.textContent = player2+'wins!';
                }
            }
            else if(winCheck == false && Array.from(cells).every(cell => cell.textContent !== '')){
                console.log('tie');
                winCheck = true;
                display.textContent = 'Tie!';
                break;
            }
        }
    }
    return {
        createBoard,
        playBoard,
        gameValidation,
        choiceSelection
    }
})();

gameboard.createBoard();
gameboard.choiceSelection();