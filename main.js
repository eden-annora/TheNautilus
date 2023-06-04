const VERSION = "0.0.1.3 | Camera System has been implemented, plus small fixes"

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var centerOfCanvas = new Vector(canvas.width / 2, canvas.height / 2);

var focused = true;

var eventHandler = new EventHandler()

var helpmenu = false
var debug = false

var camera = new Camera()

var menukeys = new ExternalKeyListeners()

ctx.fillStyle = "#34ebba"
ctx.font = "12px Courier New"
ctx.fillText("loading...", 10, 20);

window.addEventListener('load', function () {
  ctx.fillText("complete!", 10, 40);
  ctx.fillText("starting!", 10, 60);
  setInterval(update, 4);
  ctx.fillText("update loop is now running!", 10, 80);
  window.requestAnimationFrame(draw);
  ctx.fillText("renderer running!", 10, 100);

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'visible') { console.log('has focus, resuming game'); lastrun = performance.now(); focused = true }
    else { console.log('lost focus, pausing game'); focused = false }
  });

  window.addEventListener("keydown", function (event) { event.preventDefault(); eventHandler.raiseEvent("keyPressed", new Object({ data: event })) });
  window.addEventListener("keyup", function (event) { event.preventDefault(); eventHandler.raiseEvent("keyReleased", new Object({ data: event })) });


  entities = [new Player(0, 0, ["KeyW", "KeyA", "KeyS", "KeyD"])]
});