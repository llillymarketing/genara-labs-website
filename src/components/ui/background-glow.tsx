import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
  className?: string;
  /** Position of the glow center — defaults to "center" */
  position?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Brand color for the glow — defaults to sky (#4FC3F7) */
  color?: "sky" | "cerulean" | "royal" | "ice";
}

const colorMap = {
  sky: "#4FC3F7",
  cerulean: "#2196F3",
  royal: "#1565C0",
  ice: "#E1F5FE",
};

const positionMap = {
  center: "50% 50%",
  "top-left": "20% 20%",
  "top-right": "80% 20%",
  "bottom-left": "20% 80%",
  "bottom-right": "80% 80%",
};

function BackgroundGlow({
  className,
  position = "center",
  color = "sky",
}: BackgroundGlowProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        background: `radial-gradient(circle at ${positionMap[position]}, ${colorMap[color]} 0%, transparent 70%)`,
        opacity: 0.08,
        mixBlendMode: "multiply",
      }}
    />
  );
}

export { BackgroundGlow };
