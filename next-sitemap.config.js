/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://2ndbrain.vercel.app/",
  generateRobotsTxt: true,
  outDir: "./public",
  exclude: [
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
  robotsTxtOptions: {
    additionalSitemaps: ["https://2ndbrain.vercel.app/server-sitemap.xml"],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
