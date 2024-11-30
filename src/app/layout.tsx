import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://2ndbrain.vercel.app/"),
  title: "Second Brain - A Note Taking App",
  description: "Second Brain is a free for creating and sharing content. ",
  keywords: [
    "Second Brain",
    "Content Creation",
    "Sharing",
    "10xTech Infinity",
    "manojofficialmj",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "klk7ERNcZtbq9W3ycZxJn4q2K9K6gOP-YmVO8A3ZVTY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add Twitter script here */}
        <script src="https://platform.twitter.com/widgets.js" async></script>
      </head>
      <body className={`font-RobotoSerifVar antialiased`}>
        {children}
        <Analytics />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
