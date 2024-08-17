export type SOTEmblem = {
  title: string;
  subtitle: string;
  Completed?: boolean;
  Threshold: number;
  Value: number;
  HasScalar: boolean;
  image: string;
}

export type SOTCampaign = {
  Title: string;
  EmblemsTotal: number;
  EmblemsUnlocked: number;
  Emblems: SOTEmblem[];
}

export type SOTReputation = {
  Level?: number;
  Distinction?: number;
  EmblemsUnlocked: number;
  EmblemsTotal: number;
  PromotionsUnlocked?: number;
  IsGuild: boolean;
  GuildName?: string; // guild only
  Icon?: {IconId: string}; // guild only
  Theme?: {ThemeId: string}; // guild only
  ColourSwatch?: {SwatchId: string}; // guild only
  Progress?: number; // level progress 0 -> 1
  Emblems?: {
    Emblems: SOTEmblem[];
  },
  Campaigns?: {
    [campaignId: string]: SOTCampaign
  }
};

export type SOTReputationResponse = {
  [reputationSectionId: string]: SOTReputation;
};
