import './style.css';
import { DisplayMode, Engine, vec, Resolution } from 'excalibur';
// import { Resources, loader } from './resources';

import { MainGuy } from './player';
import {
  IronclawPortResources,
  ironClawPortSceneLoader,
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

game.start(ironClawPortSceneLoader).then(() => {
  IronclawPortResources.TiledMap.addToScene(game.currentScene);
  game.add(player);
  game.currentScene.camera.strategy.lockToActor(player);
  game.currentScene.camera.zoom = 0.8;
});
