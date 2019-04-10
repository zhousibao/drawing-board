<template>
  <div class="draw-board">
    <div class="board">
      <div id="canvasTextarea">
        <canvas id="canvasImg" width="800" height="800"></canvas>
        <canvas id="canvas" width="800" height="800" :class="{'cursor-pen':action === 'pen','cursor-eraser':action === 'eraser','cursor-textarea':action === 'textarea','cursor-clear':action === 'clear'}"></canvas>
      </div>
    </div>
    <div class="menu">
      <div class="menu-left">
        <PopoverDefault :action="action" @popoverDefault="changeType" />
        <PopoverPen :action="action" :line-width="lineWidth" :line-color="lineColor" @popoverPen="popoverPen" />
        <PopoverTextarea :action="action" :font-size="fontSize" :font-color="fontColor" @popoverTextarea="popoverTextarea" />
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
import { Message } from 'element-ui';
import { PopoverDefault, PopoverPen, PopoverEraser, PopoverTextarea, PopoverClear } from '../components/popoverTool';
import { ActionRotate, ActionSave } from '../components/actionTool';
import { windowToCanvas, drawLine, drawClipPathToEraser, createTextarea, drawTextarea, saveImageData, restoreImageData, calcRect, drawRect, drawClipPathToClear } from '../utils/draw';
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
      textareaPoint: {},
      // eraser
      eraserRadius: undefined,
      // clear
      startPoint: {},
      endPoint: {},
      imageData: null,

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
        Message.error('图片加载失败，请刷新后重试！');
      };

      img.onload = () => {
        Message.success('图片加载成功！');
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
        Message.error('图片加载失败，请刷新后重试！');
      };

      img.onload = () => {
        // Message.success('图片加载成功！');
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
            this.textareaPoint = loc;
            const textarea = createTextarea(this.textareaPoint);
            canvasTextarea.appendChild(textarea);
            document.getElementById('textarea').focus();
            canTextarea = false;
          } else {
            // 绘制textarea文本
            const textarea = document.getElementById('textarea');
            drawTextarea(con, textarea.value, this.textareaPoint, this.fontSize, this.fontColor);
            canvasTextarea.removeChild(textarea);
            canTextarea = true;
          }
        }
        if (this.action === 'clear') {
          this.imageData = saveImageData(canvas, con);
          this.startPoint = loc;
          this.endPoint = loc;
        }
      };

      canvas.onmousemove = (e) => {
        const loc = windowToCanvas(canvas, e.clientX, e.clientY);

        if (this.action === 'pen' && canAction) {
          drawLine(con, loc, this.lineColor, this.lineWidth);
        }
        if (this.action === 'eraser' && canAction) {
          drawClipPathToEraser(canvas, con, loc, this.eraserRadius);
        }
        if (this.action === 'clear' && canAction) {
          restoreImageData(con, this.imageData);
          this.endPoint = loc;
          const rect = calcRect(this.startPoint, this.endPoint);
          drawRect(con, rect, true, false, 'rgba(25,130,255,0.2)', false);
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
    .cursor-pen{
      cursor: url("../assets/icon/pen.png") 10 40, auto;
    }
    .cursor-eraser{
      cursor: url("../assets/icon/eraser.png") 5 30, auto;
    }
    .cursor-textarea{
      cursor: url("../assets/icon/textarea.png") 15 0, auto;
    }
    .cursor-clear{
      cursor: url("../assets/icon/clear.png") 12 12, auto;
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
