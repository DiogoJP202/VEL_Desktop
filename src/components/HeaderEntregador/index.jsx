import { useMemo } from "react";
import style from "./estilo.module.css";

export default function HeaderEntregador() {
  const dataAtual = useMemo(() => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  return (
    <header className={style.header}>
      <div>
        <h1 className={style.headerTitle}>Entregadores</h1>
        <p className={style.headerSubtitle}>
          Acompanhe cadastros, disponibilidade e dados de contato em um único painel.
        </p>
      </div>
      <span className={style.headerDate}>Atualizado em {dataAtual}</span>
    </header>
  );
}
