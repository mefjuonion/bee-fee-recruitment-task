import Level from './core/Level';

const LEVELS: Level[] = [
  new Level({
    name: 'Poziom 1', playerSpeed: 420, spawnFoodInterval: 5000, startingScore: 10, scoreToAdvance: 20,
    backgroundTexture: 'TEXTURE_BACKGROUND_LEVEL_1',
  }),
  new Level({
    name: 'Poziom 2', playerSpeed: 200, spawnFoodInterval: 2000, startingScore: 10, scoreToAdvance: 30,
    backgroundTexture: 'TEXTURE_BACKGROUND_LEVEL_2',
  }),
];

export default LEVELS;