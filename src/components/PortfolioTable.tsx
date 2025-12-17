import React from "react";
import { StockData } from "@/types";

interface Props {
  stocks: StockData[];
}

export const PortfolioTable: React.FC<Props> = ({ stocks }) => {
  return (
    <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 z-10 bg-gray-50 text-gray-600">
          <tr>
            {[
              "Stock",
              "Qty",
              "Buy Price",
              "Investment",
              "CMP",
              "Present Value",
              "Gain / Loss",
              "P/E",
              "Earnings",
              "Weight (%)",
              "Exchange",
            ].map((head) => (
              <th
                key={head}
                className="px-4 py-3 text-left font-semibold whitespace-nowrap"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {stocks.map((stock, idx) => {
            const isProfit = stock.gainLoss >= 0;

            return (
              <tr
                key={idx}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {stock.name}
                </td>
                <td className="px-4 py-3 text-center">{stock.quantity}</td>
                <td className="px-4 py-3">
                  ₹{stock.purchasePrice.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  ₹{stock.investment.toFixed(2)}
                </td>
                <td className="px-4 py-3 font-semibold text-blue-600">
                  ₹{stock.cmp.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  ₹{stock.presentValue.toFixed(2)}
                </td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    isProfit ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {isProfit ? "+" : ""}
                  ₹{stock.gainLoss.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  {stock.peRatio.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  ₹{stock.earnings.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  {stock.portfolioWeight.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {stock.exchange}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
