import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchGoogleFinanceData(company: string) {
  try {
    const symbolMap: Record<string, string> = {
      "TCS": "TCS:NSE",
      "Infosys": "INFY:NSE",
      "HDFC Bank": "HDFCBANK:NSE",
    };

    const symbol = symbolMap[company];
    const url = `https://www.google.com/finance/quote/${symbol}`;

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);

    const peText = $("div:contains('P/E ratio')").next().text();
    const epsText = $("div:contains('Earnings per share')").next().text();

    return {
      peRatio: parseFloat(peText) || 0,
      earnings: parseFloat(epsText) || 0,
    };
  } catch (error) {
    return {
      peRatio: 0,
      earnings: 0,
    };
  }
}
