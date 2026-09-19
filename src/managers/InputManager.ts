export default class InputManager {
  private readonly pressedKeys: Set<string> = new Set();

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  public isPressed(key: string): boolean {
    return this.pressedKeys.has(key);
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    this.pressedKeys.add(event.key);
  };

  private readonly handleKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.key);
  };
}
