const maxLevel: {[factionIdOrGuild: string]: number} = {
  AthenasFortune: 500,
  ReapersBones: 500,
  GoldHoarders: 500,
  MerchantAlliance: 500,
  OrderOfSouls: 500,
  HuntersCall: 50,
  Guilds: 100,
  PirateLord: 1000,
  Flameheart: 1000,
};

export default function getMaxLevel(factionIdOrGuild: string): number {
  return maxLevel[factionIdOrGuild] ?? 0;
}
