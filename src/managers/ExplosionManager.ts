import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import EntityPool from 'src/core/EntityPool';
import FoodExplosion from 'src/prefabs/FoodExplosion';

class ExplosionManager {
  private readonly explosions: EntityPool<FoodExplosion>;

  constructor(app: PIXI.Application) {
    this.explosions = new EntityPool(app.stage);
    autoBind(this);
  }

  public spawn(x: number, y: number): void {
    this.explosions.add(new FoodExplosion(x, y));
  }

  public update(deltaSeconds: number): void {
    for (const explosion of this.explosions.all) {
      explosion.update(deltaSeconds);

      if (explosion.isFinished) {
        this.explosions.remove(explosion);
      }
    }
  }
}

export default ExplosionManager;
