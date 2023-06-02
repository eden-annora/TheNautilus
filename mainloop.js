var time = 0;
var DT = 0
var lastrun = 0
var tps = 0
var tpsmax = 0
var tpsmin = 0

var lastframe = 0

var entities = [];

function update() {
  
  DT = performance.now() - lastrun;
  lastrun = performance.now();
  time += 1;
  
  if (DT !== 0){tps = Math.round((tps*49+(1000/DT))/50)}
  if (tps > tpsmax){tpsmax = tps}
  if (tps < tpsmin){tpsmin = tps}

  if (time > 625) {time = 0; tpsmin = 1000; tpsmax = 0;}
  
  eventHandler.raiseEvent("physics_update",new Object({}))
  
  
  eventHandler.processCallbacks()
  
  //do things here blah blah blah :p
  
}

function draw(DT){
  let frametime = (DT - lastframe)
  lastframe = DT
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (debug){
  ctx.fillStyle = "#34ebba"
  ctx.font = "12px Courier New"
  ctx.fillText("Time:", 30, 35);
  ctx.fillText(time, 65, 35);
  ctx.fillText("physics TPS:", 350, 20);
  ctx.fillText(tps, 440, 20);
  ctx.fillText("TPS min:", 350, 40);
  ctx.fillText(tpsmin, 440, 40);
  ctx.fillText("TPS max:", 350, 60);
  ctx.fillText(tpsmax, 440, 60);
  ctx.fillText("DEBUG MODE ENABLED      "+VERSION+" | EventHandler Complete | player visuals are implemented!", 200, 500);
  ctx.fillText("frameTime:      Ms", 30, 20);
  ctx.fillText(frametime.toFixed(2), 105, 20);
  }
  
   if (helpmenu || DT < 10000 && !debug){
    
    ctx.fillText("FREIGHTER", 470, 160);
    ctx.fillText("ATTENTION:", 470, 420);
    ctx.fillText("DEBUG MODE NOW STARTS DISABLED  |  PRESS \"B\" TO ENABLE DEBUG MODE", 270, 440);
    ctx.fillText("HELP MENU NOW STARTS CLOSE  |  PRESS \"H\" TO OPEN HELP MENU", 270, 460);
    ctx.fillText("VER: "+VERSION+" | EventHandler Complete | player visuals are implemented!", 255, 480);
    ctx.fillText("By: Eden Annora", 450, 500);
    if (DT < 10000 && !debug) {ctx.fillText("message will dissapear in   s", 400, 520);
    ctx.fillText(Math.round((10000 - DT)/1000), 590, 520);
   }
   }
  
  
  len = entities.length;
  for (let i = 0; i < len; i++) {
      entities[i].draw()
  }
  window.requestAnimationFrame(draw);
  
}