const grid = document.querySelector('.game-grid');
const startButton = document.getElementById('start');
const score = document.querySelector('game-score');
let squares = [];

let direction = -1;
let width = 10;
let currentSnake = [0,1,2] //initial indices position.
let gameStart = true;
const start_restart_btn = document.getElementById('start');
function createGrid() { 
    // create 100 of these elements with a for loop
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
createGrid();

let timerId = setInterval(move, 1000);
//move();
currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() { 
    if (
        (currentSnake[2] + width >= 100 && direction === 10) || //if snake has hit bottom
        (currentSnake[2] % width === 9 && direction === 1) || //if snake has hit right wall
        (currentSnake[2] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[2] - width < 0 && direction === -10) || //if snake has hit top
        squares[currentSnake[2] + direction].classList.contains('snake')
    )
    return clearInterval(timerId);
    // remove last element from our currentSnake array
    const tail = currentSnake.shift()
    // remove styling from last element
    squares[tail].classList.remove('snake')
    // add square in direction we are heading
    let newHead = ((currentSnake[1] + direction) + squares.length) % squares.length;
    currentSnake.push(newHead);
    // add styling so we can see it
    squares[currentSnake[2]].classList.add('snake')
}



document.addEventListener('keyup',e => {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
});

