import { useState } from "react";
import styles from "./ProjectCard.module.css";
import { FaGithub, FaLink } from "react-icons/fa";
import { MdFlip } from "react-icons/md";

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

  const handleClick = () => {
    if (window.matchMedia("(hover: none)").matches) {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className={`${styles.projectPreview} ${flipped ? styles.flipped : ""}`}
      onClick={handleClick}
    >
      <div className={styles.projectInner}>
        <div className={styles.projectFront}>
          <p className={styles.flipPrompt}>
            <MdFlip /> Tap to flip!
          </p>
          <img src={image} />
          <div className={styles.projectDetails}>
            <h4>{name}</h4>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.projectBack}>
          <p className={styles.flipPrompt}>
            <MdFlip /> Tap to flip!
          </p>
          <div className={styles.projectDetails}>
            <div className={styles.projectHeader}>
              <h4>{name}</h4>
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
