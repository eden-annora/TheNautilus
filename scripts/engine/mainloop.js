const VERSION = "0.0.1.4 | player now has momentum storage!" // just sets what the version blurb says in the help/debug menu

var focused = false;// is my tab selected
var helpmenu = false // is help menu being displayed
var debug = false // is debug menu being displayed
var muteMusic = false //control music muting

var eventHandler = new EventHandler()

var camera = new Camera()

var menukeys = new ExternalKeyListeners()


var time = 0; // behold the glorious animation timer, this is setup to be used as the input for sin functions.
var DT = 0
var lastrun = 0 //the time at which the funciton was last run
var tps = 0
var tpsmax = 0
var tpsmin = 0

var lastframe = 0 // time since the last frame was sent to the screen.

var entities = []; // all objects with a draw(): funciton. these all get drawn once per frame.

function update() {

  DT = performance.now() - lastrun;
  lastrun = performance.now();


  if (DT !== 0) { tps = Math.round((tps * 49 + (1000 / DT)) / 50) } // time since last frame averaged over 50 frames
  if (tps > tpsmax) { tpsmax = tps } // min and max tps numbers
  if (tps < tpsmin) { tpsmin = tps }

  if (time > 625) { time = 0; tpsmin = 1000; tpsmax = 0; } // reset the time variable

  if (focused) {
    time += 1;
    eventHandler.raiseEvent("physics_update", new Object({}))// add a physics event to make sure everyone takes their turns to move instead of lying around like a sad rock.
  }

  eventHandler.processCallbacks() // go process all the events that have occured since the last time we have checked

  //do things here blah blah blah :p

}

function draw(DT) {
  let frametime = (DT - lastframe)
  lastframe = DT

  ctx.fillStyle = "#34ebba"
  ctx.font = "12px Courier New"

  ctx.clearRect(0, 0, canvas.width, canvas.height) // clear the screen

  len = entities.length;
  for (let i = 0; i < len; i++) {
    entities[i].draw(i, frametime)// finally draw all the entities in the list.
  }

  if (debug) {// display the debug menu, but only when i want you to.

    ctx.fillText("Time:", 30, 35);
    ctx.fillText(time, 65, 35);
    ctx.fillText("physics TPS:", 350, 20);
    ctx.fillText(tps, 440, 20);
    ctx.fillText("TPS min:", 350, 40);
    ctx.fillText(tpsmin, 440, 40);
    ctx.fillText("TPS max:", 350, 60);
    ctx.fillText(tpsmax, 440, 60);
    ctx.fillText("DEBUG MODE ENABLED      " + VERSION, 200, 500);
    ctx.fillText("frameTime:      Ms", 30, 20);
    ctx.fillText(frametime.toFixed(2), 105, 20);
  }
  if (muteMusic) {
    background_music.mute(true)
  } else {
    background_music.mute(false);
  }

  if (helpmenu || DT < 1000 && !debug) {// display help menu but also display it for the first 5 seconds that the game is running. but not while the debug menu is also open.
    ctx.fillStyle = "#34ebba"
    ctx.font = "12px Courier New"

    ctx.fillText("FREIGHTER", centerOfCanvas.X - 30, 160);
    ctx.fillText("ATTENTION:", centerOfCanvas.X - 30, 400);
    ctx.fillText("YOU MAY PAUSE AT ANY TIME  |  PRESS \"ESC\" TO PAUSE", centerOfCanvas.X - 160, 420);
    ctx.fillText("DEBUG MODE NOW STARTS DISABLED  |  PRESS \"B\" TO ENABLE DEBUG MODE", centerOfCanvas.X - 230, 440);
    ctx.fillText("HELP MENU NOW STARTS CLOSED  |  PRESS \"H\" TO OPEN HELP MENU", centerOfCanvas.X - 230, 460);
    ctx.fillText("VER: " + VERSION, centerOfCanvas.X - 245, 480);
    ctx.fillText("By: Eden Annora", centerOfCanvas.X - 50, 500);
    if (DT < 10000 && !debug) {
      ctx.fillText("message will dissapear in   s", centerOfCanvas.X - 100, 520);
      ctx.fillText(Math.round((1000 - DT) / 1000), centerOfCanvas.X + 90, 520);
    }
  }

  if (!focused) { // show paused overlay when paused
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "#ff0000";
    ctx.rect(5, 5, canvas.width - 10, canvas.height - 10);
    ctx.stroke();
    ctx.fillStyle = "#ff0000"
    ctx.font = "25px Courier New"
    ctx.fillText("PAUSED", centerOfCanvas.X - 50, 160);
  }


  window.requestAnimationFrame(draw);

}