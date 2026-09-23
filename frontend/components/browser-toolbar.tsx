import type { FormEvent } from "react";

type BrowserToolbarProps = {
  addressInput: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isLoading: boolean;
  onAddressChange: (address: string) => void;
  onAddressSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  onForward: () => void;
};

export function BrowserToolbar({
  addressInput,
  canGoBack,
  canGoForward,
  isLoading,
  onAddressChange,
  onAddressSubmit,
  onBack,
  onForward,
}: BrowserToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-[#e2e8e5] bg-[#eef2f1] p-3">
      <button
        className="h-10 w-10 cursor-pointer rounded-full border border-[#cbd5d1] bg-white text-lg disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!canGoBack}
        onClick={onBack}
        type="button"
      >
        ←
      </button>
      <button
        className="h-10 w-10 cursor-pointer rounded-full border border-[#cbd5d1] bg-white text-lg disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!canGoForward}
        onClick={onForward}
        type="button"
      >
        →
      </button>
      <form className="flex min-w-[240px] flex-1 gap-2" onSubmit={onAddressSubmit}>
        <input
          className="h-10 flex-1 rounded-full border border-[#cbd5d1] bg-white px-4 font-mono text-sm outline-none focus:border-[#2e7bd6]"
          value={addressInput}
          onChange={(event) => onAddressChange(event.target.value)}
        />
        <button
          className="h-10 cursor-pointer rounded-full bg-[#17212b] px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Go"}
        </button>
      </form>
    </div>
  );
}
