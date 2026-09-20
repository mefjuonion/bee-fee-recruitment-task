import  AutoBind  from 'auto-bind';
import { clamp } from 'lodash';
import * as PIXI from 'pixi.js';
import Entity from 'src/core/Entity';
import { GameEvents } from 'src/core/events';
import InputManager from 'src/managers/InputManager';
import getDirectionFromKeyboard from 'src/utils/getDirectionFromKeyboard';

export interface CharacterArgs {
    events: PIXI.EventEmitter<GameEvents>;
    screen: PIXI.Rectangle;
    speed: number;
    maxLives: number;
}

export default abstract class Character extends Entity<PIXI.Sprite> {
  private _score = 0;
  private _lives: number;
  private speed: number;
  protected directionX = 0;

  constructor(
    private readonly characterArgs: CharacterArgs,
    public readonly body: PIXI.Sprite
  ) {
    super();
    this._lives = characterArgs.maxLives;
    this.speed = characterArgs.speed;
    AutoBind(this);
  }

  public update(deltaSeconds: number, input: InputManager): void {
    this.directionX = getDirectionFromKeyboard(input).x;

    this.move(deltaSeconds);
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  public move(deltaSeconds: number): void {
    const nextX = this.body.x + this.directionX * this.speed * deltaSeconds;

    const halfSize = this.body.width / 2;
    const { width } = this.characterArgs.screen;

    this.body.x = clamp(nextX, halfSize, width - halfSize);
  }

  public checkCollision(item: Entity<PIXI.Container>, score: number): boolean {
    if (!this.intersects(item)) {
      return false;
    }

    this.addScore(score);
    return true;
  }

  public loseLife(): void {
    this._lives = Math.max(0, this._lives - 1);
    this.characterArgs.events.emit('livesChanged', this._lives);

    if (this._lives === 0) {
      this.characterArgs.events.emit('gameOver', this._score);
    }
  }

  public score(): number {
    return this._score;
  }

  public lives(): number {
    return this._lives;
  }

  public isAlive(): boolean {
    return this._lives > 0;
  }

  private addScore(points: number): void {
    this._score += points;
    this.characterArgs.events.emit('scoreChanged', this._score);
  }
}
