import { createWriteStream } from "fs";
import { resolve } from "path";
import { SitemapStream, streamToPromise } from "sitemap";

// TODO: change this to your real production domain
const hostname = "https://turningpointinstitute.in";

// Only public frontend routes. No /api/*, no admin-only routes.
const routes = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/faculty", changefreq: "monthly", priority: 0.7 },
  { url: "/gallery", changefreq: "weekly", priority: 0.7 },
  { url: "/reviews", changefreq: "weekly", priority: 0.8 },
  { url: "/faq", changefreq: "monthly", priority: 0.6 },
  { url: "/contact", changefreq: "yearly", priority: 0.5 },
  { url: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
];

async function generateSitemap() {
  const outputPath = resolve("public", "sitemap.xml");

  const smStream = new SitemapStream({ hostname });
  const writeStream = createWriteStream(outputPath);

  smStream.pipe(writeStream);

  const now = new Date().toISOString();

  for (const route of routes) {
    smStream.write({
      url: route.url,
      changefreq: route.changefreq,
      priority: route.priority,
      lastmodISO: now,
    });
  }

  smStream.end();

  await streamToPromise(smStream);

  console.log(`sitemap.xml generated at ${outputPath}`);
}

generateSitemap().catch((err) => {
  console.error("Error generating sitemap:", err);
  process.exit(1);
});
