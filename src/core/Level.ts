import { TextureAssetKey } from 'src/managers/AssetsManager';

export interface LevelArgs {
    name: string;
    playerSpeed: number;
    spawnFoodInterval: number;
    maxLives: number;
    scoreToAdvance: number;
    backgroundTexture: TextureAssetKey;
}

export default class Level {
  constructor(private readonly args: LevelArgs) {}

  public get name(): string {
    return this.args.name;
  }

  public get playerSpeed(): number {
    return this.args.playerSpeed;
  }

  public get spawnFoodInterval(): number {
    return this.args.spawnFoodInterval;
  }

  public get maxLives(): number {
    return this.args.maxLives;
  }

  public get scoreToAdvance(): number {
    return this.args.scoreToAdvance;
  }

  public get backgroundTexture(): TextureAssetKey {
    return this.args.backgroundTexture;
  }
}
