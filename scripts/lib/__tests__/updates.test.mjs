import { describe, expect, it } from "vitest";
import { parseUpdates } from "../updates.mjs";

const PAGE = "https://docs.z.ai/release-notes/new-released.md";

const notes = `# New Released

## Models

<Update label="2026-08-26" description="  GLM-5.3-Flash">
  * Native visual capabilities enable the model to observe interfaces.

  * Efficient hybrid architecture with **320B** total parameters. Learn more in our [documentation](/guides/vlm/glm-5.3-flash).\\*
</Update>

<Update label="2026-01-14" description="  GLM-Image">
  * We've launched [GLM-Image](https://docs.z.ai/guides/image/glm-image), an image model.
</Update>

<Update label="2026-02-01" description="  Tanpa Tautan">
  * Ringkasan saja.
</Update>

<Update label="bukan-tanggal" description="GLM-X">
  * Dilewati.
</Update>
`;

describe("parseUpdates", () => {
  const items = parseUpdates(notes, PAGE);

  it("membaca tanggal (UTC), nama model sebagai judul, dan melewati blok tanpa tanggal valid", () => {
    expect(items.map((i) => i.title)).toEqual(["Z.ai GLM-5.3-Flash", "Z.ai GLM-Image", "Z.ai Tanpa Tautan"]);
    expect(items[0].publishedAt.toISOString()).toBe("2026-08-26T00:00:00.000Z");
  });

  it("memakai tautan dokumentasi model, relatif maupun absolut", () => {
    expect(items[0].link).toBe("https://docs.z.ai/guides/vlm/glm-5.3-flash");
    expect(items[1].link).toBe("https://docs.z.ai/guides/image/glm-image");
  });

  it("bila tak ada tautan dokumentasi, memakai jangkar halaman catatan rilis yang unik per rilis", () => {
    expect(items[2].link).toBe("https://docs.z.ai/release-notes/new-released#2026-02-01-tanpa-tautan");
  });

  it("membersihkan markdown dan kalimat 'Learn more' dari ringkasan", () => {
    expect(items[0].summary).toBe(
      "Native visual capabilities enable the model to observe interfaces. Efficient hybrid architecture with 320B total parameters.",
    );
    expect(items[1].summary).toBe("We've launched GLM-Image, an image model.");
  });

  it("mengembalikan daftar kosong untuk halaman tanpa blok <Update>", () => {
    expect(parseUpdates("# Kosong", PAGE)).toEqual([]);
  });
});
