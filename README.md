# drawing-board

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start  or  npm run serve  8011端口
```

## 一款编辑图片的画板

### 技术
- 基于 VUE-CLI3 
- 使用 Canvas 等前端技术开发

### 功能点
- 编辑图片、旋转图片、完善后保存base64图片。
- 铅笔路径绘制、文本框编辑（颜色及字体大小切换）。
- 橡皮檫、局部清除。
- 直线、虚线、圆形、椭圆绘制。
- 正多边形绘制、五角星绘制。

### 注意事项
- 旋转图片后原图片编辑将不会被保留
- 网络图片会污染绘图环境，请使用代理路径处理。
- 多边形绘制均为正多边形。
- 椭圆绘制 使用CanvasRenderingContext2D.ellipse() 函数，仅Chrome和Opera浏览器支持。

### 小记
- 最近在优化的时候想要实现文本框的拖拽一种功能。
- 后来实现了，但是发现其他绘制的路径形状，将在拖拽文本框后全部清除，是因为没有保留其他路径形状的对象。
- 觉得保存所有路径对象及每次拖拽移动都需要重绘所有图形。觉得很麻烦，寻找第三方插件。
- fabricjs：是一个canvas的库，每次修改对象的参数后需要执行canvas.renderAll()重新渲染。觉得很酷。
- 后期准备重新编写一个依赖fabricjs的drawing-board。敬请期待！
