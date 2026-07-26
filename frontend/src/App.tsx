import { useNavigate } from "react-router";
import Navbar from "./components/Navbar";
import GooBackground from "./components/GooBackground";
import styles from "./App.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { detectPerformance } from "./utils/detectPerformance";
import { ThemedText } from "./components/ThemedText";
import { ThemedButton } from "./components/ThemedButton";
import TechScroller from "./components/TechScroller";
import { LoadingOverlay } from "./components/LoadingOverlay";
import projects from "./utils/projects";
import ProjectCard from "./components/ProjectCard";
import { Carousel } from "@mantine/carousel";
import { FaChevronDown } from "react-icons/fa";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(
    () => localStorage.getItem("fps") === null,
  );
  const [cardHeight, setCardHeight] = useState<number | undefined>();
  const heightsRef = useRef<Map<string, number>>(new Map());
  const featuredRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.slice(0, 3);

  useEffect(() => {
    detectPerformance().finally(() => setLoading(false));
  }, []);

  const handleMeasure = useCallback(
    (name: string, height: number) => {
      heightsRef.current.set(name, height);
      if (heightsRef.current.size === featuredProjects.length) {
        setCardHeight(Math.max(...heightsRef.current.values()));
      }
    },
    [featuredProjects],
  );

  const slides = featuredProjects.map((project) => (
    <Carousel.Slide key={project.name}>
      <ProjectCard
        key={project.name}
        {...project}
        isMobile={project.isMobile}
        measuredHeight={cardHeight}
        onMeasure={(h) => handleMeasure(project.name, h)}
      />
    </Carousel.Slide>
  ));
  return (
    <>
      <LoadingOverlay visible={loading} />
      <Navbar />
      <main className={styles.app}>
        <GooBackground dotCount={8} />
        <div className={styles.heroSection}>
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
              <ThemedButton
                variant="outlined"
                onClick={() => navigate("/blog")}
              >
                Read Blog
              </ThemedButton>
            </div>
          </div>
          <div className={styles.techStackWrapper}>
            <ThemedText type="overline">crafting with modern tech</ThemedText>
            <TechScroller />
            <FaChevronDown
              className={styles.scrollArrow}
              onClick={() =>
                featuredRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
        </div>
        <div ref={featuredRef} className={styles.featuredSection}>
          <div className={styles.featuredHeader}>
            <ThemedText type="h2" weight="semiBold">
              Featured Creations
            </ThemedText>
            <ThemedText>
              Some of my favorite work. Built from concept to deployment
            </ThemedText>
          </div>
          <Carousel
            classNames={styles}
            slideSize={{ base: "100%", sm: "50%", lg: "25%" }}
            slideGap={{ base: "xl", sm: "md", lg: "sm" }}
            emblaOptions={{ align: "start", loop: true, dragFree: false }}
            className={styles.carousel}
            withIndicators
          >
            {slides}
          </Carousel>
        </div>
      </main>
    </>
  );
}

export default App;
