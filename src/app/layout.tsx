import "@/styles/globals.css";
import getConfig from "next/config";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { publicRuntimeConfig } = getConfig();
  const version = publicRuntimeConfig?.version

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Header />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex gap-2 items-center justify-center py-3">
              <p className="text-default-600 text-xs flex gap-1">
                VibeJira Next ({version}) is a fork version of{" "}
                <Link
                  isExternal
                  color="primary"
                  className="flex items-center gap-1 font-semibold text-primary text-xs"
                  href="https://github.com/thananon/vibejira"
                  title="VibeJira Github"
                >
                  VibeJira by Thananon
                </Link>
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
