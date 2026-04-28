import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#ecf3fb",
        color: "#1f2937",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div>
        <h1 style={{ marginBottom: "10px" }}>Pagina nao encontrada</h1>
        <p style={{ marginBottom: "16px" }}>
          A rota que voce tentou acessar nao existe.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            border: "none",
            borderRadius: "8px",
            padding: "10px 14px",
            background: "#1d4ed8",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Voltar para inicio
        </button>
      </div>
    </div>
  );
}
