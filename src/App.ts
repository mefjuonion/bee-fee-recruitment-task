import * as PIXI from 'pixi.js';
import Game from 'src/Game';
import AssetsManager from 'src/managers/AssetsManager';
import SETTINGS from 'src/SETTINGS';

async function App(whenStarted: Promise<void>): Promise<void> {
  const app = new PIXI.Application();

  await app.init({
    resizeTo: window,
    background: SETTINGS.backgroundColor,
    antialias: true,
    preference: 'webgl',
  });

  const container = document.getElementById('app');
  if (!container) {
    throw new Error('Missing "#app" element in index.html');
  }
  container.appendChild(app.canvas);

  await Promise.all([AssetsManager.load(), whenStarted]);

  new Game(app);
}

export default App;
