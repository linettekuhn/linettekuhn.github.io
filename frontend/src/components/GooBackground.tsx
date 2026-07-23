import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./GooBackground.module.css";

const ANIMATION_VARIANTS = [
  styles.lavaVertical,
  styles.lavaHorizontal,
  styles.lavaCircular,
  styles.lavaDiagonal,
  styles.lavaDrift,
] as const;

const DOT_COUNT = 17;

function getReduceMotion(): boolean {
  const stored = localStorage.getItem("reduce-motion");
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function GooBackground() {
  const mouseRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(getReduceMotion);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "reduce-motion") {
        setReduceMotion(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorage);

    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setReduceMotion(html.classList.contains("no-gpu"));
    });
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", handleStorage);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseRef.current) return;
      const container = mouseRef.current.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      mouseRef.current.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`,
      );
      mouseRef.current.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`,
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion]);

  const dotConfigs = useMemo(() => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    const colors = isDark
      ? [
          "rgba(47, 247, 227, 0.8)",
          "rgba(162, 89, 255, 0.8)",
          "rgba(255, 93, 233, 0.8)",
          "rgba(191, 255, 0, 0.8)",
          "rgba(0, 166, 255, 0.8)",
        ]
      : [
          "rgba(106, 159, 120, 0.8)",
          "rgba(122, 175, 201, 0.8)",
          "rgba(163, 143, 201, 0.8)",
          "rgba(199, 162, 124, 0.8)",
          "rgba(232, 203, 139, 0.8)",
        ];

    return Array.from({ length: DOT_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.6 + Math.random() * 0.8,
      duration: 15 + Math.random() * 25,
      delay: -(Math.random() * 20),
      color: colors[i % colors.length],
      animation: ANIMATION_VARIANTS[i % ANIMATION_VARIANTS.length],
    }));
  }, []);

  return (
    <div
      className={styles.container}
      style={
        reduceMotion
          ? undefined
          : ({ filter: "url(#goo) blur(15px)" } as React.CSSProperties)
      }
    >
      {!reduceMotion && (
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={100}
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 30 -12"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      )}
      {dotConfigs.map((dot) => (
        <div
          key={dot.id}
          className={styles.dot}
          style={
            {
              "--dot-x": `${dot.x}%`,
              "--dot-y": `${dot.y}%`,
              "--dot-scale": dot.scale,
              "--dot-duration": `${dot.duration}s`,
              "--dot-delay": `${dot.delay}s`,
              "--dot-color": dot.color,
              "--dot-animation": dot.animation,
            } as React.CSSProperties
          }
        />
      ))}
      {!reduceMotion && (
        <div ref={mouseRef} className={styles.interactive} />
      )}
    </div>
  );
}

export default GooBackground;
