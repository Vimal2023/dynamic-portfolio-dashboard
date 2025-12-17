import { LiveStockData } from "@/lib/fetchStockData";
import { StockData } from "@/types";

export function calculatePortfolio(
  stocks: LiveStockData[]
): StockData[] {
  const totalInvestment = stocks.reduce(
    (sum, s) => sum + s.purchasePrice * s.quantity,
    0
  );

  return stocks.map((stock) => {
    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = stock.cmp * stock.quantity;
    const gainLoss = presentValue - investment;
    const portfolioWeight = (investment / totalInvestment) * 100;

    return {
      ...stock,
      investment,
      presentValue,
      gainLoss,
      portfolioWeight: +portfolioWeight.toFixed(2),
    };
  });
}
