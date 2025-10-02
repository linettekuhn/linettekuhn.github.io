import { useEffect, useState } from "react";
import styles from "./Smiley.module.css";

export default function Smiley() {
  const [winking, setWinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWinking(true);
      setTimeout(() => setWinking(false), 500);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      className={`${styles.smiley} ${winking ? styles.wink : ""}`}
      viewBox="0 0 38 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={styles.smiley_winking_face}>
        <path
          className={styles.mouth}
          d="M18.6584 47.2895C12.941 47.2895 8.43971 45.6468 5.15438 42.3615C1.86905 39.0762 0.226379 34.2122 0.226379 27.7695V21.1055H4.96238V27.5775C4.96238 32.8682 6.15705 36.7722 8.54638 39.2895C10.9357 41.8068 14.3064 43.0655 18.6584 43.0655C23.053 43.0655 26.445 41.8068 28.8344 39.2895C31.2237 36.7722 32.4184 32.8682 32.4184 27.5775V21.1055H37.0264V27.7695C37.0264 34.2122 35.3837 39.0762 32.0984 42.3615C28.8557 45.6468 24.3757 47.2895 18.6584 47.2895Z"
        />
        <path
          className={styles.right_winking_eye}
          d="M28.6114 6.3834L31.9025 9.45239L28.8335 12.7435L22.2513 6.6055L28.3893 0.0233154L31.6804 3.09231L28.6114 6.3834Z"
        />
        <circle className={styles.left_eye} cx="10.5014" cy="6.6055" r="4.5" />
        <circle className={styles.right_eye} cx="26.7513" cy="6.6055" r="4.5" />
      </g>
    </svg>
  );
}
