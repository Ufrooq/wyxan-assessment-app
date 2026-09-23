import type { FormEvent } from "react";

type PublishPanelProps = {
  address: string;
  title: string;
  bodyHtml: string;
  isPublishing: boolean;
  onAddressChange: (address: string) => void;
  onTitleChange: (title: string) => void;
  onBodyHtmlChange: (bodyHtml: string) => void;
  onPublish: (event: FormEvent<HTMLFormElement>) => void;
};

export function PublishPanel({
  address,
  title,
  bodyHtml,
  isPublishing,
  onAddressChange,
  onTitleChange,
  onBodyHtmlChange,
  onPublish,
}: PublishPanelProps) {
  return (
    <section className="mt-6 flex min-h-0 flex-1 flex-col border-t border-[#e2e8e5] pt-5">
      <h2 className="text-sm font-semibold">Publish</h2>
      <form className="mt-3 flex min-h-0 flex-1 flex-col gap-3" onSubmit={onPublish}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <input
            className="h-11 w-full rounded-full border border-[#cbd5d1] bg-white px-4 font-mono text-sm outline-none focus:border-[#2e7bd6]"
            placeholder="my-notes.zz"
            value={address}
            onChange={(event) => onAddressChange(event.target.value)}
          />
          <input
            className="h-11 w-full rounded-full border border-[#cbd5d1] bg-white px-4 text-sm outline-none focus:border-[#2e7bd6]"
            placeholder="My Notes"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
          />
        </div>
        <textarea
          className="min-h-24 flex-1 resize-none rounded-3xl border border-[#cbd5d1] bg-white px-4 py-4 font-mono text-sm leading-6 outline-none focus:border-[#2e7bd6]"
          placeholder={`<h1>My Notes</h1>
<p>This is a page I wrote for the small web.</p>
<p>Visit <a href="moon-cafe.zz">Moon Cafe</a> or <a href="missing-room.zz">Missing Room</a>.</p>`}
          value={bodyHtml}
          onChange={(event) => onBodyHtmlChange(event.target.value)}
        />
        <div className="flex shrink-0 justify-end">
          <button
            className="h-11 cursor-pointer rounded-full bg-[#17212b] px-6 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPublishing}
          >
            {isPublishing ? "Publishing" : "Publish"}
          </button>
        </div>
      </form>
    </section>
  );
}
