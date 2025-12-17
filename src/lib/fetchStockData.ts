import yahooFinance from "yahoo-finance2";
import { Holding } from "@/types";
import { fetchGoogleFinanceData } from "./googleFinance";
import { getCache, setCache } from "./cache";

export interface LiveStockData extends Holding {
  cmp: number;
  peRatio: number;
  earnings: number;
}

// Minimal safe type (because yahoo-finance2 typings are incomplete)
type YahooQuote = {
  regularMarketPrice?: number;
};

const CACHE_KEY = "portfolio_live_data";

export async function fetchStockData(
  holdings: Holding[]
): Promise<LiveStockData[]> {

  // 🔹 1️⃣ Cache check
  const cached = getCache<LiveStockData[]>(CACHE_KEY);
  if (cached) {
    return cached;
  }

  // 🔹 2️⃣ Fetch with per-stock safety
  const freshData = await Promise.all(
    holdings.map(async (holding) => {
      const yahooSymbol = mapToYahooSymbol(holding.name);

      const quote = await safeYahooQuote(yahooSymbol);
      const googleData = await safeGoogleFinance(holding.name);

      return {
        ...holding,
        cmp: quote.regularMarketPrice ?? 0,
        peRatio: googleData.peRatio,
        earnings: googleData.earnings,
      };
    })
  );

  // 🔹 3️⃣ Save last known good data
  setCache(CACHE_KEY, freshData);

  return freshData;
}

// ---------- SAFE HELPERS ----------

async function safeYahooQuote(symbol: string): Promise<YahooQuote> {
  try {
    return (await yahooFinance.quote(symbol)) as YahooQuote;
  } catch {
    return { regularMarketPrice: 0 };
  }
}

async function safeGoogleFinance(name: string): Promise<{
  peRatio: number;
  earnings: number;
}> {
  try {
    return await fetchGoogleFinanceData(name);
  } catch {
    return { peRatio: 0, earnings: 0 };
  }
}

// Mapping company → Yahoo symbol
function mapToYahooSymbol(name: string): string {
  const map: Record<string, string> = {
    "TCS": "TCS.NS",
    "Infosys": "INFY.NS",
    "HDFC Bank": "HDFCBANK.NS",
  };

  return map[name];
}
