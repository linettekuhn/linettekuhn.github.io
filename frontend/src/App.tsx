import { Link } from "react-router";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";
import { useEffect, useRef } from "react";
function App() {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bubbleRef.current) return;

      bubbleRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      bubbleRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
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
                                                      0 0 0 18 -8"
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
        </div>
      </main>
    </>
  );
}

export default App;
