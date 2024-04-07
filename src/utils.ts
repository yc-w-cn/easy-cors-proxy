export function isURLValid(url: string): boolean {
  // 正则表达式模式，仅匹配 HTTP 和 HTTPS 协议的 URL
  const urlPattern = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;

  // 检查传入的 URL 是否匹配正则表达式模式
  return urlPattern.test(url);
}
