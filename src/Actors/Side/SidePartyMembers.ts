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

import { CLASSES, RACES } from '../../constants';

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
import {
  accursedClericSprites,
  accursedThiefSprites,
  accursedWarriorSprites,
  accursedWizardSprites,
  elvenClericSprites,
  elvenThiefSprites,
  // there are no elvenWarriorSprites
  elvenWizardSprites,
  halfElfClericSprites,
  halfElfThiefSprites,
  halfElfWarriorSprites,
  halfElfWizardSprites,
} from './SideSprites';

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
  const allRaces = [RACES.ACCURSED, RACES.ELF, RACES.HALF_ELF];
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

function retrieveAccursedSpritesheet(playerClass: CLASSES) {
  let sprite;
  switch (playerClass) {
    case CLASSES.CLERIC:
      sprite = Math.floor(Math.random() * accursedClericSprites.length);
      return accursedClericSprites[sprite];
    case CLASSES.THIEF:
      sprite = Math.floor(Math.random() * accursedThiefSprites.length);
      return accursedThiefSprites[sprite];
    case CLASSES.WARRIOR:
      sprite = Math.floor(Math.random() * accursedWarriorSprites.length);
      return accursedWarriorSprites[sprite];
    case CLASSES.WIZARD:
      sprite = Math.floor(Math.random() * accursedWizardSprites.length);
      return accursedWizardSprites[sprite];
    default:
      sprite = Math.floor(Math.random() * accursedClericSprites.length);
      return accursedClericSprites[sprite];
  }
}

function retrieveElvenSpritesheet(playerClass: CLASSES) {
  let sprite;
  switch (playerClass) {
    case CLASSES.CLERIC:
      sprite = Math.floor(Math.random() * elvenClericSprites.length);
      return elvenClericSprites[sprite];
    case CLASSES.THIEF:
      sprite = Math.floor(Math.random() * elvenThiefSprites.length);
      return elvenThiefSprites[sprite];
    case CLASSES.WIZARD:
      sprite = Math.floor(Math.random() * elvenWizardSprites.length);
      return elvenWizardSprites[sprite];
    // there are no warriors among elves
    default:
      sprite = Math.floor(Math.random() * elvenClericSprites.length);
      return elvenClericSprites[sprite];
  }
}

function retrieveHalfElfSpritesheet(playerClass: CLASSES) {
  let sprite;
  switch (playerClass) {
    case CLASSES.CLERIC:
      sprite = Math.floor(Math.random() * halfElfClericSprites.length);
      return halfElfClericSprites[sprite];
    case CLASSES.THIEF:
      sprite = Math.floor(Math.random() * halfElfThiefSprites.length);
      return halfElfThiefSprites[sprite];
    case CLASSES.WARRIOR:
      sprite = Math.floor(Math.random() * halfElfWarriorSprites.length);
      return halfElfWarriorSprites[sprite];
    case CLASSES.WIZARD:
      sprite = Math.floor(Math.random() * halfElfWizardSprites.length);
      return halfElfWizardSprites[sprite];
    default:
      sprite = Math.floor(Math.random() * halfElfClericSprites.length);
      return halfElfClericSprites[sprite];
  }
}

export const randomNPC = (race: RACES, playerClass: CLASSES) => {
  let NPC;
  let spritesheet;
  switch (race) {
    case RACES.ACCURSED:
      switch (playerClass) {
        case CLASSES.CLERIC:
          NPC = AccursedCleric;
          spritesheet = retrieveAccursedSpritesheet(playerClass);
          return { NPC, spritesheet };
        case CLASSES.THIEF:
          NPC = AccursedThief;
          spritesheet = retrieveAccursedSpritesheet(playerClass);
          return { NPC, spritesheet };
        case CLASSES.WARRIOR:
          NPC = AccursedWarrior;
          spritesheet = retrieveAccursedSpritesheet(playerClass);
          return { NPC, spritesheet };
        case CLASSES.WIZARD:
          NPC = AccursedWizard;
          spritesheet = retrieveAccursedSpritesheet(playerClass);
          return { NPC, spritesheet };
        default:
          NPC = AccursedCleric;
          spritesheet = retrieveAccursedSpritesheet(playerClass);
          return { NPC, spritesheet };
      }
    case RACES.ELF:
      switch (playerClass) {
        case CLASSES.CLERIC:
          NPC = ElvenCleric;
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet };
        case CLASSES.THIEF:
          NPC = ElvenThief;
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet };
        case CLASSES.WARRIOR:
          NPC = ElvenWarrior;
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet };
        case CLASSES.WIZARD:
          NPC = ElvenWizard;
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet };
        default:
          NPC = ElvenCleric;
          spritesheet = retrieveElvenSpritesheet(playerClass);
          return { NPC, spritesheet };
      }
    case RACES.HALF_ELF:
      switch (playerClass) {
        case CLASSES.CLERIC:
          NPC = HalfElfCleric;
          spritesheet = retrieveHalfElfSpritesheet(playerClass);
          return { NPC, spritesheet };
        case CLASSES.THIEF:
          NPC = HalfElfThief;
          spritesheet = retrieveHalfElfSpritesheet(playerClass);
          return { NPC, spritesheet };
        case CLASSES.WARRIOR:
          NPC = HalfElfWarrior;
          spritesheet = retrieveHalfElfSpritesheet(playerClass);
          return { NPC, spritesheet };
        case CLASSES.WIZARD:
          NPC = HalfElfWizard;
          spritesheet = retrieveHalfElfSpritesheet(playerClass);
          return { NPC, spritesheet };
        default:
          NPC = HalfElfCleric;
          spritesheet = retrieveHalfElfSpritesheet(playerClass);
          return { NPC, spritesheet };
      }
    default:
      NPC = AccursedCleric;
      spritesheet = retrieveAccursedSpritesheet(playerClass);
      return { NPC, spritesheet };
  }
};
