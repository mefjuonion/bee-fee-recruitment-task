import autoBind from 'auto-bind';
import { sample } from 'lodash';
import * as PIXI from 'pixi.js';

const PARTICLE_COUNT = 40;
const PARTICLE_SIZE = 3;
const MIN_SPEED = 80;
const MAX_SPEED = 220;
const DURATION = 0.5;
const COLORS = [0xffe066, 0xff922b, 0xffffff, 0xff6b6b];

export default class FoodExplosion {
  public readonly body: PIXI.ParticleContainer;
  private readonly particles: PIXI.Particle[] = [];
  private readonly velocities: PIXI.Point[] = [];
  private elapsed = 0;

  constructor(x: number, y: number) {
    const texture = PIXI.Texture.WHITE;
    const radius = MAX_SPEED * DURATION;

    this.body = new PIXI.ParticleContainer({
      texture,
      boundsArea: new PIXI.Rectangle(x - radius, y - radius, radius * 2, radius * 2),
      dynamicProperties: { position: true, color: true },
    });

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
      this.velocities.push(new PIXI.Point(Math.cos(angle) * speed, Math.sin(angle) * speed));

      const particle = new PIXI.Particle({
        texture,
        x,
        y,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: PARTICLE_SIZE / texture.width,
        scaleY: PARTICLE_SIZE / texture.height,
        tint: sample(COLORS),
      });

      this.particles.push(particle);
      this.body.addParticle(particle);
    }

    autoBind(this);
  }

  public get isFinished(): boolean {
    return this.elapsed >= DURATION;
  }

  public update(deltaSeconds: number): void {
    this.elapsed += deltaSeconds;
    const fade = Math.max(0, 1 - this.elapsed / DURATION);

    this.particles.forEach((particle, index) => {
      particle.x += this.velocities[index].x * deltaSeconds;
      particle.y += this.velocities[index].y * deltaSeconds;
      particle.alpha = fade;
    });
  }
}
