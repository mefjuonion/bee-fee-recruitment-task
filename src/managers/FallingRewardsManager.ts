import autoBind from 'auto-bind';
import throttle from 'lodash/throttle';
import * as PIXI from 'pixi.js';
import EntityPool from 'src/core/EntityPool';
import FallingReward from 'src/core/FallingReward';
import ExplosionManager from 'src/managers/ExplosionManager';
import Food from 'src/prefabs/Food';
import Player from 'src/prefabs/Player';
import ScoreLossZone from 'src/prefabs/ScoreLossZone';
import EntityUtils from 'src/utils/EntityUtils';

class FallingRewardsManager {
  private readonly items: EntityPool<FallingReward>;
  private readonly explosions: ExplosionManager;
  private spawnItem: () => void = () => {};

  constructor(
    private readonly app: PIXI.Application,
    private readonly player: Player,
    private readonly scoreLossZone: ScoreLossZone
  ) {
    this.items = new EntityPool(app.stage);
    this.explosions = new ExplosionManager(app);
    autoBind(this);
  }

  public set spawnInterval(intervalMs: number) {
    this.spawnItem = throttle(() => this.items.add(new Food(this.app.screen)), intervalMs);
  }

  public resize(screen: PIXI.Rectangle): void {
    for (const item of this.items.all) {
      item.resize(screen);
    }
  }

  public update(deltaSeconds: number): void {
    this.spawnItem();

    for (const item of this.items.all) {
      item.update(deltaSeconds);

      if (this.player.checkCollision(item, item.score)) {
        this.explosions.spawn(item.body.x, item.body.y);
        this.items.remove(item);
      } else if (EntityUtils.intersects(this.scoreLossZone, item)) {
        this.player.score -= 1;
        this.items.remove(item);
      }
    }

    this.explosions.update(deltaSeconds);
  }
}

export default FallingRewardsManager;
