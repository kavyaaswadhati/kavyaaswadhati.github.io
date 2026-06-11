const artworks = [
  { file: 'cdmx_spunky.png', alt: 'CDMX Spunky' },
  { file: 'cdmx_lago_algo.png', alt: 'CDMX Lago Algo' },
  { file: 'nightwatch.png', alt: 'Nightwatch' },
  { file: 'west_portal.png', alt: 'West Portal' },
  { file: 'cdmx_masks.png', alt: 'CDMX Masks' },
  { file: 'abba_zabba.png', alt: 'Abba Zabba' },
  { file: 'a_bassist_wouldnt.png', alt: "A Bassist Wouldn't" },
  { file: 'learning_to_swing.png', alt: 'Learning to Swing' },
  { file: 'horse_pelican.png', alt: 'Horse Pelican' },
  { file: 'life_feels_more_urgent.png', alt: 'Life Feels More Urgent' },
  { file: 'buddy_baby_forever.png', alt: 'Buddy Baby Forever' },
  { file: 'summer_bounty.png', alt: 'Summer Bounty' },
  { file: 'business_goose.png', alt: 'Business Goose' },
  { file: 'spicy_eggplant_parm.png', alt: 'Spicy Eggplant Parm' },
  { file: 'catching_the_9.png', alt: 'Catching the 9' },
  { file: 'windy_bernal.png', alt: 'Windy Bernal' },
  { file: 'black_and_green_peau_d_ane.png', alt: "Black and Green Peau d'Ane" },
  { file: 'blue_rainbows.png', alt: 'Blue Rainbows' },
  { file: 'bug_like_an_angel.png', alt: 'Bug Like an Angel' },
  { file: 'cryin.png', alt: 'Cryin' },
  { file: 'habfurdo.png', alt: 'Habfurdo' },
  { file: 'spring_in_sac.png', alt: 'Spring in Sac' },
  { file: 'cdmx_franz_fanon.png', alt: 'CDMX Franz Fanon' },
  { file: 'kick_rocks.png', alt: 'Kick Rocks' },
  { file: 'ill_come_see_u.png', alt: "I'll Come See You" },
  { file: 'ravioli_angel_without_wings.png', alt: 'Ravioli Angel Without Wings' },
];

const gallery = document.querySelector('#gallery');

if (gallery) {
  artworks.forEach(({ file, alt }) => {
    const item = document.createElement('figure');
    const image = document.createElement('img');

    item.className = 'gallery-item';
    image.src = `images/${file}`;
    image.alt = alt;

    item.append(image);
    gallery.append(item);
  });
}
