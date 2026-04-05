import { useRef, useState } from "react";
import styles from "./ProjectCard.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

type Props = {
  name: string;
  description: string;
  features: string[];
  highlights: string[];
  image: string;
  githubLink: string;
  projectLink: string;
};

export default function ProjectCard({
  name,
  description,
  features,
  highlights,
  image,
  githubLink,
  projectLink,
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      setFlipped((prev) => !prev);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={`${styles.projectPreview} ${flipped ? styles.flipped : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.projectInner}>
        <div className={styles.projectFront}>
          <img src={image} />
          <div className={styles.projectDetails}>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.projectBack}>
          <div className={styles.projectDetails}>
            <div className={styles.projectHeader}>
              <h3>{name}</h3>
              <div className={styles.projectLinks}>
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href={projectLink} target="_blank" rel="noopener noreferrer">
                  <FaLink />
                </a>
              </div>
            </div>
            <ul className={styles.projectFeatures}>
              {features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className={styles.projectHighlights}>
            {highlights.map((item, i) => (
              <p className={styles.projectHighlight} key={i}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
