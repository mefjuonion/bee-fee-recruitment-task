import Level from 'src/core/Level';

class LevelManager {
  private index = 0;

  constructor(private levels: Level[]) {}

  public get current(): Level {
    return this.levels[this.index];
  }

  public get isLastLevel(): boolean {
    return this.index >= this.levels.length - 1;
  }

  public advance(): void {
    this.index += 1;
  }
}

export default LevelManager;
