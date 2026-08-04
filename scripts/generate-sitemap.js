// generate-sitemap.js
import fs from "fs";
import path from "path";
import { routes } from "../src/router/index.js"; // adjust path to your routes file

const BASE_URL = "https://yourdomain.com"; // ✅ replace with your domain
const OUTPUT_PATH = "dist/sitemap.xml"; // or dist/ if no public

// Helper to flatten nested children
function extractPaths(routes, parentPath = "") {
  const paths = [];

  for (const route of routes) {
    if (route.meta?.requiresAuth) continue; // skip protected routes

    const fullPath = path
      .join(parentPath, route.path)
      .replace(/\\/g, "/") // windows-safe
      .replace(/\/+/g, "/"); // clean slashes

    if (!fullPath.includes(":")) {
      paths.push(fullPath);
    }

    if (route.children) {
      paths.push(...extractPaths(route.children, fullPath));
    }
  }

  return paths;
}

const paths = extractPaths(routes);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${paths
  .map((url) => {
    return `<url>
  <loc>${BASE_URL}${url}</loc>
</url>`;
  })
  .join("\n")}
</urlset>`;

// Ensure output directory
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, sitemap);

console.log(
  `✅ Sitemap generated with ${paths.length} routes at ${OUTPUT_PATH}`
);
