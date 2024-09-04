import './style.css';
import { DisplayMode, Engine, vec } from 'excalibur';
import { Resources, loader } from './resources';

const game = new Engine({
  width: 600,
  height: 400,
  displayMode: DisplayMode.FitScreenAndFill,
  pixelArt: true,
  pixelRatio: 2,
});

game.start(loader).then(() => {
  Resources.TiledMap.addToScene(game.currentScene, { pos: vec(-1100, -1500) });
});
