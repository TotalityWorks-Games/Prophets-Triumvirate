import './style.css';
import {
  CrossFade,
  DisplayMode,
  Engine,
  FadeInOut,
  Resolution,
} from 'excalibur';

import {
  ironClawPortScene,
  ironClawPortSceneLoader,
} from './Scenes/IronclawPort/IronclawPort';
import { uiManager } from './Managers/UIManager';

const game = new Engine({
  canvasElementId: 'game-canvas',
  width: 600,
  height: 400,
  displayMode: DisplayMode.FitScreenAndFill,
  pixelArt: true,
  pixelRatio: 2,
  resolution: Resolution.SNES,
  scenes: {
    start: {
      scene: ironClawPortScene,
      loader: ironClawPortSceneLoader,
      transitions: {
        out: new FadeInOut({ duration: 100, direction: 'out' }),
        in: new CrossFade({
          duration: 2500,
          direction: 'in',
          blockInput: true,
        }),
      },
    },
  },
});

game.start().then(() => {
  uiManager.init();
  game.goToScene('start');
});
