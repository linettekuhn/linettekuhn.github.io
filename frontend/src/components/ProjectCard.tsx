import { useEffect, useRef, useState } from "react";
import styles from "./ProjectCard.module.css";
import { FaGithub, FaLink } from "react-icons/fa";
import { ThemedText } from "./ThemedText";

type Props = {
  name: string;
  description: string;
  features: string[];
  highlights: string[];
  image: string;
  githubLink: string;
  projectLink: string;
  isMobile?: boolean;
  measuredHeight?: number;
  onMeasure?: (height: number) => void;
};

export default function ProjectCard({
  name,
  description,
  features,
  highlights,
  image,
  githubLink,
  projectLink,
  isMobile = false,
  measuredHeight,
  onMeasure,
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onMeasure || !frontRef.current || !backRef.current) return;

    const front = frontRef.current;
    const back = backRef.current;
    const onMeasureRef = onMeasure;

    function measure() {
      const prevFront = front.style.position;
      const prevBack = back.style.position;
      const prevBackHeight = back.style.height;
      const prevFrontVis = front.style.visibility;
      const prevBackVis = back.style.visibility;

      front.style.position = "static";
      back.style.position = "static";
      back.style.height = "auto";
      front.style.visibility = "hidden";
      back.style.visibility = "hidden";

      const backHeight = back.offsetHeight;

      front.style.position = prevFront;
      back.style.position = prevBack;
      back.style.height = prevBackHeight;
      front.style.visibility = prevFrontVis;
      back.style.visibility = prevBackVis;

      onMeasureRef(backHeight);
    }

    measure();

    const observer = new ResizeObserver(() => measure());
    observer.observe(back);

    return () => observer.disconnect();
  }, [onMeasure]);

  const handleClick = () => {
    if (window.matchMedia("(hover: none)").matches) {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className={`${styles.projectPreview} ${flipped ? styles.flipped : ""}`}
      onClick={handleClick}
      style={
        measuredHeight
          ? ({ "--card-height": `${measuredHeight}px` } as React.CSSProperties)
          : undefined
      }
    >
      <div className={styles.projectInner}>
        <div
          ref={frontRef}
          className={styles.projectFront}
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0) 90%), url(${image})`,
          }}
        >
          <div className={styles.projectDetails}>
            <ThemedText
              type="overline"
              weight="bold"
              style={{ color: "rgb(var(--color-primary-2))" }}
            >
              {isMobile ? "Mobile" : "Web"} Application
            </ThemedText>
            <ThemedText
              style={{
                lineHeight: "var(--space-xl)",
                color: "rgb(var(--color-text-light))",
              }}
              type="h2"
            >
              {name}
            </ThemedText>
            <ThemedText style={{ color: "rgb(var(--color-text-light))" }}>
              {description}
            </ThemedText>
            <div className={styles.topHighlights}>
              {highlights.slice(0, 2).map((highlight, i) => (
                <ThemedText
                  key={i}
                  style={{
                    textTransform: "uppercase",
                    color: "rgb(var(--color-text-light))",
                  }}
                  type="footnote"
                >
                  {highlight}
                </ThemedText>
              ))}
            </div>
          </div>
        </div>
        <div ref={backRef} className={styles.projectBack}>
          <div className={styles.projectDetails}>
            <div className={styles.projectHeader}>
              <ThemedText type="h4">{name}</ThemedText>
              <div className={styles.projectLinks}>
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub />
                </a>
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaLink />
                </a>
              </div>
            </div>
            <ul className={styles.projectFeatures}>
              {features.map((feature, i) => (
                <li key={i}>
                  <ThemedText>{feature}</ThemedText>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.projectHighlights}>
            {highlights.map((item, i) => (
              <ThemedText
                type="caption"
                className={styles.projectHighlight}
                key={i}
              >
                {item}
              </ThemedText>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
