import { Engine } from 'excalibur';
import {
  ironClawPortScene,
  ironClawPortSceneLoader,
} from './IronclawPort-1/Scene';
import {
  smallHouseInterior1Scene,
  smallHouseInterior1SceneLoader,
} from './IronclawPort-1/Interiors/SmallHouse1/Scene';
import {
  smallHouseInterior2Scene,
  smallHouseInterior2SceneLoader,
} from './IronclawPort-1/Interiors/SmallHouse2/Scene';
import {
  templeInteriorScene,
  templeInteriorSceneLoader,
} from './IronclawPort-1/Interiors/TempleOfBekna/Scene';
import { musicManager } from '../Managers/MusicManager';
import { LOCATIONS } from '../constants';
import {
  palaceInteriorScene,
  palaceInteriorSceneLoader,
} from './IronclawPort-1/Interiors/IronclawPalace/Scene';

export const allScenes = {
  start: {
    scene: ironClawPortScene,
    loader: ironClawPortSceneLoader,
  },
  ironClawPortTempleInterior: {
    scene: templeInteriorScene,
    loader: templeInteriorSceneLoader,
  },
  ironClawPlaceInterior: {
    scene: palaceInteriorScene,
    loader: palaceInteriorSceneLoader,
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
  IRONCLAW_PORT_PALACE_INTERIOR = 'ironClawPlaceInterior',
}

export const handleSceneExit = (engine: Engine, scene: SceneNames) => {
  switch (scene) {
    case SceneNames.START:
      if (musicManager.location !== LOCATIONS.IRONCLAW_PORT) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SceneNames.IRONCLAW_PORT_TEMPLE_INTERIOR:
      if (musicManager.location !== LOCATIONS.TEMPLE) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SceneNames.IRONCLAW_PORT_PALACE_INTERIOR:
      if (musicManager.location !== LOCATIONS.PALACE) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SceneNames.IRONCLAW_PORT_SMALL_HOUSE_INTERIOR1:
    case SceneNames.IRONCLAW_PORT_SMALL_HOUSE_INTERIOR2:
      engine.goToScene(scene);
      break;
    default:
      break;
  }
};
