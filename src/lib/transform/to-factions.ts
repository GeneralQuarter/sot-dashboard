import type { Campaign } from '../../models/campaign';
import type { Commendation } from '../../models/commendation';
import type { Faction } from '../../models/faction';
import type { SOTEmblem, SOTReputation, SOTReputationResponse } from '../sot-api/reputation';
import { getCommendationGrades } from './commendation-grades';
import factionNames from './faction-names';
import getMaxLevel from './max-level';

function toCommendation(factionId: string, emblem: SOTEmblem): Commendation {
  const commendation: Commendation = {
    completed: !!emblem.Completed,
    image: emblem.image,
    title: emblem.title,
    subtitle: emblem.subtitle
  }

  if (emblem.HasScalar) {
    const grades = getCommendationGrades(factionId, emblem.title);

    commendation.scalar = {
      value: emblem.Value,
      maxValue: grades ? grades[grades.length - 1] : emblem.Threshold,
      grades
    }
  }

  return commendation;
}

function toCampaigns(factionId: string, reputation: SOTReputation): Campaign[] {
  if (reputation.Emblems) {
    return [
      {
        id: factionId,
        title: '',
        commendations: reputation.Emblems.Emblems.map(e => toCommendation(factionId, e)),
        commendationsTotal: reputation.EmblemsTotal,
        commendationsUnlocked: reputation.EmblemsUnlocked,
      }
    ]
  }

  if (reputation.Campaigns) {
    return Object.entries(reputation.Campaigns).map(([id, campaign]) => ({
      id: id.replace(/(\.|\d)/g, ''),
      title: campaign.Title,
      commendations: campaign.Emblems.map(e => toCommendation(factionId, e)),
      commendationsTotal: campaign.EmblemsTotal,
      commendationsUnlocked: campaign.EmblemsUnlocked,
    }));
  }

  return [];
}

function toFaction(factionId: string, reputation: SOTReputation): Faction {
  const guild = !!reputation.IsGuild;
  const factionIdOrGuild = guild ? 'Guilds' : factionId;

  return {
    id: factionId,
    name: (guild ? reputation.GuildName : factionNames[factionId]) ?? '',
    guild: guild ? {
      iconId: reputation.Icon?.IconId ?? '',
      themeId: reputation.Theme?.ThemeId ?? '',
      swatchId: reputation.ColourSwatch?.SwatchId ?? ''
    } : undefined,
    distinction: reputation.Distinction ?? 0,
    level: reputation.Level ?? 0,
    levelProgress: reputation.Progress ?? 0,
    maxLevel: getMaxLevel(factionIdOrGuild),
    commendationsUnlocked: reputation.EmblemsUnlocked,
    commendationsTotal: reputation.EmblemsTotal,
    promotionsUnlocked: reputation.PromotionsUnlocked ?? 0,
    campaigns: toCampaigns(factionIdOrGuild, reputation),
  };
}

const factionOrder = [
  'Guilds',
  'OrderOfSouls',
  'GoldHoarders',
  'MerchantAlliance',
  'ReapersBones',
  'AthenasFortune',
  'Flameheart',
  'PirateLord',
  'HuntersCall',
  'BilgeRats',
  'TallTales'
];

export default function toFactions(reputations: SOTReputationResponse): Faction[] {
  return Object.entries(reputations)
    .filter(([factionId, reputation]) => factionOrder.includes(reputation.IsGuild ? 'Guilds' : factionId))
    .map(([factionId, reputation]) => {
      if (reputation.IsGuild) {
        const guildCommendations = reputations['BilgeRats']?.Campaigns?.['guilds-of-gold'];

        if (guildCommendations) {
          reputation.EmblemsTotal = guildCommendations.EmblemsTotal;
          reputation.EmblemsUnlocked = guildCommendations.EmblemsUnlocked;
          reputation.Emblems = {Emblems: guildCommendations.Emblems};
        }
      }

      return toFaction(factionId, reputation);
    })
    .sort((a, b) => factionOrder.indexOf(a.guild ? 'Guilds' : a.id) - factionOrder.indexOf(b.guild ? 'Guilds' : b.id));
}
