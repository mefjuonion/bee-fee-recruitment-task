import autoBind from 'auto-bind';
import throttle from 'lodash/throttle';
import * as PIXI from 'pixi.js';
import ScoreItem from 'src/core/ScoreItem';
import Floor from 'src/prefabs/Floor';
import Food from 'src/prefabs/Food';
import Player from 'src/prefabs/Player';

class ScoreItemsManager {
  private readonly items: Set<ScoreItem> = new Set();
  private spawnItem: () => void = () => {};

  constructor(
    private readonly app: PIXI.Application,
    private readonly player: Player,
    private readonly floor: Floor
  ) {
    autoBind(this);
  }

  public setSpawnInterval(intervalMs: number): void {
    this.spawnItem = throttle(() => this.addItem(new Food(this.app.screen)), intervalMs);
  }

  public update(deltaSeconds: number): void {
    this.spawnItem();

    for (const item of [...this.items]) {
      item.update(deltaSeconds);

      if (this.player.checkCollision(item.body.getBounds().rectangle, item.score)) {
        item.hide().then(() => this.removeItem(item));
      } else if (this.floor.body.getBounds().rectangle.intersects(item.body.getBounds().rectangle)) {
        this.player.loseLife();
        this.removeItem(item);
      }
    }
  }

  private addItem(item: ScoreItem): void {
    this.items.add(item);
    this.app.stage.addChild(item.body);
  }

  private removeItem(item: ScoreItem): void {
    this.app.stage.removeChild(item.body);
    this.items.delete(item);
  }
}

export default ScoreItemsManager;
