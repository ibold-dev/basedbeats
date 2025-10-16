import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { baseAccount } from "wagmi/connectors";

const getWagmiConfig = () => {
  return createConfig({
    chains: [base, baseSepolia],
    connectors: [
      baseAccount({
        appName: "BasedBeats",
        subAccounts: {
          // creation: "on-connect",
          // defaultAccount: "sub",
        },
        paymasterUrls: {
          [base.id]: process.env.NEXT_PUBLIC_PAYMASTER_SERVICE_URL as string,
          [baseSepolia.id]: process.env
            .NEXT_PUBLIC_PAYMASTER_SERVICE_URL_TESTNET as string,
        },
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(),
      [baseSepolia.id]: http(),
    },
  });
};

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getWagmiConfig>;
  }
}

export { getWagmiConfig };
