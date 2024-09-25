import {
  Engine,
  ImageFiltering,
  ImageSource,
  Loader,
  Resource,
  Scene,
} from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';

// import map
import testSceneMapPath from '../../Resources/TMX/test-map.tmx?url';
// import spritesheets
import heroPath from '../../Resources/Sheets/Characters/Main/Player.png?url';
import harborSetPath from '../../Resources/Sheets/Locations/Harbor.png?url';
import waterSetPath from '../../Resources/Sheets/Locations/water.png?url';
// import tilesets
import harborTsxPath from '../../Resources/TSX/Harbor.tsx?url';
import waterTsxPath from '../../Resources/TSX/water.tsx?url';

export const TestSceneResources = {
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  TestSceneMap: new TiledResource(testSceneMapPath, {
    useTilemapCameraStrategy: true,
    pathMap: [
      { path: 'test-map.tmx', output: testSceneMapPath }, // map
      { path: 'Harbor.png', output: harborSetPath }, // spritesheet
      { path: 'water.png', output: waterSetPath }, // spritesheet
      { path: 'Harbor.tsx', output: harborTsxPath }, // tileset
      { path: 'Water.tsx', output: waterTsxPath }, // tileset
    ],
  }),
  harborTsxResource: new Resource(harborTsxPath, 'text'),
  waterTsxResource: new Resource(waterTsxPath, 'text'),
} as const;

class TestScene extends Scene {
  constructor() {
    super();
  }

  onInitialize(_engine: Engine): void {
    // engine.input.touch.on('pointerdown', () => {
    //   engine.goto('mynextScene');
    // });
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    // ... update stuff
  }
}

export const testScene = new TestScene();

// loader
export const testSceneLoader = new Loader();
for (let resource of Object.values(TestSceneResources)) {
  testSceneLoader.addResource(resource);
}

// TestSceneResources.TestSceneMap.addToScene(testScene);
