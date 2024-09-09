import {
  Actor,
  Vector,
  CollisionType,
  Engine,
  SpriteSheet,
  ImageSource,
  Animation,
  Sprite,
  Keys,
  vec,
} from 'excalibur';
import { Resources } from './resources';
import { Config } from './config';

export class Player extends Actor {
  constructor(pos: Vector) {
    super({
      pos: vec(1150, 1550),
      width: 100,
      height: 100,
      // collisionType: CollisionType.Active,
    });
  }

  onInitialize(engine: Engine): void {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.HeroSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 32,
        spriteHeight: 32,
        rows: 4,
        columns: 12,
      },
    });

    // const leftIdle = new Animation({
    //   frames: [
    //     {
    //       graphic: playerSpriteSheet.getSprite(0, 1) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(2, 1) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(3, 1) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //   ],
    // });
    // this.graphics.add('left-idle', leftIdle);

    // const rightIdle = new Animation({
    //   frames: [
    //     {
    //       graphic: playerSpriteSheet.getSprite(0, 2) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(2, 2) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(3, 2) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //   ],
    // });
    // this.graphics.add('right-idle', rightIdle);

    // const upIdle = new Animation({
    //   frames: [
    //     {
    //       graphic: playerSpriteSheet.getSprite(0, 3) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(2, 3) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(3, 3) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //   ],
    // });
    // this.graphics.add('up-idle', upIdle);

    const downIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add(downIdle);

    // const leftWalk = new Animation({
    //   frames: [
    //     {
    //       graphic: playerSpriteSheet.getSprite(0, 5) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(1, 5) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(2, 5) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(3, 5) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //   ],
    // });
    // this.graphics.add(leftWalk);

    // const rightWalk = new Animation({
    //   frames: [
    //     {
    //       graphic: playerSpriteSheet.getSprite(0, 6) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(1, 6) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(2, 6) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(3, 6) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //   ],
    // });
    // this.graphics.add(rightWalk);

    // const upWalk = new Animation({
    //   frames: [
    //     {
    //       graphic: playerSpriteSheet.getSprite(0, 7) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(1, 7) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(2, 7) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(3, 7) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //   ],
    // });
    // this.graphics.add(upWalk);

    // const downWalk = new Animation({
    //   frames: [
    //     {
    //       graphic: playerSpriteSheet.getSprite(0, 4) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(1, 4) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(2, 4) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //     {
    //       graphic: playerSpriteSheet.getSprite(3, 4) as Sprite,
    //       duration: Config.PlayerFrameSpeed,
    //     },
    //   ],
    // });
    // this.graphics.add(downWalk);
  }

  // onPreUpdate(engine: Engine, _elapsedMs: number): void {
  //   this.vel = Vector.Zero;

  //   this.graphics.use('down-idle');
  //   if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
  //     this.vel = vec(Config.PlayerSpeed, 0);
  //     this.graphics.use('right-walk');
  //   }
  //   if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
  //     this.vel = vec(-Config.PlayerSpeed, 0);
  //     this.graphics.use('left-walk');
  //   }
  //   if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
  //     this.vel = vec(0, -Config.PlayerSpeed);
  //     this.graphics.use('up-walk');
  //   }
  //   if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
  //     this.vel = vec(0, Config.PlayerSpeed);
  //     this.graphics.use('down-walk');
  //   }
  // }
}
