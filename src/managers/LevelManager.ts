import Level from 'src/core/Level';
import LEVELS from 'src/LEVELS';

class LevelManager {
  private index = 0;

  public get current(): Level {
    return LEVELS[this.index];
  }

  public get isLastLevel(): boolean {
    return this.index >= LEVELS.length - 1;
  }

  public advance(): void {
    this.index += 1;
  }
}

export default LevelManager;
