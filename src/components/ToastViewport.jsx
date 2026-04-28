import React, { useEffect, useRef, useState } from "react";
import { TOAST_EVENT } from "../services/toast";
import styles from "./ToastViewport.module.css";

const MAX_VISIBLE_TOASTS = 3;
const TOAST_DURATION_MS = 3000;

const toastTypeIcons = {
  info: "i",
  success: "✓",
  error: "!",
};

export default function ToastViewport() {
  const [toasts, setToasts] = useState([]);
  const toastTimeoutsRef = useRef(new Map());

  const dismissToast = (id) => {
    const timeoutId = toastTimeoutsRef.current.get(id);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      toastTimeoutsRef.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const scheduleDismiss = (id, durationMs = TOAST_DURATION_MS) => {
      const existingTimeout = toastTimeoutsRef.current.get(id);
      if (existingTimeout) {
        window.clearTimeout(existingTimeout);
      }
      const timeoutId = window.setTimeout(() => {
        dismissToast(id);
      }, durationMs);
      toastTimeoutsRef.current.set(id, timeoutId);
    };

    const onToast = (event) => {
      const { message, type } = event.detail || {};
      if (!message) {
        return;
      }

      const id = Date.now() + Math.random();
      const normalizedType = type || "info";
      setToasts((current) => {
        const repeatedToast = current.find(
          (toast) => toast.message === message && toast.type === normalizedType,
        );
        if (repeatedToast) {
          scheduleDismiss(repeatedToast.id, TOAST_DURATION_MS);
          return current.map((toast) =>
            toast.id === repeatedToast.id
              ? {
                  ...toast,
                  count: (toast.count || 1) + 1,
                  remainingMs: TOAST_DURATION_MS,
                  expiresAt: Date.now() + TOAST_DURATION_MS,
                }
              : toast,
          );
        }

        scheduleDismiss(id, TOAST_DURATION_MS);
        return [
          ...current,
          {
            id,
            message,
            type: normalizedType,
            count: 1,
            remainingMs: TOAST_DURATION_MS,
            expiresAt: Date.now() + TOAST_DURATION_MS,
          },
        ].slice(-MAX_VISIBLE_TOASTS);
      });
    };

    const onKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }
      setToasts((current) => {
        if (!current.length) {
          return current;
        }
        const latestToast = current[current.length - 1];
        const timeoutId = toastTimeoutsRef.current.get(latestToast.id);
        if (timeoutId) {
          window.clearTimeout(timeoutId);
          toastTimeoutsRef.current.delete(latestToast.id);
        }
        return current.filter((toast) => toast.id !== latestToast.id);
      });
    };

    window.addEventListener(TOAST_EVENT, onToast);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.removeEventListener("keydown", onKeyDown);
      toastTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      toastTimeoutsRef.current.clear();
    };
  }, []);

  const pauseToast = (id) => {
    const timeoutId = toastTimeoutsRef.current.get(id);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      toastTimeoutsRef.current.delete(id);
    }

    setToasts((current) =>
      current.map((toast) => {
        if (toast.id !== id) {
          return toast;
        }
        const remainingMs = Math.max(300, (toast.expiresAt || Date.now()) - Date.now());
        return { ...toast, remainingMs };
      }),
    );
  };

  const resumeToast = (id) => {
    setToasts((current) =>
      current.map((toast) => {
        if (toast.id !== id) {
          return toast;
        }
        const durationMs = toast.remainingMs || TOAST_DURATION_MS;
        const timeoutId = window.setTimeout(() => {
          dismissToast(id);
        }, durationMs);
        toastTimeoutsRef.current.set(id, timeoutId);
        return { ...toast, expiresAt: Date.now() + durationMs };
      }),
    );
  };

  return (
    <div className={styles.viewport} role="region" aria-label="Notificacoes" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type] || styles.info}`}
          onMouseEnter={() => pauseToast(toast.id)}
          onMouseLeave={() => resumeToast(toast.id)}
          role="status"
          aria-live="polite"
        >
          <div className={styles.content}>
            <span className={styles.icon}>{toastTypeIcons[toast.type] || toastTypeIcons.info}</span>
            <p className={styles.message}>{toast.message}</p>
            {toast.count > 1 ? <span className={styles.countBadge}>x{toast.count}</span> : null}
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => dismissToast(toast.id)}
              aria-label="Fechar notificacao"
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
