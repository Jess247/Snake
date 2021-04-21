// bugs: Only one apple can be collected the second apple is counted as hit
// game starts right away even before a key is pressed
// speed is not consistent, its lagging quite a bit
// game should stop when hit, right now its hitting over and over again and throuwing an alert



let scoreDisplay = document.querySelector('.score');
let speedDisplay = document.querySelector('.speed');

let grid = document.querySelector('.grid');
let width = 10;

// mobile btn
let upBtn = document.querySelector('.up');
let rightBtn = document.querySelector('.right');
let downBtn = document.querySelector('.down');
let leftBtn = document.querySelector('.left');

let popup = document.querySelector(".popup");
let replayBtn = document.querySelector('.replay');

// 
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2,1,0];
let snakeDirection = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

// controls


// start and control events
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keyup',function(event){
        if(event.defaultPrevented) {
            return;
        }
        switch(event.code) {
            case "ArrowDown":
              // move down
              snakeDirection = +width;
              break;

            case "ArrowUp":
              // move up
              snakeDirection = -width;
              break;

            case "ArrowLeft":
              // move left
              snakeDirection = -1;
              break;

            case "ArrowRight":
              // Handle "turn right"
              snakeDirection = 1;
              break;
          }
        //   refresh();

  // Consume the event so it doesn't get handled twice
  event.preventDefault();

  
    }, true);

    createGameboard();
    startGame();
    replayBtn.addEventListener('click', replay);
});



// create gameboard
function createGameboard() {
    popup.style.display = 'none';

    for(let i = 0; i < 100; i++) {
        let div = document.createElement('div');
        grid.appendChild(div);
    }
}



// start game 
function startGame() {
    // apple on random position
    let gridCells = document.querySelectorAll('.grid div');
    randomApple(gridCells);

    snakeDirection = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2,1,0];
    currentIndex = 0;
    currentSnake.forEach(index=>gridCells[index].classList.add('snake'));
    interval = setInterval(moveOutCome, intervalTime)
}

// check if thes been hits 
function moveOutCome() {
    let gridCells = document.querySelectorAll('.grid div');
    if(checkForHits(gridCells)){
        // alert('you hit something');
        popup.style.display = 'flex';
        return clearInterval(interval);
    } else {
        moveSnake(gridCells);
    }
}

// move snake 
function moveSnake(gridCells) {
    // move snake forward
    let snakeTail = currentSnake.pop();
    gridCells[snakeTail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + snakeDirection);

    // eat apples
    eatApple(gridCells, snakeTail)
    gridCells[currentSnake[0]].classList.add('snake');
}

function checkForHits(gridCells) {
    if(
        (currentSnake[0] + width >= (width*width) && snakeDirection === width) ||
        (currentSnake[0] % width === width - 1 && snakeDirection === 1) ||
        (currentSnake[0] % width === 0 && snakeDirection === -1) ||
        (currentSnake[0] - width <= 0  && snakeDirection === -width)   ||
        gridCells[currentSnake[0] + snakeDirection].classList.contains('snake')
        )  {
            // hit
            return true
    } else {
        // no hit
        return false
    }
}

// eat apple
function eatApple(gridCells, snakeTail) {
    if(gridCells[currentSnake[0]].classList.contains('apple')) {
        gridCells[currentSnake[0]].classList.remove('apple');
        gridCells[snakeTail].classList.add('snake');
        currentSnake.push(snakeTail);
        randomApple(gridCells);
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutCome, intervalTime);
    }
}

// random position for apple
function randomApple(gridCells) {
    do {
        appleIndex = Math.floor(Math.random() * gridCells.length);
    }while(gridCells[appleIndex].classList.contains('snake'));
    gridCells[appleIndex].classList.add('apple');
}

// // controls 
// function control(e) {
//     if(e === "ArrowRight") {
//         // right
//         console.log("right")
//         snakeDirection = 1;
//     } else if(e === "ArrowUp") {
//         // up 10 divs
//         console.log("up")
//         snakeDirection = -width;
//     } else if(e === "ArrowLeft") {
//         // left
//         console.log("left")
//         snakeDirection = -1;
//     } else if(e === "ArrowDown") {
//         // down 10 divs
//         console.log("down")
//         snakeDirection = +width;
//     }
// }
// btn controls
upBtn.addEventListener('click', ()=>snakeDirection = -width);
rightBtn.addEventListener('click', ()=>snakeDirection = -1);
downBtn.addEventListener('click', ()=>snakeDirection = +width);
rightBtn.addEventListener('click', ()=>snakeDirection = 1);

// replay
function replay() {
    grid.innerHTML = ''; 
    createGameboard(); 
    startGame();
    popup.style.display = 'none';
}

