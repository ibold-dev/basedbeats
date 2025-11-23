"use client";

import { RowCovers } from "@/components";
import { sendTransaction } from "@/hooks/send-transaction";
import { useFaucet } from "@/hooks/use-faucet";
import { useMusicStore } from "@/store/music";
import { Button, addToast } from "@heroui/react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  console.log(address);
  const { loadDemoTracks } = useMusicStore();
  const { handleSendTransaction, sendUSDC } = sendTransaction();
  const faucetMutation = useFaucet();
  const trendingItems = [
    {
      id: "1",
      rank: 1,
      title: "Pink Venom",
      artist: "BLACKPINK",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=160&h=160&fit=crop&crop=center",
      artistColor: "#ff69b4",
    },
    {
      id: "2",
      rank: 2,
      title: "Quevedo: Bzrp Music Sessions, Vol. 52",
      artist: "Bizarrap & Quevedo",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=160&h=160&fit=crop&crop=center",
      artistColor: "#ffff00",
    },
    {
      id: "3",
      rank: 3,
      title: "La Bachata",
      artist: "Manuel Turizo",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=center",
      artistColor: "#ffffff",
    },
    {
      id: "4",
      rank: 4,
      title: "Tití Me Preguntó",
      artist: "Bad Bunny",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=160&h=160&fit=crop&crop=center",
      artistColor: "#ff6b6b",
    },
    {
      id: "5",
      rank: 5,
      title: "As It Was",
      artist: "Harry Styles",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=160&h=160&fit=crop&crop=center",
      artistColor: "#00ff88",
    },
    {
      id: "6",
      rank: 6,
      title: "Heat Waves",
      artist: "Glass Animals",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=160&h=160&fit=crop&crop=center",
      artistColor: "#ff8800",
    },
    {
      id: "7",
      rank: 7,
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=center",
      artistColor: "#0088ff",
    },
  ];

  const stackedImages = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=160&h=160&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=160&h=160&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=center",
  ];

  return (
    <div className="max-w-[320px]">
      {/* Demo Button */}
      <div className="px-4 py-2">
        <Button
          onPress={loadDemoTracks}
          className="w-full bg-amber-600 text-white"
        >
          Load Demo Tracks
        </Button>
      </div>

      <div className="px-4 py-2">
        <Button onPress={sendUSDC} className="w-full bg-amber-600 text-white">
          Send Transaction
        </Button>
      </div>

      <div className="px-4 py-2">
        <Button
          onPress={() => {
            if (!address) {
              addToast({
                title: "Wallet Not Connected",
                description: "Please connect your wallet first",
                color: "warning",
              });
              return;
            }
            faucetMutation.mutate(
              {
                address: address as `0x${string}`,
              },
              {
                onSuccess: (data) => {
                  addToast({
                    title: "Faucet Success!",
                    description: data.message || "USDC sent to your wallet",
                    color: "success",
                  });
                },
                onError: (error) => {
                  addToast({
                    title: "Faucet Failed",
                    description: error.message || "Failed to request faucet",
                    color: "danger",
                  });
                },
              }
            );
          }}
          isLoading={faucetMutation.isPending}
          isDisabled={!address || faucetMutation.isPending}
          className="w-full bg-amber-600 text-white"
        >
          {faucetMutation.isPending ? "Requesting..." : "Receive Faucet"}
        </Button>
      </div>

      <RowCovers
        title="Trending"
        items={trendingItems}
        showStackedCovers={true}
        stackedImages={stackedImages}
      />
      <RowCovers
        title="Recently Played"
        items={trendingItems}
        showStackedCovers={true}
        stackedImages={stackedImages}
      />
    </div>
  );
}
