// 代理图片
export function proxyUrl(url) {
  if(url){
    return url.replace('https://raw.githubusercontent.com', '/img-api')
  }
  return undefined
}

// 计算canvas的高度
// export function calcWH({width, height}) {
//   const square = {}
//   if (w <= h) {
//     // width小
//     if (w <= 1000) {
//       data.width = w
//       data.conWidth = w
//       data.height = h

//       if (h <= 700) {
//         data.conHeight = h
//       } else {
//         data.conHeight = 700
//       }
//     } else {
//       // 宽度大于1000，高度一定就大于1000
//       data.width = 1000
//       data.conWidth = 1000
//       data.height = Math.ceil(1000 / w * h)
//       data.conHeight = 700
//     }
//   } else {
//     // height小
//     if (h <= 1000) {
//       data.height = h
//       data.width = w
//       if (h <= 700) {
//         data.conHeight = h
//       } else {
//         data.conHeight = 700
//       }

//       if (w <= 1000) {
//         data.conWidth = w
//       } else {
//         data.conWidth = 1000
//       }
//     } else {
//       data.height = 1000
//       data.conHeight = 700
//       data.width = Math.ceil(1000 / h * w)
//       data.conWidth = 1000
//     }
//   }

//   return data
// }