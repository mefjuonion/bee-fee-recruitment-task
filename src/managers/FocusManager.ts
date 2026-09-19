import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import { GameEvents } from 'src/core/events';

class FocusManager {
  constructor(private readonly events: PIXI.EventEmitter<GameEvents>) {
    autoBind(this);

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  public destroy(): void {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handleVisibilityChange(): void {
    this.events.emit('windowFocusChanged', !document.hidden);
  }
}

export default FocusManager;
