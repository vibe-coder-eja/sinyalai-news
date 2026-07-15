const MAX_SLUG_LENGTH = 80;

/**
 * Buat slug URL-safe dari judul + company.
 * @param {string} title
 * @param {string} [company]
 */
export function slugify(title, company = "") {
  const base = `${company} ${title}`
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  if (base.length <= MAX_SLUG_LENGTH) {
    return base || "sinyal";
  }

  const slice = base.slice(0, MAX_SLUG_LENGTH);
  const lastDash = slice.lastIndexOf("-");

  if (lastDash > MAX_SLUG_LENGTH - 15) {
    return slice.slice(0, lastDash).replace(/-+$/g, "") || "sinyal";
  }

  return slice.replace(/-+$/g, "") || "sinyal";
}

/**
 * @param {string} slug
 * @param {Set<string>} existing
 */
export function uniqueSlug(slug, existing) {
  if (!existing.has(slug)) return slug;
  let i = 2;
  while (existing.has(`${slug}-${i}`) && i < 100) {
    i += 1;
  }
  return `${slug}-${i}`;
}
