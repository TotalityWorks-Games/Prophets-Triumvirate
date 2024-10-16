import { CrossFade, Engine, FadeInOut } from 'excalibur';
import {
  ironClawPortScene,
  ironClawPortSceneLoader,
} from './IronclawPort-1/IronclawPort';
import {
  smallHouseInterior1Scene,
  smallHouseInterior1SceneLoader,
} from './IronclawPort-1/Interiors/SmallHouse1/SmallHouse1';
import {
  smallHouseInterior2Scene,
  smallHouseInterior2SceneLoader,
} from './IronclawPort-1/Interiors/SmallHouse2/Scene';
import {
  templeInteriorScene,
  templeInteriorSceneLoader,
} from './IronclawPort-1/Interiors/TempleOfBekna/Scene';
import { sceneManager } from '../Managers/SceneManager';
import { musicManager } from '../Managers/MusicManager';
import { LOCATIONS } from '../constants';

export const allScenes = {
  start: {
    scene: ironClawPortScene,
    loader: ironClawPortSceneLoader,
  },
  ironClawPortTempleInterior: {
    scene: templeInteriorScene,
    loader: templeInteriorSceneLoader,
  },
  ironClawPortSmallHouseInterior1: {
    scene: smallHouseInterior1Scene,
    loader: smallHouseInterior1SceneLoader,
  },
  ironClawPortSmallHouseInterior2: {
    scene: smallHouseInterior2Scene,
    loader: smallHouseInterior2SceneLoader,
  },
};

export enum SceneNames {
  START = 'start',
  IRONCLAW_PORT_TEMPLE_INTERIOR = 'ironClawPortTempleInterior',
  IRONCLAW_PORT_SMALL_HOUSE_INTERIOR1 = 'ironClawPortSmallHouseInterior1',
  IRONCLAW_PORT_SMALL_HOUSE_INTERIOR2 = 'ironClawPortSmallHouseInterior2',
}

export const handleSceneExit = (engine: Engine, scene: SceneNames) => {
  switch (scene) {
    case SceneNames.START:
      if (musicManager.location !== LOCATIONS.IRONCLAW_PORT) {
        musicManager.stopMusic();
      }
      engine.goToScene(SceneNames.START);
      break;
    case SceneNames.IRONCLAW_PORT_TEMPLE_INTERIOR:
      if (musicManager.location !== LOCATIONS.TEMPLE) {
        musicManager.stopMusic();
      }
      engine.goToScene(SceneNames.IRONCLAW_PORT_TEMPLE_INTERIOR);
      break;
    default:
      break;
  }
};
