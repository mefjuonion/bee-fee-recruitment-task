import Level from 'src/core/Level';

const LEVELS: Level[] = [
  new Level({
    name: 'Poziom 1', playerSpeed: 420, spawnFoodInterval: 5000, maxLives: 10, scoreToAdvance: 10,
    backgroundTexture: 'TEXTURE_BACKGROUND_LEVEL_1',
  }),
  new Level({
    name: 'Poziom 2', playerSpeed: 200, spawnFoodInterval: 3500, maxLives: 10, scoreToAdvance: 30,
    backgroundTexture: 'TEXTURE_BACKGROUND_LEVEL_2',
  }),
];

class LevelManager {
  private index = 0;

  public get current(): Level {
    return LEVELS[this.index];
  }

  public hasNextLevel(score: number): boolean {
    if (this.index >= LEVELS.length - 1) return false;

    return score >= this.current.scoreToAdvance;
  }

  public advance(): void {
    this.index += 1;
  }
}

export default LevelManager;
