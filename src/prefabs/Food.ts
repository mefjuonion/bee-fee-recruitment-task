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
  private screen: PIXI.Rectangle;

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

    this.screen = screen.clone();

    autoBind(this);
  }

  public resize(screen: PIXI.Rectangle): void {
    const size = ScreenUtils.getRelativeSize(screen, SETTINGS.itemSizeRatio);
    const position = ScreenUtils.getRelativePosition({
      position: { x: this.body.x, y: this.body.y },
      previousScreen: this.screen,
      nextScreen: screen,
      elementSize: size,
    });

    this.body.width = size;
    this.body.height = size;
    this.body.x = position.x;
    this.body.y = position.y;

    this.screen = screen.clone();
  }
}