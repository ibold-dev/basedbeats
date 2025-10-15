import { StackedCovers } from "@/components";

export default function Home() {
  return (
    <div className="flex items-center justify-center ">
      <StackedCovers
        width={100}
        height={100}
        images={[
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=face",
        ]}
      />
    </div>
  );
}
