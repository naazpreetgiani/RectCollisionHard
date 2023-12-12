// Rectangle Collision (Easier)
// When rectangle Collides with a wall, teleport back to original position

// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let rectX = 20;
let rectY = 300;
let size = 30;
let speed = 10;

// Global Variables
let walls = [];
walls.push({ x: 500, y: 0, w: 20, h: 200 });
walls.push({ x: 100, y: 20, w: 20, h: 200 });
walls.push({ x: 300, y: 300, w: 100, h: 20 });
walls.push({ x: 500, y: 500, w: 20, h: 200 });
walls.push({ x: 200, y: 450, w: 20, h: 200 });
walls.push({ x: 500, y: 375, w: 200, h: 20 });


// Draw Function
window.addEventListener("load", draw);

function draw() {
  // LOGIC

  // DRAWING
  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Walls
  ctx.fillStyle = "black";
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  }

  // Draw Player
  ctx.fillStyle = "rgb(221, 17, 143)";
  ctx.fillRect(rectX, rectY, size, size);

  if (rectX < 0) {
    rectX = 0;
  } else if (rectX + size > cnv.width) {
    rectX = cnv.width - size;
  } else if (rectY < 0) {
    rectY = 0;
  } else if (rectY + size > cnv.height) {
    rectY = cnv.height - size;
  }
  // Animation Loop
  requestAnimationFrame(draw);
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(e) {
    //Check for keys pressed
    if (e.code === "ArrowUp") {
      upPressed = true;
    } else if (e.code === "ArrowDown") {
      downPressed = true;
    } else if (e.code === "ArrowLeft") {
      leftPressed = true;
    } else if (e.code === "ArrowRight") {
      rightPressed = true;
    }

  if (upPressed) {
    rectY -= 7;
  } else if (downPressed) {
    rectY += 7;
  } else if (leftPressed) {
    rectX -= 7;
  } else if (rightPressed) {
    rectX += 7;
  }

  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    if (rectX < wall.x + wall.w &&
      rectX + size > wall.x &&
      rectY < wall.y + wall.h &&
      rectY + size > wall.y) {
      if (upPressed) {
        if (rectY + size > wall.y) {
        rectY = wall.y + wall.h;
        }
      } else if (downPressed) {
        if (rectY < wall.y + wall.h){
        rectY = wall.y - size;
        }
      } else if (leftPressed) {
        if (rectX < wall.x + wall.w) {
          rectX = wall.x + wall.w;
        }
      } else if (rightPressed) {
        if (rectX + size > wall.x) {
          rectX = wall.x - size;
        }
      }
    }
  }
} 

function keyupHandler(e) {
    //Check for keys pressed
    if (e.code === "ArrowUp") {
        upPressed = false;
    } else if (e.code === "ArrowDown") {
        downPressed = false;
    } else if (e.code === "ArrowLeft") {
      leftPressed = false;
  } else if (e.code === "ArrowRight") {
      rightPressed = false;
  } 
}