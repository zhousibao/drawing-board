// 坐标转换函数
export function windowToCanvas(canvas, x, y) {
  const box = canvas.getBoundingClientRect();
  // console.log(box);

  const data = {
    x: (x - box.left) * (canvas.width / box.width),
    y: (y - box.top) * (canvas.height / box.height)
  };
  return data;
}

// 绘制路径
export function drawPath(con, loc, lineColor, lineWidth) {
  // 已经存在 moveTo点的情况
  con.lineTo(loc.x, loc.y);
  con.save();
  con.strokeStyle = lineColor;
  con.lineWidth = lineWidth;
  con.stroke();
  con.restore();
}

// 绘制橡皮擦的clip路径
export function drawClipPathToEraser(canvas, con, loc, eraserRadius) {
  con.save();
  con.beginPath();
  con.arc(loc.x, loc.y, eraserRadius / 2, 0, Math.PI * 2, false);
  con.clip();
  con.save();
  con.globalCompositeOperation = 'destination-out';
  con.fillStyle = '#fff';
  con.fillRect(0, 0, canvas.width, canvas.height);
  con.restore();
  con.restore();
}

// 保留当前画布ImageData
export function saveImageData(canvas, con) {
  return con.getImageData(0, 0, canvas.width, canvas.height);
}
// 把上一步保留的ImageData绘制到画布上
export function restoreImageData(con, imageData) {
  con.putImageData(imageData, 0, 0);
}

// 根据两点计算矩形
export function calcRect(startPoint, endPoint) {
  const rect = {}; // 矩形对象
  if (startPoint.x <= endPoint.x) {
    rect.x = startPoint.x;
  } else {
    rect.x = endPoint.x;
  }

  if (startPoint.y <= endPoint.y) {
    rect.y = startPoint.y;
  } else {
    rect.y = endPoint.y;
  }
  rect.width = Math.abs(startPoint.x - endPoint.x);
  rect.height = Math.abs(startPoint.y - endPoint.y);

  return rect;
}

// 绘制矩形
export function drawRect(con, rect, isFill, style) {
  con.beginPath();
  con.save();
  con.rect(rect.x, rect.y, rect.width, rect.height);

  if (isFill) {
    con.fillStyle = style;
    con.fill();
  } else {
    con.strokeStyle = style;
    con.stroke();
  }
  con.restore();
}

// 绘制局部清除clip路径
export function drawClipPathToClear(canvas, con, rect) {
  con.save();
  con.beginPath();
  con.rect(rect.x - 1, rect.y, rect.width + 2, rect.height); // 左右两边多计算一个像素是为了彻底清空鼠标移动过程中绘制的背景层。
  con.clip();
  con.save();
  con.globalCompositeOperation = 'destination-out';
  con.fillStyle = '#fff';
  con.fillRect(0, 0, canvas.width, canvas.height);
  con.restore();
  con.restore();
}


// 绘制直线
export function drawLine(con, startPoint, endPoint, color) {
  con.save();
  con.beginPath();
  con.moveTo(startPoint.x, startPoint.y);
  con.lineTo(endPoint.x, endPoint.y);
  con.strokeStyle = color;
  con.lineWidth = 2;
  con.stroke();
  con.restore();
}

// 绘制虚线
export function drawDashedLine(con, startPoint, endPoint, color) {
  const dashedLength = 5; // 虚线大小
  const deltaX = endPoint.x - startPoint.x;
  const deltaY = endPoint.y - startPoint.y;

  const numDashed = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashedLength);

  con.save();
  con.beginPath();
  for (let i = 0; i < numDashed; ++i) {
    con[i % 2 === 0 ? 'moveTo' : 'lineTo'](startPoint.x + (deltaX / numDashed) * i, startPoint.y + (deltaY / numDashed) * i);
  }
  con.strokeStyle = color;
  con.lineWidth = 2;
  con.stroke();
  con.restore();
}

// 绘制圆
export function drawArc(con, startPoint, endPoint, isFill, color) {
  const deltaX = endPoint.x - startPoint.x;
  const deltaY = endPoint.y - startPoint.y;
  const redius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  con.save();
  con.beginPath();
  con.arc(startPoint.x, startPoint.y, redius, 0, Math.PI * 2, false);
  if (isFill) {
    con.fillStyle = color;
    con.fill();
  } else {
    con.strokeStyle = color;
    con.stroke();
  }
  con.restore();
}

