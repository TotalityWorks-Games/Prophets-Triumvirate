export const elvenMaleNames = [
  'Thúlon',
  'Rávion',
  'Nambion',
  'Remmo',
  'Wistano',
  'Nécano',
  'Netyamo',
  'Luhtamo',
  'Serco',
  'Ristaro',
  'Yuro',
];

export const elvenFemaleNames = [
  'Lirillanis',
  'Hwanmë',
  'Turrë',
  'Ceutisse',
  'Fánamë',
  'Massemë',
  'Ranyisse',
  'Liltinde',
  'Níquetilë',
  'Canmë',
  'Círinde',
  'Panë',
];

export const humanMaleNames = [
  'Anthony',
  'Justin',
  'Gregory',
  'Max',
  'Moses',
  'Colen',
  'Matthew',
  'Luke',
  'Mark',
  'John',
  'Paul',
  'Peter',
  'James',
  'Benjamin',
  'Branson',
  'Kristopher',
  'Cody',
] as const;

export const humanFemaleNames = [
  'Brenda',
  'Tracey',
  'Susanna',
  'Ida',
  'Katherine',
  'Thea',
  'Zoe',
  'Heidi',
  'Barbara',
  'Rachael',
  'Rebecca',
  'Ruth',
] as const;

export const halfElvenMaleNames = [...elvenMaleNames, ...humanMaleNames];
export const halfElvenFemaleNames = [...elvenFemaleNames, ...humanFemaleNames];

export const accursedMaleNames = [
  'Iados',
  'Valerius',
  'Aranrias',
  'Salvir',
  'Kyakos',
  'Malenon',
  'Malxius',
  'Xarvius',
];

export const accursedFemaleNames = [
  'Bliss',
  'Grief',
  'Content',
  'Sorrow',
  'Harmony',
  'Hope',
  'Piety',
  'Glory',
  'Aid',
  'Gloom',
];
