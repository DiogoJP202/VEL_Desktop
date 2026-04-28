import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: clip;
  background:
    radial-gradient(circle at 12% 0%, rgba(56, 189, 248, 0.1), transparent 42%),
    linear-gradient(180deg, #f0f7ff 0%, #e8eef8 55%, #eef4fb 100%);
  font-family: Inter, "Segoe UI", system-ui, sans-serif;
  color: #0f172a;

  .pagamentoRoot {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 clamp(16px, 4vw, 28px) 48px;
  }

  .pagamentoNav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 0 20px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.28);
    margin-bottom: 28px;
  }

  .pagamentoNavBrand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: #0369a1;
    font-weight: 800;
    font-size: 1.1rem;
  }

  .pagamentoNavBrand img {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    object-fit: cover;
  }

  .pagamentoNavBack {
    font-size: 0.92rem;
    font-weight: 600;
    color: #475569;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.35);
    transition: color 0.2s ease, background 0.2s ease;
  }

  .pagamentoNavBack:hover {
    color: #0369a1;
    background: #fff;
  }

  .pagamentoLayout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
    gap: clamp(24px, 4vw, 40px);
    align-items: start;
  }

  .pagamentoMain {
    min-width: 0;
  }

  .pagamentoTitle {
    font-size: clamp(1.35rem, 3.2vw, 1.85rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
    line-height: 1.25;
  }

  .pagamentoTitleAccent {
    color: #ea580c;
  }

  .pagamentoLead {
    font-size: 0.98rem;
    color: #64748b;
    margin-bottom: 24px;
    line-height: 1.55;
  }

  .pagamentoAlert {
    padding: 14px 16px;
    border-radius: 14px;
    background: #fff7ed;
    border: 1px solid rgba(251, 146, 60, 0.45);
    color: #9a3412;
    font-size: 0.95rem;
    margin-bottom: 22px;
    line-height: 1.5;
  }

  .pagamentoAlert a {
    color: #c2410c;
    font-weight: 700;
  }

  .pagamentoForm {
    background: #fff;
    border-radius: 18px;
    padding: clamp(20px, 3vw, 28px);
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 14px 36px rgba(15, 23, 42, 0.06);
    margin-bottom: 28px;
  }

  .pagamentoFieldGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px 18px;
  }

  .pagamentoField {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pagamentoFieldFull {
    grid-column: 1 / -1;
  }

  .pagamentoLabel {
    font-size: 0.82rem;
    font-weight: 600;
    color: #475569;
  }

  .pagamentoInput {
    width: 100%;
    padding: 11px 12px;
    font-size: 0.95rem;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.55);
    background: #f8fafc;
    color: #0f172a;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .pagamentoInput:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
    background: #fff;
  }

  .pagamentoInput:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .pagamentoCouponRow {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: stretch;
  }

  .pagamentoCouponRow .pagamentoInput {
    flex: 1;
    min-width: 160px;
  }

  .pagamentoBtnGhost {
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.5);
    background: #fff;
    font-weight: 600;
    font-size: 0.85rem;
    color: #64748b;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .pagamentoBtnGhost:hover:not(:disabled) {
    background: #f1f5f9;
    color: #0f172a;
  }

  .pagamentoMethods {
    margin-top: 8px;
  }

  .pagamentoMethodsTitle {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: #0f172a;
  }

  .pagamentoMethodsGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .pagamentoMethod {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 14px 14px 12px;
    border-radius: 14px;
    border: 2px solid rgba(148, 163, 184, 0.35);
    background: #fff;
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
    font: inherit;
    color: inherit;
  }

  .pagamentoMethod:hover {
    border-color: rgba(14, 165, 233, 0.55);
    box-shadow: 0 8px 20px rgba(2, 132, 199, 0.08);
  }

  .pagamentoMethodActive {
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.22);
  }

  .pagamentoMethodIcon {
    font-size: 1.35rem;
    color: #ea580c;
    margin-bottom: 8px;
  }

  .pagamentoMethodTitle {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .pagamentoMethodHint {
    font-size: 0.8rem;
    color: #64748b;
  }

  .pagamentoTrust {
    margin-top: 28px;
    padding-top: 22px;
    border-top: 1px solid rgba(148, 163, 184, 0.25);
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 0.88rem;
    line-height: 1.55;
    color: #475569;
  }

  .pagamentoTrust svg {
    flex-shrink: 0;
    color: #16a34a;
    font-size: 1.25rem;
    margin-top: 2px;
  }

  .pagamentoAside {
    position: sticky;
    top: 16px;
    background: #fff;
    border-radius: 18px;
    padding: clamp(20px, 3vw, 24px);
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  }

  .pagamentoAsideTitle {
    font-size: 1.1rem;
    font-weight: 800;
    margin-bottom: 16px;
    color: #0f172a;
  }

  .pagamentoPlanBadge {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #0369a1;
    background: rgba(14, 165, 233, 0.12);
    padding: 6px 10px;
    border-radius: 999px;
    margin-bottom: 10px;
  }

  .pagamentoPlanName {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 6px;
  }

  .pagamentoPlanTagline {
    font-size: 0.88rem;
    color: #64748b;
    margin-bottom: 18px;
  }

  .pagamentoRow {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.92rem;
    color: #475569;
    padding: 10px 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.25);
  }

  .pagamentoRowTotal {
    padding-top: 14px;
    margin-top: 4px;
    border-bottom: none;
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
  }

  .pagamentoRowTotal strong {
    font-size: 1.25rem;
    color: #0369a1;
  }

  .pagamentoInstallment {
    font-size: 0.82rem;
    font-weight: 500;
    color: #64748b;
    margin-top: 4px;
  }

  .pagamentoBullets {
    list-style: none;
    margin: 18px 0 20px;
  }

  .pagamentoBullets li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.88rem;
    color: #475569;
    margin-bottom: 8px;
    line-height: 1.45;
  }

  .pagamentoBullets svg {
    color: #16a34a;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .pagamentoSubmit {
    width: 100%;
    padding: 14px 16px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 800;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(90deg, #ea580c, #f97316);
    box-shadow: 0 12px 28px rgba(249, 115, 22, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  }

  .pagamentoSubmit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 16px 32px rgba(249, 115, 22, 0.42);
  }

  .pagamentoSubmit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }

  .pagamentoLegal {
    font-size: 0.75rem;
    line-height: 1.5;
    color: #94a3b8;
    margin-top: 14px;
  }

  .pagamentoLegal a {
    color: #64748b;
    font-weight: 600;
  }

  @media screen and (max-width: 880px) {
    .pagamentoLayout {
      grid-template-columns: 1fr;
    }

    .pagamentoAside {
      position: static;
      order: -1;
    }

    .pagamentoFieldGrid {
      grid-template-columns: 1fr;
    }

    .pagamentoMethodsGrid {
      grid-template-columns: 1fr;
    }
  }
`;
