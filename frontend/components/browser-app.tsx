"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { BrowserToolbar } from "@/components/browser-toolbar";
import { HistoryPanel } from "@/components/history-panel";
import { PageViewer } from "@/components/page-viewer";
import { PersonSelector } from "@/components/person-selector";
import { PublishPanel } from "@/components/publish-panel";
import { SearchPanel } from "@/components/search-panel";
import {
  fetchSiteByAddress,
  fetchVisits,
  publishSite,
  recordVisit,
  searchSites,
} from "@/lib/client-api";
import type { PageResult, Person, Site, Visit, VisitSource } from "@/lib/types";

type BrowserAppProps = {
  people: Person[];
  initialAddress: string;
  initialPage: PageResult;
};

type NavigationEntry = {
  address: string;
  page: PageResult;
};

export function BrowserApp({
  people,
  initialAddress,
  initialPage,
}: BrowserAppProps) {
  const [addressInput, setAddressInput] = useState(initialAddress);
  const [page, setPage] = useState<PageResult>(initialPage);
  const [entries, setEntries] = useState<NavigationEntry[]>([
    {
      address: initialAddress,
      page: initialPage,
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPersonId, setSelectedPersonId] = useState(
    people[0]?._id ?? "",
  );
  const [visits, setVisits] = useState<Visit[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Site[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [publishAddress, setPublishAddress] = useState("");
  const [publishTitle, setPublishTitle] = useState("");
  const [publishBodyHtml, setPublishBodyHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const currentAddress =
    page.status === "found" ? page.site.address : page.address;
  const currentTitle =
    page.status === "found" ? page.site.title : "Address not found";
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < entries.length - 1;

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
    const nextEntries = entries.slice(0, currentIndex + 1);
    const updatedEntries = [
      ...nextEntries,
      {
        address: nextAddress,
        page: nextPage,
      },
    ];

    setEntries(updatedEntries);
    setCurrentIndex(updatedEntries.length - 1);
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

  function goBack() {
    if (!canGoBack) {
      return;
    }

    const nextIndex = currentIndex - 1;
    const entry = entries[nextIndex];
    setCurrentIndex(nextIndex);
    setPage(entry.page);
    setAddressInput(entry.address);
  }

  function goForward() {
    if (!canGoForward) {
      return;
    }

    const nextIndex = currentIndex + 1;
    const entry = entries[nextIndex];
    setCurrentIndex(nextIndex);
    setPage(entry.page);
    setAddressInput(entry.address);
  }

  async function handleAddressSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await navigateToAddress(addressInput, "typed", currentAddress);
  }

  async function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSearched(true);
    setIsSearching(true);
    const results = await searchSites(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  }

  async function handlePublishSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPersonId) {
      toast.error("Select a person before publishing.");
      return;
    }

    setIsPublishing(true);

    const result = await publishSite({
      address: publishAddress.trim().toLowerCase(),
      title: publishTitle.trim(),
      bodyHtml: publishBodyHtml,
      authorId: selectedPersonId,
    });

    if (result.error || !result.site) {
      toast.error(result.error ?? "Could not publish this site.");
      setIsPublishing(false);
      return;
    }

    setPublishAddress("");
    setPublishTitle("");
    setPublishBodyHtml("");
    setIsPublishing(false);
    toast.success(`${result.site.address} was published.`);
    await navigateToAddress(result.site.address, "typed", currentAddress);
  }

  return (
    <main className="h-screen overflow-hidden bg-[#f5f7f7] text-[#17212b]">
      <div className="mx-auto flex h-screen w-full max-w-[1560px] flex-col px-6 py-4">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d6dedb] pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#667580]">
              The Small Web
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Browser</h1>
          </div>

          <PersonSelector
            people={people}
            selectedPersonId={selectedPersonId}
            onPersonChange={setSelectedPersonId}
          />
        </header>

        <section className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#cbd5d1] bg-white shadow-sm">
          <BrowserToolbar
            addressInput={addressInput}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            isLoading={isLoading}
            onAddressChange={setAddressInput}
            onAddressSubmit={handleAddressSubmit}
            onBack={goBack}
            onForward={goForward}
          />

          <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[290px_1fr_420px]">
            <HistoryPanel
              visits={visits}
              onOpenVisit={(address) =>
                navigateToAddress(address, "history", null)
              }
            />

            <PageViewer
              page={page}
              currentAddress={currentAddress}
              currentTitle={currentTitle}
              onLinkClick={(address) =>
                navigateToAddress(address, "link", currentAddress)
              }
            />

            <aside className="flex min-h-0 flex-col overflow-hidden border-t border-[#e2e8e5] bg-[#fbfcfc] p-4 lg:border-l lg:border-t-0">
              <SearchPanel
                query={searchQuery}
                results={searchResults}
                hasSearched={hasSearched}
                isSearching={isSearching}
                onQueryChange={setSearchQuery}
                onSearch={handleSearchSubmit}
                onOpenResult={(address) =>
                  navigateToAddress(address, "search", currentAddress)
                }
              />

              <PublishPanel
                address={publishAddress}
                title={publishTitle}
                bodyHtml={publishBodyHtml}
                isPublishing={isPublishing}
                onAddressChange={setPublishAddress}
                onTitleChange={setPublishTitle}
                onBodyHtmlChange={setPublishBodyHtml}
                onPublish={handlePublishSubmit}
              />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
