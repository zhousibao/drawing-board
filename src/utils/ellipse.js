import Message from '../components/Message';
/* 椭圆对象对象 */
// startPoint 中心点
// endPoint 边缘点
// style 样式颜色
class Ellipse {
  constructor(startPoint, endPoint, style) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
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

  // 获取长轴短轴
  getAxis() {
    const axis = {};
    const radius = this.getRadius();
    const angle = this.getAngle();
    const radian = angle / 180 * Math.PI; // 弧度

    axis.a = Math.abs(radius * Math.cos(radian));
    axis.b = Math.abs(radius * Math.sin(radian));

    return axis;
  }
  // 绘制
  createPath(con) {
    const axis = this.getAxis();

    con.beginPath();
    if (con.ellipse) {
      con.ellipse(this.startPoint.x, this.startPoint.y, axis.a, axis.b, 0, 0, Math.PI * 2, true);
    } else {
      Message({
        message: '浏览器不支持绘制椭圆函数ellipse',
      });
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

export default Ellipse;
