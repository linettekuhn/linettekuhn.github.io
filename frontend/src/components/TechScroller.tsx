import { Marquee } from "@mantine/core";
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

export default function TechScroller() {
  return (
    <div className={styles.scroller}>
      <Marquee
        pauseOnHover
        fadeEdges
        fadeEdgeSize="30%"
        duration={40000}
        gap="s"
      >
        {TECH_ITEMS.map((tech) => (
          <span key={tech} className={styles.pill}>
            <ThemedText type="footnote">{tech}</ThemedText>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
