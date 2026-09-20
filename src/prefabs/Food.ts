import autoBind from 'auto-bind';
import { sample } from 'lodash';
import * as PIXI from 'pixi.js';
import FallingReward from 'src/core/FallingReward';
import AssetsManager from 'src/managers/AssetsManager';
import SETTINGS from 'src/SETTINGS';
import getFrameFromSprite from 'src/utils/getFrameFromSprite';
import getRelativeSize from 'src/utils/getRelativeSize';

const FOOD_SPRITE_COLUMNS = 8;
const FOOD_SPRITE_ROWS = 8;

export default class Food extends FallingReward {
  constructor(screen: PIXI.Rectangle) {
    const image = AssetsManager.get('TEXTURE_FOOD');
    const frames = getFrameFromSprite(image, FOOD_SPRITE_COLUMNS, FOOD_SPRITE_ROWS);
    const frame = sample(frames)!;
    const size = getRelativeSize(screen, SETTINGS.itemSizeRatio);

    const body = new PIXI.Sprite(frame);
    body.width = size;
    body.height = size;
    body.anchor.set(0.5);
    body.x = size / 2 + Math.random() * (screen.width - size);
    body.y = -size;
    super(body, 1);

    autoBind(this);
  }
}