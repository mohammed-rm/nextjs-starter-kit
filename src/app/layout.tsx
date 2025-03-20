import "@/styles/globals.css";

import { geistSans } from "@/fonts";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Starter Kit",
  description:
    "A modern web application starter kit built with cutting-edge technologies for rapid development",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
