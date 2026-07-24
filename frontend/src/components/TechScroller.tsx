import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./TechScroller.module.css";
import { ThemedText } from "./ThemedText";

const TECH_ITEMS = [
  "React",
  "React Native",
  "TypeScript",
  "JavaScript",
  "Python",
  "FastAPI",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "SQLite",
  "Docker",
  "AWS",
  "C++",
  "Kotlin",
  "Expo",
  "GSAP",
  "Framer Motion",
  "Git",
  "GitHub Actions",
];

function getReduceMotion(): boolean {
  const stored = localStorage.getItem("reduce-motion");
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function TechScroller() {
  const [reduceMotion, setReduceMotion] = useState(getReduceMotion);
  const [copies, setCopies] = useState(2);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Hidden, single copy of the set used purely for measuring. Its size
  // never changes with `copies`, so measuring here can't feed back into
  // itself the way measuring the live (duplicated) track did.
  const measureRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const recalculate = () => {
      const scroller = scrollerRef.current;
      const track = trackRef.current;
      const measure = measureRef.current;
      if (!scroller || !track || !measure) return;

      const setWidth = measure.offsetWidth;
      const scrollerWidth = scroller.offsetWidth;
      if (setWidth === 0) return;

      // Always keep at least one full extra set's worth of pills beyond
      // the visible scroller width, so the next set is already fully in
      // place by the time the current one scrolls out. Otherwise a
      // scroller wider than one set shows blank space before the loop
      // resets.
      const needed = Math.max(2, Math.ceil(scrollerWidth / setWidth) + 1);
      setCopies((prev) => (prev === needed ? prev : needed));
      track.style.setProperty("--scroll-distance", `${setWidth}px`);
    };

    recalculate();
    window.addEventListener("resize", recalculate);
    return () => window.removeEventListener("resize", recalculate);
  }, []);

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

  const trackClass = `${styles.track} ${reduceMotion ? styles.reduceMotion : ""}`;

  return (
    <div ref={scrollerRef} className={styles.scroller}>
      <div
        ref={measureRef}
        className={styles.set}
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          top: 0,
          left: 0,
        }}
        aria-hidden="true"
      >
        {TECH_ITEMS.map((tech) => (
          <span key={`measure-${tech}`} className={styles.pill}>
            <ThemedText type="footnote">{tech}</ThemedText>
          </span>
        ))}
      </div>
      <div ref={trackRef} className={trackClass}>
        {Array.from({ length: copies }).map((_, setIndex) => (
          <div className={styles.set} key={setIndex}>
            {TECH_ITEMS.map((tech) => (
              <span key={`${setIndex}-${tech}`} className={styles.pill}>
                <ThemedText type="footnote">{tech}</ThemedText>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
