import * as PIXI from 'pixi.js';

export type AssetKey = keyof typeof ASSETS;

type Asset = PIXI.Texture | PIXI.Spritesheet;

const ASSETS = {
  TEXTURE_PLAYER: '/images/player/texture.json',
  TEXTURE_FOOD: '/images/food.png',
  TEXTURE_BACKGROUND_LEVEL_1: '/images/backgrounds/level_1/rocky_terrain_02_diff_4k.jpg'
};

class AssetsManager {
  private static assets: Record<AssetKey, Asset> = {} as Record<AssetKey, Asset>;
  private static loadProgress = 0;

  public static async load(): Promise<void> {
    const keys = Object.keys(ASSETS) as AssetKey[];
    const urls = Object.values(ASSETS);

    const loaded = await PIXI.Assets.load(urls, (progress) => {
      this.loadProgress = progress;
    });

    keys.forEach((key, index) => {
      this.assets[key] = loaded[urls[index]];
    });
  }

  public static get progress(): number {
    return this.loadProgress;
  }

  public static get(key: AssetKey): PIXI.Texture {
    return this.getAsset(key) as PIXI.Texture;
  }

  public static getSpritesheet(key: AssetKey): PIXI.Spritesheet {
    return this.getAsset(key) as PIXI.Spritesheet;
  }

  private static getAsset(key: AssetKey): Asset {
    const asset = this.assets[key];

    if (!asset) {
      throw new Error(`Asset "${key}" was not loaded`);
    }

    return asset;
  }
}

export default AssetsManager;
