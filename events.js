class EventHandler {
  constructor() {
    this.eventlist = [];
    this.callbacklist = new Object({
    });
  }
  raiseEvent(type, inputdata) {
    if (this.callbacklist.hasOwnProperty(type)) {
      this.eventlist.push(new Event(type, inputdata));
    } else { console.log("creation of event " + type + " with data " + inputdata + " was attempted, there are no listeners by this name, thus no event was raised.") }
  }

  bindListener(target, type, callback) {
    let object = new EventListener(target, type, callback)
    if (this.callbacklist.hasOwnProperty(type)) {
      this.callbacklist[type].push(object);
    } else {
      this.callbacklist[type] = []
      this.callbacklist[type].push(object);
      console.log("new event catagory was created with key: " + type + " by " + target)
    }
  }

  processCallbacks() {
    let len = this.eventlist.length;
    for (let i = 0; i < len; i++) {
      let event = this.eventlist[i];
      if (event) {
        let callbacklen = this.callbacklist[event.type].length;
        for (let i = 0; i < callbacklen; i++) { this.callbacklist[event.type][i].triggerCallback(event.data) }
      }
      this.eventlist.splice(i, 1);
    }
  }
}

class Event {
  constructor(type, data) {
    this.type = type;
    this.data = data;
    this.age = 1;
  }
}

class EventListener {
  constructor(target, type, callback) {
    this.type = type;
    this.callback = callback;
    this.target = target;
  }
  triggerCallback(eventdata) { this.callback(this.target, eventdata) }
}

class PhysicsController {
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


    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) {
      if (keyevent.data.code == target.keys[0]) { target.w = true }
      if (keyevent.data.code == target.keys[1]) { target.a = true }
      if (keyevent.data.code == target.keys[2]) { target.s = true }
      if (keyevent.data.code == target.keys[3]) { target.d = true }
    });

    eventHandler.bindListener(this, "keyReleased", function (target, keyevent) {
      if (keyevent.data.code == target.keys[0]) { target.w = false }
      if (keyevent.data.code == target.keys[1]) { target.a = false }
      if (keyevent.data.code == target.keys[2]) { target.s = false }
      if (keyevent.data.code == target.keys[3]) { target.d = false }
    });

    eventHandler.bindListener(this, "physics_update", function (target, data) {
      target.moveVector.setXY(0, 0);

      if (target.w) { target.moveVector.addXY(0, -1); }
      if (target.s) { target.moveVector.addXY(0, 1); }
      if (target.a) { target.moveVector.addXY(-1, 0); }
      if (target.d) { target.moveVector.addXY(1, 0); }

      target.moveVector.applyforceToDest_OT(target.vel, target.dacc, DT);

      target.moveVector.clamp(1, -1, 1, -1)
      target.vel.applyforceToDest_OT(target.moveVector, target.acc, DT);
      target.pos.add_OT(target.vel, DT);
      eventHandler.raiseEvent("cameraPosUpdate", new Object({
        X: target.pos.X,
        Y: target.pos.Y
      }))
    });
  }

  draw() {
    let tpX = centerOfCanvas.X - 25 + (this.pos.X - camera.pos.X)
    let tpY = centerOfCanvas.Y - 25 + (this.pos.Y - camera.pos.Y)

    let thrusterOffSetH = ((-this.moveVector.X * 2) + Math.random() - 0.5) * 8
    let thrusterOffSetV = ((-this.moveVector.Y * 2) + Math.random() - 0.5) * 8


    ctx.drawImage(player_sprite_RCSjets_V, tpX, tpY + thrusterOffSetV, 50, 50);
    ctx.drawImage(player_sprite_RCSjets_H, tpX + thrusterOffSetH, tpY, 50, 50);
    ctx.drawImage(playersprite, tpX, tpY, 50, 50);
    if (debug) {
      ctx.strokeStyle = "rgb(255, 0, 0)"
      ctx.lineWidth = "1";
      ctx.beginPath();
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X + this.moveVector.X * 50, centerOfCanvas.Y + this.moveVector.Y * 50);
      ctx.stroke();
      ctx.strokeStyle = "rgb(0, 100, 255)"
      ctx.beginPath();
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X + this.vel.X * 50, centerOfCanvas.Y + this.vel.Y * 50);
      ctx.stroke();
    }
    if (helpmenu) {
      ctx.fillStyle = "#34ebba"
      ctx.font = "12px Courier New"
      let offset = 50
      ctx.fillText((this.keys[0].toUpperCase()), 500, 281 - offset)
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

    this.setpos = new Vector(0, 0)
    this.moveVector = new Vector(0, 0)
    this.pos = new Vector(0, 0);
    this.vel = new Vector(0, 0);
    this.followstrength = 1

    this.camerashake = false

    eventHandler.bindListener(this, "cameraPosUpdate", function (target, data) {
      target.setpos.X = data.X
      target.setpos.Y = data.Y
    })

    eventHandler.bindListener(this, "physics_update", function (target, data) {

      let difX = target.setpos.X - target.pos.X
      let difY = target.setpos.Y - target.pos.Y

      target.moveVector.X = difX * (Math.pow(difX, 2) / 1000)
      target.moveVector.Y = difY * (Math.pow(difY, 2) / 1000)

      target.moveVector.applyforceToDest_OT(target.vel, target.dacc, DT);
      target.vel.applyforceToDest_OT(target.moveVector, target.acc, DT);
      target.pos.add_OT(target.vel, DT);
    })

  }
}

class ExternalKeyListeners {
  constructor() {
    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) { if (keyevent.data.code == "KeyB") { debug = !debug } });
    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) { if (keyevent.data.code == "KeyH") { helpmenu = !helpmenu } });
    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) { if (keyevent.data.code == "Escape") { focused = !focused } });
  }
}
