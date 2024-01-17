const gameBoard = document.getElementById('game-board');
var segment=[]
var snake = [{
  x: 10,
  y: 10
}];
let food = {
  x: (getRandomInt(40) + 1) * 10,
  y: (getRandomInt(40) + 1) * 10
};
let direction = 'right';
let maxage = 1
if (snake > 0 && snake.length > 0){
  var newHead = {
    x: snake[0].x,
    y: snake[0].y
  };
}
segment.push(newHead);
const playButton = document.getElementById("play");
console.log(segment)
console.log(snake)


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    const snakeElement = document.createElement('div');
    snakeElement.classList.add('snake');
    snakeElement.style.left = snake[i].x + 'px';//ERROR
    snakeElement.style.top = snake[i].y + 'px';
    gameBoard.appendChild(snakeElement);
  }
}

function drawFood() {
  const foodElement = document.createElement('div');
  foodElement.classList.add('food');
  foodElement.style.left = food.x + 'px';
  foodElement.style.top = food.y + 'px';
  gameBoard.appendChild(foodElement);
}

function moveSnake() {
  // fjern den siste delen av slangen
  segment.pop();

  // legg til en ny del på riktig sted
  if (snake > 0 && snake.length > 0){
    newHead = {
      x: snake[0].x, 
      y: snake[0].y
    };
  }//
  if (direction === 'right') {
    newHead.x += 10;//ERROR:Uncaught TypeError: Cannot read properties of undefined (reading 'x')
  } else if (direction === 'left') {
    newHead.x -= 10;
  } else if (direction === 'up') {
    newHead.y -= 10;
  } else if (direction === 'down') {
    newHead.y += 10;
  }
  snake.unshift(newHead);
}

function checkCollision() {
  // sjekk om slangen treffer kanten av brettet
  if (snake[0].x < 0 || snake[0].x >= gameBoard.offsetWidth || snake[0].y < 0 || snake[0].y >= gameBoard.offsetHeight) {//ERROR
    return true;
  }

  // sjekk om slangen treffer seg selv
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  return false;
}

function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    // legg til en ny del på slutten av slangen
    const lastSnakeElement = snake[snake.length - 1];
    const newSnakeElement = {x: lastSnakeElement.x, y: lastSnakeElement.y};
    snake.push(newSnakeElement);

    // flytt maten til en ny tilfeldig posisjon
    food.x = Math.floor(Math.random() * gameBoard.offsetWidth / 10) * 10;
    food.y = Math.floor(Math.random() * gameBoard.offsetHeight / 10) * 10;
  }
}

function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    clearInterval(intervalId);
    alert('Game over!');
    return;
  }
  checkFoodCollision();
  gameBoard.innerHTML = '';
  drawSnake();
  drawFood();
}

//start spillet
drawSnake();
drawFood();

const intervalId = setInterval(gameLoop, 100);

// lytt til piltastene for å endre retning
document.addEventListener('keyup', event => {
  if (event.ArrowRight && direction !== 'left') {
    direction = 'right';
  } else if (event.ArrowLeft && direction !== 'right') {
    direction = 'left';
  } else if (event.ArrowUp && direction !== 'down') {
    direction = 'up';
  } else if (event.ArrowDown && direction !== 'up') {
    direction = 'down';
  }
});