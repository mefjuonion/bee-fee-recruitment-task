import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';

class SpriteSheet {
  private _frames: PIXI.Texture[] = [];

  constructor(sheet: PIXI.Texture, columns: number, rows: number) {
    const frameWidth = sheet.width / columns;
    const frameHeight = sheet.height / rows;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        this._frames.push(new PIXI.Texture({
          source: sheet.source,
          frame: new PIXI.Rectangle(column * frameWidth, row * frameHeight, frameWidth, frameHeight),
        }));
      }
    }

    autoBind(this);
  }

  public get frames(): PIXI.Texture[] {
    return this._frames;
  }
}

export default SpriteSheet;
