import Point from './point';

/* 五角星对象 */
// startPoint 中心点
// endPoint 第一个顶点
// style 样式颜色
// 五角星有 10个顶点
// 五角星每个顶点间的夹角为360/10=36°
class Stars {
  constructor(startPoint, endPoint, style) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.style = style;
    this.sides = 10; // 五角星有 10个顶点
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
    let starsRadius;

    for (let i = 0; i < this.sides; i++) {
      starsRadius = i % 2 === 0 ? radius : radius / 5 * 2; // 定义短顶点与长顶点的比列为 2:5
      points.push(new Point(this.startPoint.x + starsRadius * Math.cos(radian), this.startPoint.y - starsRadius * Math.sin(radian)));
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

export default Stars;
