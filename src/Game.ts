import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import { GameEvents } from 'src/core/events';
import InputManager from 'src/managers/InputManager';
import ScoreItemsManager from 'src/managers/ScoreItemsManager';
import LevelManager from 'src/managers/LevelManager';
import SoundManager from 'src/managers/SoundManager';
import UIManager from 'src/managers/UIManager';
import Background from 'src/prefabs/Background';
import Floor from 'src/prefabs/Floor';
import Player from 'src/prefabs/Player';

export default class Game {
  private readonly events = new PIXI.EventEmitter<GameEvents>();
  private readonly input = new InputManager();
  private readonly levels = new LevelManager();
  private readonly background: Background;
  private readonly player: Player;
  private readonly floor: Floor;
  private readonly items: ScoreItemsManager;

  private isGameOver = false;
  private isPaused = false;

  constructor(private readonly app: PIXI.Application) {
    autoBind(this);

    this.player = new Player({
      events: this.events,
      screen: this.app.screen,
      speed: this.levels.current.playerSpeed,
      maxLives: this.levels.current.maxLives,
    });

    this.background = new Background(this.app.screen);
    this.floor = new Floor(this.app.screen);
    this.items = new ScoreItemsManager(this.app, this.player, this.floor);
    this.items.setSpawnInterval(this.levels.current.spawnFoodInterval);

    this.app.stage.addChild(this.background.body, this.floor.body, this.player.body);

    this.registerEvents();

    this.app.ticker.add(this.update);
    this.app.renderer.on('resize', this.handleResize);
  }

  private handleScoreChanged(score: number): void {
    if (this.isPaused || !this.levels.hasNextLevel(score)) return;

    this.isPaused = true;
    this.events.emit('levelComplete', this.levels.current.name);
  }

  private handleContinueLevel(): void {
    this.levels.advance();

    this.player.setSpeed(this.levels.current.playerSpeed);
    this.items.setSpawnInterval(this.levels.current.spawnFoodInterval);
    this.isPaused = false;
    this.events.emit('levelChanged', this.levels.current.name);
  }

  private handleResize(): void {
    this.background.resize(this.app.screen);
    this.floor.resize(this.app.screen);
    this.player.resize(this.app.screen);
  }

  private readonly update = (ticker: PIXI.Ticker): void => {
    if (this.isGameOver || this.isPaused) return;

    const deltaSeconds = ticker.deltaMS / 1000;

    this.background.update(deltaSeconds);
    this.player.update(deltaSeconds, this.input);
    this.items.update(deltaSeconds);
  };

  private registerEvents(): void {
    this.events.on('gameOver', this.endGame);
    this.events.on('scoreChanged', this.handleScoreChanged);
    this.events.on('continueLevel', this.handleContinueLevel);
    new UIManager(this.events);
    new SoundManager(this.events);
  }

  private endGame(): void {
    this.isGameOver = true;
    this.app.ticker.remove(this.update);
    this.input.destroy();
  }
}
