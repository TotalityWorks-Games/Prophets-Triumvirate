/* 
Here's what I want:

I want the Player to be able to come across randomly placed NPCs throughout the game in different Scenes.

After an initial interaction (perhaps just a conversation, a trade of goods, a favor, or a fetch quest),
this NPC offers to join the party (the invitation is always open, even when declined; so a player can add them later at any time).

There should be a party limit (8?), that if reached even if the Player accepts the invite, the NPC will reply with:
"Aw man, it looks like your party's full already. Come back again when you need me."

If the Player already has a Safehouse unlocked, if the party limit is reached when the Player accepts the invite,
then the NPC will simply go to the Safehouse where the Player can swap between party members.


LOGIC:

1) Randomly generate an NPC:
    A) consider the spritesheet and how it must be loaded
    B) consider how to pair spritesheets with Race/Class bases
    C) consider how stats may be generated: level and ability scores
    D) consider what their inventory may be
    E) 

2) Place randomly generated NPC in particular locations throughout the game.

3) Create interations:

    A) randomly generated conversations
    B) randomly generated option to trade items
    C) randomly generated favor to ask
    D) randomly generated fetch quest

4) Create open invitation and persist invitation after interaction is successful

5) If accepted, add NPC to party:

    A) If party limit is not reached, add NPC.
    B) If party limit is reached, and Safehouse is not unlocked, display rejection dialogue.
    C) If party limit is reached, and Safehouse is unlocked, add NPC to Safehouse.
    
6) Add ability to swap NPCs from Safehouse to party and vice versa.

*/

import { AbilityScores, Direction, RACES } from '../../constants';
import { AccursedCleric } from '../Bases/Classes/Accursed/Cleric';
import { AccursedThief } from '../Bases/Classes/Accursed/Thief';
import { AccursedWarrior } from '../Bases/Classes/Accursed/Warrior';
import { AccursedWizard } from '../Bases/Classes/Accursed/Wizard';
import { ElvenCleric } from '../Bases/Classes/Elven/Cleric';
import { ElvenThief } from '../Bases/Classes/Elven/Thief';
import { ElvenWarrior } from '../Bases/Classes/Elven/Warrior';
import { ElvenWizard } from '../Bases/Classes/Elven/Wizard';
import { HalfElfCleric } from '../Bases/Classes/HalfElves/Cleric';
import { HalfElfThief } from '../Bases/Classes/HalfElves/Thief';
import { HalfElfWarrior } from '../Bases/Classes/HalfElves/Warrior';
import { HalfElfWizard } from '../Bases/Classes/HalfElves/Wizard';
import { HumanCleric } from '../Bases/Classes/Human/Cleric';
import { HumanThief } from '../Bases/Classes/Human/Thief';
import { HumanWarrior } from '../Bases/Classes/Human/Warrior';
import { HumanWizard } from '../Bases/Classes/Human/Wizard';
import accursedSpritePath from '../../../Resources/Sheets/Characters/Side/Character005.png?url';
import { Accursed } from '../Bases/Races/Accursed';
import { ImageSource, Vector } from 'excalibur';

function randomRace() {
  return RACES.ACCURSED;
}

const accursedClasses: Array<
  new (
    vec: Vector,
    resource: ImageSource,
    level: number,
    scores: AbilityScores,
    direction?: Direction
  ) => Accursed
> = [AccursedCleric, AccursedThief, AccursedWarrior, AccursedWizard];

const elvenClasses = [ElvenCleric, ElvenThief, ElvenWarrior, ElvenWizard];
const halfElvenClasses = [
  HalfElfCleric,
  HalfElfThief,
  HalfElfWarrior,
  HalfElfWizard,
];

const humanClasses = [HumanCleric, HumanThief, HumanWarrior, HumanWizard];

const randomAccursed = () => {
  return accursedClasses[0];
};

function randomAccursedSpritesheet() {
  // random male or female
  // return sprite accordingly
  return accursedSpritePath;
}

function randomElfSpritesheet() {
  // random male or female
  // return sprite accordingly
  return accursedSpritePath;
}

function randomHumanSpritesheet() {
  // random male or female
  // return sprite accordingly
  return accursedSpritePath;
}

const randomlyGeneratedSpritesheet = (randomlyGeneratedRace: RACES) => {
  switch (randomlyGeneratedRace) {
    case RACES.ACCURSED:
      return randomAccursedSpritesheet();
    case RACES.ELF:
    case RACES.HALF_ELF:
      return randomElfSpritesheet();
    case RACES.HUMAN:
      return randomHumanSpritesheet();
    default:
      return randomHumanSpritesheet();
  }
};

export const randomlyGeneratedNpc = () => {
  const race = randomRace();
  switch (race) {
    case RACES.ACCURSED:
      return {
        NPC: randomAccursed(),
        spritesheeet: randomlyGeneratedSpritesheet(race),
      };
    case RACES.ELF:
    case RACES.HALF_ELF:
      return {
        NPC: randomAccursed(),
        spritesheeet: randomlyGeneratedSpritesheet(race),
      };
    case RACES.HUMAN:
      return {
        NPC: randomAccursed(),
        spritesheeet: randomlyGeneratedSpritesheet(race),
      };
    default:
      return {
        NPC: randomAccursed(),
        spritesheeet: randomlyGeneratedSpritesheet(race),
      };
  }
};

export const randomlyGeneratedLevel = () => {
  return 1;
};
export const randomlyGeneratedAbilityScores = () => {
  return {
    strength: 18,
    dexterity: 14,
    constitution: 13,
    wisdom: 10,
    intelligence: 9,
    charisma: 13,
  };
};
export const randomlyGeneratedInventory = () => {
  return ['thing'];
};
