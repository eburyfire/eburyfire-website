import { meta as bafe } from "./understanding-bafe-sp203-1.mdx";
import { meta as logbook } from "./fire-log-book.mdx";
import { meta as callus } from "./call-us-vs-brigade.mdx";
import { meta as maintenance } from "./annual-maintenance-checks.mdx";
import { meta as falseAlarms } from "./false-alarms.mdx";

export type ResourceCategory = "compliance" | "how-to" | "templates" | "news";

export type ResourceMeta = {
  slug: string;
  title: string;
  category: ResourceCategory;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
};

export const resourceMetas: ResourceMeta[] = [
  bafe,
  logbook,
  callus,
  maintenance,
  falseAlarms,
] as ResourceMeta[];
