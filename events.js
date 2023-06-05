

class EventHandler {
  constructor() {
    this.eventlist = []; //list of events raised since the last processCallbacks funct
    this.callbacklist = new Object({}); // dict with structure resembling 'type:[listener1,listener2]'
  }
  raiseEvent(type, inputdata) {
    if (this.callbacklist.hasOwnProperty(type)) {// check if event type already has 'type' catagory and if it doesnt log the attempt and dont do anything.
      this.eventlist.push(new Event(type, inputdata));
    } else { console.log("creation of event " + type + " with data " + inputdata + " was attempted, there are no listeners by this name, thus no event was raised.") }
  }

  bindListener(target, type, callback) {// check if event type already has 'type' catagory and if it doesnt log the attempt, create the catagory, and apply the listener.
    let object = new EventListener(target, type, callback)
    if (this.callbacklist.hasOwnProperty(type)) {
      this.callbacklist[type].push(object);
    } else {
      this.callbacklist[type] = []
      this.callbacklist[type].push(object);
      console.log("new event catagory was created with key: " + type + " by " + target)
    }
  }

  processCallbacks() {// iterate through eventlist and run callback functions for all the listeners that match the event type
    let len = this.eventlist.length;
    for (let i = 0; i < len; i++) {
      let event = this.eventlist[i];
      if (event) {// if the event isnt a null object, go find the matching entry in the callbacklist dict and run all the callbacks.
        let callbacklen = this.callbacklist[event.type].length;
        for (let i = 0; i < callbacklen; i++) { this.callbacklist[event.type][i].triggerCallback(event.data) }
      }
      this.eventlist.splice(i, 1);//remove event from list once all callbacks have been notified.
    }
  }
}

class Event {// event class, type is the name of the catagory its sorted into and data is a dynamic object that changes in structure for each event type.
  constructor(type, data) {
    this.type = type;
    this.data = data;
    this.age = 1;
  }
}

class EventListener {// stores the object that added the listener, the callback function, and the catagory/type.
  constructor(target, type, callback) {
    this.type = type;
    this.callback = callback;
    this.target = target;
  }
  triggerCallback(eventdata) { this.callback(this.target, eventdata) }
}

class PhysicsController {//un-used for now.
  constructor() {
    eventHandler.bindListener(this, "entityMoveRequest", function (target, DT) {

    })
  }
}

class Player {
  constructor(X, Y, Keys) {
    this.dacc = new Vector(-.25, -.25);
    this.acc = new Vector(0.001, 0.001);

    this.moveVector = new Vector(0, 0);
    this.pos = new Vector(X, Y);
    this.vel = new Vector(0, 0);

    this.keys = Keys
    this.w = false
    this.a = false
    this.s = false
    this.d = false

    this.MoveKeyHeld = false

    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) {// bring in keypresses and convert them to 1 of 4 bools
      if (keyevent.data.code == target.keys[0]) { target.w = true; }
      if (keyevent.data.code == target.keys[1]) { target.a = true; }
      if (keyevent.data.code == target.keys[2]) { target.s = true; }
      if (keyevent.data.code == target.keys[3]) { target.d = true; }
      
    });

    eventHandler.bindListener(this, "keyReleased", function (target, keyevent) {// bring in keypresses and convert them to 1 of 4 bools
      if (keyevent.data.code == target.keys[0]) { target.w = false; }
      if (keyevent.data.code == target.keys[1]) { target.a = false; }
      if (keyevent.data.code == target.keys[2]) { target.s = false; }
      if (keyevent.data.code == target.keys[3]) { target.d = false; }

    });

    eventHandler.bindListener(this, "physics_update", function (target, data) {// same thing as an update loop, called once every iteration of update loop.
      target.moveVector.setXY(0, 0);// zero out move vect to stop it compounding over time and getting stuck at values
      target.MoveKeyHeld = false // used later to determine whether audio should be playing or not
      if (target.w) { target.moveVector.addXY(0, -1); target.MoveKeyHeld = true}// 4 bools to a vector and one bool
      if (target.s) { target.moveVector.addXY(0, 1); target.MoveKeyHeld = true}
      if (target.a) { target.moveVector.addXY(-1, 0); target.MoveKeyHeld = true}
      if (target.d) { target.moveVector.addXY(1, 0); target.MoveKeyHeld = true}

      target.moveVector.applyforceToDest_OT(target.vel, target.dacc, DT);//apply the auto de accelleration to the player

      target.moveVector.clamp(1, -1, 1, -1) //clamp vector from values +1 to -1
      target.vel.applyforceToDest_OT(target.moveVector, target.acc, DT); // apply a force to the veloctiy based on the moveVector and the acceleration constant.
      target.pos.add_OT(target.vel, DT);// move the player (this will get replaced later with a raiseEvent("Entity_requestMove,new Object({pos:player pos, requestedpos:player pos + player vel})"))

      eventHandler.raiseEvent("cameraPosUpdate", new Object({// tell the camera that we moved to new a new pos
        X: target.pos.X,
        Y: target.pos.Y
      }))
    });
  }


  draw() {
    let tpX = centerOfCanvas.X - 25 + (this.pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
    let tpY = centerOfCanvas.Y - 25 + (this.pos.Y - camera.pos.Y)

    let thrusterOffSetH = ((-this.moveVector.X * 2) + Math.random() - 0.5) * 8 //adds flicker to the thrusters based on randomness (yaay!!!)
    let thrusterOffSetV = ((-this.moveVector.Y * 2) + Math.random() - 0.5) * 8

    if (this.MoveKeyHeld){ // told you this would come back later, this determines whether or not the player is applying a move input, and then determines whether or not we should be playing audio
      if (!thruster_loop.playing()){
        thruster_loop.play() // players tryna move! shit shit shit! play the audio or something!
      }
    } else {
      if (thruster_loop.playing()){
        thruster_loop.stop()
        thruster_end.play();// oh fuck! players stopped moving! and the audio is *still* going! shit shit shit! play the other audio! and STOP THIS ONE!
      }
    }

    ctx.drawImage(player_sprite_RCSjets_V, tpX, tpY + thrusterOffSetV, 50, 50);//draw the vertical jets onto the screen based off predetermined values
    ctx.drawImage(player_sprite_RCSjets_H, tpX + thrusterOffSetH, tpY, 50, 50);//draw the horizontal jets onto the screen based off predetermined values
    ctx.drawImage(playersprite, tpX, tpY, 50, 50);//draw the players sprite onto the screen based off predetermined values
    if (debug) {
      ctx.strokeStyle = "rgb(255, 0, 0)"
      ctx.lineWidth = "1";
      ctx.beginPath();
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X + this.moveVector.X * 50, centerOfCanvas.Y + this.moveVector.Y * 50);// display a vector onscreen in the form of a line that shows the players "intended direction" (MoveVector)
      ctx.stroke();
      ctx.strokeStyle = "rgb(0, 100, 255)"
      ctx.beginPath();
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X + this.vel.X * 50, centerOfCanvas.Y + this.vel.Y * 50); // display a vector onscreen in the form of a line that shows the players "actual direction" (velocity)
      ctx.stroke();
    }
    if (helpmenu) {
      ctx.fillStyle = "#34ebba"
      ctx.font = "12px Courier New"
      let offset = 50
      ctx.fillText((this.keys[0].toUpperCase()), 500, 281 - offset)// show keybinds
      ctx.fillText((this.keys[1].toUpperCase()), 500 - offset, 281)
      ctx.fillText((this.keys[2].toUpperCase()), 500, 281 + offset)
      ctx.fillText((this.keys[3].toUpperCase()), 500 + offset, 281)
    }
  }
}

class Camera {
  constructor() {
    this.dacc = new Vector(-.5, -.5);
    this.acc = new Vector(0.01, 0.01);

    this.setpos = new Vector(0, 0) //target position
    this.moveVector = new Vector(0, 0) //intended direction
    this.pos = new Vector(0, 0); //actual pos
    this.vel = new Vector(0, 0); //actual direction

    this.camerashake = false // to be used later, this will apply random jostling to the camera while true

    eventHandler.bindListener(this, "cameraPosUpdate", function (target, data) {// remember earlier when we told the camera where the player is? no? too bad. go look at line 111 again :p
      target.setpos.X = data.X
      target.setpos.Y = data.Y
    })

    eventHandler.bindListener(this, "physics_update", function (target, data) {// woah. camera? physics? incredible!

      let difX = target.setpos.X - target.pos.X // we obtain numerous differences or deviations.
      let difY = target.setpos.Y - target.pos.Y // we can obtain these because we know where we are, or more accuratley, where we arent.

      target.moveVector.X = difX * (Math.pow(difX, 2) / 1000)//funky curve math, basically this is the response curve for the players distance from the camera.
      target.moveVector.Y = difY * (Math.pow(difY, 2) / 1000)

      target.moveVector.applyforceToDest_OT(target.vel, target.dacc, DT);//same as player, apply de accelerations, accelerations, and position offsets.
      target.vel.applyforceToDest_OT(target.moveVector, target.acc, DT);
      target.pos.add_OT(target.vel, DT);
    })

  }
}

class ExternalKeyListeners {// menu buttons that need to work even if the player is dead or otherwise missing from the scene.
  constructor() {
    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) { if (keyevent.data.code == "KeyB") { debug = !debug } });
    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) { if (keyevent.data.code == "KeyH") { helpmenu = !helpmenu } });
    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) { if (keyevent.data.code == "Escape") { focused = !focused; if (!musicplaying){musicplaying = true; menumusic.play();} } }); 
    // ^^ assists in NOT trying to play the music until AFTER the user interacts with the page. damn you chrome and your reasonable decisions and stuff.
    //further note: you cant play audio until the user has interacted with the page somehow, any requests you make to start playing audio get straight up ignored until they have interacted.
  }
}