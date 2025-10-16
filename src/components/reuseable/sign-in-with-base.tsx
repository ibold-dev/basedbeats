"use client";

import { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { Button, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SignInWithBaseProps {
  variant?: "icon" | "full";
  showDisconnect?: boolean;
}

export function SignInWithBase({
  variant = "icon",
  showDisconnect = true,
}: SignInWithBaseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, address } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // Find the Base Account connector
  const baseAccountConnector = connectors.find(
    (connector) => connector.id === "baseAccount"
  );

  const handleSignIn = async () => {
    if (!baseAccountConnector) {
      addToast({
        title: "Connection Error",
        description: "Base Account connector not found",
        color: "danger",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 1 — Get a fresh nonce from the backend
      const nonceResponse = await fetch("/api/auth/nonce");
      const { nonce } = await nonceResponse.json();

      // 2 — Connect and get the provider
      await connectAsync({ connector: baseAccountConnector });
      const provider = (await baseAccountConnector.getProvider()) as {
        request: (params: {
          method: string;
          params: Array<{
            version: string;
            capabilities: {
              signInWithEthereum: {
                nonce: string;
                chainId: string;
              };
            };
          }>;
        }) => Promise<{
          accounts: Array<{
            address: string;
            capabilities: {
              signInWithEthereum: {
                message: string;
                signature: string;
              };
            };
          }>;
        }>;
      };

      // 3 — Authenticate with wallet_connect
      const authResult = await provider.request({
        method: "wallet_connect",
        params: [
          {
            version: "1",
            capabilities: {
              signInWithEthereum: {
                nonce,
                chainId: "0x2105", // Base Mainnet - 8453
              },
            },
          },
        ],
      });

      const { accounts } = authResult;
      const { address, capabilities } = accounts[0];
      const { message, signature } = capabilities.signInWithEthereum;

      // 4 — Verify on backend
      const verifyResponse = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, message, signature }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.error || "Verification failed");
      }

      const result = await verifyResponse.json();
      addToast({
        title: "Connected",
        description: "Successfully connected to Base!",
        color: "success",
      });
      console.log("Authentication successful:", result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Authentication error:", err.message);
        addToast({
          title: "Connection Failed",
          description: err.message || "Sign in failed. Please try again.",
          color: "danger",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isConnected) {
    if (variant === "full") {
      return (
        <div className="space-y-3 w-full">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg">
            <Icon
              icon="mynaui:credit-card-solid"
              className="w-5 h-5 text-amber-400"
            />
            <div className="flex-1">
              <p className="text-xs text-gray-400">Connected</p>
              <span className="font-mono text-sm text-white">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
          </div>
          {showDisconnect && (
            <Button
              variant="light"
              className="w-full text-red-400 hover:bg-red-800/30"
              onPress={() => {
                disconnect();
                addToast({
                  title: "Disconnected",
                  description: "Wallet disconnected successfully",
                  color: "success",
                });
              }}
              startContent={<Icon icon="mynaui:logout" className="w-5 h-5" />}
            >
              Disconnect
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
          <Icon
            icon="mynaui:credit-card-solid"
            className="w-4 h-4 text-amber-400"
          />
          <span className="font-mono text-sm text-white hidden sm:block">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
        {showDisconnect && (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="w-8 h-8 min-w-8 text-gray-400 hover:text-red-400 hover:bg-red-800/30"
            onPress={() => {
              disconnect();
              addToast({
                title: "Disconnected",
                description: "Wallet disconnected successfully",
                color: "success",
              });
            }}
          >
            <Icon icon="mynaui:logout" className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  if (variant === "full") {
    return (
      <Button
        variant="solid"
        size="lg"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium"
        onPress={handleSignIn}
        isLoading={isLoading}
        disabled={isLoading}
        startContent={
          !isLoading && (
            <Icon icon="mynaui:credit-card-solid" className="w-5 h-5" />
          )
        }
      >
        {isLoading ? "Connecting..." : "Sign in with Base"}
      </Button>
    );
  }

  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      className="w-10 h-10 min-w-10 bg-amber-600 hover:bg-amber-700 text-white"
      onPress={handleSignIn}
      isLoading={isLoading}
      disabled={isLoading}
    >
      <Icon icon="mynaui:credit-card-solid" className="w-5 h-5" />
    </Button>
  );
}
