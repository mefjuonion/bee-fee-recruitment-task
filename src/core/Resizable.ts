import * as PIXI from 'pixi.js';

export interface Resizable {
  resize(screen: PIXI.Rectangle): void;
}
