import type { FormEvent } from "react";
import type { Site } from "@/lib/types";

type SearchPanelProps = {
  query: string;
  results: Site[];
  hasSearched: boolean;
  isSearching: boolean;
  onQueryChange: (query: string) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
  onOpenResult: (address: string) => void;
};

export function SearchPanel({
  query,
  results,
  hasSearched,
  isSearching,
  onQueryChange,
  onSearch,
  onOpenResult,
}: SearchPanelProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold">Search</h2>
      <form className="mt-3 flex gap-2" onSubmit={onSearch}>
        <input
          className="h-10 min-w-0 flex-1 rounded-full border border-[#cbd5d1] bg-white px-4 text-sm outline-none focus:border-[#2e7bd6]"
          placeholder="coffee"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <button
          className="h-10 cursor-pointer rounded-full bg-[#17212b] px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSearching}
        >
          {isSearching ? "Finding" : "Find"}
        </button>
      </form>
      <div className="mt-3 space-y-2">
        {results.length > 0 ? (
          results.map((site) => (
            <button
              key={site._id}
              className="block w-full cursor-pointer rounded-3xl border border-[#e2e8e5] bg-white px-4 py-3 text-left hover:border-[#2e7bd6]"
              onClick={() => onOpenResult(site.address)}
            >
              <span className="block text-sm font-medium">{site.title}</span>
              <span className="mt-1 block font-mono text-xs text-[#667580]">
                {site.address}
              </span>
            </button>
          ))
        ) : hasSearched ? (
          <p className="rounded-full border border-[#e2e8e5] bg-white px-4 py-2 text-sm text-[#667580]">
            No results found.
          </p>
        ) : (
          <p className="rounded-full border border-[#e2e8e5] bg-white px-4 py-2 text-sm text-[#667580]">
            Search page text.
          </p>
        )}
      </div>
    </section>
  );
}
