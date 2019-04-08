// 代理图片
export default function proxyUrl(url) {
  if (url) {
    return url.replace('https://raw.githubusercontent.com', '/img-api');
  }
  return undefined;
}
