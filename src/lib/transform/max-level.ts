const maxLevel: {[factionIdOrGuild: string]: number} = {
  AthenasFortune: 500,
  ReapersBones: 500,
  GoldHoarders: 500,
  MerchantAlliance: 500,
  OrderOfSouls: 500,
  HuntersCall: 50,
  Guilds: 1000,
  PirateLord: 1001,
  Flameheart: 1001,
};

export default function getMaxLevel(factionIdOrGuild: string): number {
  return maxLevel[factionIdOrGuild] ?? 0;
}
