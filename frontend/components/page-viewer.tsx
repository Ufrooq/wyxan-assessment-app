import type { MouseEvent } from "react";
import type { PageResult } from "@/lib/types";

type PageViewerProps = {
  page: PageResult;
  currentAddress: string;
  currentTitle: string;
  onLinkClick: (address: string) => void;
};

export function PageViewer({
  page,
  currentAddress,
  currentTitle,
  onLinkClick,
}: PageViewerProps) {
  function handlePageClick(event: MouseEvent<HTMLElement>) {
    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest("a");

    if (!link) {
      return;
    }

    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    event.preventDefault();
    onLinkClick(href);
  }

  return (
    <section className="flex flex-col bg-white">
      <div className="border-b border-[#e2e8e5] px-5 py-3">
        <p className="font-mono text-xs text-[#667580]">{currentAddress}</p>
        <h2 className="text-lg font-semibold">{currentTitle}</h2>
      </div>
      {page.status === "found" ? (
        <article
          className="max-w-none flex-1 px-5 py-6 leading-7 [&_a]:text-[#2e7bd6] [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:mb-4"
          onClick={handlePageClick}
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
            <h1 className="mt-2 text-3xl font-semibold">Address not found</h1>
            <p className="mt-3 text-[#43515d]">{page.message}</p>
            <p className="mt-5 text-sm text-[#667580]">
              Check the address or try another .zz site.
            </p>
          </div>
        </article>
      )}
    </section>
  );
}
