import * as PIXI from 'pixi.js';
import Entity from 'src/core/Entity';

class EntityPool<T extends Entity> {
  private readonly items: Set<T> = new Set();

  constructor(private readonly stage: PIXI.Container) {}

  public get all(): T[] {
    return [...this.items];
  }

  public add(item: T): void {
    this.items.add(item);
    this.stage.addChild(item.body);
  }

  public remove(item: T): void {
    this.stage.removeChild(item.body);
    this.items.delete(item);
  }
}

export default EntityPool;
