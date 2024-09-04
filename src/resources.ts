import {
  //   ImageFiltering,
  //   ImageSource,
  Loader,
  Resource,
} from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';

// Import paths to work with Vite
// Note the ?url suffix
// import heroPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png?url';
import harborSetPath from '../TiledResources/Sheets/Harbor.png?url';
import shipsSetPath from '../TiledResources/Sheets/Ships.png?url';
import waterSetPath from '../TiledResources/Sheets/water.png?url';
import lantern1SetPath from '../TiledResources/Sheets/Lantern1.png';
import lantern2SetPath from '../TiledResources/Sheets/Lantern2.png';
import iconclawPortPath from '../TiledResources/TMX/IronclawPort.tmx?url';
import waterTsxPath from '../TiledResources/TSX/water.tsx?url';
import shipsTsxPath from '../TiledResources/TSX/Ships.tsx?url';
import harborTsxPath from '../TiledResources/TSX/Harbor.tsx?url';
import lantern1TsxPath from '../TiledResources/TSX/Lantern1.tsx?url';
import lantern1bTsxPath from '../TiledResources/TSX/Lantern1B.tsx?url';
import lantern2TsxPath from '../TiledResources/TSX/Lantern2.tsx?url';
import lantern2bTsxPath from '../TiledResources/TSX/Lantern2B.tsx?url';

export const Resources = {
  //   HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  TiledMap: new TiledResource(iconclawPortPath, {
    // entityClassNameFactories: {
    //   player: (props) => {
    //     const player = new Player(props.worldPos);
    //     player.z = 100;
    //     return player;
    //   }
    // },
    // Path map intercepts and redirects to work around vite's static bundling
    pathMap: [
      { path: 'IronclawPort.tmx', output: iconclawPortPath },
      { path: 'Harbor.png', output: harborSetPath },
      { path: 'water.png', output: waterSetPath },
      { path: 'Ships.png', output: shipsSetPath },
      { path: 'Lantern1.png', output: lantern1SetPath },
      { path: 'Lantern2.png', output: lantern2SetPath },
      { path: 'Harbor.tsx', output: harborTsxPath },
      { path: 'Water.tsx', output: waterTsxPath },
      { path: 'Ships.tsx', output: shipsTsxPath },
      { path: 'Lantern1.tsx', output: lantern1TsxPath },
      { path: 'Lantern1B.tsx', output: lantern1bTsxPath },
      { path: 'Lantern2.tsx', output: lantern2TsxPath },
      { path: 'Lantern2B.tsx', output: lantern2bTsxPath },
    ],
  }),
  harborTsxResource: new Resource(harborTsxPath, 'text'),
  waterTsxResource: new Resource(waterTsxPath, 'text'),
  shipsTsxResource: new Resource(shipsTsxPath, 'text'),
  lantern1TsxResource: new Resource(lantern1TsxPath, 'text'),
  lantern1BTsxResource: new Resource(lantern1bTsxPath, 'text'),
  lantern2TsxResource: new Resource(lantern2TsxPath, 'text'),
  lantern2BTsxResource: new Resource(lantern2bTsxPath, 'text'),
} as const;

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
  loader.addResource(resource);
}
