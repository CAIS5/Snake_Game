const grid = document.querySelector('.game-grid');
const buttons = document.querySelectorAll('.btn-container .btn');

let scoreID = document.querySelector("#score");
let gameOver = document.querySelector('.game-over');
let gameStart = document.querySelector('.game-start');
let gameScore = document.querySelector('.game-score');

let score = 0;
let squares = [];

let direction = 1;
let snake = [2, 1, 0]; // initial position.

let positionApple = 0;
let interval = 0;
let intervalTime = 1000;
let speed = 0.95;
let appleIndex = 4;

// direction:
const LEFT = -1;
const RIGHT = 1;
const UP = -10;
const DOWN = 10;

const WIDTH = 10;
const MAX = 100;
const MIN = 1;

// Create grid and push into HTML.
createGrid();
// Add snake style to game grids.
// snake.forEach(index => squares[index].classList.add('snake'));


buttons.forEach(button => {
    button.addEventListener('click', e => {
        const btn = e.target.classList;
        if (btn.contains("btn-up")) {
            direction = UP;
        } else if (btn.contains("btn-down")) {
            direction = DOWN;
        } else if (btn.contains("btn-left")) {
            direction = LEFT;
        } else if (btn.contains("btn-right")) {
            direction = RIGHT;
        } else if (btn.contains("btn-start")) {
            startGame();
        } else if (btn.contains("btn-restart")) {
            reset();
        }
    });
});

document.addEventListener('keyup', e => {
    let key = e.keyCode;
    switch (key) {
        case 38: direction = UP;
            break;
        case 40: direction = DOWN;
            break;
        case 39: direction = RIGHT;
            break;
        case 37: direction = LEFT;
            break;
    }
    // console.log(e.key);
});


function createGrid() { // create 100 of these elements with a for loop
    for (let i = 0; i < MAX; i++) { // create element
        const square = document.createElement('div');
        // add styling to the element
        square.classList.add('square');
        // put the element into our grid
        grid.appendChild(square);
        // push it into a new squares array
        squares.push(square);
    }
}

function startGame() { // switch a line 'start a game' to score display
    gameStart.style.display = 'none';
    gameOver.style.display = 'none';
    gameScore.style.display = 'block';

    snake.forEach(index => squares[index].classList.add('snake'));


    generateApple();


    if (interval < 1) {
        clearInterval(interval);
        interval = setInterval(move, intervalTime);
    }

}

function move() {
    try{
        if (checkBoudaries()) {
            gameScore.style.display = 'none';
            gameOver.style.display = 'block';
            return clearInterval(interval);
        } else { // remove a tail of snake
    
            const tail = snake.pop();
            // remove styling from last element
            squares[tail].classList.remove('snake');
            // add square in direction we are heading
            snake.unshift(snake[0] + direction);
            // add styling so we can see it
    
            // deal with snake head gets apple
            if (squares[snake[0]].classList.contains('apple')) { // remove the class of apple
                squares[snake[0]].classList.remove('apple');
                // grow our snake by adding class of snake to it
                squares[tail].classList.add('snake');
    
                // grow our snake array
                snake.push(tail);
    
                // generate new apple
                generateApple();
    
                updateScoreAndSpeed();
            }
            squares[snake[0]].classList.add('snake');
        }
    }catch(err){
        console.log(err);
    }
 };
   

function updateScoreAndSpeed() {
    score++;
    scoreID.textContent = score;
    clearInterval(interval);
    intervalTime = Math.floor(intervalTime * speed);
    // console.log(intervalTime);
    interval = setInterval(move, intervalTime);
}

function checkBoudaries() {
    let hitBottom = (direction === DOWN) && (snake[0] + WIDTH) >= MAX;
    let hitTop = (direction === UP) && (snake[0] - WIDTH) < 0;
    let hitLeft = (direction === LEFT) && (snake[0] % WIDTH) === 0;
    let hitRight = (direction === RIGHT) && (snake[0] % WIDTH) === 9;
    let hitItself = squares[snake[0] + direction].classList.contains('snake');
    return(hitBottom || hitTop || hitLeft || hitRight || hitItself) ? true : false;
}


function reset() {
    snake.forEach(s => squares[s].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');

    gameStart.style.display = 'block';
    gameScore.style.display = 'none';
    gameOver.style.display = 'none';

    snake = [2, 1, 0];
    direction = 1;
    intervalTime = 1000;
    interval = 0;
    score = 0;
    scoreID.textContent = score;
    gameScore.textContent = "Start a game";
    appleIndex = '';
    return clearInterval(interval);
}

function generateApple() {
    if (appleIndex) {
        squares[appleIndex].classList.remove('apple');
    }
    do {
        appleIndex = Math.floor(Math.random() * MAX);
        // console.log(`apple here : ${appleIndex}`);
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple');
}

