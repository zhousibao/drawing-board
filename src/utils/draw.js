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

// 绘制直线
export function drawLine(con, loc, lineColor, lineWidth) {
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

// 创建textarea
export function createTextarea(loc) {
  const textarea = document.createElement('textarea');
  textarea.id = 'textarea';
  textarea.rows = 3;
  textarea.autofocus = true;
  textarea.placeholder = '请输入回车键换行..';
  textarea.style.position = 'absolute';
  textarea.style.left = `${loc.x}px`;
  textarea.style.top = `${loc.y}px`;
  textarea.style.zIndex = '11';

  return textarea;
}

// 绘制textarea
export function drawTextarea(con, value, loc, fontSize, fontColor) {
  const arr = value.split('\n');
  con.save();
  con.textAlign = 'start';
  con.textBaseLine = 'bottom';
  con.font = `${fontSize}px Arial`;
  con.fillStyle = fontColor;
  const lineHeight = Math.ceil(con.measureText('W').width + (con.measureText('W').width / 6));
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      con.fillText(arr[i], loc.x, loc.y + (lineHeight * i) + ((lineHeight * 2) / 3));
    }
  }
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
export function drawRect(con, rect, isFill, isStorke, fillStyle, strokeStyle) {
  con.beginPath();
  con.save();
  con.rect(rect.x, rect.y, rect.width, rect.height);

  if (isFill) {
    con.fillStyle = fillStyle;
    con.fill();
  }
  if (isStorke) {
    con.strokeStyle = strokeStyle;
    con.Storke();
  }
  con.restore();
}

// 绘制局部清除clip路径
export function drawClipPathToClear(canvas, con, rect) {
  con.save();
  con.beginPath();
  con.rect(rect.x, rect.y, rect.width, rect.height);
  con.clip();
  con.save();
  con.globalCompositeOperation = 'destination-out';
  con.fillStyle = '#fff';
  con.fillRect(0, 0, canvas.width, canvas.height);
  con.restore();
  con.restore();
}


