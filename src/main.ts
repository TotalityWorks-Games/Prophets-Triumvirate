import './style.css';
import {
  DisplayMode,
  Engine,
  vec,
  Resolution,
  Actor,
  SpriteSheet,
  ImageSource,
  Animation,
  Vector,
  Keys,
  Sprite,
} from 'excalibur';
import { Resources, loader } from './resources';
// import { Player } from './player';
import { Config } from './config';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from './constants';

const game = new Engine({
  width: 600,
  height: 400,
  displayMode: DisplayMode.FitScreenAndFill,
  pixelArt: true,
  pixelRatio: 2,
  resolution: Resolution.SNES,
});

class MainGuy extends Actor {
  direction:
    | typeof DIRECTION_DOWN
    | typeof DIRECTION_UP
    | typeof DIRECTION_LEFT
    | typeof DIRECTION_RIGHT;
  constructor() {
    super({
      pos: vec(2450, 3050),
      width: 32,
      height: 32,
    });

    this.z = 100;
    this.scale = new Vector(2, 2);
    this.direction = 'down';
  }

  onInitialize(_engine: Engine): void {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.HeroSpriteSheetPng as ImageSource,
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
          duration: 200,
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
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 4) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 4) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(3, 4) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(4, 4) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(5, 4) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('right-walk', rightWalk);

    const leftWalk = new Animation({
      frames: [
        {
          graphic: leftSprites.getSprite(0, 4) as Sprite,
          duration: 200,
        },
        {
          graphic: leftSprites.getSprite(1, 4) as Sprite,
          duration: 200,
        },
        {
          graphic: leftSprites.getSprite(2, 4) as Sprite,
          duration: 200,
        },
        {
          graphic: leftSprites.getSprite(3, 4) as Sprite,
          duration: 200,
        },
        {
          graphic: leftSprites.getSprite(4, 4) as Sprite,
          duration: 200,
        },
        {
          graphic: leftSprites.getSprite(5, 4) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('left-walk', leftWalk);

    const upWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 5) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 5) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 5) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(3, 5) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(4, 5) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(5, 5) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('up-walk', upWalk);

    const downWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 3) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 3) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(4, 3) as Sprite,
          duration: 200,
        },

        {
          graphic: playerSpriteSheet.getSprite(5, 3) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('down-walk', downWalk);
  }

  onPreUpdate(engine: Engine, _elapsedMs: number): void {
    this.vel = Vector.Zero;

    this.graphics.use(`${this.direction}-idle`);
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

const player = new MainGuy();

game.start(loader).then(() => {
  Resources.TiledMap.addToScene(game.currentScene, { pos: vec(1050, 1450) });
  game.add(player);
  game.currentScene.camera.strategy.lockToActor(player);
  game.currentScene.camera.zoom = 0.8;
});
