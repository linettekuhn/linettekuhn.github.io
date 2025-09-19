import styles from "./ProjectCard.module.css";

type Props = {
  name: string;
  description: string;
  features: string[];
  projectLink: string;
};

export default function ProjectCard({
  name,
  description,
  features,
  projectLink,
}: Props) {
  return (
    <div
      className={styles.projectPreview}
      onClick={() => window.open(projectLink, "_blank", "noopener, noreferrer")}
    >
      <div className={styles.projectInner}>
        <div className={styles.projectFront}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className={styles.projectBack}>
          <ul>
            <h4>Features:</h4>
            {features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
