import type { Metadata } from "next";
import { Josefin_Sans, Josefin_Slab } from "next/font/google";
import "./globals.css";
import { AppWrapper, BottomBar, TopBar } from "@/components";
import { ModalProvider, UIProvider, Web3Provider } from "@/providers";
import { ReactNode } from "react";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { getWagmiConfig } from "@/config";

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

export default async function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getWagmiConfig(),
    (await headers()).get("cookie")
  );

  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${josefinSlab.variable} antialiased dark text-foreground bg-background`}
      >
        <UIProvider>
          <Web3Provider initialState={initialState}>
            <ModalProvider>
              <AppWrapper>
                <TopBar />
                {props.children}
              </AppWrapper>
              <BottomBar />
            </ModalProvider>
          </Web3Provider>
        </UIProvider>
      </body>
    </html>
  );
}
