import { Vector, SpriteSheet, Engine, Animation, Sprite } from 'excalibur';
import { Citizen } from './Citizen';
import { Direction } from '../../../constants';

export class WolfkinCleric extends Citizen {
  direction: Direction;
  spriteSheet: SpriteSheet;
  constructor(pos: Vector, spriteSheet: SpriteSheet, direction?: Direction) {
    super(pos);
    this.pos = pos;
    this.spriteSheet = spriteSheet;
    this.direction = direction ?? 'down';
  }

  onInitialize(_engine: Engine): void {
    /* wolfkin1 idle column is 4
        walk columns are 3,4,5
        direction rows are down:4; left:5; right:6; up:7; */
    const downIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(4, 4), // downIdle is 4,4
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(4, 5) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(1, 2) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(1, 3) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);

    // const rightWalk = new Animation({
    //   frames: [
    //     {
    //       graphic: this.spriteSheet.getSprite(0, 6) as Sprite,
    //       duration: 150,
    //     },
    //     {
    //       graphic: this.spriteSheet.getSprite(1, 6) as Sprite,
    //       duration: 150,
    //     },
    //     {
    //       graphic: this.spriteSheet.getSprite(2, 6) as Sprite,
    //       duration: 150,
    //     },
    //   ],
    // });
    // this.graphics.add('right-walk', rightWalk);

    // const leftWalk = new Animation({
    //   frames: [
    //     {
    //       graphic: this.spriteSheet.getSprite(0, 5) as Sprite,
    //       duration: 150,
    //     },
    //     {
    //       graphic: this.spriteSheet.getSprite(1, 5) as Sprite,
    //       duration: 150,
    //     },
    //     {
    //       graphic: this.spriteSheet.getSprite(2, 5) as Sprite,
    //       duration: 150,
    //     },
    //   ],
    // });
    // this.graphics.add('left-walk', leftWalk);

    // const upWalk = new Animation({
    //   frames: [
    //     {
    //       graphic: this.spriteSheet.getSprite(0, 7) as Sprite,
    //       duration: 150,
    //     },
    //     {
    //       graphic: this.spriteSheet.getSprite(1, 7) as Sprite,
    //       duration: 150,
    //     },
    //     {
    //       graphic: this.spriteSheet.getSprite(2, 7) as Sprite,
    //       duration: 150,
    //     },
    //   ],
    // });
    // this.graphics.add('up-walk', upWalk);

    // const downWalk = new Animation({
    //   frames: [
    //     {
    //       graphic: this.spriteSheet.getSprite(0, 4) as Sprite,
    //       duration: 150,
    //     },
    //     {
    //       graphic: this.spriteSheet.getSprite(1, 4) as Sprite,
    //       duration: 150,
    //     },
    //     {
    //       graphic: this.spriteSheet.getSprite(2, 4) as Sprite,
    //       duration: 150,
    //     },
    //   ],
    // });
    // this.graphics.add('down-walk', downWalk);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.graphics.use(`${this.direction}-idle`);
  }
}
