import styles from "./LoadingOverlay.module.css";

export function LoadingOverlay({ visible }: { visible: boolean }) {
  return (
    <div className={`${styles.overlay} ${!visible ? styles.hidden : ""}`}>
      <div className={styles.spinner} />
    </div>
  );
}
