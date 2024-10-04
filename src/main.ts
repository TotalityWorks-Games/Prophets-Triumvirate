import './style.css';
import { DisplayMode, Engine, vec, Resolution, BoundingBox } from 'excalibur';
// import { Resources, loader } from './resources';

import { MainGuy } from './player';
import {
  IronclawPortResources,
  ironClawPortSceneLoader,
  Pig,
} from './Scenes/IronclawPort';

const game = new Engine({
  width: 600,
  height: 400,
  displayMode: DisplayMode.FitScreenAndFill,
  pixelArt: true,
  pixelRatio: 2,
  resolution: Resolution.SNES,
});

const player = new MainGuy();
const pigOne = new Pig(vec(2450, 500));
const pigTwo = new Pig(vec(2450, 400));

game.start(ironClawPortSceneLoader).then(() => {
  IronclawPortResources.TiledMap.addToScene(game.currentScene);
  const tilemap = IronclawPortResources.TiledMap.getTileLayers()[0].tilemap;
  const tileWidth = IronclawPortResources.TiledMap.getTileLayers()[0].width;
  const tileHeight = IronclawPortResources.TiledMap.getTileLayers()[0].height;

  const mapBounds = new BoundingBox({
    left: tilemap.pos.x,
    top: tilemap.pos.y,
    bottom: tilemap.pos.y + tileWidth * 90,
    right: tilemap.pos.y + tileHeight * 32,
  });

  game.add(player);
  game.add(pigOne);
  game.add(pigTwo);
  game.currentScene.camera.strategy.lockToActor(player);
  game.currentScene.camera.zoom = 0.8;
  game.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  IronclawPortResources.Music.loop = true;
  IronclawPortResources.Music.play(0.5);
});
