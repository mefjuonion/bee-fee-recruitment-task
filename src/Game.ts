import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import { GameEvents, ScoreChange } from 'src/core/events';
import AssetsManager from 'src/managers/AssetsManager';
import AudioManager from 'src/managers/AudioManager';
import FallingRewardsManager from 'src/managers/FallingRewardsManager';
import FocusManager from 'src/managers/FocusManager';
import InputManager from 'src/managers/InputManager';
import LevelManager from 'src/managers/LevelManager';
import UIManager from 'src/managers/UIManager';
import Background from 'src/prefabs/Background';
import DamageFlash from 'src/prefabs/DamageFlash';
import Player from 'src/prefabs/Player';
import ScoreLossZone from 'src/prefabs/ScoreLossZone';

export default class Game {
  private readonly events = new PIXI.EventEmitter<GameEvents>();
  private readonly input = new InputManager();
  private readonly focus = new FocusManager(this.events);
  private readonly levels = new LevelManager();
  private readonly damageFlash = new DamageFlash();
  private readonly background: Background;
  private readonly player: Player;
  private readonly scoreLossZone: ScoreLossZone;
  private readonly items: FallingRewardsManager;

  private isGameOver = false;
  private isPaused = false;
  private isFocused = true;

  constructor(private readonly app: PIXI.Application) {
    autoBind(this);

    this.player = new Player({
      events: this.events,
      screen: this.app.screen,
      speed: this.levels.current.playerSpeed,
      startingScore: this.levels.current.startingScore,
    });

    this.background = new Background(this.app.screen, this.levels.current.backgroundTexture);
    this.scoreLossZone = new ScoreLossZone(this.app.screen);
    this.items = new FallingRewardsManager(this.app, this.player, this.scoreLossZone);
    this.items.spawnInterval = this.levels.current.spawnFoodInterval;

    this.app.stage.addChild(this.background.body, this.scoreLossZone.body, this.player.body);
    this.app.stage.filters = [this.damageFlash.filter];

    this.registerEvents();

    this.app.ticker.add(this.update);
    this.app.renderer.on('resize', this.handleResize);
  }

  private handleScoreChanged(change: ScoreChange): void {
    if (change.current < change.previous) {
      this.damageFlash.trigger();
    }

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

    this.player.speed = this.levels.current.playerSpeed;
    this.items.spawnInterval = this.levels.current.spawnFoodInterval;
    this.background.transitionTo(this.levels.current.backgroundTexture);
    this.isPaused = false;
    this.events.emit('levelChanged', this.levels.current.name);
  }

  private handleResize(): void {
    this.background.resize(this.app.screen);
    this.scoreLossZone.resize(this.app.screen);
    this.player.resize(this.app.screen);
  }

  private handleWindowFocusChanged(isFocused: boolean): void {
    this.isFocused = isFocused;
  }

  private readonly update = (ticker: PIXI.Ticker): void => {
    const isReady = AssetsManager.progress >= 1;

    if (this.isGameOver || this.isPaused || !this.isFocused || !isReady) return;

    const deltaSeconds = ticker.deltaMS / 1000;

    this.background.update(deltaSeconds);
    this.player.update(deltaSeconds, this.input);
    this.items.update(deltaSeconds);
    this.damageFlash.update(deltaSeconds);
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
