import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import Entity from 'src/core/Entity';

const FLOOR_HEIGHT = 12;
const FLOOR_COLOR = 0x2c3e50;

export default class Floor extends Entity<PIXI.Sprite> {
  public readonly body: PIXI.Sprite;

  constructor(screen: PIXI.Rectangle) {
    super();

    this.body = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.body.tint = FLOOR_COLOR;
    this.body.alpha = 0;
    this.body.width = screen.width;
    this.body.height = FLOOR_HEIGHT;
    this.body.x = 0;
    this.body.y = screen.height - FLOOR_HEIGHT;

    autoBind(this);
  }
    
  public show(): Promise<void> | undefined { return; }
  public hide(): Promise<void> | undefined { return; }

  public resize(screen: PIXI.Rectangle): void {
    this.body.width = screen.width;
    this.body.y = screen.height - FLOOR_HEIGHT;
  }
}
