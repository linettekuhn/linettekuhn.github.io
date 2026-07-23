import { Link } from "react-router";
import Navbar from "./components/Navbar";
import GooBackground from "./components/GooBackground";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";

function shouldReduceMotion(): boolean {
  const stored = localStorage.getItem("reduce-motion");
  if (stored !== null) return stored === "true";
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
  const [reduceMotion, setReduceMotion] = useState(shouldReduceMotion);

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
    setReduceMotion((prev) => !prev);
  }

  return (
    <>
      <Navbar />
      <main className={styles.app}>
        <GooBackground />
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
            aria-pressed={!reduceMotion}
            aria-label={
              reduceMotion ? "Enable high performance" : "Enable low performance"
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
      </main>
    </>
  );
}

export default App;
