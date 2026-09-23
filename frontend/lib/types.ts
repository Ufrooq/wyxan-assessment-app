export type Person = {
  _id: string;
  name: string;
};

export type Site = {
  _id: string;
  address: string;
  title: string;
  bodyHtml: string;
  textContent: string;
  authorId: string;
};

export type PageResult =
  | {
      status: "found";
      site: Site;
    }
  | {
      status: "not_found";
      address: string;
      message: string;
    };

export type VisitSource = "typed" | "link" | "history" | "search";

export type Visit = {
  _id: string;
  personId: string;
  address: string;
  siteId: string | null;
  status: "found" | "not_found";
  arrivedFrom: VisitSource;
  referrerAddress: string | null;
  titleSnapshot: string | null;
  htmlSnapshot: string | null;
  visitedAt: string;
};
