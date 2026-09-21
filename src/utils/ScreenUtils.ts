import * as PIXI from 'pixi.js';

class ScreenUtils {
  public static getRelativeSize(screen: PIXI.Rectangle, ratio: number): number {
    return Math.min(screen.width, screen.height) * ratio;
  }
}

export default ScreenUtils;
