const COLS = 10;
const ROWS = 18;
const BLOCK_SIZE = 30;

const playButton = document.getElementById("play");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// Spillbrettet
class Board {
  // en måte å resette spillet
  reset() {
    this.grid = this.getEmptyBoard();
  }

  // en måte å komme til et tomt spillbrett
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}

class Piece {
  constructor(ctx) {
    // få tak i ctx
    this.ctx = ctx;
    // legg på en farge "cyan"
    this.color = "cyan";
    // lag en form
    this.shape = [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    // definer hvor den starter på brettet (this.x og this.y)
    this.x = 3;
    this.y = -1;
  }
  // tegn selve brikken på brettet
  draw() {
    // hent fargen til brikken (this.ctx.fillStyle)
    this.ctx.fillStyle = this.color;
    // tegn formen til brikken på brettet
    // gå gjennom hver rad i formen
    this.shape.forEach((row, y) => {
      // gå gjennom hver kollonne i hver rad
      row.forEach((value, x) => {
        // om "value" er over 0 (dvs 2) så gjør følgende:
        if (value > 1) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }
}

// lag et nytt brett
let board = new Board();

// en funksjon som starter spillet
function play() {
  board.reset();
  // lag en ny brikke piece = new Piece(ctx)
  let piece = new Piece(ctx);
  // tegn brikken på brettet
  piece.draw();
}

playButton.addEventListener("click", play);

/*

function play() {
  
}

Hvordan lage variabler i Javascript:
const variabelNavn = "verdi"
let variabelNavn = "verdi"


*/
