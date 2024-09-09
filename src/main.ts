import './style.css';
import {
  DisplayMode,
  Engine,
  vec,
  Resolution,
  Actor,
  SpriteSheet,
  ImageSource,
  Sprite,
  Animation,
  Vector,
  Keys,
} from 'excalibur';
import { Resources, loader } from './resources';
import { Player } from './player';
import { Config } from './config';
// import { DevTool } from '@excaliburjs/dev-tools';

const game = new Engine({
  // width: 600,
  // height: 400,
  displayMode: DisplayMode.FitScreenAndFill,
  pixelArt: true,
  pixelRatio: 2,
  resolution: Resolution.SNES,
});

class MainGuy extends Actor {
  constructor() {
    super({
      pos: vec(2450, 3050),
      width: 100,
      height: 100,
    });

    this.z = 100;
  }

  onInitialize(_engine: Engine): void {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.HeroSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 32,
        spriteHeight: 32,
        rows: 4,
        columns: 6,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 0),
          duration: 200,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

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
    // this.graphics.add('left-walk', leftWalk);

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
    // this.graphics.add('right-walk', rightWalk);

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
    // this.graphics.add('up-walk', upWalk);

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
    // this.graphics.add('down-walk', downWalk);
  }

  onPreUpdate(engine: Engine, _elapsedMs: number): void {
    this.vel = Vector.Zero;

    this.graphics.use('down-idle');
    if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
      this.vel = vec(Config.PlayerSpeed, 0);
      this.graphics.use('right-walk');
    }
    if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
      this.vel = vec(-Config.PlayerSpeed, 0);
      this.graphics.use('left-walk');
    }
    if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
      this.vel = vec(0, -Config.PlayerSpeed);
      this.graphics.use('up-walk');
    }
    if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
      this.vel = vec(0, Config.PlayerSpeed);
      this.graphics.use('down-walk');
    }
  }
}

const player = new MainGuy();

game.start(loader).then(() => {
  Resources.TiledMap.addToScene(game.currentScene, { pos: vec(1050, 1450) });
  game.add(player);
  game.currentScene.camera.strategy.lockToActor(player);
});
