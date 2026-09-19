import * as PIXI from 'pixi.js';

export default abstract class Entity<ViewType extends PIXI.Container> {
    public abstract readonly body: ViewType;

    public abstract show(): Promise<void> | undefined;
    public abstract hide(): Promise<void> | undefined;
}
