import { SHAPES, COLORS } from "./constants";
export class Piece {
  constructor(ctx) {
    // få tak i ctx
    this.ctx = ctx;

    // console.log("tilfeldig brikke", this.id);
    // lag en form
    this.spawn();
  }
  spawn() {
    // lag en brikke tilfeldig brikke id mellom 0-6
    this.id = this.randomizePieceType(7);
    this.shape = SHAPES[this.id];
    // definer hvor den starter på brettet (this.x og this.y)
    this.setStartingPosition();
    this.hardDropped = false;
  }
  setStartingPosition() {
    this.x = 3;
    this.y = 0;
  }

  // funksjon for å flytte brikke: move(point) {}
  move(point) {
    if (!this.hardDropped) {
      this.x = point.x;
      this.y = point.y;
    }
    this.shape = point.shape;
  }
  hardDrop() {
    this.hardDropped = true;
  }
  // tegn selve brikken på brettet
  draw() {
    this.shape.forEach((row, y) => {
      // gå gjennom hver kollonne i hver rad
      row.forEach((value, x) => {
        if (value >= 1) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }
  // en funksjon (randomizePieceType) som returnerer et tilfeldig tall opptil antall brikker
  randomizePieceType(numberOfTypes) {
    return Math.floor(Math.random() * numberOfTypes);
  }
}