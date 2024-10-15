class Vector {
  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
  }

  clamp(Xmax, Xmin, Ymax, Ymin) {
    this.X = Math.min(Math.max(this.X, Xmin), Xmax);
    this.Y = Math.min(Math.max(this.Y, Ymin), Ymax);
  }

  getX() { return this.X; }
  getY() { return this.Y; }

  setX(X) { this.X = X; }
  setY(Y) { this.Y = Y; }

  getXY() { return [this.X, this.Y] }
  setXY(X, Y) { this.X = X; this.Y = Y; }

  add(V) { this.X += V.X; this.Y += V.Y; }
  sub(V) { this.X -= V.X; this.Y -= V.Y; }
  mul(V) { this.X *= V.X; this.Y *= V.Y; }
  div(V) { this.X /= V.X; this.Y /= V.Y; }

  add_OT(V, DT) { this.X += V.X * DT; this.Y += V.Y * DT; } // OT =  over time
  sub_OT(V, DT) { this.X -= V.X * DT; this.Y -= V.Y * DT; }
  mul_OT(V, DT) { this.X *= V.X * DT; this.Y *= V.Y * DT; }
  div_OT(V, DT) { this.X /= V.X * DT; this.Y /= V.Y * DT; }

  add_ToDest(V1, V2) { this.X = V1.X + V2.X; this.Y = V1.Y + V2.Y; } // ToDest = do math stuff with componenets and set destination to product
  sub_ToDest(V1, V2) { this.X = V1.X - V2.X; this.Y = V1.Y - V2.Y; }
  mul_ToDest(V1, V2) { this.X = V1.X * V2.X; this.Y = V1.Y * V2.Y; }
  div_ToDest(V1, V2) { this.X = V1.X / V2.X; this.Y = V1.Y / V2.Y; }

  add_ToDest_OT(V1, V2, DT) { this.X = V1.X + V2.X * DT; this.Y = V1.Y + V2.Y * DT; } // ToDest_OT = do math stuff with componenets (but components are multiplied by time passed) and set destination to product
  sub_ToDest_OT(V1, V2, DT) { this.X = V1.X - V2.X * DT; this.Y = V1.Y - V2.Y * DT; }
  mul_ToDest_OT(V1, V2, DT) { this.X = V1.X * V2.X * DT; this.Y = V1.Y * V2.Y * DT; }
  div_ToDest_OT(V1, V2, DT) { this.X = V1.X / V2.X * DT; this.Y = V1.Y / V2.Y * DT; }

  applyforce(V) { this.X += this.X * V.X; this.Y += this.Y * V.Y; } //increment self by product of self and input vector
  applyforceToDest(V1, V2) { this.X += V1.X * V2.X; this.Y += V1.Y * V2.Y; }// increment self by product of V1 and V2

  applyforce_OT(V, DT) { this.X += this.X * V.X * DT; this.Y += this.Y * V.Y * DT; }//increment self by product of self and input vector but both are multiplied by time passed
  applyforceToDest_OT(V1, V2, DT) { this.X += V1.X * V2.X * DT; this.Y += V1.Y * V2.Y * DT; }// increment self by product of V1 and V2 but both are multiplied by time passed

  addXY(X, Y) { this.X += X; this.Y += Y; } // add input values X and Y to their respective components of the vector object.
  multXY(X, Y) { this.X *= X; this.Y *= Y; }

  dist(V) { // faster distance funct
    let X = Math.abs(this.X - V.X);
    let Y = Math.abs(this.Y - V.Y);
    return Math.hypot(X, Y);
  }

  distXY(x, y) { // faster distance funct
    let X = Math.abs(this.X - x);
    let Y = Math.abs(this.Y - y);
    return Math.hypot(X, Y);
  }
}
function transformX(X) {
  return centerOfCanvas.X + (X - camera.pos.X)
}
function transformY(X) {
  return centerOfCanvas.Y + (X - camera.pos.Y)
}

function distToLine(V1, V2, POINT) { // black magic, all i know is that it works
  // V1 = B, V2 = A, point = E
  let AB_slopeX = V2.X - V1.X; let AB_slopeY = V2.Y - V1.Y; // slope of line segment AB

  let BE_slopeX = POINT.X - V2.X; let BE_slopeY = POINT.Y - V2.Y; // slope of line segment BE

  let AE_slopeX = POINT.X - V1.X; let AE_slopeY = POINT.Y - V1.Y; // slope of line segment AE

  //dot products of (AB + BE) and (AB + AE)
  let AB_BE = AB_slopeX * BE_slopeX + AB_slopeY * BE_slopeY
  let AB_AE = AB_slopeX * AE_slopeX + AB_slopeY * AE_slopeY

  //set default answer
  let reqAns = 0

  if (AB_BE > 0) {
    reqAns = POINT.dist(V2)

  } else if (AB_AE < 0) // am i on a line that could be perpendicular to the defined line segment?
  {
    reqAns = POINT.dist(V1)

  } else {
    reqAns = (Math.abs(AB_slopeX * AE_slopeY - AB_slopeY * AE_slopeX)) / (Math.sqrt((AB_slopeX * AB_slopeX) + (AB_slopeY * AB_slopeY)))

  }
  return reqAns;
}
