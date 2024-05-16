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


  //TODO: Roman needs to clean this code up


  //old implementation
  //let len = splashtexts.length;
  ctx.fillText("THE NAUTILUS!", centerOfCanvas.X, centerOfCanvas.Y);
  //ctx.fillText(splashtexts[Math.floor(Math.random() * len)], centerOfCanvas.X, centerOfCanvas.Y + 40);


  //roman experimental implementation

  splashtext()
  async function splashtext() {
    const response = await fetch("https://raw.githubusercontent.com/eden-annora/TheNautilus/splashtext-as-text-file/scripts/splashtext.txt");
    const splashtexts = await response.text();

    split_splashtexts = splashtexts.split('\n') // makes all the items in the list

    //console.log(split_splashtexts)

    randomNum = Math.floor(Math.random() * split_splashtexts.length)

    //console.log(randomNum)

    randomsplash = split_splashtexts[randomNum] // gets you the random line!

    //console.log(randomsplash)

    ctx.fillText(randomsplash, centerOfCanvas.X, centerOfCanvas.Y + 40);
  }


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



  for (let i = 0; i < 10; i++) {
    entities.push(new testenemy(0, -500))
  }

  //entities.push(new WormHead(0, -500, 50))


  entities.push(new scannable(0, 0, ["line 1", "line 2", "line 3"]))
  //romango gameTrigger testing
  entities.push(new gameTrigger(250, 250, 300, 300))
  //eden room testing
  buildroom(0, 0, {
    upL: "vent",
    upR: "vent",

    downL: "vent",
    downR: "vent",

    left: "closed",
    right: "closed"
  })
  buildroom(1200, -1500, {
    upL: "closed",
    upR: "closed",

    downL: "open",
    downR: "closed",

    left: "open",
    right: "closed"
  })
  buildroom(-1200, -1500, {
    upL: "closed",
    upR: "closed",

    downL: "closed",
    downR: "open",

    left: "closed",
    right: "open"
  })



  ctx.fillText("update loop is now running!", 10, 80);
  window.requestAnimationFrame(draw);//wooooo dynamic framerate based off the users refreshrate wooooooo
  ctx.fillText("renderer running!", 10, 100);

  //audio: end main menu sounds and play normal music
  computer_boot_start.stop();
  computer_boot_loop.stop();
  computer_boot_end.play();
  background_music.play();

};
