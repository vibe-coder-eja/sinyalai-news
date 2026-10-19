import { describe, it, expect } from "vitest";
import { buildShareTargets } from "../lib/share";

const url = "https://sinyalai.xyz/berita/2026-10-07/openai-rilis-gpt-6/";
const title = "OpenAI rilis GPT-6 & fitur baru";

describe("buildShareTargets", () => {
  const targets = buildShareTargets(url, title);
  const byId = Object.fromEntries(targets.map((t) => [t.id, t.href]));

  it("memuat WhatsApp, Telegram, Facebook, X, dan Email", () => {
    expect(targets.map((t) => t.id)).toEqual(["whatsapp", "telegram", "facebook", "x", "email"]);
  });

  it("X memisahkan url dan teks lewat intent post", () => {
    const u = new URL(byId.x);
    expect(u.hostname).toBe("x.com");
    expect(u.pathname).toBe("/intent/post");
    expect(u.searchParams.get("url")).toBe(url);
    expect(u.searchParams.get("text")).toBe(title);
  });

  it("WhatsApp membawa judul dan tautan", () => {
    const text = new URL(byId.whatsapp).searchParams.get("text");
    expect(text).toBe(`${title}\n${url}`);
  });

  it("Telegram memisahkan url dan teks", () => {
    const p = new URL(byId.telegram).searchParams;
    expect(p.get("url")).toBe(url);
    expect(p.get("text")).toBe(title);
  });

  it("Facebook memakai parameter u", () => {
    expect(new URL(byId.facebook).searchParams.get("u")).toBe(url);
  });

  it("Email membuka compose Gmail dengan subjek dan isi", () => {
    const u = new URL(byId.email);
    expect(u.hostname).toBe("mail.google.com");
    expect(u.searchParams.get("su")).toBe(title);
    expect(u.searchParams.get("body")).toContain(url);
  });
});
