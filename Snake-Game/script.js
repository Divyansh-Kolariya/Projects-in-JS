const board = document.querySelector('.board');
const blockSize = 50;
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);
const blocks = [];
const snake = [ { row: 1, col: 2 }, { row: 1, col: 3 } ];
const startButton = document.querySelector(".btn-start")

let direction = 'down';
let intervalId = null;
let food = { row: Math.floor(Math.random() * rows), col: Math.floor(Math.random() * cols)}



// Tell the grid how many columns/rows
board.style.setProperty('--cols', cols);
board.style.setProperty('--rows', rows);

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block
    }
}

function render(){
    let head = null

    blocks[ `${food.row}-${food.col}`].classList.add("food")

    if(direction === 'left'){
        head = { row: snake[0].row, col: snake[0].col-1 }
    }else if(direction === 'right'){
        head = { row: snake[0].row, col: snake[0].col+1 }
    }else if(direction === 'down'){
        head = { row: snake[0].row+1, col: snake[0].col }
    }else if(direction === 'up'){
        head = { row: snake[0].row-1, col: snake[0].col }
    }

    if(head.row < 0 || head.row >= rows || head.col < 0 || head.col >= cols){
        alert("Game Over")
        clearInterval(intervalId)
    }

    if(head.row == food.row && head.col == food.col) {
        blocks[ `${food.row}-${food.col}`].classList.remove("food")
        food = { row: Math.floor(Math.random() * rows), col: Math.floor(Math.random() * cols)}
        blocks[ `${food.row}-${food.col}`].classList.add("food")

        snake.unshift(head)
    }

    snake.forEach( gogo => {
        blocks[ `${gogo.row}-${gogo.col}`].classList.remove("fill")
    })

    snake.unshift(head)
    snake.pop()

    snake.forEach( gogo => {
        blocks[ `${gogo.row}-${gogo.col}`].classList.add("fill")
    })
}

startButton.addEventListener("click", () => {
    intervalId = setInterval(() => {render() }, 300)
})



addEventListener("keydown", (event) => {
    if(event.key == "ArrowUp"){
        direction = "up"
    }else if(event.key == "ArrowDown"){
        direction = "down"
    }else if(event.key == "ArrowLeft"){
        direction = "left"
    }else if(event.key == "ArrowRight"){
        direction = "right"
    }
    
})