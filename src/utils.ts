export function isURLValid(url: string): boolean {
  // 正则表达式模式，仅匹配 HTTP 和 HTTPS 协议的 URL
  const urlPattern = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;

  // 检查传入的 URL 是否匹配正则表达式模式
  return urlPattern.test(url);
}

export function getCurrentDateTime(): string {
  const now: Date = new Date();

  // 获取年份、月份、日期
  const year: number = now.getFullYear();
  const month: number = now.getMonth() + 1; // 月份从0开始，因此需要加1
  const date: number = now.getDate();

  // 获取小时、分钟、秒
  const hours: number = now.getHours();
  const minutes: number = now.getMinutes();
  const seconds: number = now.getSeconds();

  // 格式化
  const formattedDate = `${year}-${padZero(month)}-${padZero(date)} ${padZero(
    hours,
  )}:${padZero(minutes)}:${padZero(seconds)}`;

  return formattedDate;
}

// 辅助函数，用于确保数字在10以下时添加前导零
export function padZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}
