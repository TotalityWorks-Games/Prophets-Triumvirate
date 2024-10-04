import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  ImageSource,
  Keys,
  Sprite,
  SpriteSheet,
  vec,
  Vector,
} from 'excalibur';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '../constants';
import { Config } from '../config';
import { IronclawPortResources } from '../Scenes/IronclawPort';

export class MainGuy extends Actor {
  direction:
    | typeof DIRECTION_DOWN
    | typeof DIRECTION_UP
    | typeof DIRECTION_LEFT
    | typeof DIRECTION_RIGHT;
  resources: { HeroSpriteSheetPng: ImageSource };
  constructor(pos: Vector, resources: { HeroSpriteSheetPng: ImageSource }) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Active,
    });

    this.z = 100;
    this.scale = new Vector(2, 2);
    this.direction = 'down';
    this.resources = resources;
  }

  onInitialize(_engine: Engine): void {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.HeroSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 32,
        spriteHeight: 32,
        rows: 6,
        columns: 6,
      },
    });

    const leftSprites = playerSpriteSheet.clone();
    leftSprites.getSprite(0, 4).flipHorizontal = true;
    leftSprites.getSprite(1, 4).flipHorizontal = true;
    leftSprites.getSprite(2, 4).flipHorizontal = true;
    leftSprites.getSprite(3, 4).flipHorizontal = true;
    leftSprites.getSprite(4, 4).flipHorizontal = true;
    leftSprites.getSprite(5, 4).flipHorizontal = true;

    const downIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 0),
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: leftSprites.getSprite(2, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(2, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(2, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);

    const rightWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(3, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(4, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(5, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('right-walk', rightWalk);

    const leftWalk = new Animation({
      frames: [
        {
          graphic: leftSprites.getSprite(0, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(1, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(2, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(3, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(4, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(5, 4) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('left-walk', leftWalk);

    const upWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 5) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 5) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 5) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(3, 5) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(4, 5) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(5, 5) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('up-walk', upWalk);

    const downWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(4, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },

        {
          graphic: playerSpriteSheet.getSprite(5, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('down-walk', downWalk);

    const rightRun = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(3, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(4, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(5, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('right-run', rightRun);

    const leftRun = new Animation({
      frames: [
        {
          graphic: leftSprites.getSprite(0, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(1, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(2, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(3, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(4, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: leftSprites.getSprite(5, 4) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('left-run', leftRun);

    const upRun = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 5) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 5) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 5) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(3, 5) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(4, 5) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(5, 5) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('up-run', upRun);

    const downRun = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(4, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },

        {
          graphic: playerSpriteSheet.getSprite(5, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('down-run', downRun);
  }

  onPreUpdate(engine: Engine, _elapsedMs: number): void {
    this.vel = Vector.Zero;

    this.graphics.use(`${this.direction}-idle`);
    // running
    if (engine.input.keyboard.isHeld(Keys.ShiftLeft)) {
      if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
        this.vel = vec(Config.PlayerRunningSpeed, 0);
        this.graphics.use('right-run');
        this.direction = 'right';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
        this.vel = vec(-Config.PlayerRunningSpeed, 0);
        this.graphics.use('left-run');
        this.direction = 'left';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
        this.vel = vec(0, -Config.PlayerRunningSpeed);
        this.graphics.use('up-run');
        this.direction = 'up';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
        this.vel = vec(0, Config.PlayerRunningSpeed);
        this.graphics.use('down-run');
        this.direction = 'down';
      }
    } else {
      // walking
      if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
        this.vel = vec(Config.PlayerSpeed, 0);
        this.graphics.use('right-walk');
        this.direction = 'right';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
        this.vel = vec(-Config.PlayerSpeed, 0);
        this.graphics.use('left-walk');
        this.direction = 'left';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
        this.vel = vec(0, -Config.PlayerSpeed);
        this.graphics.use('up-walk');
        this.direction = 'up';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
        this.vel = vec(0, Config.PlayerSpeed);
        this.graphics.use('down-walk');
        this.direction = 'down';
      }
    }
  }
}
