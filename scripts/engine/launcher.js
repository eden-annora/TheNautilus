var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var textcanvas = document.getElementById("textCanvas");
var ctx_text = textcanvas.getContext("2d");

var centerOfCanvas = new Vector(canvas.width / 2, canvas.height / 2); // precalculating this. because i have to use it twice. for every single object. every frame.

ctx.fillStyle = "#34ebba"
ctx.font = "12px Courier New"
ctx.fillText("loading...", 10, 20);

window.addEventListener('load', function () {
  // draw background art

  let len = splashtexts.length;
  ctx.fillText("THE NAUTILUS!", centerOfCanvas.X, centerOfCanvas.Y);
  ctx.fillText(splashtexts[Math.floor(Math.random()*len)], centerOfCanvas.X, centerOfCanvas.Y+40);
  
    
  ctx.fillText("complete!", 10, 40);
  ctx.fillText("PRESS ANY KEY!", 10, 60);

  document.addEventListener("visibilitychange", function () { // when the window is out of focus stop the game from progressing physics updates. this stops the player from reaching relitivistic speeds due to DT buildup and the velocity not ever *actually* being zero due to how de-acceleration works.
    if (document.visibilityState === 'visible') { console.log('has focus, resuming game'); lastrun = performance.now(); focused = true }
    else { console.log('lost focus, pausing game'); focused = false }
  });
  window.addEventListener("keydown", openmainmenu);
  window.setInterval(update, 4);


});
function openmainmenu() {
  //computer boot sounds
  computer_boot_start.play()

  window.requestAnimationFrame(menu)
  window.removeEventListener("keydown", openmainmenu)
  window.addEventListener("keydown", function (event) { eventHandler.raiseEvent("keyPressed", new Object({ data: event })) }); // translating window events to my own events, makes it simpler to make things work together later.
  window.addEventListener("keyup", function (event) { eventHandler.raiseEvent("keyReleased", new Object({ data: event })) });
}
function launch() {
  
  //background = [new backgroundSprite([player_scangrid, player_scannerblurb, tmpbgtile], "keyPressed", 0, 0)]

  entities = [new Player(0, 0, ["KeyW", "KeyA", "KeyS", "KeyD", "Space", "ShiftLeft"])]

  for (let i = 0; i < 100; i++) {
    entities.unshift(new Spore(0, 0))
  }
  

  
  //for (let i = 0; i < 5; i++) {
  //  entities.push(new testenemy(0, -500))
  //}
  
  entities.push(new scannable(0, 0, ["line 1","line 2","line 3"]))
  //romango gameTrigger testing
  entities.push(new gameTrigger(250, 250, 300, 300))
  //eden surface testing
  entities.push(new surface(1000, 200, 1200, 0)) // corners
  entities.push(new surface(1200, -600, 1000, -800))
  entities.push(new surface(-1200, 0, -1000, 200))
  entities.push(new surface(-1000, -800, -1200, -600))

  entities.push(new surface(-1000, 200, 1000, 200)) // floor and ceiling 
  entities.push(new surface(1000, -800, -1000, -800))

  entities.push(new surface(-1200, -600, -1200, 0)) // walls
  entities.push(new surface(1200, 0, 1200, -600))

  entities.push(new vent(600, 0, 600, -600))

 

  ctx.fillText("update loop is now running!", 10, 80);
  window.requestAnimationFrame(draw);//wooooo dynamic framerate based off the users refreshrate wooooooo
  ctx.fillText("renderer running!", 10, 100);

  //audio: end main menu sounds and play normal music
  computer_boot_start.stop();
  computer_boot_loop.stop();
  computer_boot_end.play();
  background_music.play();

};
