"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  fetchSiteByAddress,
  fetchVisits,
  recordVisit,
  searchSites,
} from "@/lib/client-api";
import type { PageResult, Person, Site, Visit, VisitSource } from "@/lib/types";

type BrowserAppProps = {
  people: Person[];
  initialAddress: string;
  initialPage: PageResult;
};

export function BrowserApp({
  people,
  initialAddress,
  initialPage,
}: BrowserAppProps) {
  const [addressInput, setAddressInput] = useState(initialAddress);
  const [page, setPage] = useState<PageResult>(initialPage);
  const [selectedPersonId, setSelectedPersonId] = useState(
    people[0]?._id ?? "",
  );
  const [visits, setVisits] = useState<Visit[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const currentAddress =
    page.status === "found" ? page.site.address : page.address;
  const currentTitle =
    page.status === "found" ? page.site.title : "Address not found";

  useEffect(() => {
    async function loadVisits() {
      const nextVisits = await fetchVisits(selectedPersonId);
      setVisits(nextVisits);
    }

    loadVisits();
  }, [selectedPersonId]);

  async function navigateToAddress(
    address: string,
    arrivedFrom: VisitSource,
    referrerAddress: string | null,
  ) {
    const nextAddress = address.trim().toLowerCase();

    if (!nextAddress) {
      return;
    }

    setIsLoading(true);
    const nextPage = await fetchSiteByAddress(nextAddress);
    setPage(nextPage);
    setAddressInput(nextAddress);

    if (selectedPersonId) {
      await recordVisit({
        personId: selectedPersonId,
        page: nextPage,
        arrivedFrom,
        referrerAddress,
      });
      const nextVisits = await fetchVisits(selectedPersonId);
      setVisits(nextVisits);
    }

    setIsLoading(false);
  }

  async function handleAddressSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await navigateToAddress(addressInput, "typed", currentAddress);
  }

  async function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSearching(true);
    const results = await searchSites(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f7f7] text-[#17212b]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1560px] flex-col px-6 py-4">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d6dedb] pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#667580]">
              The Small Web
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Browser</h1>
          </div>

          <label className="flex items-center gap-3 text-sm text-[#43515d]">
            Person
            <span className="relative">
              <select
                className="h-11 min-w-32 appearance-none rounded-md border border-[#cbd5d1] bg-white py-0 pl-4 pr-10 text-sm font-medium text-[#17212b] shadow-sm outline-none transition focus:border-[#2e7bd6] focus:ring-2 focus:ring-[#2e7bd6]/15"
                value={selectedPersonId}
                onChange={(event) => setSelectedPersonId(event.target.value)}
                disabled={people.length === 0}
              >
                {people.length > 0 ? (
                  people.map((person) => (
                    <option key={person._id} value={person._id}>
                      {person.name}
                    </option>
                  ))
                ) : (
                  <option>No people</option>
                )}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#667580]">
                ▾
              </span>
            </span>
          </label>
        </header>

        <section className="mt-4 overflow-hidden rounded-lg border border-[#cbd5d1] bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#e2e8e5] bg-[#eef2f1] p-3">
            <button className="h-10 w-10 rounded-md border border-[#cbd5d1] bg-white text-lg disabled:cursor-not-allowed disabled:opacity-40">
              ←
            </button>
            <button className="h-10 w-10 rounded-md border border-[#cbd5d1] bg-white text-lg disabled:cursor-not-allowed disabled:opacity-40">
              →
            </button>
            <form
              className="flex min-w-[240px] flex-1 gap-2"
              onSubmit={handleAddressSubmit}
            >
              <input
                className="h-10 flex-1 rounded-md border border-[#cbd5d1] bg-white px-3 font-mono text-sm outline-none focus:border-[#2e7bd6]"
                value={addressInput}
                onChange={(event) => setAddressInput(event.target.value)}
              />
              <button
                className="h-10 rounded-md bg-[#17212b] px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "Go"}
              </button>
            </form>
          </div>

          <div className="grid min-h-[calc(100vh-190px)] grid-cols-1 lg:grid-cols-[260px_1fr_420px]">
            <aside className="border-b border-[#e2e8e5] bg-[#fbfcfc] p-4 lg:border-b-0 lg:border-r">
              <h2 className="text-sm font-semibold">History</h2>
              <div className="mt-3 space-y-2">
                {visits.length > 0 ? (
                  visits.map((visit) => (
                    <button
                      key={visit._id}
                      className="block w-full rounded-md border border-[#e2e8e5] bg-white px-3 py-2 text-left hover:border-[#2e7bd6]"
                      onClick={() =>
                        navigateToAddress(visit.address, "history", null)
                      }
                    >
                      <span className="block font-mono text-sm">
                        {visit.address}
                      </span>
                      <span className="mt-1 block text-xs text-[#667580]">
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

            <section className="flex flex-col bg-white">
              <div className="border-b border-[#e2e8e5] px-5 py-3">
                <p className="font-mono text-xs text-[#667580]">
                  {currentAddress}
                </p>
                <h2 className="text-lg font-semibold">{currentTitle}</h2>
              </div>
              {page.status === "found" ? (
                <article
                  className="max-w-none flex-1 px-5 py-6 leading-7 [&_a]:text-[#2e7bd6] [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: page.site.bodyHtml }}
                />
              ) : (
                <article className="flex flex-1 items-center justify-center px-5 py-6 text-center">
                  <div className="w-full max-w-md rounded-lg border border-[#e2e8e5] bg-[#fbfcfc] px-6 py-8">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#f0c4bf] bg-[#fae8e7] font-mono text-xl font-semibold text-[#c4453d]">
                      404
                    </div>
                    <p className="mt-5 font-mono text-sm text-[#667580]">
                      {page.address}
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold">
                      Address not found
                    </h1>
                    <p className="mt-3 text-[#43515d]">{page.message}</p>
                    <p className="mt-5 text-sm text-[#667580]">
                      Check the address or try another .zz site.
                    </p>
                  </div>
                </article>
              )}
            </section>

            <aside className="border-t border-[#e2e8e5] bg-[#fbfcfc] p-4 lg:border-l lg:border-t-0">
              <section>
                <h2 className="text-sm font-semibold">Search</h2>
                <form className="mt-3 flex gap-2" onSubmit={handleSearchSubmit}>
                  <input
                    className="h-10 min-w-0 flex-1 rounded-md border border-[#cbd5d1] bg-white px-3 text-sm outline-none focus:border-[#2e7bd6]"
                    placeholder="coffee"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                  <button
                    className="h-10 rounded-md bg-[#17212b] px-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSearching}
                  >
                    {isSearching ? "Finding" : "Find"}
                  </button>
                </form>
                <div className="mt-3 space-y-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((site) => (
                      <button
                        key={site._id}
                        className="block w-full rounded-md border border-[#e2e8e5] bg-white px-3 py-2 text-left hover:border-[#2e7bd6]"
                        onClick={() =>
                          navigateToAddress(site.address, "search", currentAddress)
                        }
                      >
                        <span className="block text-sm font-medium">
                          {site.title}
                        </span>
                        <span className="mt-1 block font-mono text-xs text-[#667580]">
                          {site.address}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="rounded-md border border-[#e2e8e5] bg-white px-3 py-2 text-sm text-[#667580]">
                      Search page text.
                    </p>
                  )}
                </div>
              </section>

              <section className="mt-6 border-t border-[#e2e8e5] pt-5">
                <h2 className="text-sm font-semibold">Publish</h2>
                <form className="mt-3 space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <input
                      className="h-11 w-full rounded-md border border-[#cbd5d1] bg-white px-3 font-mono text-sm outline-none focus:border-[#2e7bd6]"
                      placeholder="address.zz"
                    />
                    <input
                      className="h-11 w-full rounded-md border border-[#cbd5d1] bg-white px-3 text-sm outline-none focus:border-[#2e7bd6]"
                      placeholder="Title"
                    />
                  </div>
                  <textarea
                    className="min-h-48 w-full resize-y rounded-md border border-[#cbd5d1] bg-white px-3 py-3 font-mono text-sm leading-6 outline-none focus:border-[#2e7bd6]"
                    placeholder="<h1>My page</h1>"
                  />
                  <div className="flex justify-end">
                    <button className="h-11 rounded-md bg-[#17212b] px-5 text-sm font-medium text-white">
                      Publish
                    </button>
                  </div>
                </form>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
