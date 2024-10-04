import { BoundingBox, Engine, Loader, Scene, vec } from 'excalibur';
import { MainGuy } from '../../Actors/player';
import { Pig } from '../../Actors/Animals/Pig';
import { IronclawPortResources } from './Resources';

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

  onInitialize(engine: Engine): void {
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

    // add looping music
    IronclawPortResources.Music.loop = true;
    IronclawPortResources.Music.play(0.5);

    // add player character
    /* Default Player Location: pos: vec(2300, 2550), */
    const player = new MainGuy(vec(2300, 2550), IronclawPortResources);
    engine.currentScene.add(player);
    engine.currentScene.camera.strategy.lockToActor(player);
    engine.currentScene.camera.zoom = 0.8;

    // add animals
    const pigOne = new Pig(vec(2450, 500), IronclawPortResources);
    const pigTwo = new Pig(vec(2450, 400), IronclawPortResources);
    engine.add(pigOne);
    engine.add(pigTwo);

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
}

export const ironClawPortScene = new IronClawPort();

// loader
export const ironClawPortSceneLoader = new Loader();
for (let resource of Object.values(IronclawPortResources)) {
  ironClawPortSceneLoader.addResource(resource);
}
