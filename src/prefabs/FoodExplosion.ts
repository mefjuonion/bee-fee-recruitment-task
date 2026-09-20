import autoBind from 'auto-bind';
import { sample } from 'lodash';
import * as PIXI from 'pixi.js';
import SETTINGS from 'src/SETTINGS';

export default class FoodExplosion {
  public readonly body: PIXI.ParticleContainer;
  private readonly particles: PIXI.Particle[] = [];
  private readonly velocities: PIXI.Point[] = [];
  private elapsed = 0;

  constructor(x: number, y: number) {
    const texture = PIXI.Texture.WHITE;
    const radius = SETTINGS.explosionMaxSpeed * SETTINGS.explosionDuration;

    this.body = new PIXI.ParticleContainer({
      texture,
      boundsArea: new PIXI.Rectangle(x - radius, y - radius, radius * 2, radius * 2),
      dynamicProperties: { position: true, color: true },
    });

    for (let i = 0; i < SETTINGS.explosionParticleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = SETTINGS.explosionMinSpeed
        + Math.random() * (SETTINGS.explosionMaxSpeed - SETTINGS.explosionMinSpeed);
      this.velocities.push(new PIXI.Point(Math.cos(angle) * speed, Math.sin(angle) * speed));

      const particle = new PIXI.Particle({
        texture,
        x,
        y,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: SETTINGS.explosionParticleSize / texture.width,
        scaleY: SETTINGS.explosionParticleSize / texture.height,
        tint: sample(SETTINGS.explosionColors),
      });

      this.particles.push(particle);
      this.body.addParticle(particle);
    }

    autoBind(this);
  }

  public get isFinished(): boolean {
    return this.elapsed >= SETTINGS.explosionDuration;
  }

  public update(deltaSeconds: number): void {
    this.elapsed += deltaSeconds;
    const fade = Math.max(0, 1 - this.elapsed / SETTINGS.explosionDuration);

    this.particles.forEach((particle, index) => {
      particle.x += this.velocities[index].x * deltaSeconds;
      particle.y += this.velocities[index].y * deltaSeconds;
      particle.alpha = fade;
    });
  }
}
