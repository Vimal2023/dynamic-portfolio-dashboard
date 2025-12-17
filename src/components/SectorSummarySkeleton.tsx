export const SectorSummarySkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 mb-10">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm"
        >
          <div className="h-5 w-32 bg-slate-200 rounded mb-6 animate-pulse" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
            </div>

            <div className="flex justify-between">
              <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
            </div>

            <div className="flex justify-between">
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
