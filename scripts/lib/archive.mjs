/**
 * Tandai artikel sebagai arsip lewat front matter. Mengembalikan teks yang sama bila
 * sudah diarsipkan atau tidak punya front matter.
 * @param {string} markdown
 * @returns {string}
 */
export function archiveMarkdown(markdown) {
  const m = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return markdown;
  const fm = m[1];
  if (/^archived:\s*true\s*$/m.test(fm)) return markdown;
  const nl = markdown.includes("\r\n") ? "\r\n" : "\n";
  let newFm;
  if (/^archived:.*$/m.test(fm)) {
    newFm = fm.replace(/^archived:.*$/m, "archived: true");
  } else if (/^draft:.*$/m.test(fm)) {
    newFm = fm.replace(/^(draft:.*)$/m, `$1${nl}archived: true`);
  } else {
    newFm = `${fm}${nl}archived: true`;
  }
  return markdown.replace(fm, () => newFm);
}
