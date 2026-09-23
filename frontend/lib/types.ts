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
