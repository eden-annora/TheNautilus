class vector {
  constructor(X,Y) {
    this.X = X;
    this.Y = Y;
  }

  clamp(Xmax,Xmin,Ymax,Ymin){
    this.X = Math.min(Math.max(this.X, Xmin), Xmax);
    this.Y = Math.min(Math.max(this.Y, Ymin), Ymax);
  }
  
  getX() {return this.X;}
  getY() {return this.Y;}
  
  setX(X) {this.X = X;}
  setY(Y) {this.Y = Y;}
  
  getXY() {return concat("(",this.X,",",this.Y,")");}
  setXY(X,Y) {this.X = X; this.Y = Y;}

  add(V) {this.X += V.X;this.Y += V.Y;}
  sub(V) {this.X -= V.X;this.Y -= V.Y;}
  mul(V) {this.X *= V.X;this.Y *= V.Y;}
  div(V) {this.X /= V.X;this.Y /= V.Y;}
  
  
  applyforce(V) {this.X += this.X * V.X; this.Y += this.Y * V.Y;}
  applyforceToDest(V1,V2) {this.X += V1.X * V2.X; this.Y += V1.Y * V2.Y;}
  
  add_OT(V,DT) {this.X += V.X*DT;this.Y += V.Y*DT;}
  sub_OT(V,DT) {this.X -= V.X*DT;this.Y -= V.Y*DT;}
  mul_OT(V,DT) {this.X *= V.X*DT;this.Y *= V.Y*DT;}
  div_OT(V,DT) {this.X /= V.X*DT;this.Y /= V.Y*DT;}
  
  applyforce_OT(V,DT) {this.X += this.X * V.X * DT; this.Y += this.Y * V.Y * DT;}
  applyforceToDest_OT(V1,V2,DT) {this.X += V1.X * V2.X * DT; this.Y += V1.Y * V2.Y* DT;}
  
  multToDest_OT(V1,V2,DT) {this.X = V1.X * V2.X * DT;this.Y = V1.Y * V2.Y*DT;}
  addXY_OT(X,Y,DT) {this.X += X*DT;this.Y += Y* DT;}
  
  multToDest(V1,V2) {this.X = V1.X * V2.X;this.Y = V1.Y * V2.Y;}
  addXY(X,Y) {this.X += X;this.Y += Y;}
  
  dist(V) {
    let X = Math.abs(this.X-V.X);
    let Y = Math.abs(this.Y-V.Y);
    return Math.hypot(X,Y);
  }
}
