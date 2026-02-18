import { useEffect, useRef } from "react";

interface Beam {
  x: number;
  delay: number;
  duration: number;
  width: number;
  opacity: number;
}

const BackgroundBeams = () => {
  const beams: Beam[] = Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 6,
    width: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Beams */}
      {beams.map((beam, i) => (
        <div
          key={i}
          className="absolute top-0 h-[200vh] animate-beam"
          style={{
            left: `${beam.x}%`,
            width: `${beam.width}px`,
            background: `linear-gradient(180deg, transparent, hsl(175 80% 50% / ${beam.opacity}), transparent)`,
            animationDelay: `${beam.delay}s`,
            animationDuration: `${beam.duration}s`,
          }}
        />
      ))}

      {/* Collision glow points */}
      {beams.slice(0, 5).map((beam, i) => (
        <div
          key={`glow-${i}`}
          className="absolute animate-pulse-glow rounded-full"
          style={{
            left: `${beam.x}%`,
            top: `${30 + i * 12}%`,
            width: "4px",
            height: "4px",
            background: "hsl(175 80% 60%)",
            boxShadow: "0 0 20px 8px hsl(175 80% 50% / 0.3)",
            animationDelay: `${beam.delay + 2}s`,
          }}
        />
      ))}

      {/* Radial glow at center */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(175 80% 50% / 0.15), transparent 70%)",
        }}
      />
    </div>
  );
};

export default BackgroundBeams;
