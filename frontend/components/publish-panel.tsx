export function PublishPanel() {
  return (
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
  );
}
