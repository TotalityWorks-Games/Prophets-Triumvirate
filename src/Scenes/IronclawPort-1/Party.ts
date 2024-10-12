// import random party member functions here
// then create however many the scene needs
// then export the actors into the scene file
// and export the spritesheet into the resources file

import {
  randomNPC,
  randomRaceClassCombo,
} from '../../Actors/Side/SidePartyMembers';

// instantiate players for this scene:
const { race, playerClass } = randomRaceClassCombo();
export const { NPC, spritesheet } = randomNPC(race, playerClass);
