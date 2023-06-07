
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var centerOfCanvas = new Vector(canvas.width / 2, canvas.height / 2); // precalculating this. because i have to use it twice. for every single object. every frame.

ctx.fillStyle = "#34ebba"
ctx.font = "12px Courier New"
ctx.fillText("loading...", 10, 20);

window.addEventListener('load', function () {
  ctx.fillText("complete!", 10, 40);
  ctx.fillText("starting!", 10, 60);
  setInterval(update, 4);// idk man, run it once every 10 milliseconds.
  ctx.fillText("update loop is now running!", 10, 80);
  window.requestAnimationFrame(draw);//wooooo dynamic framerate based off the users refreshrate wooooooo
  ctx.fillText("renderer running!", 10, 100);

  document.addEventListener("visibilitychange", function () { // when the window is out of focus stop the game from progressing physics updates. this stops the player from reaching relitivistic speeds due to DT buildup and the velocity not ever *actually* being zero due to how de-acceleration works.
    if (document.visibilityState === 'visible') { console.log('has focus, resuming game'); lastrun = performance.now(); focused = true }
    else { console.log('lost focus, pausing game'); focused = false }
  });

  window.addEventListener("keydown", function (event) { eventHandler.raiseEvent("keyPressed", new Object({ data: event })) }); // translating window events to my own events, makes it simpler to make things work together later.
  window.addEventListener("keyup", function (event) { eventHandler.raiseEvent("keyReleased", new Object({ data: event })) });


  entities = [new Player(0, 0, ["KeyW", "KeyA", "KeyS", "KeyD", "Space"])]

  for (let i = 0; i < 100; i++) {
    entities.push(new Spore(0, 0))
  }
});