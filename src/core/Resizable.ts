import * as PIXI from 'pixi.js';

type Resizable = {
  resize(screen: PIXI.Rectangle): void;
};

export default Resizable;
