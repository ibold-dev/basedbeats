import React from "react";

interface StackedCoversProps {
  images: string[];
  className?: string;
  width?: number;
  height?: number;
}

const StackedCovers: React.FC<StackedCoversProps> = ({
  images,
  className,
  width = 300,
  height = 300,
}) => {
  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {images.slice(0, 3).map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`cover-${index}`}
          className={`absolute rounded-2xl shadow-xl object-cover transition-transform duration-300
           ${index === 0 ? "z-30 scale-100" : ""}
           ${index === 1 ? "z-20 scale-95 opacity-90" : ""}
           ${index === 2 ? "z-10 scale-90 opacity-80" : ""}`}
          style={{
            width: "100%",
            height: "100%",
            transform:
              index === 0
                ? "translate(0, 0)"
                : index === 1
                ? `translate(${width * 0.06}px, ${height * 0.03}px)`
                : `translate(${width * 0.12}px, ${height * 0.06}px)`,
          }}
        />
      ))}
    </div>
  );
};

export { StackedCovers };
