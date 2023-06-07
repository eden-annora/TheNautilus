class animationwrapper {
  constructor(X, Y) {
    this.pos = new Vector(X, Y)
    this.framecounter = 0
    this.name = null
    this.target
  }

  trigger(target, AnimName) {
    this.target = target
    this.name = AnimName
    this.framecounter = 0;
    entities.push(this)
  }

  draw(i) {
    if (this.framecounter < 50) {
      animations[this.name](this.target.pos, this.framecounter)
      this.framecounter += 1
      if (this.framecounter >= 50) {
        this.framecounter = 0
        entities.splice(i, 1);
        this.target = null
      }
    }
  }
}

class Player {
  constructor(X, Y, Keys) {

    this.animwrapper = new animationwrapper(0, 0)

    this.daccX = new Vector(-.25, 0);
    this.daccY = new Vector(0, -.25);

    this.speedcap = new Vector(.7, .7)

    this.acc = new Vector(0.001, 0.001);

    this.moveVector = new Vector(0, 0);
    this.pos = new Vector(X, Y);
    this.vel = new Vector(0, 0);

    this.stored = new Vector(0, 0)
    this.releasedir = 0

    this.keys = Keys
    this.w = false
    this.a = false
    this.s = false
    this.d = false

    this.boosttimer = 0

    this.MoveKeyHeldX = false
    this.MoveKeyHeldY = false

    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) {// bring in keypresses and convert them to 1 of 4 bools
      if (keyevent.data.code == target.keys[0]) { target.w = true; }
      if (keyevent.data.code == target.keys[1]) { target.a = true; }
      if (keyevent.data.code == target.keys[2]) { target.s = true; }
      if (keyevent.data.code == target.keys[3]) { target.d = true; }
      if (keyevent.data.code == target.keys[4]) { target.AbilityTrigger(); }

    });

    eventHandler.bindListener(this, "keyReleased", function (target, keyevent) {// bring in keypresses and convert them to 1 of 4 bools
      if (keyevent.data.code == target.keys[0]) { target.w = false; }
      if (keyevent.data.code == target.keys[1]) { target.a = false; }
      if (keyevent.data.code == target.keys[2]) { target.s = false; }
      if (keyevent.data.code == target.keys[3]) { target.d = false; }

    });

    eventHandler.bindListener(this, "physics_update", function (target, data) {// same thing as an update loop, called once every iteration of update loop.
      target.moveVector.setXY(0, 0);// zero out move vect to stop it compounding over time and getting stuck at values
      target.MoveKeyHeldX = false // used later to determine whether thruster audio should be playing or not
      target.MoveKeyHeldY = false

      if (target.w) { target.moveVector.addXY(0, -1); target.MoveKeyHeldY = true }// 4 bools to a vector and one bool
      if (target.s) { target.moveVector.addXY(0, 1); target.MoveKeyHeldY = true }
      if (target.a) { target.moveVector.addXY(-1, 0); target.MoveKeyHeldX = true }
      if (target.d) { target.moveVector.addXY(1, 0); target.MoveKeyHeldX = true }

      if (!target.MoveKeyHeldX && target.boosttimer < 1) { target.moveVector.applyforceToDest_OT(target.vel, target.daccX, DT) }
      if (!target.MoveKeyHeldY && target.boosttimer < 1) { target.moveVector.applyforceToDest_OT(target.vel, target.daccY, DT) }

      if (target.boosttimer > 0) { target.boosttimer -= 1 }
      if ((target.MoveKeyHeldX || target.MoveKeyHeldY) && target.boosttimer < 600) { target.boosttimer = 0 }

      //apply the auto de accelleration to the player
      target.moveVector.clamp(1, -1, 1, -1) //clamp vector from values +1 to -1
      target.vel.applyforceToDest_OT(target.moveVector, target.acc, DT); // apply a force to the veloctiy based on the moveVector and the acceleration constant.

      if (target.boosttimer == 0) {
        let scX = target.speedcap.X
        let scY = target.speedcap.Y
        target.vel.clamp(scX, -scX, scY, -scY)
      }

      target.pos.add_OT(target.vel, DT);// move the player (this will get replaced later with a raiseEvent("Entity_requestMove,new Object({pos:player pos, requestedpos:player pos + player vel})"))

      eventHandler.raiseEvent("playerMoved", new Object({// tell the camera that we moved to new a new pos
        X: target.pos.X,
        Y: target.pos.Y,
        VX: target.vel.X,
        VY: target.vel.Y

      }))
    });
  }

  AbilityTrigger() {
    if (this.animwrapper.framecounter == 0) {
      if (this.stored.distXY(0, 0) < .1) {
        if (this.vel.distXY(0, 0) > .1) {
          this.stored.setXY(this.vel.X, this.vel.Y)
          this.stored.clamp(1, -1, 1, -1)
          this.vel.setXY(0, 0)
          eventHandler.raiseEvent("shakeCamera", new Object({ Strength: 2, Duration: 25 }))
          this.animwrapper.trigger(this, "player_StoreMomentum")
        }
      } else {
        if (this.MoveKeyHeldX || this.MoveKeyHeldY) {
          console.log("this should be adding power in the direction of my moveVect")
          let power = this.stored.distXY(0, 0)
          this.vel.addXY(power * this.moveVector.X, power * this.moveVector.Y)
        } else {
          this.vel.addXY(this.stored.X, this.stored.Y)
        }
        eventHandler.raiseEvent("shakeCamera", new Object({ Strength: 2, Duration: 25 }))
        this.animwrapper.trigger(this, "player_ReleaseMomentum")
        this.vel.clamp(2, -2, 2, -2)
        this.boosttimer = 750
        this.stored.setXY(0, 0)
      }
    }
  }

  draw() {
    let tpX = centerOfCanvas.X - 25 + (this.pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
    let tpY = centerOfCanvas.Y - 25 + (this.pos.Y - camera.pos.Y)

    let thrusterOffSetH = ((-this.moveVector.X * 2) + Math.random() - 0.5) * 8 //adds flicker to the thrusters based on randomness (yaay!!!)
    let thrusterOffSetV = ((-this.moveVector.Y * 2) + Math.random() - 0.5) * 8

    ctx.drawImage(player_sprite_RCSjets_V, tpX, tpY + thrusterOffSetV, 50, 50);//draw the vertical jets onto the screen based off predetermined values
    ctx.drawImage(player_sprite_RCSjets_H, tpX + thrusterOffSetH, tpY, 50, 50);//draw the horizontal jets onto the screen based off predetermined values
    ctx.drawImage(playersprite, tpX, tpY, 50, 50);//draw the players sprite onto the screen based off predetermined values
    let storedpower = this.stored.distXY(0, 0)
    if (storedpower > .1) { // this shows a small line that indicates which direction the player will get launched in when momentum is stored
      let dir = 0
      if (this.MoveKeyHeldX || this.MoveKeyHeldY) { dir = Math.atan2(this.moveVector.Y, this.moveVector.X) }
      else { dir = Math.atan2(this.stored.Y, this.stored.X) }
      this.releasedir = (dir + this.releasedir * 2) / 3

      ctx.strokeStyle = "#e06fff"
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tpX + 25, tpY + 25, 60, (this.releasedir - .2), (this.releasedir + .2))
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(tpX + 25, tpY + 25, 60 + storedpower * 6, (this.releasedir - .15), (this.releasedir + .15))
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(tpX + 25, tpY + 25, 60 + storedpower * 12, (this.releasedir - .1), (this.releasedir + .1))
      ctx.stroke();
    }
    if (debug) {
      ctx.strokeStyle = "#ff0000"
      ctx.lineWidth = "1";
      ctx.beginPath();
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X + this.moveVector.X * 50, centerOfCanvas.Y + this.moveVector.Y * 50);// display a vector onscreen in the form of a line that shows the players "intended direction" (MoveVector)
      ctx.stroke();
      ctx.strokeStyle = "#0064ff"
      ctx.beginPath();
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X + this.vel.X * 50, centerOfCanvas.Y + this.vel.Y * 50); // display a vector onscreen in the form of a line that shows the players "actual direction" (velocity)
      ctx.stroke();
      ctx.strokeStyle = "#34ebba"
      ctx.beginPath();
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X + this.stored.X * 50, centerOfCanvas.Y + this.stored.Y * 50); // display a vector onscreen in the form of a line that shows the players "stored velocity"
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
class Spore {
  static #spore_forcemodifier = new Vector(0.01, 0.01);
  static #spore_dacc = new Vector(-0.005, -0.005);
  static #spore_wander = new Vector(-0.0008, -0.0008);

  constructor(X, Y) {
    this.age = 0;
    this.brightness = 0;
    this.pos = new Vector(X, Y);
    this.vel = new Vector(0, 0);
    this.timeoffset = 0

    this.distanceToPlayer = 0

    eventHandler.bindListener(this, "playerMoved", function (target, data) {
      target.distanceToPlayer = target.pos.distXY(data.X, data.Y);
      target.brightness = ((Math.sin((-(time + target.timeoffset) + target.distanceToPlayer) / 100) + 1) + target.brightness * 20) / 21

      if (target.distanceToPlayer < 20 && target.brightness > .5) {
        target.timeoffset = 2500
        target.vel.X = -(data.X - target.pos.X) * Spore.#spore_forcemodifier.X + data.VX * .5
        target.vel.Y = -(data.Y - target.pos.Y) * Spore.#spore_forcemodifier.Y + data.VY * .5
        //eventHandler.raiseEvent("sporeCollisionAlert", new Object({X: target.pos.X,Y: target.pos.Y}))
      }
      if (target.distanceToPlayer > 1000) { target.die(); }
    });

    eventHandler.bindListener(this, "physics_update", function (target, data) {
      target.vel.applyforce_OT(Spore.#spore_dacc, DT);
      target.vel.addXY((Math.random() - 0.5) * Spore.#spore_wander.X, (Math.random() - 0.5) * Spore.#spore_wander.Y, DT)

      target.pos.add_OT(target.vel, DT);

      if (target.age !== null) {
        target.age += 1;
        if (target.age > 1000 && target.brightness < .1) { target.die(); }
      }
    })
  }
  die() {
    this.pos.X = (camera.pos.X + ((Math.random() - 0.5) * 2000))
    this.pos.Y = (camera.pos.Y + ((Math.random() - 0.5) * 2000))
    this.vel.setXY(0, 0)
    this.timeoffset = 0
    this.age = 0
    this.brightness = 0
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.brightness;
    ctx.drawImage(particle_Spore, this.pos.X - camera.pos.X + centerOfCanvas.X - 5, this.pos.Y - camera.pos.Y + centerOfCanvas.Y - 5, 10, 10);
    if (this.timeoffset > 0) {
      this.timeoffset -= 25
      ctx.globalAlpha = 2 * this.brightness
      ctx.drawImage(sporeflash, this.pos.X - camera.pos.X + centerOfCanvas.X - 15, this.pos.Y - camera.pos.Y + centerOfCanvas.Y - 15, 30, 30);
    }
    ctx.restore();
  }
}

class Camera {
  constructor() {
    this.dacc = new Vector(-0.01, -0.01);
    this.acc = new Vector(0.01, 0.01);

    this.setpos = new Vector(0, 0) //target position
    this.playervel = new Vector(0, 0)
    this.moveVector = new Vector(0, 0) //intended direction
    this.pos = new Vector(0, 0); //actual pos
    this.vel = new Vector(0, 0); //actual direction

    this.cameraShakeStrength = 0 // how hard to shake the camera
    this.cameraShakeDuration = 0 // how long to shake the camera

    eventHandler.bindListener(this, "shakeCamera", function (target, data) {
      target.cameraShakeStrength = data.Strength
      target.cameraShakeDuration = data.Duration
    });

    eventHandler.bindListener(this, "playerMoved", function (target, data) {// remember earlier when we told the camera where the player is? no? too bad. go look at line 48-ish again :p
      target.setpos.X = data.X
      target.setpos.Y = data.Y
      target.playervel.X = data.VX
      target.playervel.Y = data.VY
    })

    eventHandler.bindListener(this, "physics_update", function (target, data) {
      let difX = (target.setpos.X - target.pos.X)// we obtain numerous differences or deviations.
      let difY = (target.setpos.Y - target.pos.Y)

      target.moveVector.X = difX * (Math.pow(difX, 2)) / 1000 - (target.vel.X - target.playervel.X) * 100//funky curve math, basically this is the response curve for the players distance from the camera.
      target.moveVector.Y = difY * (Math.pow(difY, 2)) / 1000 - (target.vel.Y - target.playervel.Y) * 100

      //target.moveVector.clamp(50, -50, 50, -50)

      if (target.cameraShakeDuration > 0) {
        target.cameraShakeDuration -= 1
        target.pos.X += ((Math.random() - .5) * target.cameraShakeStrength)
        target.pos.Y += ((Math.random() - .5) * target.cameraShakeStrength)
      }


      target.vel.applyforceToDest(target.moveVector, target.acc);
      target.vel.applyforceToDest_OT(target.vel, target.dacc, DT);//same as player, apply de accelerations, accelerations, and position offsets.
      target.pos.X = ((target.pos.X) * 9 + (target.pos.X + target.vel.X * DT)) / 10
      target.pos.Y = ((target.pos.Y) * 9 + (target.pos.Y + target.vel.Y * DT)) / 10

    })
  }

}

class ExternalKeyListeners {// menu buttons that need to work even if the player is dead or otherwise missing from the scene.
  constructor() {
    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) {
      if (keyevent.data.code == "KeyB") { debug = !debug }
      if (keyevent.data.code == "KeyH") { helpmenu = !helpmenu }
      if (keyevent.data.code == "Escape") { focused = !focused; }
    });
  }
}

