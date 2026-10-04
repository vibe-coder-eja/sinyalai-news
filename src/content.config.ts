import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const secureUrl = z.string().url().refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}, {
  message: "Source URL must use HTTPS and must not contain credentials",
});

const news = defineCollection({
  loader: glob({
    base: "./src/content/news",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    company: z.string(),
    source: secureUrl,
    author: z.string().default("Redaktur Sinyal AI News (RSAIN)"),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news };
