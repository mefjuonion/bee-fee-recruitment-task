import * as PIXI from 'pixi.js';

export default abstract class Entity {
    public abstract readonly body: PIXI.Container;
}
