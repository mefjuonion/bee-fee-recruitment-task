import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import Entity from 'src/core/Entity';
import { Resizable } from 'src/core/Resizable';
import AssetsManager, { TextureAssetKey } from 'src/managers/AssetsManager';
import SETTINGS from 'src/SETTINGS';
import fragmentShader from 'src/shaders/level_1_background/level_1_background.frag';
import vertexShader from 'src/shaders/level_1_background/level_1_background.vert';
import ScreenUtils from 'src/utils/ScreenUtils';
import Transition from 'src/utils/Transition';

export default class Background extends Entity implements Resizable {
  public readonly body: PIXI.Mesh<PIXI.MeshGeometry, PIXI.Shader>;
  private readonly shader: PIXI.Shader;
  private readonly terrainUniforms: PIXI.UniformGroup;
  private readonly textureTransition: Transition<TextureAssetKey>;
  private scrollOffset = 0;
  private time = 0;

  constructor(screen: PIXI.Rectangle, initialTextureKey: TextureAssetKey) {
    super();

    this.textureTransition = new Transition(initialTextureKey, SETTINGS.levelTransitionDuration);
    const texture = this.getTiledTexture(initialTextureKey);

    this.terrainUniforms = new PIXI.UniformGroup({
      uScrollOffset: { value: 0, type: 'f32' },
      uFrequency: { value: SETTINGS.backgroundNoiseFrequency, type: 'f32' },
      uTileSize: { value: SETTINGS.backgroundTileSize, type: 'f32' },
      uTime: { value: 0, type: 'f32' },
      uSwaySpeed: { value: SETTINGS.backgroundSwaySpeed, type: 'f32' },
      uSwayAmount: { value: SETTINGS.backgroundSwayAmount, type: 'f32' },
      uTransitionProgress: { value: 0, type: 'f32' },
    });

    this.shader = PIXI.Shader.from({
      gl: { vertex: vertexShader, fragment: fragmentShader },
      resources: {
        uTexture: texture.source,
        uSampler: texture.source.style,
        uNextTexture: texture.source,
        uNextSampler: texture.source.style,
        terrainUniforms: this.terrainUniforms,
      },
    });

    const geometry = new PIXI.MeshGeometry({ positions: ScreenUtils.getQuadPositions(screen) });

    this.body = new PIXI.Mesh({ geometry, shader: this.shader });

    autoBind(this);
  }

  private getTiledTexture(key: TextureAssetKey): PIXI.Texture {
    const texture = AssetsManager.getTexture(key);
    texture.source.style.addressMode = 'repeat';

    return texture;
  }

  public transitionTo(nextTextureKey: TextureAssetKey): void {
    if (!this.textureTransition.start(nextTextureKey)) return;

    const nextTexture = this.getTiledTexture(nextTextureKey);
    this.shader.resources.uNextTexture = nextTexture.source;
  }

  public update(deltaSeconds: number): void {
    this.scrollOffset += SETTINGS.scoreItemFallSpeed * deltaSeconds;
    this.time += deltaSeconds;
    this.terrainUniforms.uniforms.uScrollOffset = this.scrollOffset;
    this.terrainUniforms.uniforms.uTime = this.time;

    const didComplete = this.textureTransition.update(deltaSeconds);
    this.terrainUniforms.uniforms.uTransitionProgress = this.textureTransition.progress;

    if (didComplete) {
      this.shader.resources.uTexture = this.shader.resources.uNextTexture;
    }
  }

  public resize(screen: PIXI.Rectangle): void {
    this.body.geometry.positions.set(ScreenUtils.getQuadPositions(screen));
    this.body.geometry.getBuffer('aPosition').update();
  }
}
