export const PortfolioTableSkeleton = () => {
  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-11 gap-4 px-4 py-3 bg-gray-50">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-slate-200 rounded animate-pulse"
          />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 3 }).map((_, row) => (
        <div
          key={row}
          className="grid grid-cols-11 gap-4 px-4 py-4 border-t border-gray-100"
        >
          {Array.from({ length: 11 }).map((_, col) => (
            <div
              key={col}
              className="h-4 bg-slate-200 rounded animate-pulse"
            />
          ))}
        </div>
      ))}
    </div>
  );
};
