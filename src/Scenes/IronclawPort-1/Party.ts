// for potential party members
import { vec } from 'excalibur';
import {
  randomlyGeneratedNpc,
  randomlyGeneratedAbilityScores,
  randomlyGeneratedInventory,
  randomlyGeneratedLevel,
  randomlyGeneratedSpritesheet,
} from '../../Actors/Main/OtherPartyMembers';

const { NPC, spritesheeet } = randomlyGeneratedNpc();

export const partyMemberExtraOne = new NPC(
  vec(1990, 2270),
  randomlyGeneratedLevel(),
  randomlyGeneratedAbilityScores()
);
export const partyMemberExtraOneSpritesheet = randomlyGeneratedSpritesheet(
  partyMemberExtraOne.race
);
partyMemberExtraOne.updateSpritesheet(partyMemberExtraOneSpritesheet);
partyMemberExtraOne.addToInventory(randomlyGeneratedInventory());
