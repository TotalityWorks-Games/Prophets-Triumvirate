import { CrossFade, FadeInOut } from 'excalibur';
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
