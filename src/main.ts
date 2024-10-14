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
} from './Scenes/IronclawPort-1/IronclawPort';
import { uiManager } from './Managers/UIManager';
import {
  smallHouseInterior1Scene,
  smallHouseInterior1SceneLoader,
} from './Scenes/IronclawPort-1/Interiors/SmallHouse1/SmallHouse1';

const game = new Engine({
  canvasElementId: 'game-canvas',
  width: 600,
  height: 400,
  displayMode: DisplayMode.FitScreenAndFill,
  pixelArt: true,
  pixelRatio: 2,
  resolution: Resolution.SNES,
  scenes: {
    // start: {
    //   scene: ironClawPortScene,
    //   loader: ironClawPortSceneLoader,
    //   transitions: {
    //     in: new CrossFade({
    //       duration: 1000,
    //       direction: 'in',
    //       blockInput: true,
    //     }),
    //     out: new FadeInOut({ duration: 100, direction: 'out' }),
    //   },
    // },
    start: {
      scene: smallHouseInterior1Scene,
      loader: smallHouseInterior1SceneLoader,
      transitions: {
        in: new CrossFade({
          duration: 1000,
          direction: 'in',
          blockInput: true,
        }),
        out: new FadeInOut({ duration: 100, direction: 'out' }),
      },
    },
  },
});

game.start().then(() => {
  uiManager.init();
  game.goToScene('start');
});
