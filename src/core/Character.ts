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
    startingScore: number;
}

export default abstract class Character extends Entity<PIXI.Sprite> {
  private score: number;
  private speed: number;
  protected directionX = 0;

  constructor(
    private readonly characterArgs: CharacterArgs,
    public readonly body: PIXI.Sprite
  ) {
    super();
    this.speed = characterArgs.speed;
    this.score = characterArgs.startingScore;
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

  public checkCollision(item: Entity<PIXI.Container>, scoreValue: number): boolean {
    if (!this.intersects(item)) {
      return false;
    }

    this.addScore(scoreValue);
    return true;
  }

  public loseScore(): void {
    this.addScore(-1);

    if (!this.isAlive()) {
      this.characterArgs.events.emit('gameOver');
    }
  }

  public isAlive(): boolean {
    return this.score > 0;
  }

  private addScore(amount: number): void {
    const previousScore = this.score;

    this.score = clamp(this.score + amount, 0, Infinity);
    this.characterArgs.events.emit('scoreChanged', { previous: previousScore, current: this.score });
  }
}
