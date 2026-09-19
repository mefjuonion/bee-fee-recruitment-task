import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import Entity from 'src/core/Entity';
import AssetsManager from 'src/managers/AssetsManager';
import SettingsManager from 'src/managers/SettingsManager';

import vertexShader from 'src/shaders/level_1_background/level_1_background.vert'
import fragmentShader from 'src/shaders/level_1_background/level_1_background.frag'

const TILE_SIZE = 512;
const NOISE_FREQUENCY = 0.004;
const SWAY_SPEED = 0.3;
const SWAY_AMOUNT = 85.0;

function buildQuadPositions(screen: PIXI.Rectangle): Float32Array {
  return new Float32Array([0, 0, screen.width, 0, screen.width, screen.height, 0, screen.height]);
}

export default class Background extends Entity<PIXI.Mesh<PIXI.MeshGeometry, PIXI.Shader>> {
  public readonly body: PIXI.Mesh<PIXI.MeshGeometry, PIXI.Shader>;
  private readonly terrainUniforms: PIXI.UniformGroup;
  private scrollOffset = 0;
  private time = 0;

  constructor(screen: PIXI.Rectangle) {
    super();

    const texture = AssetsManager.get('TEXTURE_BACKGROUND_LEVEL_1');
    texture.source.style.addressMode = 'repeat';

    this.terrainUniforms = new PIXI.UniformGroup({
      uScrollOffset: { value: 0, type: 'f32' },
      uFrequency: { value: NOISE_FREQUENCY, type: 'f32' },
      uTileSize: { value: TILE_SIZE, type: 'f32' },
      uTime: { value: 0, type: 'f32' },
      uSwaySpeed: { value: SWAY_SPEED, type: 'f32' },
      uSwayAmount: { value: SWAY_AMOUNT, type: 'f32' },
    });

    const shader = PIXI.Shader.from({
      gl: { vertex: vertexShader, fragment: fragmentShader },
      resources: {
        uTexture: texture.source,
        uSampler: texture.source.style,
        terrainUniforms: this.terrainUniforms,
      },
    });

    const geometry = new PIXI.MeshGeometry({ positions: buildQuadPositions(screen) });

    this.body = new PIXI.Mesh({ geometry, shader });

    autoBind(this);
  }

  public show(): Promise<void> | undefined { return; }
  public hide(): Promise<void> | undefined { return; }

  public update(deltaSeconds: number): void {
    this.scrollOffset += SettingsManager.instance.scoreItemFallSpeed * deltaSeconds;
    this.time += deltaSeconds;
    this.terrainUniforms.uniforms.uScrollOffset = this.scrollOffset;
    this.terrainUniforms.uniforms.uTime = this.time;
  }

  public resize(screen: PIXI.Rectangle): void {
    this.body.geometry.positions.set(buildQuadPositions(screen));
    this.body.geometry.getBuffer('aPosition').update();
  }
}
