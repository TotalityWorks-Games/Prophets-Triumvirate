import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  ImageFiltering,
  ImageSource,
  Loader,
  Resource,
  Scene,
  Sound,
  Sprite,
  SpriteSheet,
  vec,
  Vector,
} from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';

// import map
import ironclawPortMapPath from '../../Resources/TMX/IronClawPort.tmx?url';

// import music
import harborMP3 from '../../Resources/Sounds/Music/Harbor 1 - Treasure Island (Loopable).mp3';
import harborOgg from '../../Resources/Sounds/Music/Harbor 1 - Treasure Island (Loopable).ogg';
import harborWav from '../../Resources/Sounds/Music/Harbor 1 - Treasure Island (Loopable).wav';

// import spritesheets
import heroPath from '../../Resources/Sheets/Characters/Main/Player.png?url';
import animal3Path from '../../Resources/Sheets/Animals/animals3.png?url';
import campGravesSetPath from '../../Resources/Sheets/Locations/Camp_Graves.png?url';
import clBuildingsSetPath from '../../Resources/Sheets/Locations/CL_Buildings.png?url';
import clMainLevelSetPath from '../../Resources/Sheets/Locations/CL_MainLev.png?url';
import furnituresSetPath from '../../Resources/Sheets/Locations/furnitures.png?url';
import harborSetPath from '../../Resources/Sheets/Locations/Harbor.png?url';
import housesOutsideSetPath from '../../Resources/Sheets/Locations/houses_outside.png?url';
import lantern1SetPath from '../../Resources/Sheets/Locations/Lantern1.png?url';
import lantern2SetPath from '../../Resources/Sheets/Locations/Lantern2.png?url';
import propsBSetPath from '../../Resources/Sheets/Locations/propsB.png?url';
import shipsSetPath from '../../Resources/Sheets/Locations/Ships.png?url';
import smallObjectsSetPath from '../../Resources/Sheets/Locations/smallobj.png?url';
import waterSetPath from '../../Resources/Sheets/Locations/water.png?url';

// import tilesets
import campGravesTsxPath from '../../Resources/TSX/Camp_Graves.tsx?url';
import clBuildingsTsxPath from '../../Resources/TSX/CL_Buildings.tsx?url';
import clMainLevelTsxPath from '../../Resources/TSX/CL_MainLev.tsx?url';
import furnituresTsxPath from '../../Resources/TSX/furnitures.tsx?url';
import harborTsxPath from '../../Resources/TSX/Harbor.tsx?url';
import housesOutsideTsxPath from '../../Resources/TSX/houses_outside.tsx?url';
import lantern1TsxPath from '../../Resources/TSX/Lantern1.tsx?url';
import lantern2TsxPath from '../../Resources/TSX/Lantern2.tsx?url';
import propsBTsxPath from '../../Resources/TSX/propsB.tsx?url';
import shipsTsxPath from '../../Resources/TSX/Ships.tsx?url';
import smallObjectsTsxPath from '../../Resources/TSX/smallobj.tsx?url';
import waterTsxPath from '../../Resources/TSX/water.tsx?url';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '../constants';

export const IronclawPortResources = {
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  Animal3SpriteSheetPng: new ImageSource(
    animal3Path,
    false,
    ImageFiltering.Pixel
  ),
  Music: new Sound(harborMP3, harborWav, harborOgg),
  TiledMap: new TiledResource(ironclawPortMapPath, {
    useTilemapCameraStrategy: true,
    pathMap: [
      { path: 'IronClawPort.tmx', output: ironclawPortMapPath }, // map
      { path: 'Camp_Graves.png', output: campGravesSetPath }, // spritesheet
      { path: 'CL_Buildings.png', output: clBuildingsSetPath }, // spritesheet
      { path: 'CL_MainLev.png', output: clMainLevelSetPath }, // spritesheet
      { path: 'furnitures.png', output: furnituresSetPath }, // spritesheet
      { path: 'Harbor.png', output: harborSetPath }, // spritesheet
      { path: 'houses_outside.png', output: housesOutsideSetPath }, // spritesheet
      { path: 'Lantern1.png', output: lantern1SetPath }, // spritesheet
      { path: 'Lantern2.png', output: lantern2SetPath }, // spritesheet
      { path: 'propsB.png', output: propsBSetPath }, // spritesheet
      { path: 'Ships.png', output: shipsSetPath }, // spritesheet
      { path: 'smallobj.png', output: smallObjectsSetPath }, // spritesheet
      { path: 'water.png', output: waterSetPath }, // spritesheet
      { path: 'Camp_Graves.tsx', output: campGravesTsxPath }, // tileset
      { path: 'CL_Buildings.tsx', output: clBuildingsTsxPath }, // tileset
      { path: 'CL_MainLev.tsx', output: clMainLevelTsxPath }, // tileset
      { path: 'furnitures.tsx', output: furnituresTsxPath }, // tileset
      { path: 'Harbor.tsx', output: harborTsxPath }, // tileset
      { path: 'houses_outside.tsx', output: housesOutsideTsxPath }, // tileset
      { path: 'Lantern1.tsx', output: lantern1TsxPath }, // tileset
      { path: 'Lantern2.tsx', output: lantern2TsxPath }, // tileset
      { path: 'propsB.tsx', output: propsBTsxPath }, // tileset
      { path: 'Ships.tsx', output: shipsTsxPath }, // tileset
      { path: 'smallobj.tsx', output: smallObjectsTsxPath }, // tileset
      { path: 'Water.tsx', output: waterTsxPath }, // tileset
    ],
  }),
  campGravesTsxResource: new Resource(campGravesTsxPath, 'text'),
  clBuildingsTsxResource: new Resource(clBuildingsTsxPath, 'text'),
  clMainLevelTsxResource: new Resource(clMainLevelTsxPath, 'text'),
  furnituresTsxResource: new Resource(furnituresTsxPath, 'text'),
  harborTsxResource: new Resource(harborTsxPath, 'text'),
  housesOutsideTsxResource: new Resource(housesOutsideTsxPath, 'text'),
  lantern1TsxResource: new Resource(lantern1TsxPath, 'text'),
  lantern2TsxResource: new Resource(lantern2TsxPath, 'text'),
  propsBTsxResource: new Resource(propsBTsxPath, 'text'),
  shipsTsxResource: new Resource(shipsTsxPath, 'text'),
  smallObjectsTsxResource: new Resource(smallObjectsTsxPath, 'text'),
  waterTsxResource: new Resource(waterTsxPath, 'text'),
} as const;

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

class IronClawPort extends Scene {
  leftBounds: number;
  rightBounds: number;
  upBounds: number;
  downBounds: number;
  constructor() {
    super();
    this.leftBounds = 0;
    this.rightBounds = 10000;
    this.upBounds = 10;
    this.downBounds = 10000;
  }

  onInitialize(_engine: Engine): void {
    /* Default Player Location: pos: vec(2300, 2550), */
    // const pigOne = new Pig(vec(2300, 2550));
    // engine.currentScene.add(pigOne);
    // pigOne.z = 200;
    // engine.input.touch.on('pointerdown', () => {
    //   engine.goto('mynextScene');
    // });
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    // ... update stuff
  }
}

export const ironClawPortScene = new IronClawPort();

// loader
export const ironClawPortSceneLoader = new Loader();
for (let resource of Object.values(IronclawPortResources)) {
  ironClawPortSceneLoader.addResource(resource);
}
