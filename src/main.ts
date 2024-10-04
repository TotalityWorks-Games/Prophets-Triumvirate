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
} from './Scenes/IronclawPort';

const game = new Engine({
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
        out: new FadeInOut({ duration: 500, direction: 'out' }),
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
  game.goToScene('start');
});
