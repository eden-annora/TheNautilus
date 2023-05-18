class scannable{
  static #name = "scannable";

  name;
  
  constructor(X,Y,timetoscan,content){
  this.pos = new vector(X,Y);
  this.content = content
  this.completion = timetoscan
  this.targeted = false
  }
  dist(obj){
  return this.pos.dist(obj.pos)
  }
  update(DT,player){
    if (this.targeted && this.completion > 0){this.completion -= 1}
    this.targeted = false
  }
  draw(){
    if (this.completion <= 0 && this.targeted){
      ctx.font = "10 Arial"
      ctx.fillText(this.content, this.pos.X - player1.pos.X + centerOfCanvas.X,this.pos.Y - player1.pos.Y + centerOfCanvas.Y)
    } else {
    ctx.beginPath(); // Start a new path
    ctx.fillRect(this.pos.X - player1.pos.X + centerOfCanvas.X,this.pos.Y - player1.pos.Y + centerOfCanvas.Y,5,5);
    ctx.fillText(this.completion, this.pos.X - player1.pos.X + centerOfCanvas.X,this.pos.Y - player1.pos.Y + centerOfCanvas.Y)
    ctx.stroke();
    }
  }
}

class player {
  constructor(X,Y) {
    this.type = "player object";
    this.name = "player1";
    this.dacc = new vector(-.25,-.25);
    this.acc = new vector(0.001,0.001);
    this.moveVector = new vector(0,0);
    this.pos = new vector(X,Y);
    this.vel = new vector(0,0);
    
    this.scantarget = null;
    
    this.w = false;
    this.a = false;
    this.s = false;
    this.d = false;
    this.scanning = false;
  }
  
    update(DT,player) {
    this.moveVector.setXY(0,0);
    
    if (this.w){this.moveVector.addXY(0,-1);}
    if (this.s){this.moveVector.addXY(0,1);}
    if (this.a){this.moveVector.addXY(-1,0);}
    if (this.d){this.moveVector.addXY(1,0);}
    
    this.moveVector.applyforceToDest_OT(this.vel,this.dacc,DT);

    this.moveVector.clamp(1,-1,1,-1)
    this.vel.applyforceToDest_OT(this.moveVector,this.acc,DT);
    
    let count = forceblocklist.length;
    for(let i = 0; i < count; i++) {
      let item = forceblocklist[i];
    if (item.check(this)){
      this.vel.add_OT(item.forcevect,DT)
      }
    }
    
    this.pos.add_OT(this.vel,DT);
    

    if (this.scanning) {
    if (this.scantarget === null){this.scantarget = scannableobjects[0];}
      let scantargetdist = this.scantarget.dist(this)
      
      let count = scannableobjects.length;
      for(let i = 0; i < count; i++){
      let item = scannableobjects[i];
      
        let disttonew = item.dist(this);

        if (disttonew < scantargetdist){this.scantarget = item; scantargetdist = this.scantarget.dist(this);}
      }
    if (scantargetdist > 250){this.scantarget = null; this.scanning = false}
  } else {this.scantarget = null} 
  
}

  draw() {
    if (this.scanning && this.scantarget !== null){
      this.scantarget.targeted = true
      let offset = ((Math.sin((-time)/100)+1)*48)
      ctx.drawImage(player_scangrid,centerOfCanvas.X+this.scantarget.pos.X-this.pos.X-48,centerOfCanvas.Y+this.scantarget.pos.Y-this.pos.Y-48,97,97);
      ctx.drawImage(player_scanline,centerOfCanvas.X+this.scantarget.pos.X-this.pos.X-48+offset,centerOfCanvas.Y+this.scantarget.pos.Y-this.pos.Y-48,3,97);
      ctx.strokeStyle = "#34ebba"
      ctx.beginPath();
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X+this.scantarget.pos.X-this.pos.X-48,centerOfCanvas.Y+this.scantarget.pos.Y-this.pos.Y-48);
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X+this.scantarget.pos.X-this.pos.X+48,centerOfCanvas.Y+this.scantarget.pos.Y-this.pos.Y-48);
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X+this.scantarget.pos.X-this.pos.X+48,centerOfCanvas.Y+this.scantarget.pos.Y-this.pos.Y+48);
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X+this.scantarget.pos.X-this.pos.X-48,centerOfCanvas.Y+this.scantarget.pos.Y-this.pos.Y+48);
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X+this.scantarget.pos.X-this.pos.X-47+offset,centerOfCanvas.Y+this.scantarget.pos.Y-this.pos.Y+48);
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X+this.scantarget.pos.X-this.pos.X-47+offset,centerOfCanvas.Y+this.scantarget.pos.Y-this.pos.Y-48);
      ctx.moveTo(centerOfCanvas.X, centerOfCanvas.Y);
      ctx.lineTo(centerOfCanvas.X+this.scantarget.pos.X-this.pos.X-47+offset,centerOfCanvas.Y+this.scantarget.pos.Y-this.pos.Y-49+((Math.sin((-time*30)/100)+1)*48));
      ctx.stroke();
    }
    ctx.drawImage(player_sprite_RCSjets_V, centerOfCanvas.X - 25, centerOfCanvas.Y - 25 + ((-this.moveVector.Y*2)+Math.random()-0.5)*8  ,50,50);
    ctx.drawImage(player_sprite_RCSjets_H, centerOfCanvas.X - 25  + ((-this.moveVector.X)*2+Math.random()-0.5)*8, centerOfCanvas.Y - 25 ,50,50);
    ctx.drawImage(playersprite, centerOfCanvas.X-25, centerOfCanvas.Y-25,50,50);
  }
}

class forceblock {
  constructor(X,Y,VX,VY,W,H,forcevectX,forcevectY){
    this.active = true;
    this.age = null;
    this.pos = new vector(X,Y);
    this.vel = new vector(VX,VY);
    this.WH = new vector(W,H);
    this.forcevect = new vector(forcevectX,forcevectY);
    
    this.VTR = new vector(X,Y);
    this.VBL = new vector(X,Y);
    
    ctx.fillText(this.VTR.getX, 10, 70);

    this.VTR.add(this.WH);
    this.VBL.sub(this.WH);
    

  }
  
  check(object){
    if (this.VTR.X > object.pos.X &&
        this.VTR.Y > object.pos.Y &&
        this.VBL.X < object.pos.X &&
        this.VBL.Y < object.pos.Y)
    {return true} else {return false}
  }
  
  update(DT,player1,forceblocklist){
    if (this.active){
      this.pos.add_OT(this.vel,DT);
      this.VTR.add_OT(this.vel,DT);
      this.VBL.add_OT(this.vel,DT);
    }
    if (this.age !== null) {
    if (this.age <= 0) {this.active = false}
    this.age -= 1;
    }
    
  }
  draw(){
    if (this.active){

      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.VBL.X - player1.pos.X + centerOfCanvas.X, this.VBL.Y - player1.pos.Y + centerOfCanvas.Y, this.WH.X*2, this.WH.Y*2);
      ctx.stroke();
      
      ctx.beginPath(); // Start a new path
      ctx.fillRect(this.pos.X - player1.pos.X + centerOfCanvas.X-2,this.pos.Y - player1.pos.Y + centerOfCanvas.Y-2,5,5);
      ctx.moveTo(this.pos.X - player1.pos.X + centerOfCanvas.X, this.pos.Y - player1.pos.Y + centerOfCanvas.Y); // Move the pen to (30, 50)
      ctx.lineTo(this.pos.X - player1.pos.X + centerOfCanvas.X + this.forcevect.X * 50000, this.pos.Y - player1.pos.Y + centerOfCanvas.Y + this.forcevect.Y * 50000); // Draw a line to (150, 100)
      ctx.stroke(); // Render the path
      
    }
    }
  
}


class sporeparticle {
  static #spore_forcemodifier = new vector(0.01,0.01);
  static #spore_wakemodifier = new vector(0.0005,0.0005);
  static #spore_dacc = new vector(-0.005,-0.005);
  static #spore_wander = new vector(-0.0008,-0.0008);

  spore_dacc;
  spore_wander;
  spore_wakemodifier;
  spore_forcemodifier;
  
  constructor(X,Y,VX,VY,age) {
    this.age = age;
    this.brightness = 0
    this.pos = new vector(X,Y);
    this.vel = new vector(VX,VY);
    this.timeoffset = 0
  }
  
  update(DT,player,forceblocklist) {
    let distance = this.pos.dist(player.pos);
    this.brightness = ((Math.sin((-(time+this.timeoffset)+distance)/100)+1) + this.brightness*20)/21
    if (distance < 20) {
      this.timeoffset = 2500
      this.vel.X = -(player.pos.X - this.pos.X)*sporeparticle.#spore_forcemodifier.X + player.vel.X*.5
      this.vel.Y = -(player.pos.Y - this.pos.Y)*sporeparticle.#spore_forcemodifier.Y + player.vel.Y*.5
    } else if(distance > 1000) {
      this.die();
    }
    if (this.timeoffset >= 1){this.timeoffset -= 5}
    
    let count = forceblocklist.length;
    for(let i = 0; i < count; i++) {
      let item = forceblocklist[i];
    if (item.check(this)){
      this.vel.add_OT(item.forcevect,DT)
    }
  }
    
    //make the spores wander around
    this.vel.applyforce_OT(sporeparticle.#spore_dacc,DT);
    this.vel.addXY_OT((Math.random()-0.5)*sporeparticle.#spore_wander.X,(Math.random()-0.5)*sporeparticle.#spore_wander.Y,DT)
    
    this.pos.add_OT(this.vel,DT);
    
    if (this.age !== null) {
      this.age += 1; 
      if (this.age > 1000 && this.brightness < .1) {this.die();}
    }
  }
    
  die() {
    this.pos.X = (player1.pos.X + ((Math.random()-0.5)*2000))
    this.pos.Y = (player1.pos.Y + ((Math.random()-0.5)*2000))
    this.vel.setXY(0,0)
    this.timeoffset = 0
    this.age = 0
    this.brightness = 0
  }
  
  draw() {
    ctx.save();
    ctx.globalAlpha = this.brightness;
    ctx.drawImage(particle_Spore, this.pos.X - player1.pos.X + centerOfCanvas.X-5, this.pos.Y - player1.pos.Y + centerOfCanvas.Y-5 ,10,10);
    if (this.timeoffset > 0){
      ctx.globalAlpha = 2*this.brightness
      ctx.drawImage(sporeflash, this.pos.X - player1.pos.X + centerOfCanvas.X-15, this.pos.Y - player1.pos.Y + centerOfCanvas.Y-15 ,30,30);
    }
    ctx.restore();
  }
}
