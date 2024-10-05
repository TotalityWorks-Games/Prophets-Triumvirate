import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  Sprite,
  SpriteSheet,
  Vector,
} from 'excalibur';
import {
  DIRECTION_DOWN,
  DIRECTION_UP,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
} from '../../constants';

type Direction =
  | typeof DIRECTION_DOWN
  | typeof DIRECTION_UP
  | typeof DIRECTION_LEFT
  | typeof DIRECTION_RIGHT;

export class Guard extends Actor {
  direction: Direction;
  spriteSheet: SpriteSheet;
  constructor(pos: Vector, spriteSheet: SpriteSheet, direction?: Direction) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Fixed,
    });

    this.z = 100;
    this.scale = new Vector(2, 2);
    this.direction = direction ?? 'down';
    this.spriteSheet = spriteSheet;
  }

  onInitialize(_engine: Engine): void {
    const downIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 0), // downIdle is
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 1) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 2) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(1, 7) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);

    const rightWalk = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(0, 6) as Sprite,
          duration: 150,
        },
        {
          graphic: this.spriteSheet.getSprite(1, 6) as Sprite,
          duration: 150,
        },
        {
          graphic: this.spriteSheet.getSprite(2, 6) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-walk', rightWalk);

    const leftWalk = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(0, 5) as Sprite,
          duration: 150,
        },
        {
          graphic: this.spriteSheet.getSprite(1, 5) as Sprite,
          duration: 150,
        },
        {
          graphic: this.spriteSheet.getSprite(2, 5) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-walk', leftWalk);

    const upWalk = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(0, 7) as Sprite,
          duration: 150,
        },
        {
          graphic: this.spriteSheet.getSprite(1, 7) as Sprite,
          duration: 150,
        },
        {
          graphic: this.spriteSheet.getSprite(2, 7) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-walk', upWalk);

    const downWalk = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(0, 4) as Sprite,
          duration: 150,
        },
        {
          graphic: this.spriteSheet.getSprite(1, 4) as Sprite,
          duration: 150,
        },
        {
          graphic: this.spriteSheet.getSprite(2, 4) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-walk', downWalk);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.graphics.use(`${this.direction}-idle`);
  }
}
