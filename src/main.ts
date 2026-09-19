import * as PIXI from 'pixi.js';
import Game from 'src/Game';
import AssetsManager from 'src/managers/AssetsManager';
import SettingsManager from 'src/managers/SettingsManager';

async function bootstrap(): Promise<void> {
  const app = new PIXI.Application();

  await app.init({
    resizeTo: window,
    background: SettingsManager.instance.backgroundColor,
    antialias: true,
    preference: 'webgl',
  });

  await AssetsManager.load();

  const container = document.getElementById('app');
  if (!container) {
    throw new Error('Missing "#app" element in index.html');
  }
  container.appendChild(app.canvas);

  new Game(app);
}

void bootstrap();
