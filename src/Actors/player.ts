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
  Sprite,
  SpriteSheet,
  vec,
  Vector,
} from 'excalibur';
import { Direction } from '../constants';
import { Config } from '../config';

export class MainGuy extends Actor {
  public nearToNPC: any;
  public nearToObject: any;
  public direction: Direction;
  public resources: {
    HeroSpriteSheetPng: ImageSource;
    HeroRunningSpriteSheetPng: ImageSource;
  };
  constructor(
    pos: Vector,
    resources: {
      HeroSpriteSheetPng: ImageSource;
      HeroRunningSpriteSheetPng: ImageSource;
    }
  ) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Active,
    });

    this.z = 100;
    this.scale = new Vector(2, 2);
    this.direction = 'down';
    this.resources = resources;
  }

  onInitialize(_engine: Engine): void {
    this.addAnimations();
  }

  onPreUpdate(engine: Engine, _elapsedMs: number): void {
    this.vel = Vector.Zero;

    this.graphics.use(`${this.direction}-idle`);
    this.playerMovement(engine);
    this.playerInteract(engine);
  }

  onPreCollisionResolve(
    _self: Collider,
    other: Collider,
    _side: Side,
    _contact: CollisionContact
  ): void {
    if (other.owner.name === 'Collisions') {
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
    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      if (this.nearToNPC) {
        console.log(`dialogue with: ${this.nearToNPC.name}`);
        // this.set_state(PLAYER_STATE.TALKING);
        // gameManager.start_talk(this.nearToNPC);
        // return;
      }
      if (this.nearToObject) {
        // investigate
        console.log(`investigating: ${this.nearToObject.name}`);
      }
    }
  }

  playerMovement(engine: Engine) {
    // running
    if (engine.input.keyboard.isHeld(Keys.ShiftLeft)) {
      if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
        this.nearToNPC = null;
        this.nearToObject = null;
        this.vel = vec(Config.PlayerRunningSpeed, 0);
        this.graphics.use('right-run');
        this.direction = 'right';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
        this.nearToNPC = null;
        this.nearToObject = null;
        this.vel = vec(-Config.PlayerRunningSpeed, 0);
        this.graphics.use('left-run');
        this.direction = 'left';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
        this.nearToNPC = null;
        this.nearToObject = null;
        this.vel = vec(0, -Config.PlayerRunningSpeed);
        this.graphics.use('up-run');
        this.direction = 'up';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
        this.nearToNPC = null;
        this.nearToObject = null;
        this.vel = vec(0, Config.PlayerRunningSpeed);
        this.graphics.use('down-run');
        this.direction = 'down';
      }
    } else {
      // walking
      if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
        this.nearToNPC = null;
        this.nearToObject = null;
        this.vel = vec(Config.PlayerSpeed, 0);
        this.graphics.use('right-walk');
        this.direction = 'right';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
        this.nearToNPC = null;
        this.nearToObject = null;
        this.vel = vec(-Config.PlayerSpeed, 0);
        this.graphics.use('left-walk');
        this.direction = 'left';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
        this.nearToNPC = null;
        this.nearToObject = null;
        this.vel = vec(0, -Config.PlayerSpeed);
        this.graphics.use('up-walk');
        this.direction = 'up';
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
        this.nearToNPC = null;
        this.nearToObject = null;
        this.vel = vec(0, Config.PlayerSpeed);
        this.graphics.use('down-walk');
        this.direction = 'down';
      }
    }
  }
}
