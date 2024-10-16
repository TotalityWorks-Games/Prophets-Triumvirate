import { TiledResource } from '@excaliburjs/plugin-tiled';
import { ImageSource, ImageFiltering, Sound, Resource } from 'excalibur';

// import map
import smallHouseInterior from '../../../../../Resources/TMX/IronclawPort-Small-House-Interior.tmx?url';

// import sounds
import collisionSound from '../../../../../Resources/Sounds/Effects/bump-dur2Short-pitch1Low.wav';

// import spritesheets
import heroPath from '../../../../../Resources/Sheets/Characters/Main/Player/Character006.png?url';
import heroRunningPath from '../../../../../Resources/Sheets/Characters/Main/Player/Chara006.png?url';
import wolfkinPath from '../../../../../Resources/Sheets/Characters/Wolfkin/beast_tribe_1.png?url';
import clBuildingsSetPath from '../../../../../Resources/Sheets/Locations/CL_Buildings.png?url';
import clCraftingSetPath from '../../../../../Resources/Sheets/Locations/CL_Crafting.png?url';
import furnituresSetPath from '../../../../../Resources/Sheets/Locations/furnitures.png?url';

// import tilesets
import clBuildingsTsxPath from '../../../../../Resources/TSX/CL_Buildings.tsx?url';
import clCraftingTsxPath from '../../../../../Resources/TSX/CL_Crafting.tsx?url';
import furnituresTsxPath from '../../../../../Resources/TSX/furnitures.tsx?url';

export const SmallHouseInterior1Resources = {
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  HeroRunningSpriteSheetPng: new ImageSource(
    heroRunningPath,
    false,
    ImageFiltering.Pixel
  ),
  WolfkinSpriteSheetPng: new ImageSource(
    wolfkinPath,
    false,
    ImageFiltering.Pixel
  ),
  CollisionSound: new Sound(collisionSound),
  TiledMap: new TiledResource(smallHouseInterior, {
    useTilemapCameraStrategy: true,
    pathMap: [
      {
        path: 'IronclawPort-Small-House-Interior.tmx',
        output: smallHouseInterior,
      }, // map
      { path: 'CL_Buildings.png', output: clBuildingsSetPath }, // spritesheet
      { path: 'CL_Crafting.png', output: clCraftingSetPath }, // spritesheet
      { path: 'furnitures.png', output: furnituresSetPath }, // spritesheet
      { path: 'CL_Buildings.tsx', output: clBuildingsTsxPath }, // tileset
      { path: 'CL_Crafting.tsx', output: clCraftingTsxPath }, // tileset
      { path: 'furnitures.tsx', output: furnituresTsxPath }, // tileset
    ],
  }),
  clBuildingsTsxResource: new Resource(clBuildingsTsxPath, 'text'),
  clCraftingTsxResource: new Resource(clCraftingTsxPath, 'text'),
  furnituresTsxResource: new Resource(furnituresTsxPath, 'text'),
} as const;
