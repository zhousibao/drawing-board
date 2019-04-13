<template>
  <div class="draw-board">
    <div class="board">
      <div id="canvasTextarea">
        <canvas id="canvasImg" width="800" height="800"></canvas>
        <canvas id="canvas" width="800" height="800" :class="{'cursor-pen':action === 'pen','cursor-eraser':action === 'eraser','cursor-textarea':action === 'textarea',
                                                              'cursor-shape':action === 'shape','cursor-clear':action === 'clear'}"
        ></canvas>
      </div>
    </div>
    <div class="menu">
      <div class="menu-left">
        <PopoverDefault :action="action" @popoverDefault="changeType" />
        <PopoverPen :action="action" :line-width="lineWidth" :line-color="lineColor" @popoverPen="popoverPen" />
        <PopoverTextarea :action="action" :font-size="fontSize" :font-color="fontColor" @popoverTextarea="popoverTextarea" />
        <PopoverShape :action="action" :shape-type="shapeType" :shape-color="shapeColor" :is-fill="isFill" @popoverShape="popoverShape" />
        <PopoverEraser :action="action" :eraser-radius="eraserRadius" @popoverEraser="popoverEraser" />
        <PopoverClear :action="action" @popoverClear="changeType" />
      </div>
      <div class="menu-right">
        <ActionRotate :angle="angle" @actionRotate="actionRotate" />
        <ActionSave @actionSave="actionSave" />
      </div>
    </div>
  </div>
</template>

<script>
import { PopoverDefault, PopoverPen, PopoverEraser, PopoverTextarea, PopoverShape, PopoverClear } from '../components/popoverTool';
import { ActionRotate, ActionSave } from '../components/actionTool';
import { windowToCanvas, drawPath, drawClipPathToEraser, createTextarea, drawTextarea, saveImageData, restoreImageData, calcRect, drawRect, drawClipPathToClear, drawLine, drawDashedLine, drawArc } from '../utils/draw';
import Polygon from '../utils/polygon';
import Stars from '../utils/stars';
import Ellipse from '../utils/ellipse';
import { proxyUrl } from '../utils/tools';
import url from '../assets/picture/tu.jpg';

let canvasTextarea; let canvasImg; let conImg; let canvas; let con;
export default {
  name: 'DrawingBoard',
  components: {
    PopoverDefault,
    PopoverPen,
    PopoverEraser,
    PopoverTextarea,
    PopoverShape,
    PopoverClear,

    ActionRotate,
    ActionSave
  },
  props: {
    url: {
      type: String,
      default: 'https://raw.githubusercontent.com/zhousibao/drawing-board/master/src/assets/picture/tu.jpg'
    }
  },
  data() {
    return {
      action: 'default', // 编辑模式


      // pen
      lineWidth: undefined,
      lineColor: undefined,
      // textarea
      fontSize: undefined,
      fontColor: undefined,
      // eraser
      eraserRadius: undefined,

      // shape
      shapeType: undefined,
      shapeColor: undefined,
      isFill: undefined,

      /** 绘制中使用的变量 */
      imageData: null, // clear\shape
      startPoint: {}, // textarea\clear\shape
      endPoint: {}, // clear\shape


      // rotate
      angle: 0
    };
  },
  computed: {
  },
  watch: {
  },
  created() {

  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      canvasTextarea = document.getElementById('canvasTextarea');
      canvasImg = document.getElementById('canvasImg');
      conImg = canvasImg.getContext('2d');
      canvas = document.getElementById('canvas');
      con = canvas.getContext('2d');

      this.changeImage();
    },
    // 切换图片
    changeImage() {
      const img = new Image();
      // img.src =  proxyUrl(this.url) // 网络图片
      img.src = proxyUrl(url); // 本地图片
      img.onerror = () => {
        console.log('图片加载失败，请刷新后重试！');
      };

      img.onload = () => {
        con.clearRect(0, 0, canvas.width, canvas.height);
        conImg.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasImg.width, canvasImg.height);
        this.mouseEvent();
      };
    },
    // 旋转图片
    rotateImage(angle) {
      conImg.clearRect(0, 0, canvasImg.width, canvasImg.height);
      con.clearRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.src = proxyUrl(url);

      img.onerror = () => {
        console.log('图片加载失败，请刷新后重试！');
      };

      img.onload = () => {
        if (angle === 0) {
          // 旋转 0
          conImg.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasImg.width, canvasImg.height);
        } else if (angle === 90) {
          // 旋转 90
          conImg.save();
          conImg.translate(canvasImg.width, 0);
          conImg.rotate(Math.PI / 2);
          conImg.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasImg.width, canvasImg.height);
          conImg.restore();
        } else if (angle === 180) {
          // 旋转 180
          conImg.save();
          conImg.translate(canvasImg.width, canvasImg.height);
          conImg.rotate(Math.PI);
          conImg.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasImg.width, canvasImg.height);
          conImg.restore();
        } else if (angle === 270) {
          // 旋转 270
          conImg.save();
          conImg.translate(0, canvasImg.height);
          conImg.rotate(Math.PI * 3 / 2);
          conImg.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasImg.width, canvasImg.height);
          conImg.restore();
        }
      };
    },
    // 事件处理
    mouseEvent() {
      let canAction = false;
      let canTextarea = true;

      canvas.onmousedown = (e) => {
        const loc = windowToCanvas(canvas, e.clientX, e.clientY);
        e.preventDefault();
        canAction = true;
        if (this.action === 'pen') {
          con.beginPath();
          con.moveTo(loc.x, loc.y);
        }
        if (this.action === 'textarea') {
          if (canTextarea) {
            // 添加textarea文本框
            this.startPoint = loc;
            const textarea = createTextarea(this.startPoint);
            canvasTextarea.appendChild(textarea);
            document.getElementById('textarea').focus();
            canTextarea = false;
          } else {
            // 绘制textarea文本
            const textarea = document.getElementById('textarea');
            drawTextarea(con, textarea.value, this.startPoint, this.fontSize, this.fontColor);
            canvasTextarea.removeChild(textarea);
            canTextarea = true;
          }
        }
        if (this.action === 'clear') {
          this.imageData = saveImageData(canvas, con);
          this.startPoint = loc;
          this.endPoint = loc;
        }
        if (this.action === 'shape') {
          this.imageData = saveImageData(canvas, con);
          this.startPoint = loc;
          this.endPoint = loc;
        }
      };

      canvas.onmousemove = (e) => {
        const loc = windowToCanvas(canvas, e.clientX, e.clientY);

        if (this.action === 'pen' && canAction) {
          drawPath(con, loc, this.lineColor, this.lineWidth);
        }
        if (this.action === 'eraser' && canAction) {
          drawClipPathToEraser(canvas, con, loc, this.eraserRadius);
        }
        if (this.action === 'clear' && canAction) {
          restoreImageData(con, this.imageData);
          this.endPoint = loc;
          const rect = calcRect(this.startPoint, this.endPoint);
          drawRect(con, rect, true, 'rgba(25,130,255,0.2)');
        }
        if (this.action === 'shape' && canAction) {
          restoreImageData(con, this.imageData);
          this.endPoint = loc;

          if (this.shapeType === 'line') {
            drawLine(con, this.startPoint, this.endPoint, this.shapeColor);
          }
          if (this.shapeType === 'dashed') {
            drawDashedLine(con, this.startPoint, this.endPoint, this.shapeColor);
          }
          if (this.shapeType === 'arc') {
            drawArc(con, this.startPoint, this.endPoint, this.isFill, this.shapeColor);
          }
          if (this.shapeType === 'triangle' || this.shapeType === 'hexagon') {
            let sides = 3;
            if (this.shapeType === 'hexagon') {
              sides = 6;
            }
            const polygon = new Polygon(this.startPoint, this.endPoint, sides, this.shapeColor);
            if (this.isFill) {
              polygon.fill(con);
            } else {
              polygon.stroke(con);
            }
          }
          if (this.shapeType === 'rect') {
            const rect = calcRect(this.startPoint, this.endPoint);
            drawRect(con, rect, this.isFill, this.shapeColor);
          }
          if (this.shapeType === 'stars') {
            const stars = new Stars(this.startPoint, this.endPoint, this.shapeColor);
            if (this.isFill) {
              stars.fill(con);
            } else {
              stars.stroke(con);
            }
          }
          if (this.shapeType === 'ellipse') {
            const ellipse = new Ellipse(this.startPoint, this.endPoint, this.shapeColor);
            if (this.isFill) {
              ellipse.fill(con);
            } else {
              ellipse.stroke(con);
            }
          }
        }
      };

      canvas.onmouseup = (e) => {
        const loc = windowToCanvas(canvas, e.clientX, e.clientY);
        if (this.action === 'eraser' && canAction) {
          drawClipPathToEraser(canvas, con, loc, this.eraserRadius);
        }
        if (this.action === 'clear' && canAction) {
          const rect = calcRect(this.startPoint, this.endPoint);
          drawClipPathToClear(canvas, con, rect);
        }

        canAction = false;
      };

      window.onmouseup = () => {
        if (this.action === 'clear' && canAction) {
          const rect = calcRect(this.startPoint, this.endPoint);
          drawClipPathToClear(canvas, con, rect);
        }

        canAction = false;
      };
    },


    //
    changeType(type) {
      this.action = type;
    },
    //
    popoverPen(name, lineWidth, lineColor) {
      this.action = name;
      this.lineWidth = lineWidth;
      this.lineColor = lineColor;
    },
    //
    popoverEraser(name, eraserRadius) {
      this.action = name;
      this.eraserRadius = eraserRadius;
    },
    //
    popoverTextarea(name, fontSize, fontColor) {
      this.action = name;
      this.fontSize = fontSize;
      this.fontColor = fontColor;
    },
    //
    popoverShape(name, shapeType, shapeColor, isFill) {
      this.action = name;
      this.shapeType = shapeType;
      this.shapeColor = shapeColor;
      this.isFill = isFill;
    },

    //
    actionRotate(angle) {
      this.angle = angle;
      this.rotateImage(angle);
    },
    // 保存
    actionSave() {
      const oldImg = new Image();
      oldImg.crossOrigin = 'anonymous';
      oldImg.src = canvasImg.toDataURL('image/png');
      const drawImg = new Image();
      drawImg.crossOrigin = 'anonymous';
      drawImg.src = canvas.toDataURL('image/png');


      oldImg.onload = () => {
        con.clearRect(0, 0, canvas.width, canvas.height);
        con.drawImage(oldImg, 0, 0, canvas.width, canvas.height);
        con.drawImage(drawImg, 0, 0, canvas.width, canvas.height);

        const file = canvas.toDataURL('image/jpeg');
        // 合并成base64图片地址
        console.log(file);
      };
    }


  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.draw-board{
  width: 800px;
  margin: 0 auto;

  .board{
    width: 100%;
    height: 800px;
    outline: #ccc solid thin;
    position: relative;

    #canvasTextarea{
      position: relative;
    }
    #canvasImg{
      position: relative;
      z-index: 9;
    }
    #canvas{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
    }
  }

  .menu{
    width: 100%;
    height: 50px;
    background: #2F303B;
    display: flex;
    justify-content: space-between;

    .menu-left{
      height: 50px;
      width: 50%;
      display: flex;
      align-items: center;
    }

    .menu-right{
      height: 50px;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
