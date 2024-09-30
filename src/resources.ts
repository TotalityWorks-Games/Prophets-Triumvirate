import { ImageFiltering, ImageSource, Loader, Resource } from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';

// Import paths to work with Vite
// Note the ?url suffix
// Import Tiled Maps
// import iconclawPortPath from '../Resources/TMX/IronclawPort.tmx?url';
import testSceneMapPath from '../Resources/TMX/test-map2.tmx?url';

// Import Spritesheets
import heroPath from '../Resources/Sheets/Characters/Main/Player.png?url';
import harborSetPath from '../Resources/Sheets/Locations/Harbor.png?url';
import houseInteriorsSetPath from '../Resources/Sheets/Locations/houses_interriors.png?url';
import shipsSetPath from '../Resources/Sheets/Locations/Ships.png?url';
import waterSetPath from '../Resources/Sheets/Locations/water.png?url';
import lantern1SetPath from '../Resources/Sheets/Locations/Lantern1.png';
import lantern2SetPath from '../Resources/Sheets/Locations/Lantern2.png';

// Import Tilesets
import waterTsxPath from '../Resources/TSX/water.tsx?url';
import shipsTsxPath from '../Resources/TSX/Ships.tsx?url';
import harborTsxPath from '../Resources/TSX/Harbor.tsx?url';
import houseInteriorTsxPath from '../Resources/TSX/houses_interriors.tsx?url';
import lantern1TsxPath from '../Resources/TSX/Lantern1.tsx?url';
import lantern1bTsxPath from '../Resources/TSX/Lantern1B.tsx?url';
import lantern2TsxPath from '../Resources/TSX/Lantern2.tsx?url';
import lantern2bTsxPath from '../Resources/TSX/Lantern2B.tsx?url';
// import { Player } from './player';

export const Resources = {
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  TiledMap: new TiledResource(testSceneMapPath, {
    useTilemapCameraStrategy: true,
    // Path map intercepts and redirects to work around vite's static bundling
    pathMap: [
      { path: 'IronclawPort.tmx', output: testSceneMapPath },
      { path: 'Harbor.png', output: harborSetPath },
      { path: 'water.png', output: waterSetPath },
      { path: 'Ships.png', output: shipsSetPath },
      { path: 'Lantern1.png', output: lantern1SetPath },
      { path: 'Lantern2.png', output: lantern2SetPath },
      { path: 'Harbor.tsx', output: harborTsxPath },
      { path: 'Water.tsx', output: waterTsxPath },
      { path: 'Ships.tsx', output: shipsTsxPath },
      { path: 'Lantern1.tsx', output: lantern1TsxPath },
      { path: 'Lantern2.tsx', output: lantern2TsxPath },
    ],
  }),
  harborTsxResource: new Resource(harborTsxPath, 'text'),
  waterTsxResource: new Resource(waterTsxPath, 'text'),
  shipsTsxResource: new Resource(shipsTsxPath, 'text'),
  lantern1TsxResource: new Resource(lantern1TsxPath, 'text'),
  lantern2TsxResource: new Resource(lantern2TsxPath, 'text'),
} as const;

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
  loader.addResource(resource);
}
