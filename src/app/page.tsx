"use client";

import { useEffect, useState } from "react";
import { PortfolioTable } from "@/components/PortfolioTable";
import { SectorSummary } from "@/components/SectorSummary";
import { StockData, SectorSummaryData } from "@/types";
import { SectorSummarySkeleton } from "@/components/SectorSummarySkeleton";
import { PortfolioTableSkeleton } from "@/components/PortfolioTableSkeleton";

export default function Home() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [sectors, setSectors] = useState<SectorSummaryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (!res.ok) throw new Error("Failed to fetch portfolio");

      const json = await res.json();

      setStocks(json.stocks || []);
      setSectors(json.sectors || []);
      setWarning(json.warning || null);
      setError(null);
    } catch {
      setError("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 p-6">
        <SectorSummarySkeleton />
        <PortfolioTableSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 p-6">
      {warning && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4">
          ⚠️ {warning}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <SectorSummary sectors={sectors} />

      <p className="text-xs text-gray-500 mb-3 text-right">
        Market data may be delayed or unavailable.
      </p>
      <PortfolioTable stocks={stocks} />
    </div>
  );
}
