import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const srcLogoDir = path.resolve("src/logo");
const publicLogoDir = path.resolve("public/logo");
const publicDir = path.resolve("public");

if (!fs.existsSync(publicLogoDir)) {
  fs.mkdirSync(publicLogoDir, { recursive: true });
}

// Mapping of original filenames to semantic names
const logoMappings = [
  {
    original: "sinyal-ai-news-logo-1 (1).png",
    semantic: "sinyal-ai-news-logo-horizontal-dark.webp",
    description: "Horizontal lockup for dark background (white text + neon green mark)",
  },
  {
    original: "sinyal-ai-news-logo-1 (2).png",
    semantic: "sinyal-ai-news-logo-horizontal-alt.webp",
    description: "Horizontal lockup variant 2",
  },
  {
    original: "sinyal-ai-news-logo-1 (3).png",
    semantic: "sinyal-ai-news-logo-horizontal-light.webp",
    description: "Horizontal lockup for light background (dark text + neon green mark)",
  },
  {
    original: "sinyal-ai-news-logo-1 (4).png",
    semantic: "sinyal-ai-news-logo-stacked-dark.webp",
    description: "Stacked vertical lockup for dark background",
  },
  {
    original: "sinyal-ai-news-logo-1 (5).png",
    semantic: "sinyal-ai-news-logo-stacked-light.webp",
    description: "Stacked vertical lockup for light background",
  },
  {
    original: "sinyal-ai-news-logo-1 (6).png",
    semantic: "sinyal-ai-news-logo-icon.webp",
    description: "Square symbol / icon with transparent background",
  },
  {
    original: "sinyal-ai-news-logo-1 (7).png",
    semantic: "sinyal-ai-news-logo-icon-card.webp",
    description: "Square symbol / app icon with solid dark background",
  },
];

async function convert() {
  console.log("🚀 Starting Logo WebP Conversion & Project Implementation...");

  for (const item of logoMappings) {
    const inputPath = path.join(srcLogoDir, item.original);
    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️ Warning: ${item.original} not found!`);
      continue;
    }

    const imgBuffer = fs.readFileSync(inputPath);

    // 1. Direct webp conversion in src/logo (same numbered basename)
    const srcNumberedWebp = path.join(
      srcLogoDir,
      item.original.replace(/\.png$/, ".webp")
    );
    await sharp(imgBuffer)
      .webp({ quality: 90 })
      .toFile(srcNumberedWebp);

    // 2. Semantic webp conversion in src/logo
    const srcSemanticWebp = path.join(srcLogoDir, item.semantic);
    await sharp(imgBuffer)
      .webp({ quality: 90 })
      .toFile(srcSemanticWebp);

    // 3. Semantic webp copy to public/logo/
    const publicSemanticWebp = path.join(publicLogoDir, item.semantic);
    await sharp(imgBuffer)
      .webp({ quality: 90 })
      .toFile(publicSemanticWebp);

    // Also keep semantic PNG in public/logo/ for legacy fallback
    const publicSemanticPng = path.join(
      publicLogoDir,
      item.semantic.replace(/\.webp$/, ".png")
    );
    await sharp(imgBuffer)
      .png()
      .toFile(publicSemanticPng);

    console.log(`✅ Converted: ${item.original} -> ${item.semantic}`);
  }

  // 4. Generate Core Public Icons / Web Assets
  const iconBuffer = fs.readFileSync(path.join(srcLogoDir, "sinyal-ai-news-logo-1 (6).png"));
  const iconSolidBuffer = fs.readFileSync(path.join(srcLogoDir, "sinyal-ai-news-logo-1 (7).png"));
  const horizontalBuffer = fs.readFileSync(path.join(srcLogoDir, "sinyal-ai-news-logo-1 (1).png"));

  // public/logo.webp (512x512)
  await sharp(iconBuffer)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, "logo.webp"));

  // public/logo.png (512x512)
  await sharp(iconBuffer)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, "logo.png"));

  // public/logo-horizontal.webp
  await sharp(horizontalBuffer)
    .resize(720, undefined, { fit: "inside" })
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, "logo-horizontal.webp"));

  // public/apple-touch-icon.png (180x180)
  await sharp(iconSolidBuffer)
    .resize(180, 180, { fit: "cover" })
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));

  // public/favicon-32x32.png
  await sharp(iconBuffer)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, "favicon-32x32.png"));

  // public/favicon-16x16.png
  await sharp(iconBuffer)
    .resize(16, 16, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, "favicon-16x16.png"));

  // 5. Generate high-quality 1200x630 og-default.png
  const width = 1200;
  const height = 630;
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="#184534" stop-opacity="0.45" />
          <stop offset="70%" stop-color="#0a131a" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3dff9a" stop-opacity="0.5" />
          <stop offset="50%" stop-color="#1a9f5c" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4" />
        </linearGradient>
      </defs>
      
      <!-- Background rect -->
      <rect width="${width}" height="${height}" fill="#07090c" />
      <rect width="${width}" height="${height}" fill="url(#glow)" />
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="20" fill="none" stroke="url(#borderGrad)" stroke-width="2" stroke-opacity="0.6" />
      
      <!-- Live Badge -->
      <g transform="translate(80, 70)">
        <rect width="180" height="36" rx="18" fill="rgba(61, 255, 154, 0.12)" stroke="#3dff9a" stroke-width="1.2" stroke-opacity="0.4"/>
        <circle cx="22" cy="18" r="5" fill="#3dff9a"/>
        <text x="38" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#3dff9a" letter-spacing="1.5">LIVE SIGNALS</text>
      </g>
      
      <!-- Subtitle / Tagline -->
      <text x="80" y="470" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="600" fill="#f1f5f9">
        Berita Terkini Dunia AI (Akal Imitasi)
      </text>
      <text x="80" y="515" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#94a3b8">
        Kurasi rilis resmi AI: OpenAI, Google, Anthropic, Meta, xAI, NVIDIA, Microsoft
      </text>
      
      <!-- Domain footer badge -->
      <text x="1120" y="565" text-anchor="end" font-family="monospace" font-size="16" font-weight="600" fill="#3dff9a" opacity="0.85">
        vibe-coder-eja.github.io/sinyalai-news
      </text>
    </svg>
  `);

  const logoResized = await sharp(horizontalBuffer)
    .resize(750, undefined, { fit: "inside" })
    .toBuffer();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 7, g: 9, b: 12, alpha: 1 },
    },
  })
    .composite([
      { input: svgOverlay, top: 0, left: 0 },
      { input: logoResized, top: 140, left: 75 },
    ])
    .png({ quality: 90 })
    .toFile(path.join(publicDir, "og-default.png"));

  console.log("🎉 All logos, web assets, and OG image generated successfully!");
}

convert().catch(console.error);
