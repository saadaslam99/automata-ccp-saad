export class TapeMachine {
  private tape: string[];
  private head: number;

  constructor(input: string) {
    this.tape = ['B', ...input.split(''), 'B'];
    this.head = 1;
  }

  read(): string {
    return this.tape[this.head];
  }

  write(symbol: string): void {
    this.tape[this.head] = symbol;
  }

  moveLeft(): void {
    if (this.head > 0) this.head--;
  }

  moveRight(): void {
    if (this.head < this.tape.length - 1) this.head++;
  }

  isEnd(): boolean {
    return this.head >= this.tape.length - 1;
  }

  getTape(): string[] {
    return [...this.tape];
  }

  getHead(): number {
    return this.head;
  }
}
