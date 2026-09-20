import { DirectionProvider } from 'src/core/DirectionProvider';

export default class InputManager implements DirectionProvider {
  private readonly pressedKeys: Set<string> = new Set();

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  public isPressed(key: string): boolean {
    return this.pressedKeys.has(key);
  }

  public get direction(): Coordinates2D {
    const direction = { x: 0, y: 0 };

    if (this.isPressed('ArrowLeft')) direction.x -= 1;
    if (this.isPressed('ArrowRight')) direction.x += 1;
    if (this.isPressed('ArrowUp')) direction.y -= 1;
    if (this.isPressed('ArrowDown')) direction.y += 1;

    return direction;
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
