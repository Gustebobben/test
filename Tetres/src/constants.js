export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;
export const LEVELS = [1000, 900, 700, 500, 300, 100, 50];
//10 1 50 2 100 3 150 4
export const COLORS = [
  "none", // 0
  "cyan", // 1
  "blue", // 2
  "orange", // 3
  "yellow", // 4
  "green", // 5
  "purple", // 6
  "red" // 7
];
Object.freeze(COLORS);

export const SHAPES = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],
  [
    [4, 4],
    [4, 4]
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ]
];
export const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
  ESC: 27,
  ENTER: 13
};
Object.freeze(KEY);