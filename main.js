var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var centerOfCanvas = new vector(canvas.width/2,canvas.height/2);

ctx.font = "15px Arial";
ctx.fillStyle = "red";
ctx.fillText("loading...", 10, 20);

window.addEventListener('load', function() {
  ctx.fillText("complete!", 10, 40);
  ctx.fillText("starting!", 10, 60);
  init();
  ctx.fillText("player initalized!", 10, 80);
  setInterval(update, 4);
  ctx.fillText("update loop is now running!", 10, 120);
  window.requestAnimationFrame(draw);
  ctx.fillText("renderer running!", 10, 140);
  spawnspores()
  ctx.fillText("spores spawned!", 10, 100);

  
  
  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);
});




function keydown(event) {
    if (event.key === "w" && player1.moveVector.Y != -1) {
      player1.w = true;
    }
    if (event.key === "s" && player1.moveVector.Y != 1) {
      player1.s = true;
    }
    if (event.key === "a" && player1.moveVector.X != -1) {
      player1.a = true;
    }
    if (event.key === "d" && player1.moveVector.X != 1) {
      player1.d = true;
    }
}

function keyup(event) {
    if (event.key === "w") {
      player1.w = false;
    }
    if (event.key === "s") {
      player1.s = false;
    }
    if (event.key === "a") {
      player1.a = false;
    }
    if (event.key === "d") {
      player1.d = false;
    }
    if (event.key === " ") {
      if(player1.scanning){
      player1.scanning = false;
      } else {
        player1.scanning = true;
      }
    }
}

