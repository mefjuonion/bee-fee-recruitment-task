import autoBind from 'auto-bind';
import throttle from 'lodash/throttle';
import * as PIXI from 'pixi.js';
import FallingReward from 'src/core/FallingReward';
import Food from 'src/prefabs/Food';
import FoodExplosion from 'src/prefabs/FoodExplosion';
import Player from 'src/prefabs/Player';
import ScoreLossZone from 'src/prefabs/ScoreLossZone';

class FallingRewardsManager {
  private readonly items: Set<FallingReward> = new Set();
  private readonly explosions: Set<FoodExplosion> = new Set();
  private spawnItem: () => void = () => {};

  constructor(
    private readonly app: PIXI.Application,
    private readonly player: Player,
    private readonly scoreLossZone: ScoreLossZone
  ) {
    autoBind(this);
  }

  public set spawnInterval(intervalMs: number) {
    this.spawnItem = throttle(() => this.addItem(new Food(this.app.screen)), intervalMs);
  }

  public update(deltaSeconds: number): void {
    this.spawnItem();

    for (const item of [...this.items]) {
      item.update(deltaSeconds);

      if (this.player.checkCollision(item, item.score)) {
        this.explode(item.body.x, item.body.y);
        this.removeItem(item);
      } else if (this.scoreLossZone.intersects(item)) {
        this.player.score -= 1;
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

  private addItem(item: FallingReward): void {
    this.items.add(item);
    this.app.stage.addChild(item.body);
  }

  private removeItem(item: FallingReward): void {
    this.app.stage.removeChild(item.body);
    this.items.delete(item);
  }

  private explode(x: number, y: number): void {
    const explosion = new FoodExplosion(x, y);

    this.explosions.add(explosion);
    this.app.stage.addChild(explosion.body);
  }
}

export default FallingRewardsManager;
