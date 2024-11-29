import { getServerSideSitemap } from "next-sitemap";
import { NextResponse } from "next/server";

export async function GET() {
  // Generate sitemap items dynamically
  const posts = [
    {
      url: "https://2ndbrain.vercel.app/",
      lastmod: new Date().toISOString(),
    },
  ];

  const fields = posts.map((post) => ({
    loc: post.url,
    lastmod: post.lastmod,
  }));

  const sitemap = await getServerSideSitemap(fields);
  const body = await sitemap.clone().arrayBuffer();
  return new NextResponse(body, {
    headers: { "Content-Type": "application/xml" },
  });
}

export const dynamic = "force-dynamic";
