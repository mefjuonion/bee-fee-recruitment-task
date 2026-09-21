import { clamp } from 'lodash';
import * as PIXI from 'pixi.js';

class ScreenUtils {
  public static getRelativeSize(screen: PIXI.Rectangle, ratio: number): number {
    return Math.min(screen.width, screen.height) * ratio;
  }

  public static getQuadPositions(screen: PIXI.Rectangle): Float32Array {
    return new Float32Array([0, 0, screen.width, 0, screen.width, screen.height, 0, screen.height]);
  }

  public static getRelativePosition(props: {
    position: Coordinates2D,
    previousScreen: PIXI.Rectangle,
    nextScreen: PIXI.Rectangle,
    elementSize: number,
  }): Coordinates2D {
    const halfSize = props.elementSize / 2;
    const relativeX = props.position.x / props.previousScreen.width;
    const relativeY = props.position.y / props.previousScreen.height;

    return {
      x: clamp(relativeX * props.nextScreen.width, halfSize, props.nextScreen.width - halfSize),
      y: relativeY * props.nextScreen.height,
    };
  }
}

export default ScreenUtils;
