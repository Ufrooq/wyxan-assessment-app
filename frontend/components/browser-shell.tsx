const historyItems = [
  "tidepool.zz",
  "moon-cafe.zz",
  "archive-house.zz",
  "lost-pier.zz",
];

const searchResults = [
  "moon-cafe.zz",
  "paper-orbit.zz",
  "weather-attic.zz",
];

export function BrowserShell() {
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
              <select className="h-11 min-w-32 appearance-none rounded-md border border-[#cbd5d1] bg-white py-0 pl-4 pr-10 text-sm font-medium text-[#17212b] shadow-sm outline-none transition focus:border-[#2e7bd6] focus:ring-2 focus:ring-[#2e7bd6]/15">
                <option>Umar</option>
                <option>Amina</option>
                <option>Hassan</option>
                <option>Sara</option>
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
            <form className="flex min-w-[240px] flex-1 gap-2">
              <input
                className="h-10 flex-1 rounded-md border border-[#cbd5d1] bg-white px-3 font-mono text-sm outline-none focus:border-[#2e7bd6]"
                defaultValue="tidepool.zz"
              />
              <button className="h-10 rounded-md bg-[#17212b] px-4 text-sm font-medium text-white">
                Go
              </button>
            </form>
          </div>

          <div className="grid min-h-[calc(100vh-190px)] grid-cols-1 lg:grid-cols-[260px_1fr_420px]">
            <aside className="border-b border-[#e2e8e5] bg-[#fbfcfc] p-4 lg:border-b-0 lg:border-r">
              <h2 className="text-sm font-semibold">History</h2>
              <div className="mt-3 space-y-2">
                {historyItems.map((item) => (
                  <button
                    key={item}
                    className="block w-full rounded-md border border-[#e2e8e5] bg-white px-3 py-2 text-left font-mono text-sm hover:border-[#2e7bd6]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </aside>

            <section className="flex flex-col bg-white">
              <div className="border-b border-[#e2e8e5] px-5 py-3">
                <p className="font-mono text-xs text-[#667580]">tidepool.zz</p>
                <h2 className="text-lg font-semibold">Tidepool Notes</h2>
              </div>
              <article className="max-w-none flex-1 px-5 py-6 leading-7">
                <h1 className="mb-4 text-3xl font-semibold">
                  Tidepool Notes
                </h1>
                <p className="mb-4">
                  A quiet page about shells, pools, patient water, and small
                  field observations.
                </p>
                <p>
                  Visit{" "}
                  <a className="text-[#2e7bd6]" href="moon-cafe.zz">
                    Moon Cafe
                  </a>{" "}
                  or follow the broken path to{" "}
                  <a className="text-[#2e7bd6]" href="lost-pier.zz">
                    Lost Pier
                  </a>
                  .
                </p>
              </article>
            </section>

            <aside className="border-t border-[#e2e8e5] bg-[#fbfcfc] p-4 lg:border-l lg:border-t-0">
              <section>
                <h2 className="text-sm font-semibold">Search</h2>
                <form className="mt-3 flex gap-2">
                  <input
                    className="h-10 min-w-0 flex-1 rounded-md border border-[#cbd5d1] bg-white px-3 text-sm outline-none focus:border-[#2e7bd6]"
                    placeholder="coffee"
                  />
                  <button className="h-10 rounded-md bg-[#17212b] px-3 text-sm font-medium text-white">
                    Find
                  </button>
                </form>
                <div className="mt-3 space-y-2">
                  {searchResults.map((item) => (
                    <button
                      key={item}
                      className="block w-full rounded-md border border-[#e2e8e5] bg-white px-3 py-2 text-left font-mono text-sm hover:border-[#2e7bd6]"
                    >
                      {item}
                    </button>
                  ))}
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
