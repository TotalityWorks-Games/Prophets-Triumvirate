import {
  Actor,
  Animation,
  Collider,
  CollisionContact,
  CollisionType,
  Engine,
  ImageSource,
  Side,
  Sprite,
  SpriteSheet,
  vec,
  Vector,
} from 'excalibur';
import { Direction } from '../../constants';

export class Pig extends Actor {
  direction: Direction;
  resources: { Animal3SpriteSheetPng: ImageSource };
  constructor(pos: Vector, resources: { Animal3SpriteSheetPng: ImageSource }) {
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
    this.addAnimations();
    // spawn at start point

    this.actions.repeat((ctx) => {
      ctx
        .moveTo(2450, 500, 25)
        // .delay(1000)
        .moveTo(2450, 550, 25)
        // .delay(1000)
        .moveTo(2350, 550, 25)
        // .delay(1000)
        .moveTo(2350, 500, 25)
        // .delay(1000)
        .moveTo(2450, 500, 25);
      // .delay(1000);
    }, 70);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.vel = Vector.Zero;
    this.graphics.use(`${this.direction}-idle`);
  }

  addAnimations() {
    const animalSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.Animal3SpriteSheetPng as ImageSource,
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

  public shake() {
    // This movement was not supposed to happen, but when I found it I couldn't not use it.
    // clear existing queue
    this.actions.clearActions();

    // repeat shaking motion
    this.actions.repeatForever((ctx) => {
      ctx
        .moveBy(vec(2450, 530), 700000)
        // .delay(3000)
        .moveBy(vec(2450, 500), 360000);
      // .delay(3000);
    });
  }
}
