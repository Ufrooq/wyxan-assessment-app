import type { PageResult, Person, Site } from "./types";

const API_BASE_URL = process.env.BACKEND_URL ?? "http://localhost:4000";

export async function getPeople(): Promise<Person[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/people`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

export async function getSite(address: string): Promise<PageResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/sites/${address}`, {
      cache: "no-store",
    });

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
