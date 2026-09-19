import * as PIXI from 'pixi.js';

export type TextureAssetKey = keyof typeof TEXTURE_ASSETS;

type Asset = PIXI.Texture | PIXI.Spritesheet;

export const TEXTURE_ASSETS = {
  TEXTURE_PLAYER: '/images/player/texture.json',
  TEXTURE_FOOD: '/images/food.png',
  TEXTURE_BACKGROUND_LEVEL_1: '/images/backgrounds/level_1/rocky_terrain_02_diff_4k.jpg'
};

export const AUDIO_ASSETS = {
  SOUND_EATING: '/images/music/eating.wav',
  SOUND_FORREST: '/images/music/forrest.wav'
};
export type Sound = keyof typeof AUDIO_ASSETS;

class AssetsManager {
  private static assets: Record<TextureAssetKey, Asset> = {} as Record<TextureAssetKey, Asset>;
  private static audioBlobUrls: Record<Sound, string> = {} as Record<Sound, string>;
  private static loadProgress = 0;

  public static async load(): Promise<void> {
    const keys = Object.keys(TEXTURE_ASSETS) as TextureAssetKey[];
    const urls = Object.values(TEXTURE_ASSETS);

    const audioKeys = Object.keys(AUDIO_ASSETS) as Sound[];

    const [loaded] = await Promise.all([
      PIXI.Assets.load(urls, (progress) => {
        this.loadProgress = progress;
      }),
      Promise.all(audioKeys.map(async (key) => {
        const response = await fetch(AUDIO_ASSETS[key]);
        const blob = await response.blob();

        this.audioBlobUrls[key] = URL.createObjectURL(blob);
      }))
    ]);

    keys.forEach((key, index) => {
      this.assets[key] = loaded[urls[index]];
    });
  }

  public static get progress(): number {
    return this.loadProgress;
  }

  public static get(key: TextureAssetKey): PIXI.Texture {
    return this.getAsset(key) as PIXI.Texture;
  }

  public static getSpritesheet(key: TextureAssetKey): PIXI.Spritesheet {
    return this.getAsset(key) as PIXI.Spritesheet;
  }

  public static getAudioUrl(key: Sound): string {
    const url = this.audioBlobUrls[key];

    if (!url) {
      throw new Error(`Asset "${key}" was not loaded`);
    }

    return url;
  }

  private static getAsset(key: TextureAssetKey): Asset {
    const asset = this.assets[key];

    if (!asset) {
      throw new Error(`Asset "${key}" was not loaded`);
    }

    return asset;
  }
}

export default AssetsManager;
