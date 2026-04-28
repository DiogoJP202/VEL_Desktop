import React from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ label = "Carregando...", compact = false }) {
  return (
    <div className={compact ? styles.compact : styles.fullscreen}>
      <div className={styles.content}>
        <div className={styles.spinner} aria-hidden="true" />
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}
