import React from "react";
import { SectorSummaryData } from "@/types";

interface Props {
  sectors: SectorSummaryData[];
}

export const SectorSummary: React.FC<Props> = ({ sectors }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 mb-10">
      {sectors.map((sector) => {
        const isProfit = sector.totalGainLoss >= 0;

        return (
          <div
            key={sector.sector}
            className="
              rounded-2xl p-6
              bg-white/70 backdrop-blur
              border border-gray-200
              shadow-sm hover:shadow-md
              transition-all duration-300
            "
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {sector.sector}
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex justify-between">
                <span>💸 Investment</span>
                <span className="font-medium text-gray-900">
                  ₹{sector.totalInvestment.toFixed(2)}
                </span>
              </p>

              <p className="flex justify-between">
                <span>📈 Present Value</span>
                <span className="font-medium text-gray-900">
                  ₹{sector.totalPresentValue.toFixed(2)}
                </span>
              </p>

              <p
                className={`flex justify-between font-semibold ${
                  isProfit ? "text-green-600" : "text-red-500"
                }`}
              >
                <span>📊 Gain / Loss</span>
                <span>
                  {isProfit ? "+" : ""}
                  ₹{sector.totalGainLoss.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
