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
