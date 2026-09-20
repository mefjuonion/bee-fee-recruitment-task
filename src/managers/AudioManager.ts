import autoBind from 'auto-bind';
import { Howl, Howler } from 'howler';
import * as PIXI from 'pixi.js';
import { GameEvents } from 'src/core/events';
import AssetsManager, { Sound } from 'src/managers/AssetsManager';
import SETTINGS from 'src/SETTINGS';

class AudioManager {
  private readonly soundLibrary: Record<Sound, Howl> = {
    SOUND_EATING: new Howl({
      src: [AssetsManager.getAudioUrl('SOUND_EATING')],
      format: ['mp3'],
    }),
    SOUND_FORREST: new Howl({
      src: [AssetsManager.getAudioUrl('SOUND_FORREST')],
      format: ['mp3'],
      loop: true,
      volume: SETTINGS.backgroundMusicVolume,
    }),
    SOUND_ERROR: new Howl({
      src: [AssetsManager.getAudioUrl('SOUND_ERROR')],
      format: ['mp3'],
    })
  };

  constructor(private readonly events: PIXI.EventEmitter<GameEvents>) {
    autoBind(this);

    this.registerEventListeners();
    this.soundLibrary.SOUND_FORREST.play();
  }

  private handleScoreChanged(): void {
    this.soundLibrary.SOUND_EATING.play();
  }

  private handleGameOver(): void {
    this.soundLibrary.SOUND_FORREST.stop();
  }

  private handleLivesChanged(): void {
    this.soundLibrary.SOUND_ERROR.play();
  }

  private handleWindowFocusChanged(isFocused: boolean): void {
    Howler.mute(!isFocused);
  }

  private registerEventListeners(): void {
    this.events.on('scoreChanged', this.handleScoreChanged);
    this.events.on('gameOver', this.handleGameOver);
    this.events.on('livesChanged', this.handleLivesChanged);
    this.events.on('windowFocusChanged', this.handleWindowFocusChanged);
  }
}

export default AudioManager;
