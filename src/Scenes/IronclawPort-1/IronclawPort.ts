import {
  BoundingBox,
  Engine,
  ImageSource,
  Loader,
  Scene,
  SpriteSheet,
  vec,
} from 'excalibur';
import { MainGuy } from '../../Actors/Main/Player';
import { Pig } from '../../Actors/Animals/Pig';
import { IronclawPortResources } from './Resources';
import { Guard } from '../../Actors/NPCs/Guard';
import { Wolfkin1 } from '../../Actors/NPCs/Citizens/Wolfkin1';
import { WolfkinCleric } from '../../Actors/NPCs/Citizens/WolfkinCleric';
import { Delsaran } from '../../Actors/Main/Delsaran';
import { SCENE_STATE } from '../../constants';
import { uiManager } from '../../Managers/UIManager';
import { IronclawPortDialogues } from './Dialogues';
import {
  randomlyGeneratedAbilityScores,
  randomlyGeneratedLevel,
} from '../../Actors/Main/OtherPartyMembers';
import { NPC } from './Party';

class IronClawPort extends Scene {
  game_container!: HTMLElement;
  constructor() {
    super();
  }

  onInitialize(engine: Engine): void {
    this.game_container = document.getElementById('game')!;

    this.setCameraBoundaries(engine);
    const npcs = this.setupNPCs();
    this.startMusic();

    // add player character
    /* Default Player Location: pos: vec(2300, 2550), */
    const player = new MainGuy(vec(2300, 2550), IronclawPortResources);
    engine.currentScene.add(player);
    engine.currentScene.camera.strategy.lockToActor(player);
    engine.currentScene.camera.zoom = 0.8;

    // add all npcs to game
    npcs.forEach((character) => {
      console.log(character);
      engine.add(character);
    });

    // engine.input.touch.on('pointerdown', () => {
    //   engine.goto('mynextScene');
    // });

    // logic from https://github.com/excaliburjs/sample-ldtk/blob/main/src/main.ts
    // showing how to load scene on trigger:
    // const trigger = new ex.Trigger({
    //   width: props.entity.width,
    //   height: props.entity.height,
    //   pos: props.worldPos.add(ex.vec(props.entity.width/2, props.entity.height/2)),
    //   filter: (entity) => {
    //       return entity instanceof Player
    //   },
    //   action: () => {
    //       game.goToScene(props.entity.fieldInstances[0].__value);
    //   }
    // });
    IronclawPortResources.TiledMap.addToScene(engine.currentScene);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(IronclawPortDialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  private startMusic() {
    // add looping music
    IronclawPortResources.Music.loop = true;
    IronclawPortResources.Music.play(0.5);
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap = IronclawPortResources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth = IronclawPortResources.TiledMap.getTileLayers()[0].width;
    const tileHeight = IronclawPortResources.TiledMap.getTileLayers()[0].height;

    const mapBounds = new BoundingBox({
      left: tilemap.pos.x,
      top: tilemap.pos.y,
      bottom: tilemap.pos.y + tileWidth * 90,
      right: tilemap.pos.y + tileHeight * 32,
    });
    engine.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  }

  private setupNPCs() {
    // add NPCs
    const wolfkinSpriteSheet = SpriteSheet.fromImageSource({
      image: IronclawPortResources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    // Delsaran drinking in the harbor
    const delsaran = new Delsaran(
      vec(2090, 2270),
      IronclawPortResources.DelsaranSpriteSheetPng
    );

    // guardOne and guardTwo block the exit to Ironclaw.
    const guardOne = new Guard(
      vec(1775, 100),
      wolfkinSpriteSheet,
      'Wolfkin Guard One'
    );
    const guardTwo = new Guard(
      vec(1840, 100),
      wolfkinSpriteSheet,
      'Wolfkin Guard Two'
    );

    // guardThree and guardFour watch over the Temple
    const guardThree = new Guard(
      vec(1390, 830),
      wolfkinSpriteSheet,
      'Wolfkin Guard Three'
    );
    const guardFour = new Guard(
      vec(1170, 830),
      wolfkinSpriteSheet,
      'Wolfkin Guard Four'
    );

    // guardFive and guardSix watch over the Palace
    const guardFive = new Guard(
      vec(1720, 830),
      wolfkinSpriteSheet,
      'Wolfkin Guard Five'
    );
    const guardSix = new Guard(
      vec(1550, 830),
      wolfkinSpriteSheet,
      'Wolfkin Guard Six'
    );

    // guardSeven and guardEight stand near the barracks
    const guardSeven = new Guard(
      vec(1000, 100),
      wolfkinSpriteSheet,
      'Wolfkin Guard Seven'
    );
    const guardEight = new Guard(
      vec(930, 230),
      wolfkinSpriteSheet,
      'Wolfkin Guard Eight',
      'right'
    );

    // guardNine is talking to a citizen, probably doing something illegal
    const guardNine = new Guard(
      vec(300, 100),
      wolfkinSpriteSheet,
      'Wolfkin Guard Nine',
      'left'
    );
    const citizenOne = new Wolfkin1(
      vec(265, 100),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One',
      'right'
    );

    // clericOne is tending to the graves
    const clericOne = new WolfkinCleric(
      vec(1475, 450),
      wolfkinSpriteSheet,
      'Wolfkin Cleric One',
      'left'
    );

    // citizenTwo, citizenThree, and citizenFour are enjoying themselves by the tables
    const citizenTwo = new Wolfkin1(
      vec(2800, 330),
      wolfkinSpriteSheet,
      'Wolfkin Citizen Two',
      'left'
    );
    const citizenThree = new Wolfkin1(
      vec(2770, 465),
      wolfkinSpriteSheet,
      'Wolfkin Citizen Three'
    );
    const citizenFour = new Wolfkin1(
      vec(2570, 400),
      wolfkinSpriteSheet,
      'Wolfkin Citizen Four',
      'left'
    );

    // add animals
    const pigOne = new Pig(vec(2450, 500), IronclawPortResources);
    // const pigTwo = new Pig(vec(2450, 400), IronclawPortResources);

    const partyMemberExtraOne = new NPC(
      vec(1990, 2170),
      IronclawPortResources.PartyMemberExtraOneSpritesheetPng,
      randomlyGeneratedLevel(),
      randomlyGeneratedAbilityScores()
    );

    return [
      delsaran,
      guardOne,
      guardTwo,
      guardThree,
      guardFour,
      guardFive,
      guardSix,
      guardSeven,
      guardEight,
      guardNine,
      clericOne,
      citizenOne,
      citizenTwo,
      citizenThree,
      citizenFour,
      pigOne,
      partyMemberExtraOne,
    ];
  }
}

export const ironClawPortScene = new IronClawPort();

// loader
export const ironClawPortSceneLoader = new Loader();
for (let resource of Object.values(IronclawPortResources)) {
  ironClawPortSceneLoader.addResource(resource);
}
