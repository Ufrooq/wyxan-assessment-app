import type { Visit } from "@/lib/types";

type HistoryPanelProps = {
  visits: Visit[];
  onOpenVisit: (address: string) => void;
};

export function HistoryPanel({ visits, onOpenVisit }: HistoryPanelProps) {
  return (
    <aside className="flex min-h-0 flex-col border-b border-[#e2e8e5] bg-[#fbfcfc] p-4 lg:border-b-0 lg:border-r">
      <h2 className="text-xs font-medium uppercase tracking-[0.12em] text-[#667580]">
        History
      </h2>
      <div className="thin-scrollbar mt-3 max-h-[calc(100vh-260px)] space-y-2 overflow-y-auto pr-2">
        {visits.length > 0 ? (
          visits.map((visit) => (
            <button
              key={visit._id}
              className="block w-full rounded-md border border-[#e5ebe8] bg-white/80 px-3 py-2 text-left hover:border-[#9fc3ee] hover:bg-white"
              onClick={() => onOpenVisit(visit.address)}
            >
              <span className="block font-mono text-sm font-normal text-[#17212b]">
                {visit.address}
              </span>
              <span className="mt-1 block text-xs text-[#71808b]">
                {visit.status === "found" ? "Found" : "Not found"}
              </span>
            </button>
          ))
        ) : (
          <p className="rounded-md border border-[#e2e8e5] bg-white px-3 py-2 text-sm text-[#667580]">
            No history yet.
          </p>
        )}
      </div>
    </aside>
  );
}
