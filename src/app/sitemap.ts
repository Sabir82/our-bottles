import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          "x-default": `${baseUrl}/`,
        },
      },
    },
    {
      url: `${baseUrl}/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: {
          en: `${baseUrl}/products`,
          "x-default": `${baseUrl}/products`,
        },
      },
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/pricing`,
          "x-default": `${baseUrl}/pricing`,
        },
      },
    },
    {
      url: `${baseUrl}/quote`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/quote`,
          "x-default": `${baseUrl}/quote`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
          "x-default": `${baseUrl}/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          "x-default": `${baseUrl}/about`,
        },
      },
    },
  ];
}
