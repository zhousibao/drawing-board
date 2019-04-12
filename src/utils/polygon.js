/* 点 */
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/* 多边形 */
class Polygon {
  constructor(startPoint, endPoint, sides, style) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.sides = sides;
    this.style = style;
  }

  // 获取半径
  getRadius() {
    const deltaX = this.endPoint.x - this.startPoint.x;
    const deltaY = this.endPoint.y - this.startPoint.y;
    const radius = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
    return radius;
  }
  // 获取起始角度
  getAngle() {
    const x = Math.abs(this.endPoint.x - this.startPoint.x);
    const y = Math.abs(this.endPoint.y - this.startPoint.y);
    const z = Math.sqrt(x * x + y * y);
    const cos = x / z;
    const radina = Math.acos(cos);// 用反三角函数求弧度
    let angle = Math.floor(180 / (Math.PI / radina));// 将弧度转换成角度


    // x轴正方向
    if (this.endPoint.x >= this.startPoint.x && this.endPoint.y === this.startPoint.y) {
      angle = 0;
    }
    // x轴负方向
    if (this.endPoint.x < this.startPoint.x && this.endPoint.y === this.startPoint.y) {
      angle = 180;
    }
    // y轴正方向
    if (this.endPoint.x === this.startPoint.x && this.endPoint.y <= this.startPoint.y) {
      angle = 90;
    }
    // y轴负方向
    if (this.endPoint.x === this.startPoint.x && this.endPoint.y > this.startPoint.y) {
      angle = 270;
    }

    // 第二象限
    if (this.endPoint.x < this.startPoint.x && this.endPoint.y < this.startPoint.y) {
      angle = 180 - angle;
    }
    // 第三象限
    if (this.endPoint.x < this.startPoint.x && this.endPoint.y > this.startPoint.y) {
      angle = 180 + angle;
    }
    // 第四象限
    if (this.endPoint.x > this.startPoint.x && this.endPoint.y > this.startPoint.y) {
      angle = 360 - angle;
    }

    // console.log(angle);
    return angle;
  }

  // 获取所有点
  getPoints() {
    const points = [];
    const radius = this.getRadius();
    const angle = this.getAngle();
    let radian = angle / 180 * Math.PI; // 弧度

    for (let i = 0; i < this.sides; i++) {
      points.push(new Point(this.startPoint.x + radius * Math.cos(radian), this.startPoint.y - radius * Math.sin(radian)));
      radian += 2 * Math.PI / this.sides;
    }

    return points;
  }
  // 链接所有点
  createPath(con) {
    const points = this.getPoints();

    con.beginPath();
    con.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < this.sides; i++) {
      con.lineTo(points[i].x, points[i].y);
    }
    con.closePath();
  }
  stroke(con) {
    con.save();
    this.createPath(con);
    con.strokeStyle = this.style;
    con.stroke();
    con.restore();
  }
  fill(con) {
    con.save();
    this.createPath(con);
    con.fillStyle = this.style;
    con.fill();
    con.restore();
  }
}

export default Polygon;
