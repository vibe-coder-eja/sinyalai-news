export interface ShareTarget {
  id: "whatsapp" | "telegram" | "facebook" | "email";
  label: string;
  href: string;
}

/**
 * Bangun tautan berbagi untuk satu berita.
 * Semua nilai di-encode agar aman dipakai di query string.
 */
export function buildShareTargets(url: string, title: string): ShareTarget[] {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const textWithUrl = encodeURIComponent(`${title}\n${url}`);

  return [
    { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${textWithUrl}` },
    { id: "telegram", label: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}` },
    { id: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    {
      id: "email",
      label: "Email (Gmail)",
      href: `https://mail.google.com/mail/?view=cm&fs=1&su=${t}&body=${encodeURIComponent(`Baca berita ini di Sinyal AI News:\n${title}\n${url}`)}`,
    },
  ];
}
