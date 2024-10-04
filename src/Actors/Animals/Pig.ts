import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  ImageSource,
  Sprite,
  SpriteSheet,
  vec,
  Vector,
} from 'excalibur';
import {
  DIRECTION_DOWN,
  DIRECTION_UP,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
} from '../../constants';
import { IronclawPortResources } from '../../Scenes/IronclawPort';

export class Pig extends Actor {
  direction:
    | typeof DIRECTION_DOWN
    | typeof DIRECTION_UP
    | typeof DIRECTION_LEFT
    | typeof DIRECTION_RIGHT;
  constructor(pos: Vector) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Active,
    });

    this.z = 100;
    this.scale = new Vector(2, 2);
    this.direction = 'down';
  }

  onInitialize(_engine: Engine): void {
    const animalSpriteSheet = SpriteSheet.fromImageSource({
      image: IronclawPortResources.Animal3SpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 42,
        spriteHeight: 38,
        rows: 8,
        columns: 12,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: animalSpriteSheet.getSprite(1, 4), // downIdle is 1,4
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: animalSpriteSheet.getSprite(1, 5) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: animalSpriteSheet.getSprite(1, 6) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: animalSpriteSheet.getSprite(1, 7) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);

    const rightWalk = new Animation({
      frames: [
        {
          graphic: animalSpriteSheet.getSprite(0, 6) as Sprite,
          duration: 150,
        },
        {
          graphic: animalSpriteSheet.getSprite(1, 6) as Sprite,
          duration: 150,
        },
        {
          graphic: animalSpriteSheet.getSprite(2, 6) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-walk', rightWalk);

    const leftWalk = new Animation({
      frames: [
        {
          graphic: animalSpriteSheet.getSprite(0, 5) as Sprite,
          duration: 150,
        },
        {
          graphic: animalSpriteSheet.getSprite(1, 5) as Sprite,
          duration: 150,
        },
        {
          graphic: animalSpriteSheet.getSprite(2, 5) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-walk', leftWalk);

    const upWalk = new Animation({
      frames: [
        {
          graphic: animalSpriteSheet.getSprite(0, 7) as Sprite,
          duration: 150,
        },
        {
          graphic: animalSpriteSheet.getSprite(1, 7) as Sprite,
          duration: 150,
        },
        {
          graphic: animalSpriteSheet.getSprite(2, 7) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-walk', upWalk);

    const downWalk = new Animation({
      frames: [
        {
          graphic: animalSpriteSheet.getSprite(0, 4) as Sprite,
          duration: 150,
        },
        {
          graphic: animalSpriteSheet.getSprite(1, 4) as Sprite,
          duration: 150,
        },
        {
          graphic: animalSpriteSheet.getSprite(2, 4) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-walk', downWalk);
  }

  walkRight() {
    this.vel = vec(Math.floor(Math.random() * 250), 0);
    this.graphics.use('right-walk');
    this.direction = 'right';
  }

  walkLeft() {
    this.vel = vec(-Math.floor(Math.random() * 250), 0);
    this.graphics.use('left-walk');
    this.direction = 'left';
  }

  walkUp() {
    this.vel = vec(0, -Math.floor(Math.random() * 250));
    this.graphics.use('up-walk');
    this.direction = 'up';
  }

  walkDown() {
    this.vel = vec(0, Math.floor(Math.random() * 250));
    this.graphics.use('down-walk');
    this.direction = 'down';
  }

  walkRandom() {
    const dir = Math.floor(Math.random() * 4);
    switch (dir) {
      case 0:
        this.walkUp();
        break;
      case 1:
        this.walkLeft();
        break;
      case 2:
        this.walkRight();
        break;
      case 3:
        this.walkDown();
        break;
      default:
        break;
    }
  }

  onPreUpdate(_engine: Engine, delta: number): void {
    this.vel = Vector.Zero;
    if (delta > 50) {
      // walk
      this.walkRandom();
    }
    this.graphics.use(`${this.direction}-idle`);
  }
}
