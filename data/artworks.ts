export type Artwork = {
  slug: string;
  alt: string;
  thumb: string;
  large: string;
};

const items = [
  { file: 'cdmx_spunky.jpg', alt: 'CDMX Spunky' },
  { file: 'cdmx_lago_algo.jpg', alt: 'CDMX Lago Algo' },
  { file: 'nightwatch.jpg', alt: 'Nightwatch' },
  { file: 'west_portal.jpg', alt: 'West Portal' },
  { file: 'cdmx_masks.jpg', alt: 'CDMX Masks' },
  { file: 'abba_zabba.jpg', alt: 'Abba Zabba' },
  { file: 'a_bassist_wouldnt.jpg', alt: "A Bassist Wouldn't" },
  { file: 'learning_to_swing.jpg', alt: 'Learning to Swing' },
  { file: 'horse_pelican.jpg', alt: 'Horse Pelican' },
  { file: 'life_feels_more_urgent.jpg', alt: 'Life Feels More Urgent' },
  { file: 'buddy_baby_forever.jpg', alt: 'Buddy Baby Forever' },
  { file: 'summer_bounty.jpg', alt: 'Summer Bounty' },
  { file: 'business_goose.jpg', alt: 'Business Goose' },
  { file: 'spicy_eggplant_parm.jpg', alt: 'Spicy Eggplant Parm' },
  { file: 'catching_the_9.jpg', alt: 'Catching the 9' },
  { file: 'windy_bernal.jpg', alt: 'Windy Bernal' },
  { file: 'black_and_green_peau_d_ane.jpg', alt: "Black and Green Peau d'Ane" },
  { file: 'blue_rainbows.jpg', alt: 'Blue Rainbows' },
  { file: 'bug_like_an_angel.jpg', alt: 'Bug Like an Angel' },
  { file: 'cryin.jpg', alt: 'Cryin' },
  { file: 'habfurdo.jpg', alt: 'Habfurdo' },
  { file: 'spring_in_sac.jpg', alt: 'Spring in Sac' },
  { file: 'cdmx_franz_fanon.jpg', alt: 'CDMX Franz Fanon' },
  { file: 'kick_rocks.jpg', alt: 'Kick Rocks' },
  { file: 'ill_come_see_u.jpg', alt: "I'll Come See You" },
  { file: 'ravioli_angel_without_wings.jpg', alt: 'Ravioli Angel Without Wings' },
];

export const artworks: Artwork[] = items.map(({ file, alt }) => ({
  slug: file.replace(/\.jpg$/, ''),
  alt,
  thumb: `/images/thumbs/${file}`,
  large: `/images/large/${file}`,
}));
