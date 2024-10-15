import {
  BoundingBox,
  Engine,
  ImageSource,
  DefaultLoader,
  Scene,
  SpriteSheet,
  vec,
  Keys,
} from 'excalibur';
import { MainGuy } from '../../../../Actors/Main/Player';
import { SmallHouseInterior1Resources } from './Resources';
import { Wolfkin1 } from '../../../../Actors/NPCs/Citizens/Wolfkin1';
import { LOCATIONS, SCENE_STATE } from '../../../../constants';
import { uiManager } from '../../../../Managers/UIManager';
import { SmallHouseInterior1Dialogues } from './Dialogues';
import { musicManager } from '../../../../Managers/MusicManager';
import { IronclawPortResources } from '../../Resources';

class SmallHouse1 extends Scene {
  game_container!: HTMLElement;
  constructor() {
    super();
  }

  onInitialize(engine: Engine): void {
    this.game_container = document.getElementById('game')!;

    this.setCameraBoundaries(engine);
    const npcs = this.setupNPCs();

    // add player character
    const player = new MainGuy(
      vec(160, 270),
      SmallHouseInterior1Resources,
      'up'
    );
    engine.currentScene.add(player);
    engine.currentScene.camera.strategy.lockToActor(player);
    engine.currentScene.camera.zoom = 0.8;

    // add all npcs to game
    npcs.forEach((character) => {
      engine.add(character);
    });

    if (musicManager.location !== LOCATIONS.TEST) {
      musicManager.updateLocation(LOCATIONS.TEST);
    }

    SmallHouseInterior1Resources.TiledMap.addToScene(engine.currentScene);
  }

  onPreUpdate(engine: Engine, _delta: number): void {
    if (engine.input.keyboard.isHeld(Keys.Backspace)) {
      engine.goToScene('start');
    }

    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(SmallHouseInterior1Dialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap =
      SmallHouseInterior1Resources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth =
      SmallHouseInterior1Resources.TiledMap.getTileLayers()[0].width;
    const tileHeight =
      SmallHouseInterior1Resources.TiledMap.getTileLayers()[0].height;

    const mapBounds = new BoundingBox({
      left: tilemap.pos.x,
      top: tilemap.pos.y,
      bottom: tilemap.pos.y + tileWidth * 35,
      right: tilemap.pos.y + tileHeight * 35,
    });
    // engine.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  }

  private setupNPCs() {
    // add NPCs
    const wolfkinSpriteSheet = SpriteSheet.fromImageSource({
      image: SmallHouseInterior1Resources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    const citizenOne = new Wolfkin1(
      vec(50, 150),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One'
    );

    return [citizenOne];
  }
}

export const smallHouseInterior1Scene = new SmallHouse1();

// loader
export const smallHouseInterior1SceneLoader = new DefaultLoader();
for (let resource of Object.values(SmallHouseInterior1Resources)) {
  smallHouseInterior1SceneLoader.addResource(resource);
}
