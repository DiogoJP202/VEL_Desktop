import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { setPageSeo } from "../../utils/seo";

const PAGES = {
  "/termos": {
    htmlLang: "pt-BR",
    home: "/inicial",
    backLabel: "Voltar à página inicial",
    title: "Termos de uso — VEL",
    metaDescription:
      "Informações sobre os termos de uso da plataforma VEL (Virtual Easy Log). Documento em atualização.",
    heading: "Termos de uso",
    paragraphs: [
      "Este texto está em elaboração e será substituído pela versão oficial dos Termos de uso assim que estiver disponível.",
      "Enquanto isso, em caso de dúvidas sobre contratação ou uso da plataforma, fale conosco pelo e-mail virtualeasylog@gmail.com.",
    ],
  },
  "/privacidade": {
    htmlLang: "pt-BR",
    home: "/inicial",
    backLabel: "Voltar à página inicial",
    title: "Política de privacidade — VEL",
    metaDescription:
      "Informações sobre privacidade e dados na plataforma VEL (Virtual Easy Log). Documento em atualização.",
    heading: "Política de privacidade",
    paragraphs: [
      "Esta página descreve, em resumo, o nosso compromisso com a privacidade. O texto legal completo será publicado aqui em breve.",
      "Para questões relacionadas a dados pessoais ou pedidos de esclarecimento, utilize o e-mail virtualeasylog@gmail.com.",
    ],
  },
  "/terms": {
    htmlLang: "en",
    home: "/inicialingles",
    backLabel: "Back to home",
    title: "Terms of use — VEL",
    metaDescription:
      "Information about the terms of use of the VEL (Virtual Easy Log) platform. Document under review.",
    heading: "Terms of use",
    paragraphs: [
      "This text is being drafted and will be replaced by the official Terms of use as soon as it is available.",
      "For questions about subscription or use of the platform, contact us at virtualeasylog@gmail.com.",
    ],
  },
  "/privacy": {
    htmlLang: "en",
    home: "/inicialingles",
    backLabel: "Back to home",
    title: "Privacy policy — VEL",
    metaDescription:
      "Information about privacy and data on the VEL (Virtual Easy Log) platform. Document under review.",
    heading: "Privacy policy",
    paragraphs: [
      "This page summarizes our commitment to privacy. The full legal text will be published here soon.",
      "For personal data questions or clarification requests, use virtualeasylog@gmail.com.",
    ],
  },
};

const shell = {
  minHeight: "100vh",
  margin: 0,
  fontFamily: 'Inter, "Segoe UI", system-ui, sans-serif',
  background: "linear-gradient(180deg, #f0f7ff 0%, #e2eef8 100%)",
  color: "#0f172a",
};

const inner = {
  maxWidth: "640px",
  margin: "0 auto",
  padding: "clamp(24px, 5vw, 48px) 20px 64px",
};

const h1Style = {
  fontSize: "clamp(1.5rem, 4vw, 2rem)",
  marginBottom: "20px",
  lineHeight: 1.25,
};

const pStyle = {
  fontSize: "1.02rem",
  lineHeight: 1.65,
  marginBottom: "16px",
  color: "#334155",
};

const linkStyle = {
  display: "inline-block",
  marginBottom: "28px",
  fontWeight: 600,
  color: "#0369a1",
  textDecoration: "none",
};

export default function PaginaLegal() {
  const { pathname } = useLocation();
  const key = pathname.toLowerCase();
  const page = PAGES[key];

  useEffect(() => {
    if (!page) {
      return undefined;
    }
    setPageSeo({
      title: page.title,
      description: page.metaDescription,
      htmlLang: page.htmlLang,
    });
    return undefined;
  }, [page]);

  if (!page) {
    return null;
  }

  return (
    <main style={shell}>
      <div style={inner}>
        <Link to={page.home} style={linkStyle}>
          ← {page.backLabel}
        </Link>
        <h1 style={h1Style}>{page.heading}</h1>
        {page.paragraphs.map((text, index) => (
          <p key={index} style={pStyle}>
            {text}
          </p>
        ))}
      </div>
    </main>
  );
}
