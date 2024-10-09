export const IronclawPortDialogues = [
  {
    actor: 'Delsaran', // should match the name of the actor entity
    text: 'Press SHIFT to run!',
  },
  {
    actor: 'default', // when no actor or object can be found
    text: 'Nothing interesting over here.',
  },
];

type Dialogues = {
  actor: string;
  text: string;
}[];
