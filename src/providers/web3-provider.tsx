"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

import { getWagmiConfig } from "@/config";

export function Web3Provider(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [wagmiConfig] = useState(() => getWagmiConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider
      config={wagmiConfig}
      initialState={props.initialState}
      reconnectOnMount
    >
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
