const board = document.querySelector('.board');
const blockSize = 50;
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);

const blocks = [];
const snake = [ { row: 1, col: 2 }, { row: 1, col: 3 } ];
let direction = 'down';
let intervalId = null;

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
    snake.forEach( gogo => {
        blocks[ `${gogo.row}-${gogo.col}`].classList.add("fill")
    })
}

intervalId = setInterval(() => {
    let head = null

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

    snake.forEach( gogo => {
        blocks[ `${gogo.row}-${gogo.col}`].classList.remove("fill")
    })

    snake.unshift(head)
    snake.pop()


    render()
}, 400)


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