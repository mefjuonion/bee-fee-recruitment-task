import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import SETTINGS from 'src/SETTINGS';
import fragmentShader from 'src/shaders/damage_flash/damage_flash.frag';

export default class DamageFlash {
  public readonly filter: PIXI.Filter;
  private readonly uniforms: PIXI.UniformGroup;
  private elapsed = SETTINGS.damageFlashDuration;

  constructor() {
    this.uniforms = new PIXI.UniformGroup({
      uIntensity: { value: 0, type: 'f32' },
    });

    this.filter = PIXI.Filter.from({
      gl: { vertex: PIXI.defaultFilterVert, fragment: fragmentShader },
      resources: { flashUniforms: this.uniforms },
    });

    autoBind(this);
  }

  public trigger(): void {
    this.elapsed = 0;
  }

  public update(deltaSeconds: number): void {
    if (this.elapsed >= SETTINGS.damageFlashDuration) return;

    this.elapsed += deltaSeconds;
    const progress = Math.min(1, this.elapsed / SETTINGS.damageFlashDuration);
    this.uniforms.uniforms.uIntensity = SETTINGS.damageFlashIntensity * (1 - progress);
  }
}
