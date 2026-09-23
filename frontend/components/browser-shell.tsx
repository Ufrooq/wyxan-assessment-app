import type { PageResult, Person } from "@/lib/types";
import { BrowserApp } from "./browser-app";

type BrowserShellProps = {
  people: Person[];
  initialAddress: string;
  initialPage: PageResult;
};

export function BrowserShell(props: BrowserShellProps) {
  return <BrowserApp {...props} />;
}
