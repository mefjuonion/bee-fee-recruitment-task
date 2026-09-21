import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import { GameEvents, ScoreChange } from 'src/core/events';
import { Scene } from 'src/core/Scene';
import AssetsManager from 'src/managers/AssetsManager';
import AudioManager from 'src/managers/AudioManager';
import FocusManager from 'src/managers/FocusManager';
import InputManager from 'src/managers/InputManager';
import LevelManager from 'src/managers/LevelManager';
import UIManager from 'src/managers/UIManager';
import MainScene from 'src/scenes/MainScene';

export default class Game {
  private readonly events = new PIXI.EventEmitter<GameEvents>();
  private readonly input = new InputManager();
  private readonly focus = new FocusManager(this.events);
  private readonly levels = new LevelManager();
  private readonly scene: Scene;

  private isGameOver = false;
  private isPaused = false;
  private isFocused = true;

  constructor(private readonly app: PIXI.Application) {
    autoBind(this);

    this.scene = new MainScene(this.app, this.events, this.levels.current);

    this.registerEvents();

    this.app.ticker.add(this.update);
    this.app.renderer.on('resize', this.handleResize);
  }

  private handleScoreChanged(change: ScoreChange): void {
    if (this.isPaused || change.current < this.levels.current.scoreToAdvance) return;

    this.isPaused = true;

    if (this.levels.isLastLevel) {
      this.events.emit('gameWon', change.current);
    } else {
      this.events.emit('levelComplete', this.levels.current.name);
    }
  }

  private handleContinueLevel(): void {
    this.levels.advance();

    this.scene.setLevel(this.levels.current);
    this.isPaused = false;
    this.events.emit('levelChanged', this.levels.current.name);
  }

  private handleResize(): void {
    this.scene.resize(this.app.screen);
  }

  private handleWindowFocusChanged(isFocused: boolean): void {
    this.isFocused = isFocused;
  }

  private readonly update = (ticker: PIXI.Ticker): void => {
    const isReady = AssetsManager.progress >= 1;

    if (this.isGameOver || this.isPaused || !this.isFocused || !isReady) return;

    const deltaSeconds = ticker.deltaMS / 1000;

    this.scene.update(deltaSeconds, this.input);
  };

  private registerEvents(): void {
    this.events.on('gameOver', this.endGame);
    this.events.on('gameWon', this.endGame);
    this.events.on('scoreChanged', this.handleScoreChanged);
    this.events.on('continueLevel', this.handleContinueLevel);
    this.events.on('windowFocusChanged', this.handleWindowFocusChanged);
    new UIManager(this.events);
    new AudioManager(this.events);
  }

  private endGame(): void {
    this.isGameOver = true;
    this.app.ticker.remove(this.update);
    this.input.destroy();
    this.focus.destroy();
  }
}
