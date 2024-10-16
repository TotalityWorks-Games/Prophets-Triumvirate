import {
  BoundingBox,
  Engine,
  ImageSource,
  DefaultLoader,
  Scene,
  SpriteSheet,
  vec,
  Keys,
  SceneActivationContext,
} from 'excalibur';
import { MainGuy } from '../../../../Actors/Main/Player';
import { TempleInteriorResources } from './Resources';
import { Wolfkin1 } from '../../../../Actors/NPCs/Citizens/Wolfkin1';
import { LOCATIONS, SCENE_STATE } from '../../../../constants';
import { uiManager } from '../../../../Managers/UIManager';
import { TempleInteriorDialogues } from './Dialogues';
import { musicManager } from '../../../../Managers/MusicManager';
import { Bekna } from '../../../../Actors/Deities/Bekna';

class Temple extends Scene {
  game_container!: HTMLElement;
  constructor() {
    super();
  }

  onInitialize(engine: Engine): void {
    this.game_container = document.getElementById('game')!;

    this.setCameraBoundaries(engine);
    const npcs = this.setupNPCs();

    // add player character
    const player = new MainGuy(vec(320, 590), TempleInteriorResources, 'up');
    engine.currentScene.add(player);
    engine.currentScene.camera.strategy.lockToActor(player);
    engine.currentScene.camera.zoom = 0.8;

    // add all npcs to game
    npcs.forEach((character) => {
      engine.add(character);
    });

    TempleInteriorResources.TiledMap.addToScene(engine.currentScene);
  }

  onPreUpdate(engine: Engine, _delta: number): void {
    if (engine.input.keyboard.isHeld(Keys.Backspace)) {
      engine.goToScene('start');
    }

    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(TempleInteriorDialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap = TempleInteriorResources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth = TempleInteriorResources.TiledMap.getTileLayers()[0].width;
    const tileHeight =
      TempleInteriorResources.TiledMap.getTileLayers()[0].height;

    const mapBounds = new BoundingBox({
      left: tilemap.pos.x,
      top: tilemap.pos.y,
      bottom: tilemap.pos.y + tileWidth * 35,
      right: tilemap.pos.y + tileHeight * 35,
    });
    engine.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  }

  private setupNPCs() {
    // add diety
    const bekna = new Bekna(
      vec(320, 85),
      TempleInteriorResources.BeknaSpriteSheetPng,
      true
    );

    // add NPCs
    const wolfkinSpriteSheet = SpriteSheet.fromImageSource({
      image: TempleInteriorResources.WolfkinSpriteSheetPng as ImageSource,
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

    return [citizenOne, bekna];
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    if (musicManager.location !== LOCATIONS.TEMPLE) {
      musicManager.updateLocation(LOCATIONS.TEMPLE);
      musicManager.startMusic(TempleInteriorResources);
    }
  }
}

export const templeInteriorScene = new Temple();

// loader
export const templeInteriorSceneLoader = new DefaultLoader();
for (let resource of Object.values(TempleInteriorResources)) {
  templeInteriorSceneLoader.addResource(resource);
}
