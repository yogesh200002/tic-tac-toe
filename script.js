const gameboard = (() => {
    const board = document.querySelector('.grid');
    const container = document.querySelector('.container')
    const selection = document.querySelector('.selection');
    const display = document.querySelector('.playerDisplay > h2');
    let winCheck = false;
    let player1 = 'player1';
    let player2;
    let currentPlayer;
    const restartbtn = document.querySelector('#restart')
    restartbtn.style.display = 'none'
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
            container.style.display = 'flex';
            restartbtn.style.display = 'block'
            player2 = 'player2'
            playBoard(player1,player2);
            display.textContent = 'Player X Turn';
        });
        botButton.addEventListener('click', () => {
            selection.style.display = 'none';
            container.style.display = 'grid';
            restartbtn.style.display = 'block'
            player2 = 'bot'
            playBoard(player1,player2);
            display.textContent = 'Player X Turn';
        });
    }
    function playBoard(player1,player2){
        const cells = document.querySelectorAll('.cells');
        currentPlayer = player1;
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
                    if(currentPlayer === player1 && this.textContent === '' && winCheck === false){
                        console.log(currentPlayer)
                        cell.textContent = 'X';
                        currentPlayer = player2;
                        display.textContent = 'Player O Turn';
                        gameValidation(player1,player2);
                        setTimeout( () => {
                            if(winCheck != true){
                                botPlay(currentPlayer,player1);
                                display.textContent = 'Player X Turn';
                                gameValidation(player1,player2);
                                playBoard(player1,player2);
                            }
                        },250);
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
                if(firstElement.textContent === 'X' || firstElement.textContent === 'X' && Array.from(cells).every(cell => cell.textContent !== '') == true){
                    console.log(player1+'wins!');
                    winCheck = true;
                    firstElement.style.backgroundColor = 'aqua'
                    secondElement.style.backgroundColor = 'aqua'
                    thirdElement.style.backgroundColor = 'aqua'
                    display.textContent = 'Player X Wins!';
                }
                else if(firstElement.textContent === 'O' || firstElement.textContent === 'O' && Array.from(cells).every(cell => cell.textContent !== '') == true){
                    console.log(player2+'wins!');
                    winCheck = true;
                    firstElement.style.backgroundColor = 'aqua'
                    secondElement.style.backgroundColor = 'aqua'
                    thirdElement.style.backgroundColor = 'aqua'
                    display.textContent = 'Player O wins!';
                }
            }
            else if(firstElement.textContent != secondElement.textContent && secondElement.textContent != thirdElement.textContent && firstElement.textContent !== '' && Array.from(cells).every(cell => cell.textContent != '') == true && winCheck == false){
                console.log('Tie')
                winCheck = true
                display.textContent = "It's a Tie"
            }
        }
    }
    function restartPlay(){
        const cells = document.querySelectorAll('.cells');
        cells.forEach(cell => {
            cell.textContent = ''
            cell.style.backgroundColor = 'white'
        })
        display.textContent = 'Player X Turn';
        winCheck = false
        currentPlayer = player1
        playBoard(player1,player2)
    }
    restartbtn.addEventListener('click',restartPlay)
    return {
        createBoard,
        choiceSelection
    }
})();

gameboard.createBoard();
gameboard.choiceSelection();