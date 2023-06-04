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

  add_OT(V, DT) { this.X += V.X * DT; this.Y += V.Y * DT; }
  sub_OT(V, DT) { this.X -= V.X * DT; this.Y -= V.Y * DT; }
  mul_OT(V, DT) { this.X *= V.X * DT; this.Y *= V.Y * DT; }
  div_OT(V, DT) { this.X /= V.X * DT; this.Y /= V.Y * DT; }

  add_ToDest(V1, V2) { this.X = V1.X + V2.X; this.Y = V1.Y + V2.Y; }
  sub_ToDest(V1, V2) { this.X = V1.X - V2.X; this.Y = V1.Y - V2.Y; }
  mul_ToDest(V1, V2) { this.X = V1.X * V2.X; this.Y = V1.Y * V2.Y; }
  div_ToDest(V1, V2) { this.X = V1.X / V2.X; this.Y = V1.Y / V2.Y; }

  add_ToDest_OT(V1, V2, DT) { this.X = V1.X + V2.X * DT; this.Y = V1.Y + V2.Y * DT; }
  sub_ToDest_OT(V1, V2, DT) { this.X = V1.X - V2.X * DT; this.Y = V1.Y - V2.Y * DT; }
  mul_ToDest_OT(V1, V2, DT) { this.X = V1.X * V2.X * DT; this.Y = V1.Y * V2.Y * DT; }
  div_ToDest_OT(V1, V2, DT) { this.X = V1.X / V2.X * DT; this.Y = V1.Y / V2.Y * DT; }

  applyforce(V) { this.X += this.X * V.X; this.Y += this.Y * V.Y; }
  applyforceToDest(V1, V2) { this.X += V1.X * V2.X; this.Y += V1.Y * V2.Y; }

  applyforce_OT(V, DT) { this.X += this.X * V.X * DT; this.Y += this.Y * V.Y * DT; }
  applyforceToDest_OT(V1, V2, DT) { this.X += V1.X * V2.X * DT; this.Y += V1.Y * V2.Y * DT; }

  multToDest(V1, V2) { this.X = V1.X * V2.X; this.Y = V1.Y * V2.Y; }
  addXY(X, Y) { this.X += X; this.Y += Y; }

  dist(V) {
    let X = Math.abs(this.X - V.X);
    let Y = Math.abs(this.Y - V.Y);
    return Math.hypot(X, Y);
  }
}
function distToLine(V1, V2, POINT) {

  let AB_slopeX = V2.X - V1.X; let AB_slopeY = V2.Y - V1.Y;

  let BE_slopeX = POINT.X - V2.X; let BE_slopeY = POINT.Y - V2.Y;

  let AE_slopeX = POINT.X - V1.X; let AE_slopeY = POINT.Y - V1.Y;

  //dot products
  let AB_BE = AB_slopeX * BE_slopeX + AB_slopeY * BE_slopeY
  let AB_AE = AB_slopeX * AE_slopeX + AB_slopeY * AE_slopeY

  let reqAns = 0

  if (AB_BE > 0) { reqAns = POINT.dist(V2) } else {
    if (AB_AE < 0) { reqAns = POINT.dist(V1) } else {
      reqAns = (Math.abs(AB_slopeX * AE_slopeY - AB_slopeY * AE_slopeX)) / (Math.sqrt((AB_slopeX * AB_slopeX) + (AB_slopeY * AB_slopeY)))
    }
  }
  return reqAns;
}