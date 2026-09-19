import * as PIXI from 'pixi.js';

const getFrameFromSprite = (
  sheet: PIXI.Texture,
  columns: number,
  rows: number,
): PIXI.Texture[] => {
  const frameWidth = sheet.width / columns;
  const frameHeight = sheet.height / rows;
  const frames: PIXI.Texture[] = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      frames.push(new PIXI.Texture({
        source: sheet.source,
        frame: new PIXI.Rectangle(column * frameWidth, row * frameHeight, frameWidth, frameHeight),
      }));
    }
  }

  return frames;
};

export default getFrameFromSprite;