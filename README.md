# drawing-board

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start  or  npm run serve 
```
## 一款编辑图片的画板

### 技术
- 基于 VUE-CLI3 
- 使用 Canvas/Element-UI/dva/antd 等前端技术开发

### 注意事项
- 旋转图片后原图片编辑将不会被保留
- 网络图片会污染绘图环境，请使用代理路径处理。
- 多边形绘制均为正多边形。
- 椭圆绘制 使用CanvasRenderingContext2D.ellipse() 函数，仅Chrome和Opera浏览器支持。
