import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) {
  return (
    <p
      className={cn("animate-shiny-text bg-clip-text", className)}
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
          backgroundImage:
            "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
        } as CSSProperties
      }
    >
      {children}
    </p>
  );
}
