import { Link } from "react-router";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";
import { useEffect, useRef } from "react";

function hasHardwareAcceleration(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return false;
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = gl.getParameter(
        debugInfo.UNMASKED_RENDERER_WEBGL,
      ) as string;
      if (/SwiftShader|llvmpipe|softpipe|ANGLE.*SwiftShader/i.test(renderer)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

function App() {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasHardwareAcceleration()) {
      document.documentElement.classList.add("no-gpu");
      return;
    }

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
        </div>
      </main>
    </>
  );
}

export default App;
