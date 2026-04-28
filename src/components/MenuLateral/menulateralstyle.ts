import styled from "styled-components";

export const Container = styled.div.attrs({ className: "container" })`
  --menu-bg-top: #064e74;
  --menu-bg-mid: #066d9f;
  --menu-bg-bottom: #1392d2;
  --menu-surface: rgba(255, 255, 255, 0.1);
  --menu-surface-strong: rgba(255, 255, 255, 0.2);
  --menu-border: rgba(255, 255, 255, 0.22);
  --menu-text: #f8fbff;
  --menu-muted: rgba(240, 248, 255, 0.78);
  --menu-focus: #fdbb4f;

  body.vel-dark-mode & {
    --menu-bg-top: #0f1a25;
    --menu-bg-mid: #13293b;
    --menu-bg-bottom: #1a3a52;
    --menu-surface: rgba(162, 206, 241, 0.11);
    --menu-surface-strong: rgba(162, 206, 241, 0.19);
    --menu-border: rgba(162, 206, 241, 0.28);
    --menu-text: #dfeefb;
    --menu-muted: rgba(201, 223, 240, 0.84);
    --menu-focus: #ffcf7d;
  }

  .menuShell {
    position: relative;
    z-index: 14;
    width: min(320px, 22vw);
    min-width: 256px;
    flex: 0 0 auto;
    transition: width 0.28s ease, min-width 0.28s ease;
  }

  .menuShell.shrinkedAside {
    width: 96px;
    min-width: 96px;
  }

  .MenuLateral {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    width: min(320px, 22vw);
    min-width: 256px;
    height: 100vh;
    color: var(--menu-text);
    background: linear-gradient(178deg, var(--menu-bg-top) 0%, var(--menu-bg-mid) 54%, var(--menu-bg-bottom) 100%);
    border-right: 1px solid var(--menu-border);
    box-shadow: 10px 0 34px rgba(2, 31, 50, 0.24);
    transition: width 0.28s ease, min-width 0.28s ease, transform 0.3s ease;
    overflow: hidden;
  }

  .MenuLateral::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 88% 8%, rgba(255, 255, 255, 0.2), transparent 24%),
      radial-gradient(circle at 18% 92%, rgba(255, 255, 255, 0.15), transparent 32%);
  }

  .menuHeader {
    position: relative;
    z-index: 1;
    padding: 18px 16px 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--menu-border);
  }

  .LogoVEL {
    width: clamp(124px, 62%, 182px);
    filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.22));
    transition: width 0.22s ease;
  }

  .ToggleButton {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
    border: 1px solid var(--menu-border);
    border-radius: 11px;
    background: rgba(2, 46, 69, 0.4);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }

  .ToggleButton:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.54);
  }

  .ToggleButton:focus-visible {
    outline: none;
    border-color: var(--menu-focus);
    box-shadow: 0 0 0 2px rgba(253, 187, 79, 0.28);
  }

  .ToggleButton img {
    width: 21px;
    height: 21px;
  }

  .flip {
    transform: rotateY(180deg);
  }

  .MenuLateral main {
    position: relative;
    z-index: 1;
    display: grid;
    grid-auto-rows: min-content;
    gap: 14px;
    width: 100%;
    padding: 16px 14px 10px;
    overflow-y: auto;
  }

  .logoEmpresa {
    width: 100%;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 16px;
    padding: 12px 10px 10px;
  }

  .logoEmpresaHeader {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logoEmpresaInfo {
    min-width: 0;
    flex: 1;
    text-align: left;
  }

  .logoEmpresaAvatarBtn {
    border: 1px solid rgba(255, 255, 255, 0.32);
    background: rgba(2, 46, 69, 0.25);
    cursor: pointer;
    padding: 0;
    border-radius: 15px;
    position: relative;
    width: 76px;
    height: 76px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
  }

  .logoEmpresaAvatarBtn:focus-visible {
    outline: 2px solid var(--menu-focus);
    outline-offset: 3px;
  }

  .imgEmpresa {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.78);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
  }

  .imgEmpresaFallback {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.78);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: 700;
    letter-spacing: 0.04em;
    background: linear-gradient(135deg, #065f91, #28a2de);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
  }

  .logoEmpresaAvatarBtn::after {
    content: "";
    position: relative;
    right: -26px;
    bottom: -22px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #02628d;
    background: #22c55e;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.22);
  }

  .nomeEmpresa {
    font-size: 0.94rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 2px;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nomeEmpresaSub {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 0.74rem;
    color: var(--menu-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .logoEmpresaMeta {
    margin-top: 6px;
    border: 1px dashed rgba(255, 255, 255, 0.38);
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-radius: 999px;
    padding: 3px 10px;
    font-size: 0.68rem;
    cursor: pointer;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .logoEmpresaMeta:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .logoEmpresaAction {
    margin-top: 10px;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.13);
    color: #ffffff;
    border-radius: 10px;
    padding: 7px 10px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
  }

  .logoEmpresaAction:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: translateY(-1px);
  }

  .menuSectionTitle {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(238, 246, 252, 0.75);
    margin: 0 0 6px 8px;
  }

  .menuList {
    display: flex;
    flex-direction: column;
    gap: 6px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menuList li {
    position: relative;
  }

  .menuList li button {
    width: 100%;
    border: 1px solid transparent;
    border-radius: 12px;
    background: transparent;
    color: var(--menu-text);
    cursor: pointer;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .menuList li button:hover {
    background: var(--menu-surface);
    transform: translateX(3px);
  }

  .menuList li button:focus-visible {
    outline: none;
    border-color: var(--menu-focus);
    box-shadow: 0 0 0 2px rgba(253, 187, 79, 0.28);
  }

  .menuList li button img {
    width: 21px;
    height: 21px;
    flex: 0 0 auto;
    filter: brightness(1.05);
  }

  .spanName {
    white-space: nowrap;
  }

  .pageSelected::before {
    content: "";
    position: absolute;
    left: -6px;
    top: 8px;
    width: 4px;
    height: calc(100% - 16px);
    border-radius: 999px;
    background: #ffd166;
    box-shadow: 0 0 10px rgba(255, 209, 102, 0.8);
  }

  .pageSelected button {
    background: var(--menu-surface-strong);
    border-color: rgba(255, 255, 255, 0.34);
  }

  .pageSelected .spanName {
    font-weight: 700;
  }

  .MenuLateral footer {
    position: relative;
    z-index: 1;
    padding: 10px 14px 14px;
    border-top: 1px solid var(--menu-border);
    margin-top: auto;
  }

  .dangerAction button {
    color: #fee2e2;
  }

  .dangerAction button:hover {
    background: rgba(220, 38, 38, 0.24);
    border-color: rgba(248, 113, 113, 0.55);
  }

  .dangerAction button:focus-visible {
    border-color: #f87171;
    box-shadow: 0 0 0 2px rgba(248, 113, 113, 0.32);
  }

  .mobileMenuTrigger {
    display: none;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 30;
    border: 1px solid rgba(148, 163, 184, 0.45);
    border-radius: 12px;
    background: #ffffff;
    color: #0f172a;
    height: 42px;
    padding: 0 12px;
    font-size: 0.84rem;
    font-weight: 700;
    align-items: center;
    gap: 8px;
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.16);
    cursor: pointer;
  }

  body.vel-dark-mode & .mobileMenuTrigger {
    border-color: rgba(85, 120, 145, 0.62);
    background: #162635;
    color: #e5f2fb;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.36);
  }

  .mobileMenuTrigger img {
    width: 18px;
    height: 18px;
  }

  .mobileMenuTrigger.open {
    opacity: 0;
    pointer-events: none;
  }

  .menuOverlay {
    position: fixed;
    inset: 0;
    border: none;
    width: 100%;
    height: 100%;
    z-index: 29;
    background: rgba(2, 17, 28, 0.44);
    cursor: pointer;
  }

  .shrinkedAside {
    width: 96px !important;
    min-width: 96px;
  }

  .shrinkedAside .LogoVEL {
    width: 44px;
  }

  .shrinkedAside .nomeEmpresa,
  .shrinkedAside .nomeEmpresaSub,
  .shrinkedAside .menuSectionTitle,
  .shrinkedAside .spanName {
    display: none;
  }

  .shrinkedAside .logoEmpresa {
    padding: 10px 8px;
    border-radius: 14px;
  }

  .shrinkedAside .logoEmpresaHeader {
    justify-content: center;
  }

  .shrinkedAside .logoEmpresaInfo,
  .shrinkedAside .logoEmpresaAction {
    display: none;
  }

  .shrinkedAside .imgEmpresa,
  .shrinkedAside .imgEmpresaFallback {
    width: 56px;
    height: 56px;
  }

  .shrinkedAside .logoEmpresaAvatarBtn {
    width: 62px;
    height: 62px;
  }

  .shrinkedAside .logoEmpresaAvatarBtn::after {
    right: -22px;
    bottom: -19px;
    width: 12px;
    height: 12px;
  }

  .shrinkedAside .menuList li button {
    justify-content: center;
    padding: 10px;
  }

  .shrinkedAside .pageSelected::before {
    left: 3px;
  }

  @media (max-width: 1280px) {
    .menuShell {
      width: min(292px, 24vw);
      min-width: 236px;
    }

    .MenuLateral {
      width: min(292px, 24vw);
      min-width: 236px;
    }
  }

  @media (max-width: 920px) {
    .menuShell.mobileMode {
      width: auto;
      min-width: 0;
      flex: 0 0 auto;
    }

    .mobileMenuTrigger {
      display: inline-flex;
    }

    .MenuLateral.mobileMode {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: min(320px, 84vw) !important;
      min-width: min(320px, 84vw);
      transform: translateX(-108%);
      z-index: 31;
    }

    .MenuLateral.mobileMode.mobileOpen {
      transform: translateX(0);
    }

    .MenuLateral.mobileMode .ToggleButton {
      display: inline-flex;
    }
  }
`;
