export default class Transition<T> {
  private pendingValue: T | null = null;
  private elapsed = 0;

  constructor(private currentValue: T, private readonly duration: number) {}

  public get progress(): number {
    return this.pendingValue ? this.elapsed / this.duration : 0;
  }

  public get value(): T {
    return this.currentValue;
  }

  public start(nextValue: T): boolean {
    if (nextValue === this.currentValue || this.pendingValue) return false;

    this.pendingValue = nextValue;
    this.elapsed = 0;
    return true;
  }

  public update(deltaSeconds: number): T | null {
    if (!this.pendingValue) return null;

    this.elapsed = Math.min(this.duration, this.elapsed + deltaSeconds);
    if (this.elapsed < this.duration) return null;

    this.currentValue = this.pendingValue;
    this.pendingValue = null;
    return this.currentValue;
  }
}
