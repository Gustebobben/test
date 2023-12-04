"use-strict";
import { BLOCK_SIZE, KEY, LEVELS, ROWS, COLS } from "./constants";
import { Board } from "./board";

import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

const playButton = document.getElementById("play");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const canvasNext = document.getElementById("next");
const ctxNext = canvasNext.getContext("2d");
let time = null;
let requestId = null;

let accountValues = {
  score: 0,
  level: 0,
  lines: 0,
  highscore: 0
};

function saveHighScore() {
  localStorage.setItem("highScores", accountValues.score);
}

function getHighScore() {
  accountValues.highscore = localStorage.getItem("highScores");
}
getHighScore();
updateAccount("highscore", accountValues.highscore);
function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

export let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  }
});
// Spillbrettet

// moves[37]
// lag et nytt brett
let board = new Board(ctx, ctxNext);
initNext();

function initNext() {
  // Calculate size of canvas from constants.
  ctxNext.canvas.width = 4 * BLOCK_SIZE;
  ctxNext.canvas.height = 4 * BLOCK_SIZE;
  ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function addEventListener() {
  document.removeEventListener("keydown", handleKeyPress);
  document.addEventListener("keydown", handleKeyPress);
}

export const moves = {
  [KEY.LEFT]: (position) => ({ ...position, x: position.x - 1 }),
  [KEY.RIGHT]: (position) => ({ ...position, x: position.x + 1 }),
  [KEY.DOWN]: (position) => ({ ...position, y: position.y + 1 }),
  [KEY.UP]: (position) => board.roate(position),
  [KEY.SPACE]: (position) => ({ ...position, y: position.y + 1 })
};

function handleKeyPress(event) {
  event.preventDefault();
  if (event.keyCode === KEY.ESC) {
    gameOver();
  } else if (moves[event.keyCode]) {
    let newPosition = moves[event.keyCode](board.piece);
    if (event.keyCode === KEY.SPACE) {
      while (board.valid(newPosition)) {
        account.score += 1;
        board.piece.move(newPosition);
        newPosition = moves[KEY.DOWN](board.piece);
      }
    } else if (board.valid(newPosition)) {
      board.piece.move(newPosition);
    }
  }
}

//starter spillet
function play() {
  account.score = 0;
  account.level = 0;
  account.lines = 0;
  addEventListener();
  board.reset();
  if (requestId) {
    cancelAnimationFrame(requestId);
  }
  animate();
}

playButton.addEventListener("click", play);

time = { start: 0, elapsed: 0, level: 1000 };
function animate(now = 0) {
  let level = LEVELS[0];
  if (account.score > 10) {
    level = LEVELS[1];
    updateAccount("level", 1);
  }
  if (account.score > 50) {
    level = LEVELS[2];
    updateAccount("level", 2);
  }
  if (account.score > 100) {
    level = LEVELS[3];
    updateAccount("level", 3);
  }
  if (account.score > 150) {
    level = LEVELS[4];
    updateAccount("level", 4);
  }
  if (account.score > 500) {
    level = LEVELS[5];
    updateAccount("level", 5);
  }
  if (account.score > 5000) {
    level = LEVELS[6];
    updateAccount("level", 6);
  }
  time.elapsed = now - time.start;
  if (time.elapsed > level) {
    time.start = now;
    if (!board.drop()) {
      gameOver();
      return;
    }
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  board.draw();
  requestId = requestAnimationFrame(animate);
}

function gameOver() {
  cancelAnimationFrame(requestId);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, COLS, ROWS);
  ctx.font = "1.5px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Game Over", 1, ROWS / 2);
  if (account.score > account.highscore) {
    account.highscore = account.score;
    saveHighScore();
    jsConfetti.addConfetti({
      emojis: ["🦄"],
      confettiRadius: 6,
      confettiNumber: account.highscore
    });
  }
}
