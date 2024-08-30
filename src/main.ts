import './style.css';
import { DisplayMode, Engine } from 'excalibur';

const game = new Engine({
  width: 600,
  height: 400,
  displayMode: DisplayMode.FitScreenAndFill,
});

game.start();
