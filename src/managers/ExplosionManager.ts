import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import FoodExplosion from 'src/prefabs/FoodExplosion';

class ExplosionManager {
  private readonly explosions: Set<FoodExplosion> = new Set();

  constructor(private readonly app: PIXI.Application) {
    autoBind(this);
  }

  public spawn(x: number, y: number): void {
    const explosion = new FoodExplosion(x, y);

    this.explosions.add(explosion);
    this.app.stage.addChild(explosion.body);
  }

  public update(deltaSeconds: number): void {
    for (const explosion of [...this.explosions]) {
      explosion.update(deltaSeconds);

      if (explosion.isFinished) {
        this.app.stage.removeChild(explosion.body);
        this.explosions.delete(explosion);
      }
    }
  }
}

export default ExplosionManager;
