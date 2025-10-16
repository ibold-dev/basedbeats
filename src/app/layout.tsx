import type { Metadata } from "next";
import { Josefin_Sans, Josefin_Slab } from "next/font/google";
import "./globals.css";
import { AppWrapper, BottomBar, TopBar } from "@/components";
import { ModalProvider, UIProvider, Web3Provider } from "@/providers";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const josefinSlab = Josefin_Slab({
  variable: "--font-josefin-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Based Beats",
  description: "Based Beats is a platform for creating and sharing beats.",
  icons: {
    icon: "/logo.svg",
  },
  manifest: "/manifest.ts",
  appleWebApp: { title: "Based Beats", statusBarStyle: "black-translucent" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${josefinSlab.variable} antialiased dark text-foreground bg-background`}
      >
        <UIProvider>
          <Web3Provider>
            <ModalProvider>
              <AppWrapper>
                <TopBar />
                {children}
              </AppWrapper>
              <BottomBar />
            </ModalProvider>
          </Web3Provider>
        </UIProvider>
      </body>
    </html>
  );
}
