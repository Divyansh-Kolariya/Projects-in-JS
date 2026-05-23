const board = document.querySelector('.board');
const blockSize = 50;
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);
const blocks = [];
const startButton = document.querySelector(".btn-start");
const model = document.querySelector(".model");
const startGameModel = document.querySelector(".start-game");
const gameOverModel = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");
const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#current-score");
const timeElement = document.querySelector("#time");

let direction = 'down';
let intervalId = null;
let food = { row: Math.floor(Math.random() * rows), col: Math.floor(Math.random() * cols)};
let snake = [ { row: 1, col: 2 }, { row: 1, col: 3 } ];
let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00:00`;
let timeIntervalId = null;


highScoreElement.innerText = highScore;

// Tell the grid how many columns/rows
board.style.setProperty('--cols', cols);
board.style.setProperty('--rows', rows);

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

function render(){
    let head = null;

    blocks[ `${food.row}-${food.col}`].classList.add("food");

    if(direction === 'left'){
        head = { row: snake[0].row, col: snake[0].col-1 }
    }else if(direction === 'right'){
        head = { row: snake[0].row, col: snake[0].col+1 }
    }else if(direction === 'down'){
        head = { row: snake[0].row+1, col: snake[0].col }
    }else if(direction === 'up'){
        head = { row: snake[0].row-1, col: snake[0].col }
    };

    if(head.row < 0 || head.row >= rows || head.col < 0 || head.col >= cols){
        clearInterval(intervalId)
        model.style.display = 'flex';
        startGameModel.style.display = 'none';
        gameOverModel.style.display = 'flex';
        return
    };

    // food logic
    if(head.row == food.row && head.col == food.col) {
        blocks[ `${food.row}-${food.col}`].classList.remove("food")
        food = { row: Math.floor(Math.random() * rows), col: Math.floor(Math.random() * cols)}
        blocks[ `${food.row}-${food.col}`].classList.add("food")

        snake.unshift(head)

        score += 10;
        scoreElement.innerText = score;
        if(score > highScore){
            highScore = score;
            localStorage.setItem("highScore", highScore.toString());
        }
    };
    snake.unshift(head);
    snake.forEach( gogo => {
        blocks[ `${gogo.row}-${gogo.col}`].classList.remove("fill")
    });

    
    snake.pop();

    snake.forEach( gogo => {
        blocks[ `${gogo.row}-${gogo.col}`].classList.add("fill")
    });
}

startButton.addEventListener("click", () => {
    model.style.display = 'none'
    intervalId = setInterval(() => {render() }, 300)
    timeIntervalId = setInterval(() => {
        let [min, sec] = time.split(":").map(Number);
        if(sec == 59){
            min += 1;
            sec=0
        }else{
            sec += 1
        }
        time = `${min} : ${sec}`
        timeElement.innerText = time;
    }, 1000) 
});

restartButton.addEventListener("click", resetGame);

function resetGame(){

    clearInterval(intervalId)      
    clearInterval(timeIntervalId) 

    blocks[ `${food.row}-${food.col}`].classList.remove("food");
    snake.forEach( gogo => {
        blocks[ `${gogo.row}-${gogo.col}`].classList.remove("fill")
    });

    score = 0;
    time = `00:00`;
    direction = 'down';
    snake = [ { row: 1, col: 2 }, { row: 1, col: 3 } ];
    food = { row: Math.floor(Math.random() * rows), col: Math.floor(Math.random() * cols)};

    scoreElement.innerText = score;
    timeElement.innerText = time;   
    highScoreElement.innerText = highScore;
    model.style.display = 'none';                                                                                      
    
    
    intervalId = setInterval(() => {render() }, 300);

}



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