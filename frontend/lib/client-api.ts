import type {
  CreateSitePayload,
  PageResult,
  Site,
  Visit,
  VisitSource,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

function getPublishErrorMessage(message: unknown) {
  const messages = Array.isArray(message)
    ? message.filter((item): item is string => typeof item === "string")
    : typeof message === "string"
      ? [message]
      : [];

  if (messages.some((item) => item.includes("address must match"))) {
    return "Use a lowercase .zz address with letters, numbers, or hyphens, like my-notes.zz.";
  }

  if (messages.some((item) => item.includes("authorId must be"))) {
    return "Select a valid person before publishing.";
  }

  if (messages.some((item) => item.includes("title should not be empty"))) {
    return "Add a title before publishing.";
  }

  if (messages.some((item) => item.includes("title must be shorter"))) {
    return "Keep the title under 100 characters.";
  }

  if (messages.some((item) => item.includes("bodyHtml should not be empty"))) {
    return "Add some HTML body content before publishing.";
  }

  if (messages.some((item) => item.includes("already published"))) {
    return "That address is already published. Choose a different .zz address.";
  }

  return messages[0] ?? "Could not publish this site.";
}

export async function fetchSiteByAddress(
  address: string,
): Promise<PageResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/sites/${address}`);

    if (response.status === 404) {
      return {
        status: "not_found",
        address,
        message: "This address does not exist.",
      };
    }

    if (!response.ok) {
      return {
        status: "not_found",
        address,
        message: "The backend could not load this address.",
      };
    }

    const site = (await response.json()) as Site;

    return {
      status: "found",
      site,
    };
  } catch {
    return {
      status: "not_found",
      address,
      message: "The backend is not reachable right now.",
    };
  }
}

export async function recordVisit({
  personId,
  page,
  arrivedFrom,
  referrerAddress,
}: {
  personId: string;
  page: PageResult;
  arrivedFrom: VisitSource;
  referrerAddress?: string | null;
}) {
  const address = page.status === "found" ? page.site.address : page.address;

  if (!/^[a-z0-9-]+\.zz$/.test(address)) {
    return;
  }

  await fetch(`${API_BASE_URL}/visits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personId,
      address,
      siteId: page.status === "found" ? page.site._id : undefined,
      status: page.status,
      arrivedFrom,
      referrerAddress: referrerAddress ?? undefined,
      titleSnapshot: page.status === "found" ? page.site.title : undefined,
      htmlSnapshot: page.status === "found" ? page.site.bodyHtml : undefined,
    }),
  });
}

export async function fetchVisits(personId: string): Promise<Visit[]> {
  if (!personId) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/visits?personId=${personId}`);

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

export async function searchSites(query: string): Promise<Site[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/sites/search?q=${encodeURIComponent(trimmedQuery)}`,
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

export async function publishSite(payload: CreateSitePayload): Promise<{
  site?: Site;
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/sites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);

      return {
        error: getPublishErrorMessage(errorBody?.message),
      };
    }

    return {
      site: (await response.json()) as Site,
    };
  } catch {
    return {
      error: "The backend is not reachable right now.",
    };
  }
}
