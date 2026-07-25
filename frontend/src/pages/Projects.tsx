import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { ThemedText } from "../components/ThemedText";
import { Carousel } from "@mantine/carousel";
import styles from "./Projects.module.css";

const projects = [
  {
    name: "EasyCook",
    projectLink: "https://linettekuhn.github.io/easy-cook",
    githubLink: "https://github.com/linettekuhn/easy-cook",
    image: "/previews/easycook.gif",
    description:
      "My first website! A recipe and meal planning web app built with React, TypeScript, and Node.js.",
    features: [
      "Recipe lookup with Spoonacular API",
      "Create, manage and save meal plans",
      "Store and manage pantry ingredients",
      "Automatic grocery list generation",
      "User authentication",
    ],
    highlights: [
      "TypeScript",
      "React",
      "Express Backend",
      "Spoonacular API",
      "Responsive UI/UX",
    ],
  },
  {
    name: "Piggy",
    projectLink: "https://github.com/linettekuhn/budget-app",
    githubLink: "https://github.com/linettekuhn/budget-app",
    image: "/previews/piggy.png",
    description:
      "A mobile budgeting app for tracking expenses and visualizing financial built with React Native and Expo.",
    features: [
      "Visual progress bars and pie charts for spending insights",
      "Category-based expense tracking",
      "Cross-platform UI",
      "Local storage using SQLite for offline functionality",
    ],
    highlights: [
      "React Native",
      "TypeScript",
      "Expo",
      "SQLite",
      "Interactive Charts",
    ],
    isMobile: true,
  },
  {
    name: "Contexto",
    projectLink: "https://contexto.linettekuhn.com",
    githubLink: "https://github.com/linettekuhn/contexto-frontend",
    image: "/previews/contexto.png",
    description:
      "An AI-powered dialect-aware translation web app that generates culturally authentic translations with control over regional dialect and tone.",
    features: [
      "AI-powered translations with regional dialect support",
      "Language and dialect selection",
      "Automatic or manual original language detection",
      "Formality slider to control tone and translation style",
    ],
    highlights: [
      "React",
      "TypeScript",
      "Node.js Backend",
      "OpenAI API",
      "PostgreSQL",
    ],
  },
  {
    name: "TCP Chat App",
    projectLink: "https://chat.linettekuhn.com",
    githubLink: "https://github.com/linettekuhn/tcp-chat",
    image: "/previews/tcp.gif",
    description:
      "A real-time chat application with a custom C++ TCP server backend and React/TypeScript frontend.",
    features: [
      "Real-time messaging between clients",
      "Custom length-prefixed binary protocol",
      "Message history storage",
      "Active user tracking",
      "Node.js bridge between frontend and C++ server",
      "User authentication",
    ],
    highlights: ["C++ TCP Server", "React + Mantine", "Express.js Bridge"],
  },
  {
    name: "ZeroLío",
    projectLink: "https://linettekuhn.github.io/zero-lio",
    githubLink: "https://github.com/linettekuhn/zero-lio",
    image: "/previews/zerolio.png",
    description:
      "A location-based sports field reservation platform built with React, TypeScript, and Node.js.",
    features: [
      "Interactive map integration for discovering sports fields",
      "Secure user authentication",
      "Field reservation and scheduling system",
      "Community features for user engagement",
    ],
    highlights: [
      "TypeScript",
      "React",
      "Nominatim API",
      "Geolocation Services",
    ],
  },
  {
    name: "Game of Life",
    projectLink: "https://linettekuhn.github.io/game-of-life/",
    githubLink: "https://github.com/linettekuhn/game-of-life",
    image: "/previews/gol.gif",
    description:
      "An interactive simulation of Conway's Game of Life with a React + Vite frontend and a C++ core compiled to WebAssembly.",
    features: [
      "Real-time cellular automaton simulation",
      "Interactive grid with draw and edit controls",
      "Play, pause, step, and reset simulation states",
      "Adjustable simulation settings",
      "Runs native C++ logic directly in the browser via WebAssembly",
    ],
    highlights: ["C++ Core Logic", "WebAssembly", "Emscripten", "React"],
  },
];

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
        {...project}
        isMobile={project.isMobile ?? isMobile}
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
          slideSize={{ base: "100%", sm: "50%", lg: "33.3333%" }}
          slideGap={{ base: "xl", sm: "md", lg: "sm" }}
          emblaOptions={{ align: "center", loop: true }}
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
