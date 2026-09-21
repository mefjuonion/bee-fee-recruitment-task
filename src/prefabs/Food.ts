import autoBind from 'auto-bind';
import { sample } from 'lodash';
import * as PIXI from 'pixi.js';
import FallingReward from 'src/core/FallingReward';
import AssetsManager from 'src/managers/AssetsManager';
import SETTINGS from 'src/SETTINGS';
import ScreenUtils from 'src/utils/ScreenUtils';
import SpriteSheetUtils from 'src/utils/SpriteSheetUtils';

const FOOD_SPRITE_COLUMNS = 8;
const FOOD_SPRITE_ROWS = 8;

export default class Food extends FallingReward {
  constructor(screen: PIXI.Rectangle) {
    const image = AssetsManager.get('TEXTURE_FOOD');
    const frames = SpriteSheetUtils.getFrames(image, FOOD_SPRITE_COLUMNS, FOOD_SPRITE_ROWS);
    const frame = sample(frames)!;
    const size = ScreenUtils.getRelativeSize(screen, SETTINGS.itemSizeRatio);

    const body = new PIXI.Sprite(frame);
    body.width = size;
    body.height = size;
    body.anchor.set(0.5);
    body.x = size / 2 + Math.random() * (screen.width - size);
    body.y = -size;
    super(body, 1);

    autoBind(this);
  }

  public resize(screen: PIXI.Rectangle): void {
    const size = ScreenUtils.getRelativeSize(screen, SETTINGS.itemSizeRatio);

    this.body.width = size;
    this.body.height = size;
  }
}