import { getCurrentDateTime } from './utils';

export class LogStack {
  private stack: string[];
  private maxSize: number;

  constructor(maxSize: number) {
    this.stack = [];
    this.maxSize = maxSize;
  }

  push(message: string): void {
    this.stack.push(`[${getCurrentDateTime()}]${message}`);
    // 如果栈的大小超过了最大值，则弹出最旧的日志
    if (this.stack.length > this.maxSize) {
      this.stack.shift();
    }
  }

  getLogs(): string[] {
    return this.stack;
  }
}
