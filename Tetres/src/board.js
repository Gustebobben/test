import { COLS, ROWS, BLOCK_SIZE, COLORS, KEY } from "./constants";
import { moves, account } from "./main";
import { Piece } from "./piece";
export class Board {
  constructor(ctx, ctxNext) {
    this.ctx = ctx;
    this.ctxNext = ctxNext;
    this.grid = this.getEmptyBoard();
    this.init();
  }

  init() {
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }
  //resette spillet
  reset() {
    this.grid = this.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.piece.setStartingPosition();
    this.getNewPiece();
  }
  draw() {
    this.piece.draw();
    this.drawBoard();
  }
  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
  drop() {
    let p = moves[KEY.DOWN](this.piece);
    if (this.valid(p)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece.y === 0) {
        return false;
      }
      this.piece = this.next;
      this.piece.ctx = this.ctx;
      this.piece.setStartingPosition();
      this.getNewPiece();
    }
    return true;
  }
  clearLines() {
    this.grid.forEach((row, y) => {
      if (row.every((value) => value > 0)) {
        // Fjern linja som er full av brikker
        this.grid.splice(y, 1);
        account.lines += 1;
        account.score += 40;
        // Flytt alle linjer over ett hakk ned
        this.grid.unshift(Array(COLS).fill(0));
      }
    });
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  // lag neste brikke
  getNewPiece() {
    const { width, height } = this.ctxNext.canvas;
    this.next = new Piece(this.ctxNext);
    this.ctxNext.clearRect(0, 0, width, height);

    this.next.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value >= 1) {
          this.ctxNext.fillStyle = COLORS[value];
          this.ctxNext.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  // en måte å komme til et tomt spillbrett
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  isEmpty(value) {
    return value === 0;
  }

  insideWalls(x, y) {
    return x >= 0 && x < COLS && y <= ROWS;
  }

  aboveFloor(y) {
    return y < ROWS;
  }
  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }
  valid(piece) {
    return piece.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = piece.x + dx;
        let y = piece.y + dy;
        return (
          value === 0 || (this.insideWalls(x, y) && this.notOccupied(x, y))
        );
      });
    });
  }

  roate(piece) {
    // kopiere brikkeposiosjonen og unngå å endre original-brikka
    let p = JSON.parse(JSON.stringify(piece));
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }

    p.shape.forEach((row) => row.reverse());
    return p;
  }
}