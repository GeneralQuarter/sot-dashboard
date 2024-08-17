import kebabCase from './kebabCase';

export default function ledgerBandImagePath(factionIdOrGuild: string, bandIndex: number): string {
  const slug = kebabCase(factionIdOrGuild);
  return `/assets/ledger/v2/emissary-tier-${slug}--tier-${4 - bandIndex}.svg`
}
