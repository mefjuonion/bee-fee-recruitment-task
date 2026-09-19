import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import SettingsManager from 'src/managers/SettingsManager';

import Entity from './Entity';

export default class ScoreItem extends Entity<PIXI.Sprite> {
  constructor(
        public readonly body: PIXI.Sprite,
        public readonly score: number
  ) {
    super();
    autoBind(this);
  }

  public update(deltaSeconds: number): void {
    this.body.y += SettingsManager.instance.scoreItemFallSpeed * deltaSeconds;
  }

  public show(): Promise<void> {
    this.body.visible = true;
    return Promise.resolve();
  }

  public hide(): Promise<void> {
    this.body.visible = false;
    return Promise.resolve();
  }
}
