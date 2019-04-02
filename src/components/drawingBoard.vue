<template>
  <div class="draw-board">
    <div class="board">
      <canvas id="canvasImg" width="1000" height="600"></canvas>
      <canvas id="canvas" width="1000" height="600"></canvas>
    </div>
    <div class="menu">
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
let canvas;
let con;
export default {
  name: 'HelloWorld',
  props: {

  },
  data() {
    return {
      isCanvas: false, // 图片未加载完成不可编辑

    }
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
      canvas = document.getElementById('canvas');
      con = canvas.getContext('2d');

      con.textAlign = 'start';
      con.textBaseLine = 'bottom';
      con.font = '16px Arial';
      con.fillStyle = 'red';

      this.changeImage();
      this.mouseEvent();
    },
    changeImage() {
      const that = this;
      const img = new Image();
      img.src = this.proxyUrl(this.url);

      img.onerror = function () {
        Message.error('图片加载失败，请刷新后重试！');
      };

      img.onload = function () {
        that.isCanvas = true;
        // console.log(img.width, img.height)
        // console.log(img.src)

        // canvasImg.height = (canvasImg.width / img.width) * img.height
        // canvas.height = canvasImg.height

        that.settingCanvas(img.width, img.height);

        conImg.clearRect(0, 0, canvasImg.width, canvasImg.height);
        con.clearRect(0, 0, canvas.width, canvas.height);
        conImg.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasImg.width, canvasImg.height);
      };
    },
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.draw-board{
  width: 1000px;
  margin: 0 auto;

  .board{
    width: 1000px;
    height: 600px;
    position: relative;

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
    width: 1000px;
    height: 100px;
    background: #ccc;
  }
}
</style>
