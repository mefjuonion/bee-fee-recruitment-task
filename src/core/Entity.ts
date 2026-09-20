import * as PIXI from 'pixi.js';

export default abstract class Entity<ViewType extends PIXI.Container> {
    public abstract readonly body: ViewType;

    public abstract show(): Promise<void> | undefined;
    public abstract hide(): Promise<void> | undefined;

    public intersects(other: Entity<PIXI.Container>): boolean {
      return this.body.getBounds().rectangle.intersects(other.body.getBounds().rectangle);
    }
}
