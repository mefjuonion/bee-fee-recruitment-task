import autoBind from 'auto-bind';
import throttle from 'lodash/throttle';
import * as PIXI from 'pixi.js';
import ScoreItem from 'src/core/ScoreItem';
import Floor from 'src/prefabs/Floor';
import Food from 'src/prefabs/Food';
import FoodExplosion from 'src/prefabs/FoodExplosion';
import Player from 'src/prefabs/Player';

class ScoreItemsManager {
  private readonly items: Set<ScoreItem> = new Set();
  private readonly explosions: Set<FoodExplosion> = new Set();
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
        this.explode(item.body.x, item.body.y);
        item.hide().then(() => this.removeItem(item));
      } else if (this.floor.body.getBounds().rectangle.intersects(item.body.getBounds().rectangle)) {
        this.player.loseLife();
        this.removeItem(item);
      }
    }

    for (const explosion of [...this.explosions]) {
      explosion.update(deltaSeconds);

      if (explosion.isFinished) {
        this.app.stage.removeChild(explosion.body);
        this.explosions.delete(explosion);
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

  private explode(x: number, y: number): void {
    const explosion = new FoodExplosion(x, y);

    this.explosions.add(explosion);
    this.app.stage.addChild(explosion.body);
  }
}

export default ScoreItemsManager;
