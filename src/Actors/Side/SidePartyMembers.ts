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

import { CLASSES, RACES, SEXES } from '../../constants';

// import classes
// Accursed
import { AccursedCleric } from '../Bases/Classes/Accursed/Cleric';
import { AccursedThief } from '../Bases/Classes/Accursed/Thief';
import { AccursedWarrior } from '../Bases/Classes/Accursed/Warrior';
import { AccursedWizard } from '../Bases/Classes/Accursed/Wizard';
// Elven
import { ElvenCleric } from '../Bases/Classes/Elven/Cleric';
import { ElvenThief } from '../Bases/Classes/Elven/Thief';
import { ElvenWarrior } from '../Bases/Classes/Elven/Warrior';
import { ElvenWizard } from '../Bases/Classes/Elven/Wizard';
// Half-Elven
import { HalfElfCleric } from '../Bases/Classes/HalfElves/Cleric';
import { HalfElfThief } from '../Bases/Classes/HalfElves/Thief';
import { HalfElfWarrior } from '../Bases/Classes/HalfElves/Warrior';
import { HalfElfWizard } from '../Bases/Classes/HalfElves/Wizard';
import { HumanCleric } from '../Bases/Classes/Human/Cleric';
import { HumanThief } from '../Bases/Classes/Human/Thief';
import { HumanWarrior } from '../Bases/Classes/Human/Warrior';
import { HumanWizard } from '../Bases/Classes/Human/Wizard';
import {
  accursedClericFemaleSprites,
  accursedClericMaleSprites,
  accursedThiefFemaleSprites,
  accursedThiefMaleSprites,
  accursedWarriorMaleSprites,
  // there are no accursedWarriorFemaleSprites
  accursedWizardFemaleSprites,
  accursedWizardMaleSprites,
  // all elven sprites are Female
  elvenClericFemaleSprites,
  elvenThiefFemaleSprites,
  elvenWizardFemaleSprites,
  // there are no elvenWarriorSprites
  halfElfClericFemaleSprites,
  halfElfClericMaleSprites,
  halfElfThiefFemaleSprites,
  halfElfThiefMaleSprites,
  halfElfWarriorFemaleSprites,
  halfElfWarriorMaleSprites,
  halfElfWizardFemaleSprites,
  halfElfWizardMaleSprites,
  humanClericFemaleSprites,
  humanClericMaleSprites,
  humanThiefFemaleSprites,
  humanThiefMaleSprites,
  humanWarriorFemaleSprites,
  humanWarriorMaleSprites,
  humanWizardFemaleSprites,
  humanWizardMaleSprites,
} from './SideSprites';

const randomlyGeneratedSex = () => {
  const sexes = [SEXES.MALE, SEXES.FEMALE];
  const sex = sexes[Math.floor(Math.random() * sexes.length)];
  return sex;
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

export const randomRaceClassCombo = () => {
  const allRaces = [RACES.ACCURSED, RACES.ELF, RACES.HALF_ELF, RACES.HUMAN];
  const race = allRaces[Math.floor(Math.random() * allRaces.length)];
  let playerClass;
  const allClasses = [
    CLASSES.CLERIC,
    CLASSES.THIEF,
    CLASSES.WARRIOR,
    CLASSES.WIZARD,
  ];

  const noWarriorClass = [CLASSES.CLERIC, CLASSES.THIEF, CLASSES.WIZARD];
  if (race === RACES.ELF) {
    // there is no warrior class among elves
    playerClass = noWarriorClass[Math.floor(Math.random() * 3)];
    return { race, playerClass };
  }

  playerClass = allClasses[Math.floor(Math.random() * 4)];
  return { race, playerClass };
};

function retrieveAccursedSpritesheet(playerClass: CLASSES, sex: SEXES) {
  let sprite;
  switch (playerClass) {
    case CLASSES.CLERIC:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * accursedClericMaleSprites.length);
        return accursedClericMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * accursedClericFemaleSprites.length);
      return accursedClericFemaleSprites[sprite];
    case CLASSES.THIEF:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * accursedThiefMaleSprites.length);
        return accursedThiefMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * accursedThiefFemaleSprites.length);
      return accursedThiefFemaleSprites[sprite];
    case CLASSES.WARRIOR:
      // there are no accursedWarriorFemaleSprites
      sprite = Math.floor(Math.random() * accursedWarriorMaleSprites.length);
      return accursedWarriorMaleSprites[sprite];
    case CLASSES.WIZARD:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * accursedWizardMaleSprites.length);
        return accursedWizardMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * accursedWizardFemaleSprites.length);
      return accursedWizardFemaleSprites[sprite];
    default:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * accursedClericMaleSprites.length);
        return accursedClericMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * accursedClericFemaleSprites.length);
      return accursedClericFemaleSprites[sprite];
  }
}

function retrieveElvenSpritesheet(playerClass: CLASSES) {
  let sprite;
  switch (playerClass) {
    case CLASSES.CLERIC:
      sprite = Math.floor(Math.random() * elvenClericFemaleSprites.length);
      return elvenClericFemaleSprites[sprite];
    case CLASSES.THIEF:
      sprite = Math.floor(Math.random() * elvenThiefFemaleSprites.length);
      return elvenThiefFemaleSprites[sprite];
    case CLASSES.WIZARD:
      sprite = Math.floor(Math.random() * elvenWizardFemaleSprites.length);
      return elvenWizardFemaleSprites[sprite];
    // there are no warriors among elves
    default:
      sprite = Math.floor(Math.random() * elvenClericFemaleSprites.length);
      return elvenClericFemaleSprites[sprite];
  }
}

function retrieveHalfElfSpritesheet(playerClass: CLASSES, sex: SEXES) {
  let sprite;
  switch (playerClass) {
    case CLASSES.CLERIC:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * halfElfClericMaleSprites.length);
        return halfElfClericMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * halfElfClericFemaleSprites.length);
      return halfElfClericFemaleSprites[sprite];
    case CLASSES.THIEF:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * halfElfThiefMaleSprites.length);
        return halfElfThiefMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * halfElfThiefFemaleSprites.length);
      return halfElfThiefFemaleSprites[sprite];
    case CLASSES.WARRIOR:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * halfElfWarriorMaleSprites.length);
        return halfElfWarriorMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * halfElfWarriorFemaleSprites.length);
      return halfElfWarriorFemaleSprites[sprite];
    case CLASSES.WIZARD:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * halfElfWizardMaleSprites.length);
        return halfElfWizardMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * halfElfWizardFemaleSprites.length);
      return halfElfWizardFemaleSprites[sprite];
    default:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * halfElfClericMaleSprites.length);
        return halfElfClericMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * halfElfClericFemaleSprites.length);
      return halfElfClericFemaleSprites[sprite];
  }
}

function retrieveHumanSpritesheet(playerClass: CLASSES, sex: SEXES) {
  let sprite;
  switch (playerClass) {
    case CLASSES.CLERIC:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * humanClericMaleSprites.length);
        return humanClericMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * humanClericFemaleSprites.length);
      return humanClericFemaleSprites[sprite];
    case CLASSES.THIEF:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * humanThiefMaleSprites.length);
        return humanThiefMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * humanThiefFemaleSprites.length);
      return humanThiefFemaleSprites[sprite];
    case CLASSES.WARRIOR:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * humanWarriorMaleSprites.length);
        return humanWarriorMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * humanWarriorFemaleSprites.length);
      return humanWarriorFemaleSprites[sprite];
    case CLASSES.WIZARD:
      if (sex === SEXES.MALE) {
        sprite = Math.floor(Math.random() * humanWizardMaleSprites.length);
        return humanWizardMaleSprites[sprite];
      }
      sprite = Math.floor(Math.random() * humanWizardFemaleSprites.length);
      return humanWizardFemaleSprites[sprite];
    default:
      sprite = Math.floor(Math.random() * humanClericMaleSprites.length);
      return humanClericMaleSprites[sprite];
  }
}

export const randomNPC = (race: RACES, playerClass: CLASSES) => {
  let NPC;
  let sex = randomlyGeneratedSex();
  let spritesheet;
  switch (race) {
    case RACES.ACCURSED:
      switch (playerClass) {
        case CLASSES.CLERIC:
          NPC = AccursedCleric;
          spritesheet = retrieveAccursedSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        case CLASSES.THIEF:
          NPC = AccursedThief;
          spritesheet = retrieveAccursedSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        case CLASSES.WARRIOR:
          NPC = AccursedWarrior;
          sex = SEXES.MALE; // there are no female accursed warriors
          spritesheet = retrieveAccursedSpritesheet(playerClass, SEXES.MALE);
          return { NPC, spritesheet, sex };
        case CLASSES.WIZARD:
          NPC = AccursedWizard;
          spritesheet = retrieveAccursedSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        default:
          NPC = AccursedCleric;
          spritesheet = retrieveAccursedSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
      }
    case RACES.ELF:
      switch (playerClass) {
        case CLASSES.CLERIC:
          NPC = ElvenCleric;
          sex = SEXES.FEMALE; // all elven sprites are female
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet, sex };
        case CLASSES.THIEF:
          NPC = ElvenThief;
          sex = SEXES.FEMALE; // all elven sprites are female
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet, sex };
        case CLASSES.WARRIOR:
          NPC = ElvenWarrior;
          sex = SEXES.FEMALE; // all elven sprites are female
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet, sex };
        case CLASSES.WIZARD:
          NPC = ElvenWizard;
          sex = SEXES.FEMALE; // all elven sprites are female
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet, sex };
        default:
          NPC = ElvenCleric;
          sex = SEXES.FEMALE; // all elven sprites are female
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet, sex };
      }
    case RACES.HALF_ELF:
      switch (playerClass) {
        case CLASSES.CLERIC:
          NPC = HalfElfCleric;
          spritesheet = retrieveHalfElfSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        case CLASSES.THIEF:
          NPC = HalfElfThief;
          spritesheet = retrieveHalfElfSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        case CLASSES.WARRIOR:
          NPC = HalfElfWarrior;
          spritesheet = retrieveHalfElfSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        case CLASSES.WIZARD:
          NPC = HalfElfWizard;
          spritesheet = retrieveHalfElfSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        default:
          NPC = HalfElfCleric;
          spritesheet = retrieveHalfElfSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
      }
    case RACES.HUMAN:
      switch (playerClass) {
        case CLASSES.CLERIC:
          NPC = HumanCleric;
          spritesheet = retrieveHumanSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        case CLASSES.THIEF:
          NPC = HumanThief;
          spritesheet = retrieveHumanSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        case CLASSES.WARRIOR:
          NPC = HumanWarrior;
          spritesheet = retrieveHumanSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        case CLASSES.WIZARD:
          NPC = HumanWizard;
          spritesheet = retrieveHumanSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
        default:
          NPC = HumanCleric;
          spritesheet = retrieveHumanSpritesheet(playerClass, sex);
          return { NPC, spritesheet, sex };
      }
    default:
      NPC = AccursedCleric;
      spritesheet = retrieveAccursedSpritesheet(playerClass, sex);
      return { NPC, spritesheet, sex };
  }
};
