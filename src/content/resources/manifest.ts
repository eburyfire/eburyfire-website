import { meta as maintenance } from "./annual-maintenance-checks.mdx";
import { meta as callus } from "./call-us-vs-brigade.mdx";
import { meta as falseAlarms } from "./false-alarms.mdx";
import { meta as logbook } from "./fire-log-book.mdx";
import { meta as myJob } from "./is-the-fire-alarm-my-job.mdx";
import { meta as gas } from "./gas-suppression-server-room.mdx";
import { meta as questions } from "./questions-to-ask-your-fire-alarm-provider.mdx";
import { meta as horror } from "./horror-stories-happen.mdx";

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
  horror,
  myJob,
  questions,
  gas,
  maintenance,
  callus,
  falseAlarms,
  logbook,
] as ResourceMeta[];
