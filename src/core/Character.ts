import  AutoBind  from 'auto-bind';
import { clamp } from 'lodash';
import * as PIXI from 'pixi.js';
import Entity from 'src/core/Entity';
import { GameEvents } from 'src/core/events';
import InputManager from 'src/managers/InputManager';
import getDirectionFromKeyboard from 'src/utils/getDirectionFromKeyboard';
import intersects from 'src/utils/intersects';

export interface CharacterArgs {
    events: PIXI.EventEmitter<GameEvents>;
    screen: PIXI.Rectangle;
    speed: number;
    startingScore: number;
}

export default abstract class Character extends Entity {
  private _score: number;
  private _speed: number;
  protected directionX = 0;

  constructor(
    private readonly characterArgs: CharacterArgs,
    public readonly body: PIXI.Sprite
  ) {
    super();
    this._speed = characterArgs.speed;
    this._score = characterArgs.startingScore;
    AutoBind(this);
  }

  public get score(): number {
    return this._score;
  }

  public set score(value: number) {
    const previousScore = this._score;

    this._score = clamp(value, 0, Infinity);
    this.characterArgs.events.emit('scoreChanged', { previous: previousScore, current: this._score });

    if (!this.isAlive()) {
      this.characterArgs.events.emit('gameOver');
    }
  }

  public set speed(value: number) {
    this._speed = value;
  }

  public update(deltaSeconds: number, input: InputManager): void {
    this.directionX = getDirectionFromKeyboard(input).x;

    this.move(deltaSeconds);
  }

  public move(deltaSeconds: number): void {
    const nextX = this.body.x + this.directionX * this._speed * deltaSeconds;

    const halfSize = this.body.width / 2;
    const { width } = this.characterArgs.screen;

    this.body.x = clamp(nextX, halfSize, width - halfSize);
  }

  public checkCollision(item: Entity, scoreValue: number): boolean {
    if (!intersects(this, item)) {
      return false;
    }

    this.score += scoreValue;
    return true;
  }

  public isAlive(): boolean {
    return this._score > 0;
  }
}
