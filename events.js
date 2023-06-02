class EventHandler {
  constructor() {
    this.eventlist = [];
    this.callbacklist = new Object({
    });
  }
  raiseEvent(type,inputdata){
    if (this.callbacklist.hasOwnProperty(type)){
      this.eventlist.push(new Event(type,inputdata));
    } else {console.log("creation of event "+ type +  " with data " + inputdata + " was attempted, there are no listeners by this name, thus no event was raised.")}
}
  
  bindListener(target,type,callback){
    let object = new EventListener(target,type,callback)
     if (this.callbacklist.hasOwnProperty(type)){
      this.callbacklist[type].push(object);
     } else {
    this.callbacklist[type] = []
     this.callbacklist[type].push(object); 
       console.log("new event catagory was created with key: "+ type + " by " + target)
     }
  }
  
  processCallbacks(){
    let len = this.eventlist.length;
    for (let i = 0; i < len; i++) {
      let event = this.eventlist[i];
      if (event){
        let callbacklen = this.callbacklist[event.type].length;
        for (let i = 0; i < callbacklen; i++) {this.callbacklist[event.type][i].triggerCallback(event.data)}}
      this.eventlist.splice(i, 1);
    }
  }
}

class Event{
  constructor(type,data) {
    this.type = type;
    this.data = data;
    this.age = 1;
  }
}

class EventListener {
  constructor(target,type,callback) {
    this.type = type;
    this.callback = callback;
    this.target = target;
  }
  triggerCallback(eventdata){this.callback(this.target,eventdata)}
}

class PhysicsController{
  constructor(){
    eventHandler.bindListener(this,"entityMoveRequest",function (target,DT){
      
    })
  }
}

class Player{
  constructor(X,Y,Keys){
    this.dacc = new Vector(-.25,-.25);
    this.acc = new Vector(0.001,0.001);
    
    this.moveVector = new Vector(0,0);
    this.pos = new Vector(X,Y);
    this.vel = new Vector(0,0);

    this.keys = Keys
    this.w = false
    this.a = false
    this.s = false
    this.d = false
    
    
    eventHandler.bindListener(this,"keyPressed", function (target,keyevent){
      if (keyevent.data.key == target.keys[0]){target.w = true}
      if (keyevent.data.key == target.keys[1]){target.a = true}
      if (keyevent.data.key == target.keys[2]){target.s = true}
      if (keyevent.data.key == target.keys[3]){target.d = true}
    });
    
    eventHandler.bindListener(this,"keyReleased", function (target,keyevent){
      if (keyevent.data.key == target.keys[0]){target.w = false}
      if (keyevent.data.key == target.keys[1]){target.a = false}
      if (keyevent.data.key == target.keys[2]){target.s = false}
      if (keyevent.data.key == target.keys[3]){target.d = false}
    });
    
    eventHandler.bindListener(this,"physics_update", function (target,data){ 
    target.moveVector.setXY(0,0);
    
    if (target.w){target.moveVector.addXY(0,-1);}
    if (target.s){target.moveVector.addXY(0,1);}
    if (target.a){target.moveVector.addXY(-1,0);}
    if (target.d){target.moveVector.addXY(1,0);}
    
    target.moveVector.applyforceToDest_OT(target.vel,target.dacc,DT);

    target.moveVector.clamp(1,-1,1,-1)
    target.vel.applyforceToDest_OT(target.moveVector,target.acc,DT);
    target.pos.add_OT(target.vel,DT);});
  }
  
  draw(){
    ctx.drawImage(player_sprite_RCSjets_V, centerOfCanvas.X - 25, centerOfCanvas.Y - 25 + ((-this.moveVector.Y*2)+Math.random()-0.5)*8  ,50,50);
    ctx.drawImage(player_sprite_RCSjets_H, centerOfCanvas.X - 25  + ((-this.moveVector.X)*2+Math.random()-0.5)*8, centerOfCanvas.Y - 25 ,50,50);
    ctx.drawImage(playersprite, centerOfCanvas.X-25, centerOfCanvas.Y-25,50,50);
    if (debug) {
    ctx.strokeStyle = "rgba(255, 0, 0, 1)"
    ctx.beginPath();
    ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
    ctx.lineTo(centerOfCanvas.X+this.moveVector.X * 50,centerOfCanvas.Y+this.moveVector.Y * 50);
    ctx.stroke();
    }
    if (helpmenu){
      let offset = 50
      ctx.fillText((this.keys[0].toUpperCase()),500,281-offset)
      ctx.fillText((this.keys[1].toUpperCase()),500-offset,281)
      ctx.fillText((this.keys[2].toUpperCase()),500,281+offset)
      ctx.fillText((this.keys[3].toUpperCase()),500+offset,281)
    }
  }
}

class Debugkeylistener{
    constructor(){
       eventHandler.bindListener(this,"keyPressed", function(target,keyevent){if (keyevent.data.key == "b"){debug = !debug}});
    }
  }
  
class Helpkeylistener{
    constructor(){
       eventHandler.bindListener(this,"keyPressed", function(target,keyevent){if (keyevent.data.key == "h"){helpmenu = !helpmenu}});
    }
  }
