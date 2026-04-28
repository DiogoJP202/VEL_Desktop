import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #f5f8fc;
    color: #13364d;
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  body.vel-dark-mode {
    background: #0f1822;
    color: #d9e8f2;
    --vel-dark-bg: #0f1822;
    --vel-dark-surface: #152535;
    --vel-dark-surface-soft: #1a2d3f;
    --vel-dark-border: #345169;
    --vel-dark-text: #d9e8f2;
    --vel-dark-muted: #9eb8ca;
    --vel-dark-accent: #5bb3e8;
    color-scheme: dark;
  }

  body.vel-dark-mode #root {
    background: var(--vel-dark-bg);
    color: var(--vel-dark-text);
  }

  body.vel-dark-mode a {
    color: #8dc9ff;
  }

  body.vel-dark-mode p,
  body.vel-dark-mode span,
  body.vel-dark-mode h1,
  body.vel-dark-mode h2,
  body.vel-dark-mode h3,
  body.vel-dark-mode h4,
  body.vel-dark-mode h5,
  body.vel-dark-mode h6,
  body.vel-dark-mode label,
  body.vel-dark-mode strong,
  body.vel-dark-mode small,
  body.vel-dark-mode li,
  body.vel-dark-mode td,
  body.vel-dark-mode th {
    color: var(--vel-dark-text);
  }

  body.vel-dark-mode [class*="conteiner"]:not([class*="MenuLateral"]),
  body.vel-dark-mode [class*="container"]:not([class*="MenuLateral"]):not([class*="menuShell"]),
  body.vel-dark-mode [class*="conteudoPrincipal"],
  body.vel-dark-mode [class*="content"],
  body.vel-dark-mode [class*="panel"],
  body.vel-dark-mode [class*="card"],
  body.vel-dark-mode [class*="hero"],
  body.vel-dark-mode [class*="Quadro"],
  body.vel-dark-mode [class*="tableWrap"],
  body.vel-dark-mode [class*="modalCard"],
  body.vel-dark-mode main,
  body.vel-dark-mode section,
  body.vel-dark-mode article {
    background: var(--vel-dark-surface) !important;
    border-color: var(--vel-dark-border) !important;
    color: var(--vel-dark-text) !important;
  }

  body.vel-dark-mode [class*="statsGrid"] [class*="card"],
  body.vel-dark-mode [class*="filters"],
  body.vel-dark-mode [class*="formGrid"] {
    background: var(--vel-dark-surface-soft) !important;
  }

  body.vel-dark-mode table,
  body.vel-dark-mode thead,
  body.vel-dark-mode tbody,
  body.vel-dark-mode tr,
  body.vel-dark-mode td,
  body.vel-dark-mode th {
    background-color: transparent !important;
    border-color: var(--vel-dark-border) !important;
  }

  body.vel-dark-mode button {
    border-color: var(--vel-dark-border);
  }

  body.vel-dark-mode button:not([class*="primary"]):not([class*="danger"]):not([class*="logout"]) {
    background-color: #1a2d3f !important;
    color: var(--vel-dark-text) !important;
  }

  body.vel-dark-mode input,
  body.vel-dark-mode select,
  body.vel-dark-mode textarea {
    background-color: #12202c;
    border-color: #365269;
    color: #e6f3fb;
  }

  body.vel-dark-mode ::placeholder {
    color: var(--vel-dark-muted);
  }

  body.vel-dark-mode [class*="muted"],
  body.vel-dark-mode [class*="subtitle"],
  body.vel-dark-mode [class*="hint"],
  body.vel-dark-mode [class*="meta"] {
    color: var(--vel-dark-muted) !important;
  }

  body.vel-dark-mode [class*="statOnline"],
  body.vel-dark-mode [class*="statOffline"],
  body.vel-dark-mode [class*="primaryBtn"],
  body.vel-dark-mode [class*="primaryButton"] {
    filter: brightness(1.05);
  }

  body.vel-dark-mode .MenuLateral main,
  body.vel-dark-mode .MenuLateral footer {
    background: transparent !important;
  }
`;
 
export default GlobalStyle;
