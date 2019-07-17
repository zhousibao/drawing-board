// 创建dom
export function createDom(loc) {
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


/* 文本对象 */
// startPoint 起始点
// value 绘制的文字
// fontSize 字体大小
// fontColor 字体颜色
// width 单行文本的最大宽度
// height文本的总高度

class Text {
  constructor(startPoint, value, fontSize, fontColor) {
    this.startPoint = startPoint;
    this.value = value;
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.width = 0;
    this.height = 0;
  }


  draw(con) {
    const arr = this.value.trim().split('\n'); // 去除末尾饿换行和空格
    con.save();
    con.textAlign = 'start';
    con.textBaseLine = 'bottom';
    con.font = `${this.fontSize}px Arial`;
    con.fillStyle = this.fontColor;
    const lineHeight = Math.ceil(con.measureText('W').width + (con.measureText('W').width / 6));
    this.height = lineHeight * arr.length; // 保存文本的总高度

    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        if (con.measureText(arr[i]).width > this.width) {
          this.width = con.measureText(arr[i]).width;
        }
        con.fillText(arr[i], this.startPoint.x, this.startPoint.y + (lineHeight * i) + ((lineHeight * 2) / 3));
      }
    }
    con.restore();
  }

  // 链接所有点
  createPath(con) {
    con.beginPath();
    con.moveTo(this.startPoint.x, this.startPoint.y);
    con.lineTo(this.startPoint.x + this.width, this.startPoint.y);
    con.lineTo(this.startPoint.x + this.width, this.startPoint.y + this.height);
    con.lineTo(this.startPoint.x, this.startPoint.y + this.height);
    con.closePath();
  }
}

export default Text;
