import {
  BoundingBox,
  Engine,
  ImageSource,
  Loader,
  Scene,
  SpriteSheet,
  vec,
} from 'excalibur';
import { MainGuy } from '../../Actors/player';
import { Pig } from '../../Actors/Animals/Pig';
import { IronclawPortResources } from './Resources';
import { Guard } from '../../Actors/NPCs/Guard';
import { Wolfkin1 } from '../../Actors/NPCs/Citizens/Wolfkin1';
import { WolfkinCleric } from '../../Actors/NPCs/Citizens/WolfkinCleric';
import { Delsaran } from '../../Actors/Main/Delsaran';

class IronClawPort extends Scene {
  constructor() {
    super();
  }

  onInitialize(engine: Engine): void {
    this.setCameraBoundaries(engine);
    this.setupCharacters(engine);
    this.startMusic();

    // engine.input.touch.on('pointerdown', () => {
    //   engine.goto('mynextScene');
    // });

    // logic from https://github.com/excaliburjs/sample-ldtk/blob/main/src/main.ts
    // showing how to load scene on trigger:
    // const trigger = new ex.Trigger({
    //   width: props.entity.width,
    //   height: props.entity.height,
    //   pos: props.worldPos.add(ex.vec(props.entity.width/2, props.entity.height/2)),
    //   filter: (entity) => {
    //       return entity instanceof Player
    //   },
    //   action: () => {
    //       game.goToScene(props.entity.fieldInstances[0].__value);
    //   }
    // });
    IronclawPortResources.TiledMap.addToScene(engine.currentScene);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    // ... update stuff
  }

  private startMusic() {
    // add looping music
    IronclawPortResources.Music.loop = true;
    IronclawPortResources.Music.play(0.5);
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap = IronclawPortResources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth = IronclawPortResources.TiledMap.getTileLayers()[0].width;
    const tileHeight = IronclawPortResources.TiledMap.getTileLayers()[0].height;

    const mapBounds = new BoundingBox({
      left: tilemap.pos.x,
      top: tilemap.pos.y,
      bottom: tilemap.pos.y + tileWidth * 90,
      right: tilemap.pos.y + tileHeight * 32,
    });
    engine.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  }

  private setupCharacters(engine: Engine) {
    // add player character
    /* Default Player Location: pos: vec(2300, 2550), */
    const player = new MainGuy(vec(2250, 500), IronclawPortResources);
    engine.currentScene.add(player);
    engine.currentScene.camera.strategy.lockToActor(player);
    engine.currentScene.camera.zoom = 0.8;

    // add NPCs
    const wolfkinSpriteSheet = SpriteSheet.fromImageSource({
      image: IronclawPortResources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    // Delsaran drinking in the harbor
    const delsaran = new Delsaran(
      vec(2090, 2270),
      IronclawPortResources.DelsaranSpriteSheetPng
    );
    engine.add(delsaran);

    // guardOne and guardTwo block the exit to Ironclaw.
    const guardOne = new Guard(vec(1775, 100), wolfkinSpriteSheet);
    const guardTwo = new Guard(vec(1840, 100), wolfkinSpriteSheet);
    engine.add(guardOne);
    engine.add(guardTwo);

    // guardThree and guardFour watch over the Temple
    const guardThree = new Guard(vec(1390, 830), wolfkinSpriteSheet);
    const guardFour = new Guard(vec(1170, 830), wolfkinSpriteSheet);
    engine.add(guardThree);
    engine.add(guardFour);

    // guardFive and guardSix watch over the Palace
    const guardFive = new Guard(vec(1720, 830), wolfkinSpriteSheet);
    const guardSix = new Guard(vec(1550, 830), wolfkinSpriteSheet);
    engine.add(guardFive);
    engine.add(guardSix);

    // guardSeven and guardEight stand near the barracks
    const guardSeven = new Guard(vec(1000, 100), wolfkinSpriteSheet);
    const guardEight = new Guard(vec(930, 230), wolfkinSpriteSheet, 'right');
    engine.add(guardSeven);
    engine.add(guardEight);

    // guardNine is talking to a citizen, probably doing something illegal
    const guardNine = new Guard(vec(300, 100), wolfkinSpriteSheet, 'left');
    const citizenOne = new Wolfkin1(vec(265, 100), wolfkinSpriteSheet, 'right');
    engine.add(guardNine);
    engine.add(citizenOne);

    // clericOne is tending to the graves
    const clericOne = new WolfkinCleric(
      vec(1475, 450),
      wolfkinSpriteSheet,
      'left'
    );
    engine.add(clericOne);

    // citizenTwo, citizenThree, and citizenFour are enjoying themselves by the tables
    const citizenTwo = new Wolfkin1(vec(2800, 330), wolfkinSpriteSheet, 'left');
    const citizenThree = new Wolfkin1(vec(2770, 465), wolfkinSpriteSheet);
    const citizenFour = new Wolfkin1(
      vec(2570, 400),
      wolfkinSpriteSheet,
      'left'
    );
    engine.add(citizenTwo);
    engine.add(citizenThree);
    engine.add(citizenFour);

    // add animals
    const pigOne = new Pig(vec(2450, 500), IronclawPortResources);
    // const pigTwo = new Pig(vec(2450, 400), IronclawPortResources);
    engine.add(pigOne);
    // engine.add(pigTwo);
  }
}

export const ironClawPortScene = new IronClawPort();

// loader
export const ironClawPortSceneLoader = new Loader();
for (let resource of Object.values(IronclawPortResources)) {
  ironClawPortSceneLoader.addResource(resource);
}
