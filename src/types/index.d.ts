export interface Holding {
  name: string;
  purchasePrice: number;
  quantity: number;
  exchange: string;
  sector: string;
}

export interface StockData extends Holding {
  cmp: number;
  peRatio: number;
  earnings: number;
  investment: number;
  presentValue: number;
  gainLoss: number;
  portfolioWeight: number;
}

export interface SectorSummaryData {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
}
