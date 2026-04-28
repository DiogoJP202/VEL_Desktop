import React from "react";
import LoadingScreen from "./LoadingScreen.jsx";
import styles from "./DataState.module.css";

export default function DataState({
  loading = false,
  error = "",
  empty = false,
  emptyMessage = "Nenhum dado encontrado.",
  errorMessage = "Nao foi possivel carregar os dados.",
  onRetry,
  compact = true,
}) {
  if (loading) {
    return <LoadingScreen compact={compact} label="Carregando dados..." />;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <strong>{errorMessage}</strong>
        <span className={styles.muted}>{error}</span>
        {onRetry ? (
          <button type="button" className={styles.action} onClick={onRetry}>
            Tentar novamente
          </button>
        ) : null}
      </div>
    );
  }

  if (empty) {
    return (
      <div className={styles.container}>
        <strong>{emptyMessage}</strong>
      </div>
    );
  }

  return null;
}
