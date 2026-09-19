import autoBind from 'auto-bind';
import { clamp } from 'lodash';
import * as PIXI from 'pixi.js';
import  Character from 'src/core/Character';
import AssetsManager from 'src/managers/AssetsManager';
import InputManager from 'src/managers/InputManager';
import SettingsManager from 'src/managers/SettingsManager';
import getRelativeSize from 'src/utils/getRelativeSize';

export type PlayerBehavior =
    'idle' |
    'run_down' |
    'run_left' |
    'run_right' |
    'run_up' |
    'slice_down' |
    'slice_left' |
    'slice_right' |
    'slice_up'

const ANIMATION_SPEED = 0.15;

class Player extends Character {
  public readonly body: PIXI.AnimatedSprite;
  private readonly sheet: PIXI.Spritesheet;

  private playerBehavior: PlayerBehavior = 'idle';

  constructor(...args: ConstructorParameters<typeof Character>) {
    super(...args);

    const [{ screen }] = args;
    const size = getRelativeSize(screen, SettingsManager.instance.playerSizeRatio);

    this.sheet = AssetsManager.getSpritesheet('TEXTURE_PLAYER');
    this.body = new PIXI.AnimatedSprite(this.sheet.animations.idle);
    this.body.animationSpeed = ANIMATION_SPEED;
    this.body.play();
    this.body.width = size;
    this.body.height = size;
    this.body.anchor.set(0.5);
    this.body.x = screen.width / 2;
    this.body.y = screen.height - size;

    autoBind(this);
  }

  public update(deltaSeconds: number, input: InputManager): void {
    super.update(deltaSeconds, input);
    
    let expectedAnimation: PlayerBehavior;
    if(this.directionX < 0) expectedAnimation = 'run_left';
    else if(this.directionX > 0) expectedAnimation = 'run_right';
    else expectedAnimation = 'run_up';
        
    if (expectedAnimation === this.playerBehavior) return;
    this.playerBehavior = expectedAnimation;
    this.playAnimation(expectedAnimation);
  }

  public playAnimation(behavior: PlayerBehavior): void {
    this.body.textures = this.sheet.animations[behavior];
    this.body.play();
  }

  public resize(screen: PIXI.Rectangle): void {
    const size = getRelativeSize(screen, SettingsManager.instance.playerSizeRatio);

    this.body.width = size;
    this.body.height = size;
    this.body.x = clamp(this.body.x, size / 2, screen.width - size / 2);
    this.body.y = screen.height - size;
  }
}

export default Player;