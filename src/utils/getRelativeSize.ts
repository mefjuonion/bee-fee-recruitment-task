import * as PIXI from 'pixi.js';

export default function getRelativeSize(screen: PIXI.Rectangle, ratio: number): number {
  return Math.min(screen.width, screen.height) * ratio;
}
