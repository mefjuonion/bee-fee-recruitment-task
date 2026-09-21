import { DirectionProvider } from 'src/core/DirectionProvider';
import Level from 'src/core/Level';
import { Resizable } from 'src/core/Resizable';

export interface Scene extends Resizable {
  update(deltaSeconds: number, input: DirectionProvider): void;
  setLevel(level: Level): void;
}
