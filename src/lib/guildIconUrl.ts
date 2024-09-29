import wikiImage from './wikiImage';

const guildIconWikiPaths = [
  '/a/a5/Guild_Mark_1.svg',
  '/2/28/Guild_Mark_2.svg',
  '/9/95/Guild_Mark_3.svg',
  '/8/82/Guild_Mark_4.svg',
  '/3/3e/Guild_Mark_5.svg',
  '/3/3d/Guild_Mark_6.svg',
  '/0/0b/Guild_Mark_7.svg',
  '/d/d2/Guild_Mark_8.svg',
  '/1/1e/Guild_Mark_9.svg',
  '/e/ef/Guild_Mark_10.svg',
  '/3/38/Guild_Mark_11.svg',
  '/f/f0/Guild_Mark_12.svg',
  '/d/d0/Guild_Mark_13.svg',
  '/7/75/Guild_Mark_14.svg',
  '/5/56/Guild_Mark_15.svg',
  '/6/69/Guild_Mark_16.svg',
  '/f/fa/Guild_Mark_17.svg',
  '/7/71/Guild_Mark_18.svg',
  '/2/26/Guild_Mark_19.svg',
  '/6/64/Guild_Mark_20.svg',
  '/f/fb/Guild_Mark_21.svg',
  '/1/12/Guild_Mark_22.svg',
  '/5/5b/Guild_Mark_23.svg',
  '/9/9a/Guild_Mark_24.svg',
  '/8/8d/Guild_Mark_25.svg',
  '/1/1c/Guild_Mark_26.svg',
  '/5/5a/Guild_Mark_27.svg',
  '/2/27/Guild_Mark_28.svg',
  '/f/f8/Guild_Mark_29.svg',
  '/6/60/Guild_Mark_30.svg',
  '/c/c9/Guild_Mark_31.svg',
  '/1/1e/Guild_Mark_32.svg',
  '/6/6e/Guild_Mark_33.svg',
  '/7/73/Guild_Mark_34.svg',
  '/c/c1/Guild_Mark_35.svg',
  '/d/d1/Guild_Mark_36.svg',
  '/f/f1/Guild_Mark_37.svg',
  '/9/91/Guild_Mark_38.svg',
  '/1/11/Guild_Mark_39.svg'
];

export default function guildIconUrl(iconId: string) {
  const index = parseInt(iconId.replace('icon-', '')) - 1;
  return wikiImage(guildIconWikiPaths[index]);
}
