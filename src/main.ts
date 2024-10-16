import './style.css';
import { Engine, Resolution } from 'excalibur';

import { uiManager } from './Managers/UIManager';
import { allScenes } from './Scenes/allScenes';

const game = new Engine({
  canvasElementId: 'game-canvas',
  // width: 600,
  // height: 400,
  // displayMode: DisplayMode.FitScreenAndFill,
  pixelArt: true,
  pixelRatio: 2,
  resolution: Resolution.SNES,
  scenes: { ...allScenes },
});

game.start().then(() => {
  uiManager.init();
  game.goToScene('start');
});
