
var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
//ctx.fillStyle="blue"
//ctx.clearRect(0,0,canvas.width,canvas.height);
var count = 0
var grid = 16
var snake = {
    x:130,
    y:100,
    dx:grid,
    dy:0,
    cells:[],
    maxCells:2,
}
function loop(){
    requestAnimationFrame(loop)
    count += 1
    if (count<30){
        return;
    }
    console.log(snake)
    count = 0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    snake.x+=snake.dx
    snake.y+=snake.dy
    if (snake.x < 0){
        snake.x = canvas.width - grid
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0
    }
    if (snake.y < 0){
        snake.y = canvas.height - grid
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0
    }
snake.cells.unshift({x:snake.x,y:snake.y})
if (snake.cells.length > snake.maxCells){
    snake.cells.pop()
}
ctx.fillStyle="red"
snake.cells.forEach(function(cell,index){
    ctx.fillRect(
        cell.x,cell.y,grid-1,grid-1
    )
})
}
requestAnimationFrame(loop)
