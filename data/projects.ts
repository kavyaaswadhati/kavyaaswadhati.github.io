export type ProjectImage = {
  slug: string;
  alt: string;
  thumb: string;
  large: string;
};

export type ProjectGroup = {
  title?: string;
  layout?: 'gallery' | 'flipbook';
  description?: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  images: ProjectImage[];
};

export type ProjectSection = {
  id: 'sketchbooks' | 'zines';
  label: string;
  groups: ProjectGroup[];
};

const sketchbookItems = [
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

const northernElephantSealsItems = [
  { file: '00_front.jpg', alt: 'Northern Elephant Seals front cover' },
  { file: '01.jpg', alt: 'Northern Elephant Seals page 1' },
  { file: '02.jpg', alt: 'Northern Elephant Seals page 2' },
  { file: '03.jpg', alt: 'Northern Elephant Seals page 3' },
  { file: '04.jpg', alt: 'Northern Elephant Seals page 4' },
  { file: '05.jpg', alt: 'Northern Elephant Seals page 5' },
  { file: '06.jpg', alt: 'Northern Elephant Seals page 6' },
  { file: '07.jpg', alt: 'Northern Elephant Seals page 7' },
  { file: '08.jpg', alt: 'Northern Elephant Seals page 8' },
  { file: '09.jpg', alt: 'Northern Elephant Seals page 9' },
  { file: '10.jpg', alt: 'Northern Elephant Seals page 10' },
  { file: '11.jpg', alt: 'Northern Elephant Seals page 11' },
  { file: '12.jpg', alt: 'Northern Elephant Seals page 12' },
  { file: '13.jpg', alt: 'Northern Elephant Seals page 13' },
  { file: '14.jpg', alt: 'Northern Elephant Seals page 14' },
  { file: '16_back_cover.jpg', alt: 'Northern Elephant Seals back cover' },
];

const imageFromFile = (
  section: ProjectSection['id'],
  file: string,
  alt: string,
  folder = '',
): ProjectImage => ({
  slug: `${folder}${file}`.replace(/\.jpg$/, '').replace(/\//g, '-'),
  alt,
  thumb: `/images/${section}/thumbs/${folder}${file}`,
  large: `/images/${section}/large/${folder}${file}`,
});

export const projectSections: ProjectSection[] = [
  {
    id: 'sketchbooks',
    label: 'sketchbooks',
    groups: [
      {
        images: sketchbookItems.map(({ file, alt }) => imageFromFile('sketchbooks', file, alt)),
      },
    ],
  },
  {
    id: 'zines',
    label: 'zines',
    groups: [
      {
        title: 'northern elephant seals',
        layout: 'flipbook',
        description: '',
        links: [],
        images: northernElephantSealsItems.map(({ file, alt }) =>
          imageFromFile('zines', file, alt, 'northern-elephant-seals/'),
        ),
      },
    ],
  },
];
