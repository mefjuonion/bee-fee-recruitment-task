import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import Entity from 'src/core/Entity';
import SETTINGS from 'src/SETTINGS';

export default class LifeLossZone extends Entity<PIXI.Sprite> {
  public readonly body: PIXI.Sprite;

  constructor(screen: PIXI.Rectangle) {
    super();

    this.body = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.body.tint = SETTINGS.lifeLossZoneColor;
    this.body.alpha = 0;
    this.body.width = screen.width;
    this.body.height = SETTINGS.lifeLossZoneHeight;
    this.body.x = 0;
    this.body.y = screen.height - SETTINGS.lifeLossZoneHeight;

    autoBind(this);
  }

  public resize(screen: PIXI.Rectangle): void {
    this.body.width = screen.width;
    this.body.y = screen.height - SETTINGS.lifeLossZoneHeight;
  }
}
