import { SITE_CONFIG } from "@/config/site";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");
  const today = new Date().toISOString().split("T")[0];

  const pages = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/products", priority: "0.9", changefreq: "weekly" },
    { path: "/pricing", priority: "0.9", changefreq: "weekly" },
    { path: "/quote", priority: "0.9", changefreq: "weekly" },
    { path: "/contact", priority: "0.8", changefreq: "monthly" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path === "/" ? "/" : page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
