import { BrowserShell } from "@/components/browser-shell";
import { getPeople, getSite } from "@/lib/api";

export const dynamic = "force-dynamic";

const initialAddress = "tidepool.zz";

export default async function Home() {
  const [people, initialPage] = await Promise.all([
    getPeople(),
    getSite(initialAddress),
  ]);

  return (
    <BrowserShell
      people={people}
      initialAddress={initialAddress}
      initialPage={initialPage}
    />
  );
}
