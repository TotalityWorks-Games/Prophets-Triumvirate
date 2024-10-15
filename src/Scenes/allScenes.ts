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

export const allScenes = {
  start: {
    scene: ironClawPortScene,
    loader: ironClawPortSceneLoader,
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
