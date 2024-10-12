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

// Half-Elf Clerics
import halfElfClericMale01SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character007.png?url';
import halfElfClericMale02SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character008.png?url';
import halfElfClericMale03SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character021.png?url';
import halfElfClericMale04SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character024.png?url';
import halfElfClericMale05SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character028.png?url';
import halfElfClericMale06SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character029.png?url';
import halfElfClericMale07SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character030.png?url';
import halfElfClericMale08SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character037.png?url';
import halfElfClericMale09SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character038.png?url';
import halfElfClericMale10SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character040.png?url';
import halfElfClericMale11SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character096.png?url';
import halfElfClericMale12SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character097.png?url';
import halfElfClericMale13SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character098.png?url';
import halfElfClericMale14SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character099.png?url';
import halfElfClericMale15SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Male/Character100.png?url';
import halfElfClericFemale01SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character011.png?url';
import halfElfClericFemale02SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character012.png?url';
import halfElfClericFemale03SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character013.png?url';
import halfElfClericFemale04SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character014.png?url';
import halfElfClericFemale05SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character015.png?url';
import halfElfClericFemale06SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character031.png?url';
import halfElfClericFemale07SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character033.png?url';
import halfElfClericFemale08SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character034.png?url';
import halfElfClericFemale09SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character035.png?url';
import halfElfClericFemale10SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character046.png?url';
import halfElfClericFemale11SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character047.png?url';
import halfElfClericFemale12SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character049.png?url';
import halfElfClericFemale13SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character050.png?url';
import halfElfClericFemale14SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character061.png?url';
import halfElfClericFemale15SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character079.png?url';
import halfElfClericFemale16SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character086.png?url';
import halfElfClericFemale17SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character087.png?url';
import halfElfClericFemale18SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character088.png?url';
import halfElfClericFemale19SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character090.png?url';
import halfElfClericFemale20SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character112.png?url';
import halfElfClericFemale21SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character136.png?url';
import halfElfClericFemale22SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character137.png?url';
import halfElfClericFemale23SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character138.png?url';
import halfElfClericFemale24SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character139.png?url';
import halfElfClericFemale25SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Cleric/Female/Character173.png?url';

// Half-Elf Thieves
import halfElfThiefMale01SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Male/Character022.png?url';
import halfElfThiefMale02SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Male/Character028.png?url';
import halfElfThiefMale03SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Male/Character029.png?url';
import halfElfThiefMale04SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Male/Character030.png?url';
import halfElfThiefMale05SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Male/Character037.png?url';
import halfElfThiefMale06SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Male/Character038.png?url';
import halfElfThiefMale07SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Male/Character040.png?url';
import halfElfThiefMale08SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Male/Character045.png?url';
import halfElfThiefFemale01SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character011.png?url';
import halfElfThiefFemale02SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character012.png?url';
import halfElfThiefFemale03SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character013.png?url';
import halfElfThiefFemale04SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character014.png?url';
import halfElfThiefFemale05SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character015.png?url';
import halfElfThiefFemale06SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character031.png?url';
import halfElfThiefFemale07SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character033.png?url';
import halfElfThiefFemale08SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character034.png?url';
import halfElfThiefFemale09SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character035.png?url';
import halfElfThiefFemale10SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character046.png?url';
import halfElfThiefFemale11SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character047.png?url';
import halfElfThiefFemale12SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character049.png?url';
import halfElfThiefFemale13SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character050.png?url';
import halfElfThiefFemale14SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character062.png?url';
import halfElfThiefFemale15SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character112.png?url';
import halfElfThiefFemale16SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character136.png?url';
import halfElfThiefFemale17SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character137.png?url';
import halfElfThiefFemale18SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character138.png?url';
import halfElfThiefFemale19SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character139.png?url';
import halfElfThiefFemale20SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Thief/Female/Character170.png?url';

// Half-Elf Warriors
import halfElfWarriorMale01SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character001.png?url';
import halfElfWarriorMale02SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character002.png?url';
import halfElfWarriorMale03SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character004.png?url';
import halfElfWarriorMale04SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character007.png?url';
import halfElfWarriorMale05SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character008.png?url';
import halfElfWarriorMale06SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character009.png?url';
import halfElfWarriorMale07SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character016.png?url';
import halfElfWarriorMale08SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character017.png?url';
import halfElfWarriorMale09SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character018.png?url';
import halfElfWarriorMale10SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character021.png?url';
import halfElfWarriorMale11SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character022.png?url';
import halfElfWarriorMale12SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character024.png?url';
import halfElfWarriorMale13SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character028.png?url';
import halfElfWarriorMale14SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character029.png?url';
import halfElfWarriorMale15SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character030.png?url';
import halfElfWarriorMale16SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character091.png?url';
import halfElfWarriorMale17SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character092.png?url';
import halfElfWarriorMale18SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character093.png?url';
import halfElfWarriorMale19SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character094.png?url';
import halfElfWarriorMale20SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character109.png?url';
import halfElfWarriorMale21SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character156.png?url';
import halfElfWarriorMale22SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character157.png?url';
import halfElfWarriorMale23SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Male/Character158.png?url';
import halfElfWarriorFemale01SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Female/Character187.png?url';
import halfElfWarriorFemale02SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Female/Character188.png?url';
import halfElfWarriorFemale03SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Warrior/Female/Character189.png?url';

// Half-Elf Wizards
import halfElfWizardMale01SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character009.png';
import halfElfWizardMale02SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character016.png';
import halfElfWizardMale03SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character017.png';
import halfElfWizardMale04SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character018.png';
import halfElfWizardMale05SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character022.png';
import halfElfWizardMale06SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character028.png';
import halfElfWizardMale07SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character029.png';
import halfElfWizardMale08SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character030.png';
import halfElfWizardMale09SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character045.png';
import halfElfWizardMale10SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character096.png';
import halfElfWizardMale11SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character097.png';
import halfElfWizardMale12SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character098.png';
import halfElfWizardMale13SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character099.png';
import halfElfWizardMale14SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character100.png';
import halfElfWizardMale15SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Male/Character109.png';
import halfElfWizardFemale01SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character031.png';
import halfElfWizardFemale02SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character033.png';
import halfElfWizardFemale03SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character034.png';
import halfElfWizardFemale04SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character035.png';
import halfElfWizardFemale05SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character046.png';
import halfElfWizardFemale06SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character047.png';
import halfElfWizardFemale07SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character049.png';
import halfElfWizardFemale08SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character050.png';
import halfElfWizardFemale09SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character076.png';
import halfElfWizardFemale10SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character077.png';
import halfElfWizardFemale11SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character078.png';
import halfElfWizardFemale12SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character080.png';
import halfElfWizardFemale13SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character086.png';
import halfElfWizardFemale14SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character087.png';
import halfElfWizardFemale15SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character088.png';
import halfElfWizardFemale16SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character090.png';
import halfElfWizardFemale17SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character101.png';
import halfElfWizardFemale18SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character102.png';
import halfElfWizardFemale19SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character104.png';
import halfElfWizardFemale20SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character112.png';
import halfElfWizardFemale21SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character136.png';
import halfElfWizardFemale22SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character138.png';
import halfElfWizardFemale23SpritePath from '../../../Resources/Sheets/Characters/Side/HalfElven/Wizard/Female/Character139.png';

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

const halfElfClericSprites = [
  halfElfClericMale01SpritePath,
  halfElfClericMale02SpritePath,
  halfElfClericMale03SpritePath,
  halfElfClericMale04SpritePath,
  halfElfClericMale05SpritePath,
  halfElfClericMale06SpritePath,
  halfElfClericMale07SpritePath,
  halfElfClericMale08SpritePath,
  halfElfClericMale09SpritePath,
  halfElfClericMale10SpritePath,
  halfElfClericMale11SpritePath,
  halfElfClericMale12SpritePath,
  halfElfClericMale13SpritePath,
  halfElfClericMale14SpritePath,
  halfElfClericMale15SpritePath,
  halfElfClericFemale01SpritePath,
  halfElfClericFemale02SpritePath,
  halfElfClericFemale03SpritePath,
  halfElfClericFemale04SpritePath,
  halfElfClericFemale05SpritePath,
  halfElfClericFemale06SpritePath,
  halfElfClericFemale07SpritePath,
  halfElfClericFemale08SpritePath,
  halfElfClericFemale09SpritePath,
  halfElfClericFemale10SpritePath,
  halfElfClericFemale11SpritePath,
  halfElfClericFemale12SpritePath,
  halfElfClericFemale13SpritePath,
  halfElfClericFemale14SpritePath,
  halfElfClericFemale15SpritePath,
  halfElfClericFemale16SpritePath,
  halfElfClericFemale17SpritePath,
  halfElfClericFemale18SpritePath,
  halfElfClericFemale19SpritePath,
  halfElfClericFemale20SpritePath,
  halfElfClericFemale21SpritePath,
  halfElfClericFemale22SpritePath,
  halfElfClericFemale23SpritePath,
  halfElfClericFemale24SpritePath,
  halfElfClericFemale25SpritePath,
];

const halfElfThiefSprites = [
  halfElfThiefMale01SpritePath,
  halfElfThiefMale02SpritePath,
  halfElfThiefMale03SpritePath,
  halfElfThiefMale04SpritePath,
  halfElfThiefMale05SpritePath,
  halfElfThiefMale06SpritePath,
  halfElfThiefMale07SpritePath,
  halfElfThiefMale08SpritePath,
  halfElfThiefFemale01SpritePath,
  halfElfThiefFemale02SpritePath,
  halfElfThiefFemale03SpritePath,
  halfElfThiefFemale04SpritePath,
  halfElfThiefFemale05SpritePath,
  halfElfThiefFemale06SpritePath,
  halfElfThiefFemale07SpritePath,
  halfElfThiefFemale08SpritePath,
  halfElfThiefFemale09SpritePath,
  halfElfThiefFemale10SpritePath,
  halfElfThiefFemale11SpritePath,
  halfElfThiefFemale12SpritePath,
  halfElfThiefFemale13SpritePath,
  halfElfThiefFemale14SpritePath,
  halfElfThiefFemale15SpritePath,
  halfElfThiefFemale16SpritePath,
  halfElfThiefFemale17SpritePath,
  halfElfThiefFemale18SpritePath,
  halfElfThiefFemale19SpritePath,
  halfElfThiefFemale20SpritePath,
];

const halfElfWarriorSprites = [
  halfElfWarriorMale01SpritePath,
  halfElfWarriorMale02SpritePath,
  halfElfWarriorMale03SpritePath,
  halfElfWarriorMale04SpritePath,
  halfElfWarriorMale05SpritePath,
  halfElfWarriorMale06SpritePath,
  halfElfWarriorMale07SpritePath,
  halfElfWarriorMale08SpritePath,
  halfElfWarriorMale09SpritePath,
  halfElfWarriorMale10SpritePath,
  halfElfWarriorMale11SpritePath,
  halfElfWarriorMale12SpritePath,
  halfElfWarriorMale13SpritePath,
  halfElfWarriorMale14SpritePath,
  halfElfWarriorMale15SpritePath,
  halfElfWarriorMale16SpritePath,
  halfElfWarriorMale17SpritePath,
  halfElfWarriorMale18SpritePath,
  halfElfWarriorMale19SpritePath,
  halfElfWarriorMale20SpritePath,
  halfElfWarriorMale21SpritePath,
  halfElfWarriorMale22SpritePath,
  halfElfWarriorMale23SpritePath,
  halfElfWarriorFemale01SpritePath,
  halfElfWarriorFemale02SpritePath,
  halfElfWarriorFemale03SpritePath,
];

const halfElfWizardSprites = [
  halfElfWizardMale01SpritePath,
  halfElfWizardMale02SpritePath,
  halfElfWizardMale03SpritePath,
  halfElfWizardMale04SpritePath,
  halfElfWizardMale05SpritePath,
  halfElfWizardMale06SpritePath,
  halfElfWizardMale07SpritePath,
  halfElfWizardMale08SpritePath,
  halfElfWizardMale09SpritePath,
  halfElfWizardMale10SpritePath,
  halfElfWizardMale11SpritePath,
  halfElfWizardMale12SpritePath,
  halfElfWizardMale13SpritePath,
  halfElfWizardMale14SpritePath,
  halfElfWizardMale15SpritePath,
  halfElfWizardFemale01SpritePath,
  halfElfWizardFemale02SpritePath,
  halfElfWizardFemale03SpritePath,
  halfElfWizardFemale04SpritePath,
  halfElfWizardFemale05SpritePath,
  halfElfWizardFemale06SpritePath,
  halfElfWizardFemale07SpritePath,
  halfElfWizardFemale08SpritePath,
  halfElfWizardFemale09SpritePath,
  halfElfWizardFemale10SpritePath,
  halfElfWizardFemale11SpritePath,
  halfElfWizardFemale12SpritePath,
  halfElfWizardFemale13SpritePath,
  halfElfWizardFemale14SpritePath,
  halfElfWizardFemale15SpritePath,
  halfElfWizardFemale16SpritePath,
  halfElfWizardFemale17SpritePath,
  halfElfWizardFemale18SpritePath,
  halfElfWizardFemale19SpritePath,
  halfElfWizardFemale20SpritePath,
  halfElfWizardFemale21SpritePath,
  halfElfWizardFemale22SpritePath,
  halfElfWizardFemale23SpritePath,
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
