import { Faction } from '../models/faction';

function companyBackgroundImagePath(faction: Faction): string {
  const variant = faction.distinction > 0 
    ? (`${faction.id === 'AthenasFortune' ? '1' : '2'}${faction.distinction}`)
    : (faction.promotionsUnlocked < 10 
      ? `0${faction.promotionsUnlocked}` 
      : faction.promotionsUnlocked.toFixed()
    );

  return faction.id === 'HuntersCall' 
    ? `/assets/companies/hunters-call/rep/Progression_HuntersCall_${variant}.png`
    : `/assets/companies-2024/Progression_${faction.id}2024_${variant}.png`;
}

export default function factionBackgroundImagePath(faction: Faction) {
  if (faction.guild) {
    return `/assets/profile/guilds/emblems/GuildEmblem-${faction.guild.themeId}_distinction-${faction.distinction}_${faction.guild.swatchId}.png`
  }

  switch (faction.id) {
    case 'BilgeRats':
      return '/assets/profilev2/rat.png';
    case 'TallTales':
      return '/assets/profilev2/tall-tales.png';
    case 'PirateLord':
      return '/assets/companies/pirate-lord/rep/progression-bg.png';
    case 'Flameheart':
      return '/assets/companies/flameheart/rep/progression-bg.png';
    default:
      return companyBackgroundImagePath(faction);
  }
}
