class surface {
  constructor(X, Y, X1, Y1) {

    this.pos = new Vector(X, Y);
    this.pos1 = new Vector(X1, Y1);
    this.playerpos = new Vector(0, 0)
    this.disttoplayer = 0

    eventHandler.bindListener(this, "playerMoved", function (target, data) {
      target.playerpos.setXY(data.X, data.Y)
      target.disttoplayer = distToLine(target.pos, target.pos1, target.playerpos)
      if (target.disttoplayer < 5) { eventHandler.raiseEvent("playerCollides", target) }
    });


  }
  draw() {
    if (debug) {
      let tpX = centerOfCanvas.X + (this.pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
      let tpY = centerOfCanvas.Y + (this.pos.Y - camera.pos.Y)

      let tpX1 = centerOfCanvas.X + (this.pos1.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
      let tpY1 = centerOfCanvas.Y + (this.pos1.Y - camera.pos.Y)
      ctx.strokeStyle = "#34ebba"
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tpX, tpY);
      ctx.lineTo(tpX1, tpY1);
      ctx.stroke();
      ctx_text.fillText(this.disttoplayer, tpX, tpY);
    }
  }
}

class gameTrigger {
  /**
   * Trigger that detects if player passes within
   * @param {*} X Position x
   * @param {*} Y Position y
   * @param {*} X1 Width
   * @param {*} Y1 Height
   */
  constructor(X, Y, X1, Y1) {
    this.pos = new Vector(X, Y);
    this.width = new Vector(X1, Y1);

    eventHandler.bindListener(this, "playerMoved", function (target, data) {
      if (data.X >= target.pos.X && data.X <= target.pos.X + target.width.X && data.Y >= target.pos.Y && data.Y <= target.pos.Y + target.width.Y) {
        console.log("excellent! You are within the bounds of the trigger");//if you're cool and within the trigger, this will be logged and you can do whatever
      }
    })
  }

  draw() {
    if (debug) {
      let tpX = centerOfCanvas.X + (this.pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relative position to the player.
      let tpY = centerOfCanvas.Y + (this.pos.Y - camera.pos.Y)

      ctx.beginPath();
      ctx.fillStyle = "#FF69B460"; //hot pink but transparents
      ctx.fillRect(tpX, tpY, this.width.X, this.width.Y);
      ctx.stroke();
    }
  }
}

class enemyleg {
  /**
   * a single leg? bit? piece? of the blob enemy
   * @param {*} X pos X
   * @param {*} Y pos Y
   */
  constructor(X, Y) {
    this.targetpos = new Vector(X, Y)
    this.daccX = new Vector(-.25, 0);
    this.daccY = new Vector(0, -.25);

    this.speedcap = new Vector(1, 1)

    this.acc = new Vector(0.004, 0.004);

    this.moveVector = new Vector(0, 0);
    this.pos = new Vector(X, Y);
    this.vel = new Vector(0, 0);

  }
  /**
   * physics update but for the legs of the blobs
   * @param {*} bodyposX position of the body (X)
   * @param {*} bodyposY position of the body (Y)
   * @param {*} bodydirX intended move direction of the body (X)
   * @param {*} bodydirY intended move direction of the body (Y)
   * @param {*} enraged is the player close enough to me for me to see them
   * @param {*} legarea whats the max radius a leg can be away from the bodies center point
   */
  legupdate(bodyposX, bodyposY, bodydirX, bodydirY, enraged, legarea) {
    // IK stuff here
    bodyposX += bodydirX * 50
    bodyposY += bodydirY * 50

    let legdist = this.targetpos.distXY(bodyposX, bodyposY)
    if (legdist > legarea) {
      this.targetpos.X = ((Math.random() - .5) * 2 * legarea) + bodyposX
      this.targetpos.Y = ((Math.random() - .5) * 2 * legarea) + bodyposY
    }

    this.moveVector.setXY(0, 0);

    let difX = (this.targetpos.X - this.pos.X)// we obtain numerous differences or deviations.
    let difY = (this.targetpos.Y - this.pos.Y)// distance from my intended position

    this.moveVector.X = difX * (Math.pow(difX, 2)) / 2000 - (this.vel.X) * 1000 // curve math to decide how hard i should be moving
    this.moveVector.Y = difY * (Math.pow(difY, 2)) / 2000 - (this.vel.Y) * 1000

    this.moveVector.applyforceToDest_OT(this.vel, this.daccX, DT)
    this.moveVector.applyforceToDest_OT(this.vel, this.daccY, DT)

    this.moveVector.clamp(1, -1, 1, -1) //clamp vector from values +1 to -1

    if (enraged) {
      this.moveVector.multXY(1.5, 1.5)
    }

    this.vel.applyforceToDest_OT(this.moveVector, this.acc, DT);

    this.vel.clamp(this.speedcap.X, -this.speedcap.X, this.speedcap.Y, -this.speedcap.Y) // apply speedcap

    this.pos.add_OT(this.vel, DT); //move the leg
  }
  draw(enraged) {

    let tpX = centerOfCanvas.X - 5 + (this.pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
    let tpY = centerOfCanvas.Y - 5 + (this.pos.Y - camera.pos.Y)
    //console.log(enraged)
    if (enraged) {
      ctx.drawImage(sporemonster_enraged, tpX, tpY, 20, 20);
    } else {
      ctx.drawImage(sporemonster, tpX, tpY, 20, 20);
    }

  }
}

class testenemy {
  /**
   * 
   * @param {*} X  pos X
   * @param {*} Y  pos Y 
   */
  constructor(X, Y) {

    this.daccX = new Vector(-.25, 0);
    this.daccY = new Vector(0, -.25);

    this.speedcap = new Vector(.9, .9)

    this.acc = new Vector(0.002, 0.002);

    this.moveVector = new Vector(0, 0);
    this.pos = new Vector(X, Y);
    this.vel = new Vector(0, 0);

    this.legarea = 40 // bounding radius for the legs
    this.damageCirlce = 25 // bounding radius for damaging the player
    this.enrageCircle = 250 // bounding radius for player detection


    this.sporeAlertPos = new Vector(X, Y)
    this.sporeAlertPosAge = 0

    this.enraged = false // is the player close to me?

    this.legs = [] // contains all 'leg' sub objects

    for (let i = 0; i < 18; i++) {
      this.legs.push(new enemyleg(X, Y))
    } //populate legs list with legs


    eventHandler.bindListener(this, "sporeCollisionAlert", function (target, data) {
      target.sporeAlertPos.X = data.X // if player gets close enough this is how we tell our freinds about them.
      target.sporeAlertPos.Y = data.Y
      target.sporeAlertPosAge = 0
    })

    eventHandler.bindListener(this, "playerMoved", function (target, data) { // when the player moves do checks to ensure its
      target.distanceToPlayer = target.pos.distXY(data.X, data.Y);
      if (target.distanceToPlayer < target.enrageCircle) {
        if (target.distanceToPlayer < target.damageCirlce) {
          eventHandler.raiseEvent("playerTakesDamage", new Object({ damage: 10 }))
        }
        target.sporeAlertPos.X = data.X // if player gets close enough this is how we tell our freinds about them.
        target.sporeAlertPos.Y = data.Y
        target.sporeAlertPosAge = 0
        target.enraged = true // make sure we are angry when the player is close
      } else {
        target.enraged = false // but not if they are too far away
      }


    })

    eventHandler.bindListener(this, "physics_update", function (target, data) {
      target.moveVector.setXY(0, 0);

      if ((target.sporeAlertPosAge) < 1000) {

        target.sporeAlertPosAge++
        let difX = (target.sporeAlertPos.X - target.pos.X)// we obtain numerous differences or deviations.
        let difY = (target.sporeAlertPos.Y - target.pos.Y)

        if (target.pos.dist(sporeAlertPos) < 1000) {

          target.moveVector.X = difX * (Math.pow(difX, 2)) / 5000 - (target.vel.X) * 50 // curve math to define how hard we should be trying to move.
          target.moveVector.Y = difY * (Math.pow(difY, 2)) / 5000 - (target.vel.Y) * 50
        }
      }

      target.moveVector.applyforceToDest_OT(target.vel, target.daccX, DT) // apply decellerations
      target.moveVector.applyforceToDest_OT(target.vel, target.daccY, DT)

      target.moveVector.clamp(1, -1, 1, -1) //clamp vector from values +1 to -1

      if (target.enraged) {
        target.moveVector.multXY(2, 2)
      }

      target.moveVector.X += (Math.random() - .5) * 5
      target.moveVector.Y += (Math.random() - .5) * 5

      target.vel.applyforceToDest_OT(target.moveVector, target.acc, DT); // apply acc based off moveVector


      let scX = target.speedcap.X
      let scY = target.speedcap.Y
      target.vel.clamp(scX, -scX, scY, -scY) //speedcap

      target.pos.add_OT(target.vel, DT); // move

      let len = target.legs.length;
      for (let i = 0; i < len; i++) {
        if (target.legs[i]) { target.legs[i].legupdate(target.pos.X, target.pos.Y, target.moveVector.X, target.moveVector.Y, target.enraged, target.legarea) }
      }
    });

  }
  draw() {
    let tpX = centerOfCanvas.X - 25 + (this.pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relative position to the player.
    let tpY = centerOfCanvas.Y - 25 + (this.pos.Y - camera.pos.Y)

    let len = this.legs.length;
    for (let i = 0; i < len; i++) {
      if (this.legs[i]) { this.legs[i].draw(this.enraged) }// finally draw all the entities in the list.
    }

    if (debug) {
      ctx.lineWidth = "1";
      ctx.strokeStyle = "#00ff00";
      ctx.beginPath();
      ctx.arc(tpX + 25, tpY + 25, this.legarea, 0, 2 * 3.14)
      ctx.stroke();
      ctx.strokeStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(tpX + 25, tpY + 25, this.damageCirlce, 0, 2 * 3.14)
      ctx.stroke();
      ctx.strokeStyle = "#0000ff";
      ctx.beginPath();
      ctx.arc(tpX + 25, tpY + 25, this.enrageCircle, 0, 2 * 3.14)
      ctx.stroke();




    }
  }
}


class backgroundSprite { // a terrible and temporary implementation of a background sprite.
  constructor(images, swaplistener, posX, posY) {
    this.visible = true
    this.images = images
    this.imgcounter = 0
    this.opacity = 1
    this.pos = new Vector(posX, posY)

    eventHandler.bindListener(this, swaplistener, function (target, keyevent) {
      if (keyevent.data.code == "KeyI") {
        if (target.imgcounter < target.images.length - 1) {
          target.imgcounter++;
        } else {
          target.imgcounter = 0
        }
      }
    });

  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.images[this.imgcounter], this.pos.X - camera.pos.X + centerOfCanvas.X, this.pos.Y - camera.pos.Y + centerOfCanvas.Y);
    ctx.restore();
  }
}

class animationwrapper { // a terrible and temporary implementation for animations.
  constructor(X, Y) {
    this.pos = new Vector(X, Y)
    this.framecounter = 0
    this.name = null
    this.target
  }

  trigger(target, AnimName) {
    this.target = target;
    this.name = AnimName;
    this.framecounter = 0;
    entities.push(this);
  }

  draw(i, deltatime) {
    if (this.framecounter <= 100 && this.target) {
      animations[this.name](this.target.pos, this.framecounter)
      this.framecounter += (deltatime / 16.777777777)
      if (this.framecounter > 100) {
        this.framecounter = 0
        entities.splice(i, 1);
        this.target = null
      }
    }
  }
}

class Player {
  /**
   * 
   * @param {*} X pos X
   * @param {*} Y pos Y
   * @param {*} Keys list of keybindings [up,left,down,right,ability]
   */
  constructor(X, Y, Keys) {

    this.animwrapper = new animationwrapper(0, 0)

    camera.follow = this

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

    this.health = 10000
    this.deadtimer = 0

    this.MoveKeyHeldX = false
    this.MoveKeyHeldY = false

    eventHandler.bindListener(this, "playerTakesDamage", function (target, data) {
      target.health -= data.damage
      if (target.health <= 0) { target.die() }
    })


    eventHandler.bindListener(this, "playerCollides", function (target, data) {
      console.log("bonk")
    })

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

      if (target.deadtimer > 0) {
        target.deadtimer--
      }

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
  die() {  // oh no! our table! it's broken! (player died... imagine losing)
    focused = false
    this.vel.setXY(0, 0);
    this.stored.setXY(0, 0)
    this.pos.setXY(0, 0);
    this.health = 10000
    eventHandler.raiseEvent("player_died", new Object({
      X: this.pos.X,
      Y: this.pos.Y,
    }))
  }


  AbilityTrigger() {
    if (this.animwrapper.framecounter == 0 && focused) {
      if (this.stored.distXY(0, 0) < .1) {
        if (this.vel.distXY(0, 0) > .1) {
          this.stored.setXY(this.vel.X, this.vel.Y)
          this.stored.clamp(1, -1, 1, -1)
          this.vel.setXY(0, 0)
          eventHandler.raiseEvent("shakeCamera", new Object({ Strength: 2, Duration: 50 }))
          this.animwrapper.trigger(this, "player_StoreMomentum")
          ability_charge.stop();
          ability_charge.play();

          //end constant loop and play tail end of sound
          if (thruster_loop.playing()) {
            thruster_loop.stop();
            thruster_end.play();
          }
        }
      } else {
        if (this.MoveKeyHeldX || this.MoveKeyHeldY) {
          let power = this.stored.distXY(0, 0)
          if (this.MoveKeyHeldX && this.MoveKeyHeldY) { this.vel.addXY(power * this.moveVector.X, power * this.moveVector.Y) }
          if (this.MoveKeyHeldX && !this.MoveKeyHeldY) { this.vel.addXY(power * this.moveVector.X, -this.vel.Y) }
          if (!this.MoveKeyHeldX && this.MoveKeyHeldY) { this.vel.addXY(-this.vel.X, power * this.moveVector.Y) }

        } else {
          this.vel.addXY(this.stored.X, this.stored.Y)
        }
        eventHandler.raiseEvent("shakeCamera", new Object({ Strength: 2, Duration: 50 }))
        this.animwrapper.trigger(this, "player_ReleaseMomentum")
        ability_boost.stop();
        ability_boost.play();
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

    ctx.save();
    if (this.animwrapper.framecounter > 0) { ctx.globalAlpha = 15 / this.animwrapper.framecounter; }
    else { ctx.globalAlpha = 0 }
    ctx.drawImage(player_glow, tpX, tpY, 50, 50);
    ctx.restore();


    if (storedpower > .1) { // supporting math for directional indicator, (X,Y to radians)
      let dir = 0

      if (this.MoveKeyHeldX || this.MoveKeyHeldY) {
        if (this.MoveKeyHeldX && this.MoveKeyHeldY) { dir = Math.atan2(this.moveVector.Y, this.moveVector.X) }
        if (this.MoveKeyHeldX && !this.MoveKeyHeldY) { dir = Math.atan2(0, this.moveVector.X) }
        if (!this.MoveKeyHeldX && this.MoveKeyHeldY) { dir = Math.atan2(this.moveVector.Y, 0) }
      } else {
        dir = Math.atan2(this.stored.Y, this.stored.X)
      } this.releasedir = (dir + this.releasedir * 2) / 3



      ctx.strokeStyle = "#e06fff" //show the player what direction they are gonna move when they release their stored velocity.
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
      ctx.moveTo(tpX, tpY);
      ctx.lineTo(tpX + this.moveVector.X * 50, tpY + this.moveVector.Y * 50);// display a vector onscreen in the form of a line that shows the players "intended direction" (MoveVector)
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(tpX + 25, tpY + 25, 5, 0, 2 * 3.14)
      ctx.stroke();
      ctx.strokeStyle = "#0064ff"
      ctx.beginPath();
      ctx.moveTo(tpX, tpY);
      ctx.lineTo(tpX + this.vel.X * 50, tpY + this.vel.Y * 50); // display a vector onscreen in the form of a line that shows the players "actual direction" (velocity)
      ctx.stroke();
      ctx.strokeStyle = "#34ebba"
      ctx.beginPath();
      ctx.moveTo(tpX, tpY);
      ctx.lineTo(tpX + this.stored.X * 50, tpY + this.stored.Y * 50); // display a vector onscreen in the form of a line that shows the players "stored velocity"
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

    //player thruster audio
    if (this.MoveKeyHeldX || this.MoveKeyHeldY) {
      if (!thruster_loop.playing()) {
        thruster_loop.play()
      }
    }
    else {
      //end constant loop and play tail end of sound
      if (thruster_loop.playing()) {
        thruster_loop.stop()
        thruster_end.play();
      }

    }
  }
}

class Spore {
  static #spore_forcemodifier = new Vector(0.01, 0.01);
  static #spore_dacc = new Vector(-0.005, -0.005);
  static #spore_wander = new Vector(-0.0008, -0.0008);

  constructor(X, Y) {

    this.animwrapper = new animationwrapper(0, 0)

    this.age = 1000;
    this.brightness = 0;
    this.pos = new Vector(X, Y);
    this.vel = new Vector(0, 0);
    this.veldif = new Vector(0, 0)
    this.timeoffset = 0

    this.distanceToPlayer = 0
    eventHandler.bindListener(this, "playerMoved", function (target, data) {
      target.distanceToPlayer = target.pos.distXY(data.X, data.Y);
      target.brightness = ((Math.sin((-(time + target.timeoffset) + target.distanceToPlayer) / 100) + 1) + target.brightness * 20) / 21

      if (target.distanceToPlayer < 20 && target.brightness > .2) {
        target.timeoffset = 2500
        target.vel.X = -(data.X - target.pos.X) * Spore.#spore_forcemodifier.X + data.VX * .5
        target.vel.Y = -(data.Y - target.pos.Y) * Spore.#spore_forcemodifier.Y + data.VY * .5

        //spore collision audio 
        if (target.age < 1000) {// if we collide with a spore, play the noise and then immediatley set the spores age to 1000, this prevents further sounds from playing from that spore preventing overlapping sounds.
          var randomIndex = sporeCollisions[Math.floor(Math.random() * sporeCollisions.length)];

          target.veldif.X = (data.VX - target.vel.X)
          target.veldif.Y = (data.VY - target.vel.Y)

          let difvel = (target.veldif.distXY(0, 0))

          sporeHowls[randomIndex].volume(difvel / 2);
          sporeHowls[randomIndex].play();

          //I assume this is for debugging so I'm just gonna hide it for now
          //console.log(difvel)

          if (Math.floor(Math.random() * 3) == 1 && sporeAlert) {
            eventHandler.raiseEvent("sporeCollisionAlert", new Object({ X: target.pos.X, Y: target.pos.Y }))
            sporeHowlsAlert.play();
            target.animwrapper.trigger(target, "spore_soundwave")
          }

          target.age = 1000
        }
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
  /**
   * it's the camera, make sure to initalize it if you want, like, anything to work... at all....
   */
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

    this.follow = null

    eventHandler.bindListener(this, "player_died", function (target, data) {
      target.setpos.setXY(data.X, data.Y) //target position
      target.pos.setXY(data.X, data.Y);

      target.playervel.setXY(0, 0)
      target.moveVector.setXY(0, 0) //intended direction
      target.vel.setXY(0, 0);

      focused = true
    });

    eventHandler.bindListener(this, "shakeCamera", function (target, data) {
      target.cameraShakeStrength = data.Strength
      target.cameraShakeDuration = data.Duration
    });

    eventHandler.bindListener(this, "physics_update", function (target, data) {
      if (target.follow) {
        target.setpos.X = target.follow.pos.X
        target.setpos.Y = target.follow.pos.Y
        target.playervel.X = target.follow.vel.X
        target.playervel.Y = target.follow.vel.Y
      }
      let difX = (target.setpos.X - target.pos.X)// we obtain numerous differences or deviations.
      let difY = (target.setpos.Y - target.pos.Y)// prev comment was funny but unhelpful, this just takes my position minus the players

      target.moveVector.X = difX * (Math.pow(difX, 2)) / 1000 - (target.vel.X - target.playervel.X) * 100//funky curve math, basically this is the response curve for the players distance from the camera.
      target.moveVector.Y = difY * (Math.pow(difY, 2)) / 1000 - (target.vel.Y - target.playervel.Y) * 100

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
    eventHandler.bindListener(this, "sporeCollisionAlert", function (target, data) {
      sporeAlertPos.X = data.X
      sporeAlertPos.Y = data.Y
      sporeAlertPosAge = 0
    });

    eventHandler.bindListener(this, "keyPressed", function (target, keyevent) {
      if (keyevent.data.code == "KeyB") { debug = !debug }
      if (keyevent.data.code == "KeyH") { helpmenu = !helpmenu }
      if (keyevent.data.code == "Escape") { focused = !focused; }
      if (keyevent.data.code == "KeyM") { muteMusic = !muteMusic }
      if (keyevent.data.code == "Space") { mainmenu = false }
      //if (keyevent.data.code == "KeyR") { sporeAlert = !sporeAlert }
    });
  }
}