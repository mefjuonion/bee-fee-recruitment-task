import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import SETTINGS from 'src/SETTINGS';

import Entity from './Entity';
import Resizable from './Resizable';

export default class FallingReward extends Entity implements Resizable {
  constructor(
        public readonly body: PIXI.Sprite,
        public readonly score: number
  ) {
    super();
    autoBind(this);
  }

  public update(deltaSeconds: number): void {
    this.body.y += SETTINGS.scoreItemFallSpeed * deltaSeconds;
  }

  public resize(_screen: PIXI.Rectangle): void {}
}
