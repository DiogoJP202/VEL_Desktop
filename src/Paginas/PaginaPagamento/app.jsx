import { useLocation } from "react-router-dom";
import TelaPagamento from "../../components/TelaPagamento/TelaPagamento.jsx";
import GlobalStyle from "../../components/globalStyles";
import { Container } from "./pagamentotyle";

export default function AppPaginaPagamento() {
  const { pathname } = useLocation();
  const lang = pathname.toLowerCase().includes("pagamentoingles") ? "en" : "pt";

  return (
    <Container>
      <GlobalStyle />
      <TelaPagamento valorPlano={localStorage.getItem("Plano")} lang={lang} />
    </Container>
  );
}
