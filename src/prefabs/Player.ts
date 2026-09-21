import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import Character, { CharacterArgs } from 'src/core/Character';
import { DirectionProvider } from 'src/core/DirectionProvider';
import { Resizable } from 'src/core/Resizable';
import AssetsManager from 'src/managers/AssetsManager';
import SETTINGS from 'src/SETTINGS';
import ScreenUtils from 'src/utils/ScreenUtils';

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

class Player extends Character implements Resizable {
  declare public readonly body: PIXI.AnimatedSprite;
  private readonly sheet: PIXI.Spritesheet;

  private playerBehavior: PlayerBehavior = 'idle';
  private screen: PIXI.Rectangle;

  constructor(args: CharacterArgs) {
    const { screen } = args;
    const size = ScreenUtils.getRelativeSize(screen, SETTINGS.playerSizeRatio);
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
    this.screen = screen.clone();

    autoBind(this);
  }

  public update(deltaSeconds: number, input: DirectionProvider): void {
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
    const size = ScreenUtils.getRelativeSize(screen, SETTINGS.playerSizeRatio);
    const position = ScreenUtils.getRelativePosition({
      position: { x: this.body.x, y: this.body.y },
      previousScreen: this.screen,
      nextScreen: screen,
      elementSize: size,
    });

    this.body.width = size;
    this.body.height = size;
    this.body.x = position.x;
    this.body.y = screen.height - size;

    this.screen = screen.clone();
  }
}

export default Player;