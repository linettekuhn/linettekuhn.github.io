import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { ThemedText } from "../components/ThemedText";
import { Carousel } from "@mantine/carousel";
import styles from "./Projects.module.css";
import projects from "../utils/projects";

export default function Projects() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(hover: none)").matches,
  );
  const [cardHeight, setCardHeight] = useState<number | undefined>();
  const heightsRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMeasure = useCallback((name: string, height: number) => {
    heightsRef.current.set(name, height);
    if (heightsRef.current.size === projects.length) {
      setCardHeight(Math.max(...heightsRef.current.values()));
    }
  }, []);

  const slides = projects.map((project) => (
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
      <Navbar />
      <main className={styles.projectsWrapper}>
        <div className={styles.header}>
          <ThemedText textAlign="start" type="h1">
            Selected Works
          </ThemedText>
          <ThemedText italic textAlign="start" type="h6">
            A snapshot of what I've been building lately.{" "}
          </ThemedText>
          <ThemedText>
            {isMobile ? "Click" : "Hover over"} a card to dive into the tech
            that runs the magic.
          </ThemedText>
        </div>
        <Carousel
          classNames={styles}
          slideSize={{ base: "100%", sm: "50%", lg: "25%" }}
          slideGap={{ base: "xl", sm: "md", lg: "sm" }}
          emblaOptions={{ align: "start", loop: true }}
          className={styles.carousel}
          withIndicators
          draggable={false}
        >
          {slides}
        </Carousel>
      </main>
    </>
  );
}
