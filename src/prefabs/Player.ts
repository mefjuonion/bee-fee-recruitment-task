import autoBind from 'auto-bind';
import { clamp } from 'lodash';
import * as PIXI from 'pixi.js';
import Character, { CharacterArgs } from 'src/core/Character';
import AssetsManager from 'src/managers/AssetsManager';
import InputManager from 'src/managers/InputManager';
import SETTINGS from 'src/SETTINGS';
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

class Player extends Character {
  declare public readonly body: PIXI.AnimatedSprite;
  private readonly sheet: PIXI.Spritesheet;

  private playerBehavior: PlayerBehavior = 'idle';

  constructor(args: CharacterArgs) {
    const { screen } = args;
    const size = getRelativeSize(screen, SETTINGS.playerSizeRatio);
    const sheet = AssetsManager.getSpritesheet('TEXTURE_PLAYER');

    const body = new PIXI.AnimatedSprite(sheet.animations.idle);
    body.animationSpeed = SETTINGS.playerAnimationSpeed;
    body.play();
    body.width = size;
    body.height = size;
    body.anchor.set(0.5);
    body.x = screen.width / 2;
    body.y = screen.height - size;

    super(args, body);

    this.sheet = sheet;

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
    const size = getRelativeSize(screen, SETTINGS.playerSizeRatio);

    this.body.width = size;
    this.body.height = size;
    this.body.x = clamp(this.body.x, size / 2, screen.width - size / 2);
    this.body.y = screen.height - size;
  }
}

export default Player;