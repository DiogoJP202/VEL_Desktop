import styled from "styled-components";

export const Container = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }

  .container {
    background:
      radial-gradient(circle at 8% 8%, rgba(56, 189, 248, 0.12), transparent 20%),
      radial-gradient(circle at 90% 20%, rgba(14, 116, 144, 0.1), transparent 20%),
      #eef4fb;
    color: #0f172a;
    font-family: Inter, "Segoe UI", Arial, sans-serif;
  }

  .blue {
    color: #0284c7;
  }

  .pointer {
    cursor: pointer;
  }

  .container > div {
    width: 100%;
    overflow-x: hidden;
  }

  nav {
    width: 100%;
    min-height: 74px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 60;
    background: rgba(255, 255, 255, 0.84);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
  }

  .ul {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .menuToggle {
    display: none;
    border: none;
    background: none;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
  }

  .menuToggle span {
    width: 20px;
    height: 2px;
    background: #0f172a;
    border-radius: 2px;
  }

  .ul li {
    font-size: 1rem;
    color: #0f172a;
  }

  .navLink {
    border: none;
    background: none;
    color: #0f172a;
    font-size: 1rem;
    font-weight: 500;
    padding: 10px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .navLink:hover {
    color: #0369a1;
    background: rgba(14, 165, 233, 0.08);
    transform: translateY(-1px);
  }

  .colorModeBtn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .navLink:focus-visible,
  .Login:focus-visible,
  .Cadastro:focus-visible,
  .buttonCard:focus-visible,
  .torneProdutividade:focus-visible {
    outline: 2px solid #0ea5e9;
    outline-offset: 3px;
  }

  .Login {
    border: none;
    background: none;
    color: #0f172a;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 10px 12px;
    cursor: pointer;
    position: relative;
  }

  .Login::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 6px;
    width: 0;
    height: 2px;
    background: #f97316;
    transition: width 0.2s ease, left 0.2s ease;
  }

  .Login:hover::after {
    width: calc(100% - 24px);
    left: 12px;
  }

  .Cadastro {
    --primary-color: #f97316;
    --secondary-color: #fff;
    border: 0;
    border-radius: 999px;
    color: var(--secondary-color);
    padding: 0.8em 1.45em;
    background: linear-gradient(90deg, #fb923c, #f97316);
    display: flex;
    align-items: center;
    gap: 0.55em;
    font-weight: 700;
    font-size: 0.93rem;
    cursor: pointer;
    box-shadow: 0 12px 24px rgba(249, 115, 22, 0.32);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .Cadastro:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(249, 115, 22, 0.38);
  }

  .Cadastro .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Cadastro .arrow {
    width: 9px;
    height: 2px;
    background: #fff;
    position: relative;
  }

  .Cadastro .arrow::before {
    content: "";
    position: absolute;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    top: -3px;
    right: 0;
    padding: 3px;
    transform: rotate(-45deg);
  }

  .Video {
    width: 100%;
    min-height: 700px;
    background-image: url("/images/videos/altaQualidade.gif");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    isolation: isolate;
  }

  .Video::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(105deg, rgba(2, 6, 23, 0.83) 0%, rgba(2, 6, 23, 0.62) 35%, rgba(2, 6, 23, 0.32) 65%, rgba(2, 6, 23, 0.5) 100%);
    z-index: -1;
  }

  .Video .conteudo {
    min-height: 700px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding: clamp(30px, 7vw, 92px);
  }

  .conteudo h1 {
    font-family: Poppins, Inter, sans-serif;
    font-size: clamp(2.2rem, 5vw, 4rem);
    letter-spacing: 0.03em;
    color: #fff;
    line-height: 1.1;
    max-width: 880px;
    margin-bottom: 16px;
    text-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);
  }

  .conteudo h2 {
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: #dbeafe;
    max-width: 760px;
    line-height: 1.5;
    margin-bottom: 30px;
  }

  .torneProdutividade {
    border: none;
    border-radius: 999px;
    background: linear-gradient(90deg, #fb923c, #f97316);
    color: #fff;
    padding: 0.88rem 1.4rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    box-shadow: 0 16px 34px rgba(249, 115, 22, 0.38);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .torneProdutividade:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(249, 115, 22, 0.44);
  }

  .heroTrust {
    margin-top: 14px;
    color: #bfdbfe;
    font-size: 0.98rem;
    max-width: 700px;
  }

  .heroStats {
    display: grid;
    grid-template-columns: repeat(3, minmax(110px, 1fr));
    gap: 14px;
    margin-top: 20px;
    max-width: 680px;
    width: 100%;
  }

  .heroStat {
    background: rgba(15, 23, 42, 0.56);
    border: 1px solid rgba(125, 211, 252, 0.28);
    border-radius: 14px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .heroStat strong {
    color: #fff;
    font-size: 1.25rem;
    font-weight: 800;
  }

  .heroStat span {
    color: #d8ecfb;
    font-size: 0.82rem;
  }

  .Frase {
    min-height: 260px;
    background: linear-gradient(120deg, #0369a1, #0f4d79);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    text-align: center;
  }

  .Frase h1 {
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.5em;
  }

  .Frase p {
    font-size: clamp(1.15rem, 3vw, 2rem);
    max-width: 1150px;
    line-height: 1.5;
    color: #e0f2fe;
  }

  .solution-description {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 52px;
    padding: 64px 24px 54px;
  }

  .simplificando {
    font-family: Poppins, Inter, sans-serif;
    font-size: clamp(1.9rem, 4vw, 3.1rem);
    color: #0f172a;
    letter-spacing: 0.08em;
  }

  .um {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 36px;
  }

  .imgNotebook {
    width: min(100%, 720px);
    filter: drop-shadow(0 22px 40px rgba(15, 23, 42, 0.16));
  }

  .dois {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    background: #fff;
    border-radius: 22px;
    padding: 26px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 44px rgba(15, 23, 42, 0.08);
    max-width: 650px;
  }

  .solution-description h2 {
    color: #0f3f5b;
    text-align: center;
    font-size: clamp(1.3rem, 2.5vw, 2rem);
    line-height: 1.35;
  }

  .solution-description p {
    color: #315d77;
    line-height: 1.7;
    text-align: center;
    font-size: 1.1rem;
    width: 100%;
    max-width: 620px;
  }

  .Funcionalidades {
    padding: 64px 20px;
    background: linear-gradient(180deg, #eff5fb 0%, #e8f0f9 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 62px;
    text-align: center;
  }

  .Funcionalidades h1 {
    font-size: clamp(1.8rem, 3vw, 2.7rem);
    font-weight: 500;
    color: #f97316;
    letter-spacing: 0.12em;
  }

  .Func {
    display: grid;
    grid-template-columns: repeat(4, minmax(170px, 1fr));
    gap: 26px;
    width: min(1080px, 100%);
  }

  .Func > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    background: #fff;
    padding: 22px 14px;
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    min-height: 210px;
  }

  .Func > div:hover {
    transform: translateY(-6px);
    box-shadow: 0 22px 40px rgba(15, 23, 42, 0.1);
  }

  .Funcionalidades p {
    font-size: 0.9rem;
    font-weight: 700;
    color: #f97316;
    line-height: 1.35;
  }

  .usabilidade,
  .gestao,
  .Comandas,
  .educacao {
    width: 95px;
    height: 95px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .usabilidade {
    background-image: url("/images/icons/usabilidade.png");
  }
  .gestao {
    background-image: url("/images/icons/gestao-da-informacao.png");
  }
  .Comandas {
    background-image: url("/images/icons/fatura.png");
  }
  .educacao {
    background-image: url("/images/icons/cofrinho.png");
  }

  @keyframes testimonialReveal {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .testimonialsSection {
    margin: 88px auto;
    padding: 0 clamp(16px, 4vw, 32px);
    max-width: 1040px;
    font-family: Poppins, Inter, sans-serif;
  }

  .testimonialsHeader {
    text-align: center;
    margin-bottom: 28px;
  }

  .testimonialsHeader h2 {
    font-size: clamp(1.55rem, 3.2vw, 2.15rem);
    color: #0f172a;
    font-weight: 700;
    margin: 0 0 10px;
    letter-spacing: -0.02em;
  }

  .testimonialsLead {
    margin: 0 auto;
    max-width: 520px;
    color: #37617a;
    font-size: clamp(0.98rem, 1.8vw, 1.08rem);
    line-height: 1.55;
  }

  .testimonialsCarousel {
    display: flex;
    align-items: stretch;
    gap: 12px;
    width: 100%;
    outline: none;
  }

  .testimonialsCarousel:focus-visible {
    border-radius: 22px;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.45), 0 0 0 6px rgba(255, 255, 255, 0.95);
  }

  .testimonialViewport {
    flex: 1;
    min-width: 0;
    border-radius: 22px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(145deg, #0284c7 0%, #0369a1 48%, #075985 100%);
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow:
      0 24px 48px rgba(2, 132, 199, 0.32),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .testimonialViewport::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.2), transparent 42%);
    pointer-events: none;
  }

  .testimonialSlide {
    position: relative;
    z-index: 1;
    padding: clamp(26px, 4vw, 38px) clamp(22px, 4vw, 40px) clamp(24px, 3.5vw, 32px);
    color: #fff;
    animation: testimonialReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .testimonialQuote {
    margin: 0 0 22px;
    padding: 0;
    border: none;
    position: relative;
  }

  .testimonialQuote::before {
    content: "“";
    display: block;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.6rem, 6vw, 3.4rem);
    line-height: 0.85;
    color: rgba(255, 255, 255, 0.22);
    margin-bottom: 4px;
    user-select: none;
  }

  .testimonialQuote p {
    margin: 0;
    font-size: clamp(1.05rem, 2vw, 1.35rem);
    line-height: 1.58;
    font-weight: 500;
  }

  .testimonialAuthor {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }

  .testimonialAvatar {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
    color: #0c4a6e;
    background: linear-gradient(135deg, #e0f2fe, #bae6fd);
    border: 2px solid rgba(255, 255, 255, 0.55);
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
  }

  .testimonialMeta {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .testimonialName {
    font-weight: 700;
    font-size: 1.05rem;
  }

  .testimonialRole {
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.82);
  }

  .testimonialStars {
    display: flex;
    gap: 3px;
    margin-top: 4px;
    font-size: 0.92rem;
  }

  .testimonialNav {
    align-self: center;
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid rgba(148, 163, 184, 0.45);
    background: rgba(255, 255, 255, 0.92);
    color: #0369a1;
    font-size: 1.65rem;
    line-height: 1;
    font-weight: 300;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease,
      color 0.2s ease;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
  }

  .testimonialNav:hover {
    background: #fff;
    color: #0284c7;
    transform: scale(1.06);
    box-shadow: 0 10px 22px rgba(2, 132, 199, 0.2);
  }

  .testimonialNav:active {
    transform: scale(0.96);
  }

  .testimonialDots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

  .testimonialDot {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    border: none;
    padding: 0;
    cursor: pointer;
    background: rgba(14, 165, 233, 0.34);
    transition:
      transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
      width 0.25s ease,
      background 0.25s ease;
  }

  .testimonialDot:hover {
    background: rgba(56, 189, 248, 0.65);
    transform: scale(1.15);
  }

  .testimonialDot.active {
    width: 26px;
    background: linear-gradient(90deg, #0ea5e9, #0284c7);
    transform: scale(1);
  }

  .starW {
    color: #fde68a;
    filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.35));
  }

  .starDim {
    color: rgba(255, 255, 255, 0.28);
  }

  @media (prefers-reduced-motion: reduce) {
    .testimonialSlide {
      animation: none;
    }

    .testimonialDot {
      transition: none;
    }

    .testimonialDot.active {
      background: #0284c7;
    }

    .testimonialNav {
      transition: none;
    }
  }

  .NossosPlanos {
    background:
      radial-gradient(circle at 18% 10%, rgba(56, 189, 248, 0.18), transparent 26%),
      linear-gradient(180deg, #e9f1fb 0%, #e4eef9 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 64px 20px 70px;
  }

  .NossosPlanos h1 {
    font-size: clamp(2rem, 4.1vw, 3.6rem);
    color: #0f172a;
    text-align: center;
    line-height: 1.2;
  }

  .NossosPlanos > p {
    font-size: clamp(1.1rem, 1.8vw, 1.55rem);
    text-align: center;
    color: #154866;
    margin-bottom: 8px;
  }

  .TiposPlanos {
    display: grid;
    grid-template-columns: repeat(4, minmax(215px, 1fr));
    gap: 22px;
    width: min(1180px, 100%);
    margin-top: 14px;
  }

  .Desperte {
    border-radius: 20px;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(241, 245, 249, 0.95));
    border: 2px solid #f97316;
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12);
    transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
    position: relative;
    overflow: hidden;
  }

  .Desperte.featured {
    border-color: #0284c7;
    transform: translateY(-4px);
  }

  .Desperte:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 44px rgba(15, 23, 42, 0.18);
  }

  .Desperte > div {
    padding: 24px 18px 22px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 8px;
    min-height: 100%;
  }

  .badge {
    background: #0284c7;
    color: #fff;
    font-weight: 700;
    font-size: 0.78rem;
    border-radius: 999px;
    padding: 6px 12px;
    margin-bottom: 4px;
    letter-spacing: 0.02em;
  }

  .tituloCard {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
  }

  .conteudoPlano {
    font-size: 1rem;
    color: #356079;
    line-height: 1.5;
    min-height: 76px;
  }

  .precoVelho {
    text-decoration: line-through;
    color: #ef4444;
    font-size: 1rem;
    margin-top: 4px;
  }

  .precoNovo {
    font-size: 1.95rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 12px;
  }

  .buttonCard {
    border: none;
    border-radius: 999px;
    background: linear-gradient(90deg, #fb923c, #f97316);
    color: white;
    padding: 0.74rem 1.15rem;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.95rem;
    box-shadow: 0 12px 22px rgba(249, 115, 22, 0.34);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .buttonCard:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 28px rgba(249, 115, 22, 0.42);
  }

  footer {
    display: flex;
    flex-direction: column;
    font-family: Inter, "Segoe UI", Arial, sans-serif;
  }

  footer .branco {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 28px 36px;
    padding: 32px 24px 36px;
    background: #f8fbff;
    border-top: 1px solid rgba(148, 163, 184, 0.22);
  }

  footer > .branco .footerLogo {
    max-width: 160px;
    height: auto;
    flex-shrink: 0;
  }

  footer > .branco .footerSocial {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, auto));
    gap: 12px;
    align-items: stretch;
    justify-content: center;
  }

  footer > .branco .footerSocialLink {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 92px;
    padding: 14px 12px 12px;
    color: #075985;
    font-weight: 600;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(125, 211, 252, 0.55);
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
  }

  footer > .branco .footerSocialLink img {
    flex-shrink: 0;
    object-fit: contain;
    opacity: 0.92;
  }

  footer > .branco .footerSocialLabel {
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    line-height: 1.2;
    text-align: center;
    color: #0c4a6e;
  }

  footer > .branco .footerSocialLink:hover {
    transform: translateY(-3px);
    color: #0369a1;
    background: #fff;
    box-shadow: 0 10px 22px rgba(2, 132, 199, 0.14);
    border-color: rgba(14, 165, 233, 0.65);
  }

  footer > .branco .footerSocialLink:hover .footerSocialLabel {
    color: #0369a1;
  }

  footer > .branco .footerSocialLink:focus-visible {
    outline: 2px solid #0284c7;
    outline-offset: 3px;
  }

  footer > .azul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: #fff;
    gap: 10px;
    padding: 14px 24px;
    background: linear-gradient(100deg, #075985, #0369a1);
  }

  footer > .azul span {
    display: flex;
    gap: 30px;
    align-items: center;
  }

  footer > .azul span a {
    font-size: 0.98rem;
    color: #fff;
  }

  footer > .azul span a:hover {
    color: #fde68a;
  }

  footer > .azul span p {
    font-size: 0.98rem;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .Video .conteudo,
  .Frase,
  .solution-description,
  .Funcionalidades,
  .testimonialsSection,
  .NossosPlanos,
  footer {
    animation: fadeUp 0.72s ease both;
  }

  @media screen and (max-width: 1100px) {
    .Func {
      grid-template-columns: repeat(2, minmax(180px, 1fr));
    }

    .TiposPlanos {
      grid-template-columns: repeat(2, minmax(220px, 1fr));
    }
  }

  @media screen and (max-width: 820px) {
    nav {
      min-height: 68px;
      padding: 8px 12px;
      justify-content: space-between;
    }

    .menuToggle {
      display: inline-flex;
    }

    .ul {
      position: absolute;
      top: 68px;
      right: 12px;
      background: rgba(255, 255, 255, 0.98);
      border: 1px solid rgba(148, 163, 184, 0.35);
      border-radius: 14px;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
      min-width: 235px;
      padding: 10px;
      display: none;
      flex-direction: column;
      align-items: stretch;
      gap: 6px;
      transform: translateX(16px) scale(0.98);
      opacity: 0;
      transform-origin: top right;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    body.vel-dark-mode & .ul {
      background: rgba(21, 37, 53, 0.98);
      border-color: #345169;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
    }

    .ul.open {
      display: flex;
      transform: translateX(0) scale(1);
      opacity: 1;
    }

    .ul li,
    .ul li button {
      width: 100%;
      text-align: left;
      font-size: 0.95rem;
    }

    .Cadastro {
      width: 100%;
      justify-content: center;
      padding: 0.72em 1em;
      font-size: 0.86rem;
    }

    .Video,
    .Video .conteudo {
      min-height: 540px;
    }

    .heroStats {
      grid-template-columns: 1fr;
      max-width: 360px;
    }

    .Frase {
      min-height: 220px;
    }

    .Frase h1 {
      letter-spacing: 0.25em;
    }

    .solution-description,
    .Funcionalidades,
    .NossosPlanos {
      padding-left: 14px;
      padding-right: 14px;
    }

    .Func {
      grid-template-columns: 1fr;
    }

    .TiposPlanos {
      grid-template-columns: 1fr;
    }

    .testimonialsSection {
      margin: 64px auto;
    }

    .testimonialsCarousel {
      gap: 6px;
    }

    .testimonialNav {
      width: 40px;
      height: 40px;
      font-size: 1.35rem;
    }

    footer > .branco {
      flex-direction: column;
      text-align: center;
    }

    footer > .branco .footerSocial {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
      max-width: 320px;
    }

    footer > .azul {
      justify-content: center;
      text-align: center;
    }

    footer > .azul span {
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
    }
  }

  .backToTop {
    position: fixed;
    right: 18px;
    bottom: 18px;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 999px;
    background: linear-gradient(90deg, #0284c7, #0369a1);
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(3, 105, 161, 0.35);
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
    z-index: 100;
  }

  .backToTop.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .backToTop:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 32px rgba(3, 105, 161, 0.42);
  }

  body.vel-dark-mode & .container {
    background:
      radial-gradient(circle at 8% 8%, rgba(56, 189, 248, 0.2), transparent 24%),
      radial-gradient(circle at 90% 20%, rgba(14, 116, 144, 0.18), transparent 24%),
      #0f1822;
    color: #dbeafe;
  }

  body.vel-dark-mode & nav {
    background: rgba(15, 24, 34, 0.9);
    border-bottom-color: #345169;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.3);
  }

  body.vel-dark-mode & .menuToggle span {
    background: #dbeafe;
  }

  body.vel-dark-mode & .navLink,
  body.vel-dark-mode & .Login {
    color: #dbeafe;
  }

  body.vel-dark-mode & .navLink:hover {
    color: #7dd3fc;
    background: rgba(56, 189, 248, 0.12);
  }

  body.vel-dark-mode & .Login::after {
    background: #7dd3fc;
  }

  body.vel-dark-mode & .heroTrust {
    color: #d5ebff;
  }

  body.vel-dark-mode & .solution-description {
    background: #111b26;
  }

  body.vel-dark-mode & .simplificando {
    color: #e2ecf7;
  }

  body.vel-dark-mode & .dois {
    background: #152535;
    border-color: #345169;
    box-shadow: 0 20px 44px rgba(0, 0, 0, 0.28);
  }

  body.vel-dark-mode & .solution-description h2 {
    color: #e2ecf7;
  }

  body.vel-dark-mode & .solution-description p {
    color: #c8def0;
  }

  body.vel-dark-mode & .Funcionalidades {
    background: linear-gradient(180deg, #111b26 0%, #0f1822 100%);
  }

  body.vel-dark-mode & .Func > div {
    background: #152535;
    border-color: #345169;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.26);
  }

  body.vel-dark-mode & .testimonialsHeader h2 {
    color: #e2ecf7;
  }

  body.vel-dark-mode & .testimonialsLead {
    color: #c8def0;
  }

  body.vel-dark-mode & .testimonialNav {
    border-color: #345169;
    background: #1a2d3f;
    color: #7dd3fc;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }

  body.vel-dark-mode & .testimonialNav:hover {
    background: #22394e;
    color: #a5defc;
    box-shadow: 0 10px 22px rgba(56, 189, 248, 0.2);
  }

  body.vel-dark-mode & .testimonialDot {
    background: rgba(56, 189, 248, 0.4);
  }

  body.vel-dark-mode & .NossosPlanos {
    background:
      radial-gradient(circle at 18% 10%, rgba(56, 189, 248, 0.22), transparent 30%),
      linear-gradient(180deg, #101b27 0%, #0f1822 100%);
  }

  body.vel-dark-mode & .NossosPlanos h1 {
    color: #e2ecf7;
  }

  body.vel-dark-mode & .NossosPlanos > p {
    color: #d0e6f8;
  }

  body.vel-dark-mode & .Desperte {
    background: linear-gradient(145deg, rgba(21, 37, 53, 0.95), rgba(26, 45, 63, 0.95));
    border-color: #345169;
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.28);
  }

  body.vel-dark-mode & .Desperte.featured {
    border-color: #38bdf8;
  }

  body.vel-dark-mode & .tituloCard,
  body.vel-dark-mode & .precoNovo {
    color: #e2ecf7;
  }

  body.vel-dark-mode & .conteudoPlano {
    color: #c8def0;
  }

  body.vel-dark-mode & footer .branco {
    background: #152535;
    border-top-color: #345169;
  }

  body.vel-dark-mode & footer > .branco .footerSocialLink {
    background: #1a2d3f;
    border-color: #345169;
    color: #dbeafe;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  }

  body.vel-dark-mode & footer > .branco .footerSocialLabel {
    color: #dbeafe;
  }

  body.vel-dark-mode & footer > .branco .footerSocialLink:hover {
    color: #7dd3fc;
    background: #22394e;
    border-color: #3e607c;
    box-shadow: 0 10px 22px rgba(56, 189, 248, 0.15);
  }

  body.vel-dark-mode & footer > .branco .footerSocialLink:hover .footerSocialLabel {
    color: #7dd3fc;
  }

  body.vel-dark-mode & footer > .azul {
    background: linear-gradient(100deg, #0f4b75, #0f5f91);
  }

  body.vel-dark-mode & .backToTop {
    background: linear-gradient(90deg, #1d4ed8, #2563eb);
    box-shadow: 0 14px 28px rgba(37, 99, 235, 0.34);
  }
`;
