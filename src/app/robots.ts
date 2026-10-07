import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
          "Applebot",
          "facebookexternalhit",
          "Twitterbot",
          "LinkedInBot",
        ],
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Bytespider",
          "CCBot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
