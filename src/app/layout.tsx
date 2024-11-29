import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Second Brain - A Note Taking & Sharing App",
  description: "Second Brain is a free for creating and sharing content.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-RobotoSerifVar antialiased`}>{children}</body>
    </html>
  );
}
