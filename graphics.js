var time = 0;
var DT = 0
var lastrun = 0
var tps = 0
var player1 = null;
var tpsmax = 0
var tpsmin = 0


var scannableobjects = [];
var entities = [];
var sporelist = [];
var forceblocklist = [];

function draw(dtime) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#34ebba"
  ctx.font = "12px Courier New"
  ctx.fillText("total spores:", 10, 35);
  ctx.fillText("spore cap: 100", 10, 20);
  ctx.fillText(sporelist.length, 100, 35);
  ctx.fillText("entities:", 10, 55);
  ctx.fillText("Time:", 130, 20);
  ctx.fillText(time, 165, 20);
  ctx.fillText("physics TPS:", 350, 20);
  ctx.fillText(tps, 440, 20);
  ctx.fillText("TPS min:", 350, 50);
  ctx.fillText(tpsmin, 440, 50);
  ctx.fillText("TPS max:", 350, 80);
  ctx.fillText(tpsmax, 440, 80);
  ctx.fillText("VER: 0.15.9 | SCAN GRAPHICS! ", 500, 500);

  count = forceblocklist.length;
  for( i = 0; i < count; i++) {
      item = forceblocklist[i];
      item.draw();
  }
  
  count = entities.length;
  for( i = 0; i < count; i++) {
      item = entities[i];
      ctx.fillText(item.name, 10, 70 + (10*i));
      item.draw();
  }
  
  var count = sporelist.length;
  for(var i = 0; i < count; i++) {
      var item = sporelist[i];
      item.draw();
  }
  
  
  window.requestAnimationFrame(draw);
}


function update() {
  DT = performance.now() - lastrun;
  lastrun = performance.now();
  time += 1;
  
  if (DT !== 0){tps = Math.round((tps*49+(1000/DT))/50)}
  if (tps > tpsmax){tpsmax = tps}
  if (tps < tpsmin){tpsmin = tps}

  if (time > 625) {time = 0; tpsmin = 1000; tpsmax = 0;}
  
  let count = entities.length;
  for(let i = 0; i < count; i++) {
      let item = entities[i];
      item.update(DT,player1,forceblocklist);
      
  }
  count = sporelist.length;
  for(let i = 0; i < count; i++) {
    let item = sporelist[i];
    item.update(DT,player1,forceblocklist);
    }
  count = forceblocklist.length;
  for( i = 0; i < count; i++) {
      item = forceblocklist[i];
      item.update(DT,player1,forceblocklist);
  }
}

function spawnspores(){
    for(var i = sporelist.length - 99; i < 1; i++) {
      sporelist.push(new sporeparticle(player1.pos.X + ((Math.random()-0.5)*2000),player1.pos.Y +((Math.random()-0.5)*2000),0,0,0))  
  }
}

function init() {
  player1 = new player(0,0);
  tmp = new scannable(-500,-500,1000,["text blurb, it aint pretty,","ill fix that later when i","care enough...","also this is line four"])
  tmp2 = new scannable(-650,-500,200,["this one took longer to scan"])
  tmp3 = new scannable(-800,-500,100,["hi, this sucked to code, i dont want to live anymore"])
  scannableobjects = [tmp,tmp2,tmp3]
  entities = [player1,tmp,tmp2,tmp3];
  forceblocklist = [
    new forceblock(250,0,0,0,500,25,.0003,0),
    new forceblock(250,-100,0,0,500,25,0.0001,.0001),
    new forceblock(250,100,0,0,500,25,0.0001,-.0001),
    new forceblock(250,-50,0,0,500,25,0.0002,.0001),
    new forceblock(250,50,0,0,500,25,0.0002,-.0001)
    ];
}
