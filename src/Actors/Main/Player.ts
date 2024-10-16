import {
  Actor,
  Animation,
  Collider,
  CollisionContact,
  CollisionType,
  Engine,
  ImageSource,
  Keys,
  Side,
  Sound,
  Sprite,
  SpriteSheet,
  vec,
  Vector,
} from 'excalibur';
import { Direction, SCENE_STATE } from '../../constants';
import { Config } from '../../config';
import { uiManager } from '../../Managers/UIManager';
import { sceneManager } from '../../Managers/SceneManager';
import { allScenes, handleSceneExit } from '../../Scenes/allScenes';
import { musicManager } from '../../Managers/MusicManager';

export class MainGuy extends Actor {
  public playerState: SCENE_STATE;
  public nearToNPC: any;
  public nearToObject: any;
  public direction: Direction;
  public resources: {
    HeroSpriteSheetPng: ImageSource;
    HeroRunningSpriteSheetPng: ImageSource;
    CollisionSound: Sound;
  };
  private engine: Engine | undefined;
  constructor(
    pos: Vector,
    resources: {
      HeroSpriteSheetPng: ImageSource;
      HeroRunningSpriteSheetPng: ImageSource;
      CollisionSound: Sound;
    },
    direction?: Direction
  ) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Active,
    });

    this.z = 100;
    this.scale = new Vector(2, 2);
    this.direction = direction ?? 'down';
    this.resources = resources;
    this.playerState = SCENE_STATE.PLAYING;
  }

  onInitialize(engine: Engine): void {
    this.addAnimations();
    this.engine = engine;
  }

  onPreUpdate(engine: Engine, _elapsedMs: number): void {
    this.vel = Vector.Zero;

    this.graphics.use(`${this.direction}-idle`);

    if (this.playerState === SCENE_STATE.PLAYING) {
      this.playerMovement(engine);
    }
    this.playerInteract(engine);
  }

  onPreCollisionResolve(
    _self: Collider,
    other: Collider,
    _side: Side,
    _contact: CollisionContact
  ): void {
    handleSceneExit(this.engine!, other.owner.name);
    // if (other.owner.name === 'Exit') {
    //   console.log(other.owner.name);
    //   sceneManager.updateScene(this.engine!, 'start');
    //   musicManager.stopMusic();
    // }
    // else
    if (other.owner.name === 'Collisions') {
      this.resources.CollisionSound.play(0.1);
      this.nearToObject = other.owner;
      this.nearToNPC = null;
    } else {
      this.nearToNPC = other.owner;
      this.nearToObject = null;
    }
    // switch (other.owner.name) {
    //   case ACTOR_TYPE.SCENE_NEXT:
    //     const area: SceneArea | any = other.owner;
    //     if (area.activated) {
    //       area.activated = false;
    //       gameManager.go_to(area.toScene);
    //     }
    //     break;
    //   case ACTOR_TYPE.NPC:
    //     this.nearToNPC = other.owner;
    //     break;
    // }
  }

  onCollisionEnd(_self: Collider, other: Collider): void {
    console.log('collision ended');
    // switch (other.owner.name) {
    //   case ACTOR_TYPE.SCENE_NEXT:
    //     const area: SceneArea | any = other.owner;
    //     area.activated = true;
    //     break;
    // }
  }

  addAnimations() {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.HeroSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 24,
        spriteHeight: 32,
        rows: 4,
        columns: 3,
      },
    });

    const playerRunningSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.HeroRunningSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 24,
        spriteHeight: 32,
        rows: 4,
        columns: 5,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 0),
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);

    const rightWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('right-walk', rightWalk);

    const leftWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('left-walk', leftWalk);

    const upWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('up-walk', upWalk);

    const downWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('down-walk', downWalk);

    const rightRun = new Animation({
      frames: [
        {
          graphic: playerRunningSpriteSheet.getSprite(0, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(1, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(2, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(3, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(4, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('right-run', rightRun);

    const leftRun = new Animation({
      frames: [
        {
          graphic: playerRunningSpriteSheet.getSprite(0, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(1, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(2, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(3, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(4, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('left-run', leftRun);

    const upRun = new Animation({
      frames: [
        {
          graphic: playerRunningSpriteSheet.getSprite(0, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(2, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(3, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(4, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('up-run', upRun);

    const downRun = new Animation({
      frames: [
        {
          graphic: playerRunningSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(4, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('down-run', downRun);
  }

  playerInteract(engine: Engine) {
    // dialogue
    switch (this.playerState) {
      case SCENE_STATE.PLAYING:
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
          if (this.nearToNPC) {
            console.log(`dialogue with: ${this.nearToNPC.name}`);
            this.playerState = SCENE_STATE.TALKING;
            uiManager.update_state(SCENE_STATE.TALKING);
            uiManager.dialogNPC(this.nearToNPC.name);
          }
          if (this.nearToObject) {
            // investigate
            console.log(`investigating: ${this.nearToObject.name}`);
            uiManager.update_state(SCENE_STATE.TALKING);
            this.playerState = SCENE_STATE.TALKING;
            // DO THING
          }
        }
        return;
      case SCENE_STATE.TALKING:
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
          this.playerState = SCENE_STATE.PLAYING;
          uiManager.update_state(SCENE_STATE.PLAYING);
          uiManager.dialogNPC(undefined);
        }
        return;
      default:
        return;
    }
  }

  playerMovement(engine: Engine) {
    const movePlayer = (
      x: number,
      y: number,
      direction: Direction,
      speed: 'run' | 'walk'
    ) => {
      this.nearToNPC = null;
      this.nearToObject = null;
      this.vel = vec(x, y);
      this.graphics.use(`${direction}-${speed}`);
      this.direction = direction;
    };

    // running
    if (engine.input.keyboard.isHeld(Keys.ShiftLeft)) {
      if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
        movePlayer(Config.PlayerRunningSpeed, 0, 'right', 'run');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
        movePlayer(-Config.PlayerRunningSpeed, 0, 'left', 'run');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
        movePlayer(0, -Config.PlayerRunningSpeed, 'up', 'run');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
        movePlayer(0, Config.PlayerRunningSpeed, 'down', 'run');
      }
    } else {
      // walking
      if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
        movePlayer(Config.PlayerSpeed, 0, 'right', 'walk');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
        movePlayer(-Config.PlayerSpeed, 0, 'left', 'walk');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
        movePlayer(0, -Config.PlayerSpeed, 'up', 'walk');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
        movePlayer(0, Config.PlayerSpeed, 'down', 'walk');
      }
    }
  }
}
