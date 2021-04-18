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
let currentSnate = [2,1,0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

// start and control events
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keyup',control);
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

}