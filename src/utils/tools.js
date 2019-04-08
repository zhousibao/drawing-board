// 代理图片
export function proxyUrl(url) {
  if(url){
    return url.replace('https://raw.githubusercontent.com', '/img-api')
  }
  return undefined
}
