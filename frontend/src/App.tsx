import { useNavigate } from "react-router";
import Navbar from "./components/Navbar";
import GooBackground from "./components/GooBackground";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { detectPerformance } from "./utils/detectPerformance";
import { ThemedText } from "./components/ThemedText";
import { ThemedButton } from "./components/ThemedButton";
import TechScroller from "./components/TechScroller";
import { LoadingOverlay } from "./components/LoadingOverlay";

function applyMotionPreference(reduce: boolean) {
  if (reduce) {
    document.documentElement.classList.add("no-gpu");
  } else {
    document.documentElement.classList.remove("no-gpu");
  }
}

function App() {
  const navigate = useNavigate();
  const [reduceMotion, setReduceMotion] = useState(() => {
    const stored = localStorage.getItem("reduce-motion");
    return stored !== null ? stored === "true" : false;
  });
  const [loading, setLoading] = useState(() => localStorage.getItem("fps") === null);

  useEffect(() => {
    const stored = localStorage.getItem("reduce-motion");
    if (stored !== null) {
      setReduceMotion(stored === "true");
    }
    detectPerformance()
      .then((result) => {
        if (stored === null) setReduceMotion(result);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    applyMotionPreference(reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("reduce-motion") === null) {
        setReduceMotion(e.matches);
      }
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  function handleToggle() {
    setReduceMotion((prev) => {
      const next = !prev;
      localStorage.setItem("reduce-motion", String(next));
      return next;
    });
  }

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Navbar />
      <main className={styles.app}>
        <GooBackground dotCount={8} />
        <div className={styles.heroCard}>
          <ThemedText type="h1" weight="bold">
            Full Stack Developer
          </ThemedText>
          <div>
            <ThemedText>
              I like building software that solves small, real problems and
              actually gets used.
            </ThemedText>
            <ThemedText>
              Check out my work and what I learn along the way!
            </ThemedText>
          </div>
          <div className={styles.links}>
            <ThemedButton onClick={() => navigate("/projects")}>
              View Projects
            </ThemedButton>
            <ThemedButton variant="outlined" onClick={() => navigate("/blog")}>
              Read Blog
            </ThemedButton>
          </div>
          <button
            className={styles.motionToggle}
            onClick={handleToggle}
            aria-pressed={!reduceMotion}
            aria-label={
              reduceMotion
                ? "Enable high performance"
                : "Enable low performance"
            }
          >
            <span className={styles.motionIcon}>
              {reduceMotion ? <FaPlay /> : <FaPause />}
            </span>
            <span className={styles.motionLabel}>
              {reduceMotion ? "High performance" : "Low performance"}
            </span>
          </button>
        </div>
        <div className={styles.techStackWrapper}>
          <ThemedText type="overline">crafting with modern tech</ThemedText>
          <TechScroller />
        </div>
      </main>
    </>
  );
}

export default App;
