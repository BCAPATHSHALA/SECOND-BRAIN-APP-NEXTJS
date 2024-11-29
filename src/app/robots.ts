import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api",
        "/api/",
        "/api/*",
        "/admin",
        "/admin/",
        "/admin/*",
        "/dashboard",
        "/dashboard/",
        "/dashboard/*",
        "/access-denied",
        "/robots.txt",
      ],
    },
    sitemap: "https://2ndbrain.vercel.app/sitemap.xml",
  };
}
