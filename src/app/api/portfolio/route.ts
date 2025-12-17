import { NextResponse } from "next/server";
import holdings from "@/data/holdings.json";
import { fetchStockData } from "@/lib/fetchStockData";
import { calculatePortfolio } from "@/utils/calculatePortfolio";
import { calculateSectorSummary } from "@/utils/calculateSectorSummary";
import { Holding } from "@/types";

export async function GET() {
  try {
    const baseHoldings = holdings as Holding[];

    const stockData = await fetchStockData(baseHoldings);
    const portfolio = calculatePortfolio(stockData);
    const sectors = calculateSectorSummary(portfolio);

    return NextResponse.json(
      {
        stocks: portfolio,
        sectors,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Portfolio API error:", error);

    return NextResponse.json(
      { error: "Failed to load portfolio data" },
      { status: 500 }
    );
  }
}
