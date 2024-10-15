import { Sound } from 'excalibur';
import { LOCATIONS } from '../constants';

class MusicManager {
  public location: LOCATIONS;
  constructor() {
    this.location = LOCATIONS.IRONCLAW_PORT;
  }

  public updateLocation(location: LOCATIONS) {
    this.location = location;
  }

  public startMusic(resources: { Music: Sound }) {
    console.log('music');
    // add looping music
    resources.Music.loop = true;
    resources.Music.play(0.5);
  }

  public stopMusic(resources: { Music: Sound }) {
    resources.Music.stop();
  }
}

export const musicManager = new MusicManager();
