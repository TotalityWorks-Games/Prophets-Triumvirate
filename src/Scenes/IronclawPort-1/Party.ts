// import random party member functions here
// then create however many the scene needs
// then export the actors into the scene file
// and export the spritesheet into the resources file

import {
  randomNPC,
  randomRaceClassCombo,
} from '../../Actors/Side/SidePartyMembers';

// instantiate 3 players for this scene:
const { race: sideMemberOneRace, playerClass: sideMemberOneClass } =
  randomRaceClassCombo();
export const {
  NPC: SideMemberOne,
  spritesheet: sideMemberOneSpritesheet,
  sex: sideMemberOneSex,
} = randomNPC(sideMemberOneRace, sideMemberOneClass);

const { race: sideMemberTwoRace, playerClass: sideMemberTwoClass } =
  randomRaceClassCombo();
export const {
  NPC: SideMemberTwo,
  spritesheet: sideMemberTwoSpritesheet,
  sex: sideMemberTwoSex,
} = randomNPC(sideMemberTwoRace, sideMemberTwoClass);

const { race: sideMemberThreeRace, playerClass: sideMemberThreeClass } =
  randomRaceClassCombo();
export const {
  NPC: SideMemberThree,
  spritesheet: sideMemberThreeSpritesheet,
  sex: sideMemberThreeSex,
} = randomNPC(sideMemberThreeRace, sideMemberThreeClass);
