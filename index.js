const grid = document.querySelector('.game-grid');
const btnControl = Array.from(document.querySelectorAll('.btn-control .btn'));
let score = 0;
let squares = [];

let direction = 1;
let width = 10;
let currentSnake = [2, 1, 0] // initial indices position.

const min = 1;
const max = 99;

let positionApple = 0;
let timerId;
let speed = 1000;
init();

function init() { // Create grid and push into HTML.
    createGrid();
    // Add snake style to game grids.
    currentSnake.forEach(index => squares[index].classList.add('snake'));


    btnControl.forEach(b => {
        b.addEventListener('click', e => {
            if (e.target.textContent == 'A') {
                startGame();
            } else {
                reset();
            }
        });
    });

    document.addEventListener('keyup', e => {
        if (e.keyCode === 39) {
            console.log('right pressed')
            direction = 1
        } else if (e.keyCode === 38) {
            console.log('up pressed')
            direction = - width
        } else if (e.keyCode === 37) {
            console.log('left pressed')
            direction = -1
        } else if (e.keyCode === 40) {
            console.log('down pressed')
            direction = + width
        }
    });

}

function startGame() {
    document.querySelector('.game-start').style.display = 'none';
    document.querySelector('.game-score').style.display = 'block';


    generateApple();
    timerId = setInterval(move, speed);
}


function reset() {
    clearInterval(timerId);
    currentSnake = [0, 1, 2];
    squares.forEach(s => s.classList.remove('snake'));

    speed = 1000;
    direction = 1;

    currentSnake.forEach(index => squares[index].classList.add('snake'));
    // console.log(currentSnake);

    document.querySelector('.game-start').style.display = 'block';
    document.querySelector('.game-score').style.display = 'none';
}


function createGrid() { // create 100 of these elements with a for loop
    for (let i = 0; i < 100; i++) { // create element
        const square = document.createElement('div')
        // add styling to the element
        square.classList.add('square')
        // put the element into our grid
        grid.appendChild(square)
        // push it into a new squares array
        squares.push(square)
    }
}


function move() {
    let hitTopWall = currentSnake[2] - width < 0 && direction === -10;
    let hitBottomWall = currentSnake[2] + width >= 100 && direction === 10;
    let hitRightWall = currentSnake[2] % width === 9 && direction === 1;
    let hitLeftWall = currentSnake[2] % width === 0 && direction === -1;
    let hitItself = squares[currentSnake[2] + direction].classList.contains('snake');
    if (hitTopWall || hitBottomWall || hitRightWall || hitLeftWall) {
        return reset();
    }
    updateCurrentSnake();
}


function updateCurrentSnake() {
    const tail = currentSnake.pop()
    // remove styling from last element
    squares[tail].classList.remove('snake')
    // add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    // add styling so we can see it

    // deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) { // remove the class of apple
        squares[currentSnake[0]].classList.remove('apple');
        // grow our snake by adding class of snake to it
        squares[tail].classList.add('snake');
        console.log(tail)
        // grow our snake array
        currentSnake.push(tail)
        console.log(currentSnake)
        // generate new apple
        generateApple()
        // add one to the score
        score++
        // display our score
        document.querySelector('#score').textContent = score;
        // speed up our snake
        speed *= 0.9;
        timerId = setInterval(move, speed);
        currentSnake.forEach(index => squares[index].classList.add('snake'));
    }
    squares[currentSnake[0]].classList.add('snake')
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple');
}
