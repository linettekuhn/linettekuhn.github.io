import { Link } from "react-router";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";

function shouldReduceMotion(): boolean {
  // check localStorage first — user preference overrides everything
  const stored = localStorage.getItem("reduce-motion");
  if (stored !== null) return stored === "true";

  // fall back to OS-level preference
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function applyMotionPreference(reduce: boolean) {
  if (reduce) {
    document.documentElement.classList.add("no-gpu");
  } else {
    document.documentElement.classList.remove("no-gpu");
  }
  localStorage.setItem("reduce-motion", String(reduce));
}

function App() {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(shouldReduceMotion);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bubbleRef.current) return;
      const container = bubbleRef.current.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      bubbleRef.current.style.setProperty("--mouse-x", `${x}px`);
      bubbleRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    applyMotionPreference(reduceMotion);

    if (!reduceMotion) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // reveal page after preference is applied
    document.documentElement.style.opacity = "";
    document.documentElement.classList.add("ready");

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion]);

  useEffect(() => {
    // sync with OS preference changes if user hasn't set a manual preference
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
    setReduceMotion((prev) => !prev);
  }

  return (
    <>
      <Navbar />
      <main className={styles.app}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="100"
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
        <div className={styles.gradientsContainer}>
          <div className={styles.g1}></div>
          <div className={styles.g2}></div>
          <div className={styles.g3}></div>
          <div className={styles.g4}></div>
          <div ref={bubbleRef} className={styles.interactive}></div>
        </div>
        <div className={styles.header}>
          <div className={styles.nameWrapper}>
            <h1 className="name">
              LINETTE <br /> KÜHN
            </h1>
          </div>
          <div className={styles.subHeading}>
            <h4>Full Stack Developer</h4>
            <h5>Check out my work and what I learn along the way!</h5>
          </div>
          <div className={styles.links}>
            <Link className="button" to={"/projects"}>
              Projects
            </Link>
            <Link className="button" to={"/blog"}>
              Blog
            </Link>
          </div>
          <button
            className={styles.motionToggle}
            onClick={handleToggle}
            aria-pressed={reduceMotion}
            aria-label={
              reduceMotion ? "Enable animations" : "Disable animations"
            }
          >
            <span className={styles.motionIcon}>
              {reduceMotion ? <FaPlay /> : <FaPause />}
            </span>
            <span className={styles.motionLabel}>
              {reduceMotion ? "Enable animations" : "Disable animations"}
            </span>
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
