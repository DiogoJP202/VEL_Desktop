import styled from "styled-components";

export const LoginShell = styled.div`
  min-height: 100dvh;
  width: 100%;
  overflow-x: clip;
  display: grid;
  grid-template-columns: 1fr;
  font-family: Inter, "Segoe UI", system-ui, sans-serif;
  color: #0f172a;
  background: linear-gradient(160deg, #f0f7ff 0%, #e2ecf8 45%, #eef4fb 100%);

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(380px, 520px);
  }

  .loginHero {
    display: none;
    position: relative;
    padding: clamp(32px, 5vw, 56px);
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(ellipse 80% 60% at 20% 20%, rgba(56, 189, 248, 0.22), transparent 55%),
      radial-gradient(ellipse 70% 50% at 80% 80%, rgba(14, 165, 233, 0.12), transparent 50%),
      linear-gradient(145deg, #0369a1 0%, #0c4a6e 48%, #082f49 100%);
    color: #f8fafc;
  }

  @media (min-width: 960px) {
    .loginHero {
      display: flex;
    }
  }

  .loginHeroInner {
    max-width: 420px;
    text-align: left;
  }

  .loginHeroBadge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 20px;
  }

  .loginHeroTitle {
    font-size: clamp(1.65rem, 3.2vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0 0 16px;
  }

  .loginHeroTitle span {
    color: #7dd3fc;
  }

  .loginHeroText {
    margin: 0 0 28px;
    font-size: 1.05rem;
    line-height: 1.55;
    color: rgba(248, 250, 252, 0.88);
    max-width: 38ch;
  }

  .loginHeroFigure {
    margin: 0;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.28);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.35);
  }

  .loginHeroFigure img {
    display: block;
    width: 100%;
    height: auto;
    vertical-align: middle;
  }

  .loginPanel {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    padding: clamp(20px, 4vw, 40px);
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    border-left: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: -12px 0 40px rgba(15, 23, 42, 0.06);
  }

  @media (max-width: 959px) {
    .loginPanel {
      border-left: none;
      box-shadow: none;
      min-height: 100dvh;
    }
  }

  .loginNav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: clamp(24px, 5vh, 40px);
  }

  .loginBrand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: #0369a1;
    font-weight: 800;
    font-size: 1.05rem;
  }

  .loginBrand img {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    object-fit: cover;
  }

  .loginNavLink {
    font-size: 0.9rem;
    font-weight: 600;
    color: #475569;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: #fff;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .loginNavLink:hover {
    color: #0369a1;
    border-color: rgba(3, 105, 161, 0.35);
    background: #f8fafc;
  }

  .loginMain {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .loginCard {
    width: 100%;
    max-width: 400px;
  }

  .loginCardHeader {
    margin-bottom: 28px;
  }

  .loginEyebrow {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #64748b;
    margin: 0 0 8px;
  }

  .loginTitle {
    font-size: clamp(1.45rem, 3.5vw, 1.75rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 10px;
    line-height: 1.2;
    color: #0f172a;
  }

  .loginSubtitle {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.5;
    color: #64748b;
  }

  .loginForm {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .loginField {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
  }

  .loginLabel {
    font-size: 0.82rem;
    font-weight: 600;
    color: #334155;
  }

  .loginInputWrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .loginInputIcon {
    position: absolute;
    left: 14px;
    color: #94a3b8;
    font-size: 1rem;
    pointer-events: none;
    display: flex;
  }

  .loginInput {
    width: 100%;
    height: 48px;
    padding: 0 44px 0 44px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    border-radius: 12px;
    font-size: 0.95rem;
    color: #0f172a;
    background: #fff;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .loginInput::placeholder {
    color: #94a3b8;
  }

  .loginInput:hover {
    border-color: rgba(100, 116, 139, 0.55);
  }

  .loginInput:focus {
    border-color: #0369a1;
    box-shadow: 0 0 0 3px rgba(3, 105, 161, 0.15);
  }

  .loginInputWrapPassword .loginInput {
    padding-right: 48px;
  }

  .loginTogglePw {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: #64748b;
    cursor: pointer;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .loginTogglePw:hover {
    color: #0369a1;
    background: rgba(3, 105, 161, 0.08);
  }

  .loginRow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 2px;
  }

  .loginRemember {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    font-size: 0.9rem;
    color: #475569;
    font-weight: 500;
  }

  .loginRemember input {
    width: 18px;
    height: 18px;
    accent-color: #0369a1;
    cursor: pointer;
  }

  .loginForgot {
    font-size: 0.9rem;
    font-weight: 600;
    color: #0369a1;
    text-decoration: none;
  }

  .loginForgot:hover {
    text-decoration: underline;
  }

  .loginSubmit {
    margin-top: 6px;
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(135deg, #f38342 0%, #ea580c 100%);
    box-shadow: 0 10px 24px rgba(234, 88, 12, 0.28);
    transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
  }

  .loginSubmit:hover:not(:disabled) {
    filter: brightness(1.04);
    box-shadow: 0 12px 28px rgba(234, 88, 12, 0.35);
  }

  .loginSubmit:active:not(:disabled) {
    transform: translateY(1px);
  }

  .loginSubmit:disabled {
    opacity: 0.72;
    cursor: not-allowed;
    box-shadow: none;
  }

  .loginFooter {
    margin-top: auto;
    padding-top: 28px;
    text-align: center;
    font-size: 0.92rem;
    color: #64748b;
  }

  .loginFooter a {
    color: #0369a1;
    font-weight: 700;
    text-decoration: none;
  }

  .loginFooter a:hover {
    text-decoration: underline;
  }

  .loginLangSwitch {
    margin-top: 14px;
    font-size: 0.88rem;
    color: #64748b;
  }

  .loginLangSwitch a {
    font-weight: 600;
  }

  .loginRecoverHint {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.45;
    color: #64748b;
    text-align: left;
  }

  .loginRecoverBack {
    margin: 20px 0 0;
    text-align: center;
    font-size: 0.92rem;
  }

  .loginRecoverBack a {
    color: #0369a1;
    font-weight: 600;
    text-decoration: none;
  }

  .loginRecoverBack a:hover {
    text-decoration: underline;
  }

  .loginCodeGrid {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: nowrap;
    margin: 8px 0 20px;
  }

  .loginCodeCell {
    width: 44px;
    height: 52px;
    text-align: center;
    font-size: 1.35rem;
    font-weight: 700;
    border: 1px solid rgba(148, 163, 184, 0.5);
    border-radius: 12px;
    background: #fff;
    color: #0f172a;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .loginCodeCell:focus {
    border-color: #0369a1;
    box-shadow: 0 0 0 3px rgba(3, 105, 161, 0.15);
  }

  .loginCodeCell:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .loginCodeActions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 4px;
  }

  .loginBtnSecondary {
    width: 100%;
    height: 44px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #475569;
    background: #fff;
    border: 1px solid rgba(148, 163, 184, 0.55);
    cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .loginBtnSecondary:hover:not(:disabled) {
    color: #0369a1;
    border-color: rgba(3, 105, 161, 0.45);
    background: #f8fafc;
  }

  .loginBtnSecondary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .loginError {
    font-size: 0.85rem;
    font-weight: 600;
    color: #b91c1c;
    margin: -4px 0 0;
  }
`;
