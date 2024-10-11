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

// import character spritesheets
// Accursed Clerics
import accursedClericMale01SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Cleric/Male/Character027.png?url';
import accursedClericMale02SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Cleric/Male/Character107.png?url';
import accursedClericFemale01SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Cleric/Female/Character048.png?url';
// Accursed Thieves
import accursedThiefMale01SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Thief/Male/Character027.png?url';
import accursedThiefMale02SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Thief/Male/Character095.png?url';
import accursedTheifFemale01SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Thief/Female/Character048.png?url';
// Accursed Warriors
import accursedWarriorMale01SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Warrior/Male/Character005.png?url';
import accursedWarriorMale02SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Warrior/Male/Character027.png?url';
import accursedWarriorMale03SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Warrior/Male/Character095.png?url';
// Accursed Wizards
import accursedWizardMale01SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Wizard/Male/Character027.png?url';
import accursedWizardMale02SpritePath from '../../../Resources/Sheets/Characters/Side/Accursed/Wizard/Male/Character107.png?url';
import accursedWizardFemale from '../../../Resources/Sheets/Characters/Side/Accursed/Wizard/Female/Character048.png?url';

// Elven Clerics
import elvenClericFemale01SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Cleric/Female/Character086.png?url';
import elvenClericFemale02SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Cleric/Female/Character087.png?url';
import elvenClericFemale03SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Cleric/Female/Character088.png?url';
import elvenClericFemale04SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Cleric/Female/Character090.png?url';
import elvenClericFemale05SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Cleric/Female/Character136.png?url';
import elvenClericFemale06SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Cleric/Female/Character137.png?url';
import elvenClericFemale07SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Cleric/Female/Character138.png?url';
import elvenClericFemale08SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Cleric/Female/Character139.png?url';
// Elven Thieves
import elvenThiefFemale01SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Thief/Female/Character136.png?url';
import elvenThiefFemale02SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Thief/Female/Character137.png?url';
import elvenThiefFemale03SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Thief/Female/Character138.png?url';
import elvenThiefFemale04SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Thief/Female/Character139.png?url';
import elvenThiefFemale05SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Thief/Female/Character154.png?url';
// Elven Warriors - There are no elven warriors
// Elven Wizards
import elvenWizardFemale01SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Wizard/Female/Character086.png?url';
import elvenWizardFemale02SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Wizard/Female/Character087.png?url';
import elvenWizardFemale03SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Wizard/Female/Character088.png?url';
import elvenWizardFemale04SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Wizard/Female/Character090.png?url';
import elvenWizardFemale05SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Wizard/Female/Character136.png?url';
import elvenWizardFemale06SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Wizard/Female/Character137.png?url';
import elvenWizardFemale07SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Wizard/Female/Character138.png?url';
import elvenWizardFemale08SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Wizard/Female/Character139.png?url';
import elvenWizardFemale09SpritePath from '../../../Resources/Sheets/Characters/Side/Elven/Wizard/Female/Character154.png?url';

const accursedClericSprites = [
  accursedClericMale01SpritePath,
  accursedClericMale02SpritePath,
  accursedClericFemale01SpritePath,
];

const accursedThiefSprites = [
  accursedThiefMale01SpritePath,
  accursedThiefMale02SpritePath,
  accursedTheifFemale01SpritePath,
];

const accursedWarriorSprites = [
  accursedWarriorMale01SpritePath,
  accursedWarriorMale02SpritePath,
  accursedWarriorMale03SpritePath,
];

const accursedWizardSprites = [
  accursedWizardMale01SpritePath,
  accursedWizardMale02SpritePath,
  accursedWizardFemale,
];

const elvenClericSprites = [
  elvenClericFemale01SpritePath,
  elvenClericFemale02SpritePath,
  elvenClericFemale03SpritePath,
  elvenClericFemale04SpritePath,
  elvenClericFemale05SpritePath,
  elvenClericFemale06SpritePath,
  elvenClericFemale07SpritePath,
  elvenClericFemale08SpritePath,
];

const elvenThiefSprites = [
  elvenThiefFemale01SpritePath,
  elvenThiefFemale02SpritePath,
  elvenThiefFemale03SpritePath,
  elvenThiefFemale04SpritePath,
  elvenThiefFemale05SpritePath,
];

const elvenWizardSprites = [
  elvenWizardFemale01SpritePath,
  elvenWizardFemale02SpritePath,
  elvenWizardFemale03SpritePath,
  elvenWizardFemale04SpritePath,
  elvenWizardFemale05SpritePath,
  elvenWizardFemale06SpritePath,
  elvenWizardFemale07SpritePath,
  elvenWizardFemale08SpritePath,
  elvenWizardFemale09SpritePath,
];

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
  const allRaces = [RACES.ACCURSED, RACES.ELF];
  const race = allRaces[Math.floor(Math.random() * 2)];
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
    default:
      NPC = AccursedCleric;
      spritesheet = retrieveAccursedSpritesheet(playerClass);
      return { NPC, spritesheet };
  }
};
