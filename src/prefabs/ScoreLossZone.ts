import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import Entity from 'src/core/Entity';
import { Resizable } from 'src/core/Resizable';
import SETTINGS from 'src/SETTINGS';

export default class ScoreLossZone extends Entity implements Resizable {
  public readonly body: PIXI.Sprite;

  constructor(screen: PIXI.Rectangle) {
    super();

    this.body = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.body.alpha = 0;
    this.body.width = screen.width;
    this.body.height = SETTINGS.scoreLossZoneHeight;
    this.body.x = 0;
    this.body.y = screen.height - SETTINGS.scoreLossZoneHeight;

    autoBind(this);
  }

  public resize(screen: PIXI.Rectangle): void {
    this.body.width = screen.width;
    this.body.y = screen.height - SETTINGS.scoreLossZoneHeight;
  }
}
