import autoBind from 'auto-bind';
import throttle from 'lodash/throttle';
import * as PIXI from 'pixi.js';
import FallingReward from 'src/core/FallingReward';
import ExplosionManager from 'src/managers/ExplosionManager';
import Food from 'src/prefabs/Food';
import Player from 'src/prefabs/Player';
import ScoreLossZone from 'src/prefabs/ScoreLossZone';
import intersects from 'src/utils/intersects';

class FallingRewardsManager {
  private readonly items: Set<FallingReward> = new Set();
  private readonly explosions: ExplosionManager;
  private spawnItem: () => void = () => {};

  constructor(
    private readonly app: PIXI.Application,
    private readonly player: Player,
    private readonly scoreLossZone: ScoreLossZone
  ) {
    this.explosions = new ExplosionManager(app);
    autoBind(this);
  }

  public set spawnInterval(intervalMs: number) {
    this.spawnItem = throttle(() => this.addItem(new Food(this.app.screen)), intervalMs);
  }

  public resize(screen: PIXI.Rectangle): void {
    for (const item of this.items) {
      item.resize(screen);
    }
  }

  public update(deltaSeconds: number): void {
    this.spawnItem();

    for (const item of [...this.items]) {
      item.update(deltaSeconds);

      if (this.player.checkCollision(item, item.score)) {
        this.explosions.spawn(item.body.x, item.body.y);
        this.removeItem(item);
      } else if (intersects(this.scoreLossZone, item)) {
        this.player.score -= 1;
        this.removeItem(item);
      }
    }

    this.explosions.update(deltaSeconds);
  }

  private addItem(item: FallingReward): void {
    this.items.add(item);
    this.app.stage.addChild(item.body);
  }

  private removeItem(item: FallingReward): void {
    this.app.stage.removeChild(item.body);
    this.items.delete(item);
  }
}

export default FallingRewardsManager;
