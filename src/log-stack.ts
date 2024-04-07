export interface LogItem {
  message: string;
  ctime: number;
}

export class LogStack {
  private stack: LogItem[];
  private maxSize: number;

  constructor(maxSize: number) {
    this.stack = [];
    this.maxSize = maxSize;
  }

  push(message: string): void {
    this.stack.push({
      message,
      ctime: new Date().getTime(),
    });
    // 如果栈的大小超过了最大值，则弹出最旧的日志
    if (this.stack.length > this.maxSize) {
      this.stack.shift();
    }
  }

  getLogs(): LogItem[] {
    return this.stack;
  }
}
