import { StockData } from "@/types";
import { SectorSummaryData } from "@/types";

export function calculateSectorSummary(
  stocks: StockData[]
): SectorSummaryData[] {

  const sectorMap: Record<string, SectorSummaryData> = {};

  stocks.forEach((stock) => {
    const investment = stock.investment;
    const presentValue = stock.presentValue;
    const gainLoss = stock.gainLoss;

    if (!sectorMap[stock.sector]) {
      sectorMap[stock.sector] = {
        sector: stock.sector,
        totalInvestment: 0,
        totalPresentValue: 0,
        totalGainLoss: 0,
      };
    }

    sectorMap[stock.sector].totalInvestment += investment;
    sectorMap[stock.sector].totalPresentValue += presentValue;
    sectorMap[stock.sector].totalGainLoss += gainLoss;
  });

  return Object.values(sectorMap);
}
