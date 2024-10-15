import { Engine } from 'excalibur';

export class SceneManager {
  private currentScene: string;
  constructor(currentScene: string) {
    this.currentScene = currentScene;
  }

  public updateScene(engine: Engine, scene: string) {
    this.currentScene = scene;
    console.log(this.currentScene);
    engine.goToScene(this.currentScene);
  }
}

export const sceneManager = new SceneManager('ironClawPortTempleInterior');
