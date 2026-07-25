import { useNavigate } from "react-router";
import Navbar from "./components/Navbar";
import GooBackground from "./components/GooBackground";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { detectPerformance } from "./utils/detectPerformance";
import { ThemedText } from "./components/ThemedText";
import { ThemedButton } from "./components/ThemedButton";
import TechScroller from "./components/TechScroller";
import { LoadingOverlay } from "./components/LoadingOverlay";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(() => localStorage.getItem("fps") === null);

  useEffect(() => {
    detectPerformance().finally(() => setLoading(false));
  }, []);

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
