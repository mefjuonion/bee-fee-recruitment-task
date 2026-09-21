import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import { DirectionProvider } from 'src/core/DirectionProvider';
import { GameEvents, ScoreChange } from 'src/core/events';
import Level from 'src/core/Level';
import { Scene } from 'src/core/Scene';
import FallingRewardsManager from 'src/managers/FallingRewardsManager';
import Background from 'src/prefabs/Background';
import DamageFlash from 'src/prefabs/DamageFlash';
import Player from 'src/prefabs/Player';
import ScoreLossZone from 'src/prefabs/ScoreLossZone';

export default class MainScene implements Scene {
  private readonly player: Player;
  private readonly background: Background;
  private readonly scoreLossZone: ScoreLossZone;
  private readonly fallingRewards: FallingRewardsManager;
  private readonly damageFlash: DamageFlash;

  constructor(app: PIXI.Application, events: PIXI.EventEmitter<GameEvents>, level: Level) {
    autoBind(this);

    this.player = new Player({
      events,
      screen: app.screen,
      speed: level.playerSpeed,
      startingScore: level.startingScore,
    });

    this.background = new Background(app.screen, level.backgroundTexture);
    this.scoreLossZone = new ScoreLossZone(app.screen);
    this.fallingRewards = new FallingRewardsManager(app, this.player, this.scoreLossZone);
    this.fallingRewards.spawnInterval = level.spawnFoodInterval;
    this.damageFlash = new DamageFlash();

    app.stage.addChild(this.background.body, this.scoreLossZone.body, this.player.body);
    app.stage.filters = [this.damageFlash.filter];

    events.on('scoreChanged', this.handleScoreChanged);
  }

  public setLevel(level: Level): void {
    this.player.speed = level.playerSpeed;
    this.fallingRewards.spawnInterval = level.spawnFoodInterval;
    this.background.transitionTo(level.backgroundTexture);
  }

  public update(deltaSeconds: number, input: DirectionProvider): void {
    this.background.update(deltaSeconds);
    this.player.update(deltaSeconds, input);
    this.fallingRewards.update(deltaSeconds);
    this.damageFlash.update(deltaSeconds);
  }

  public resize(screen: PIXI.Rectangle): void {
    this.background.resize(screen);
    this.scoreLossZone.resize(screen);
    this.player.resize(screen);
    this.fallingRewards.resize(screen);
  }

  private handleScoreChanged(change: ScoreChange): void {
    if (change.current < change.previous) {
      this.damageFlash.trigger();
    }
  }
}
