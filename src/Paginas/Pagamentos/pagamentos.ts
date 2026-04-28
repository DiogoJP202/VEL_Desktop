import styled from "styled-components";

export const Container = styled.div.attrs({ className: "container" })`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(circle at 92% -20%, rgba(8, 125, 191, 0.17), transparent 36%),
    radial-gradient(circle at 0% 0%, rgba(243, 131, 66, 0.12), transparent 28%),
    #eef4fb;

  body.vel-dark-mode & {
    background:
      radial-gradient(circle at 92% -20%, rgba(56, 189, 248, 0.2), transparent 36%),
      radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.16), transparent 32%),
      #0f1822;
  }

  .pagamentosMain {
    flex: 1;
    min-width: 0;
    padding: clamp(16px, 2.6vw, 28px);
    overflow: auto;
  }

  .pagamentosGrid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 16px;
    align-items: start;
  }

  .heroCard {
    grid-column: 1 / -1;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: linear-gradient(132deg, #ffffff 0%, #f8fbff 100%);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
    padding: clamp(16px, 2.8vw, 22px);
    display: flex;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
  }

  body.vel-dark-mode & .heroCard {
    background: linear-gradient(132deg, #152535 0%, #1a2d3f 100%);
    border-color: #345169;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
  }

  .heroCard h1 {
    margin: 0;
    color: #0f172a;
    font-size: clamp(1.34rem, 2.5vw, 1.9rem);
  }

  body.vel-dark-mode & .heroCard h1 {
    color: #e2ecf7;
  }

  .heroCard p {
    margin: 8px 0 0;
    color: #475569;
    max-width: 62ch;
    font-size: 0.95rem;
  }

  body.vel-dark-mode & .heroCard p {
    color: #a8c0d3;
  }

  .heroCard small {
    display: inline-block;
    margin-top: 10px;
    color: #64748b;
    font-size: 0.8rem;
  }

  body.vel-dark-mode & .heroCard small {
    color: #9eb8ca;
  }

  .heroActions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .heroActions label {
    color: #475569;
    font-size: 0.82rem;
    font-weight: 600;
  }

  body.vel-dark-mode & .heroActions label {
    color: #b8cede;
  }

  .heroActions input,
  .heroActions button,
  .filtersRow select,
  .tableFooter select {
    height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    background: #ffffff;
    color: #334155;
    font-size: 0.86rem;
    padding: 0 12px;
  }

  body.vel-dark-mode & .heroActions input,
  body.vel-dark-mode & .heroActions button,
  body.vel-dark-mode & .filtersRow select,
  body.vel-dark-mode & .tableFooter select {
    border-color: #345169;
    background: #142534;
    color: #e2ecf7;
  }

  .heroActions button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 600;
  }

  .statsCard {
    grid-column: span 3;
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.28);
    border-radius: 14px;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
    padding: 14px 16px;
    display: grid;
    gap: 8px;
  }

  body.vel-dark-mode & .statsCard {
    background: #152535;
    border-color: #345169;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
  }

  .statsCard header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .statsCard header span {
    font-size: 0.84rem;
    color: #64748b;
    font-weight: 600;
  }

  body.vel-dark-mode & .statsCard header span,
  body.vel-dark-mode & .statsCard small {
    color: #a8c0d3;
  }

  .statsCard header i {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-style: normal;
  }

  .statsCard strong {
    color: #0f172a;
    font-size: 1.32rem;
    line-height: 1.2;
  }

  body.vel-dark-mode & .statsCard strong {
    color: #e2ecf7;
  }

  .statsCard small {
    color: #64748b;
    font-size: 0.78rem;
  }

  .statsCard.blue i {
    background: linear-gradient(135deg, #0369a1 0%, #38bdf8 100%);
  }

  .statsCard.teal i {
    background: linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%);
  }

  .statsCard.green i {
    background: linear-gradient(135deg, #0ea05f 0%, #34d399 100%);
  }

  .statsCard.orange i {
    background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%);
  }

  .statsCard.purple i {
    background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
  }

  .panel {
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.28);
    border-radius: 16px;
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.07);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  body.vel-dark-mode & .panel {
    background: #152535;
    border-color: #345169;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.34);
  }

  .trendPanel {
    grid-column: 1 / 9;
  }

  .rankingPanel {
    grid-column: 9 / 13;
  }

  .tablePanel {
    grid-column: 1 / -1;
  }

  .panelHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .panelHead h2 {
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #0f172a;
    font-size: 1rem;
  }

  body.vel-dark-mode & .panelHead h2 {
    color: #e2ecf7;
  }

  .headActions {
    display: flex;
    gap: 8px;
  }

  .headActions button,
  .btnDetalhes,
  .paginationControls button {
    border: 1px solid rgba(148, 163, 184, 0.45);
    border-radius: 10px;
    background: #f8fafc;
    color: #334155;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 8px 11px;
    min-width: 36px;
  }

  body.vel-dark-mode & .headActions button,
  body.vel-dark-mode & .btnDetalhes,
  body.vel-dark-mode & .paginationControls button {
    border-color: #345169;
    background: #1a2d3f;
    color: #dbeafe;
  }

  .headActions .ghost {
    background: transparent;
  }

  .filtersRow {
    display: grid;
    grid-template-columns: 1.9fr repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .searchField {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    border-radius: 10px;
    background: #ffffff;
    padding: 0 12px;
    color: #64748b;
  }

  body.vel-dark-mode & .searchField {
    border-color: #345169;
    background: #142534;
    color: #9eb8ca;
  }

  .searchField input {
    border: none;
    background: transparent;
    width: 100%;
    height: 40px;
    font-size: 0.86rem;
    color: #334155;
  }

  body.vel-dark-mode & .searchField input {
    color: #e2ecf7;
  }

  .searchField input:focus {
    outline: none;
  }

  .trendChart {
    width: 100%;
    height: auto;
    border-radius: 12px;
    background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
    border: 1px solid rgba(148, 163, 184, 0.24);
  }

  body.vel-dark-mode & .trendChart {
    background: linear-gradient(180deg, #142534 0%, #182a3a 100%);
    border-color: #345169;
  }

  .trendChart .gridLine {
    stroke: rgba(148, 163, 184, 0.28);
    stroke-width: 1;
  }

  body.vel-dark-mode & .trendChart .gridLine {
    stroke: rgba(148, 163, 184, 0.24);
  }

  .trendChart .axisLabel {
    fill: #64748b;
    font-size: 11px;
    font-family: "Segoe UI", sans-serif;
  }

  body.vel-dark-mode & .trendChart .axisLabel {
    fill: #b8cede;
  }

  .trendChart .trendArea {
    fill: rgba(3, 105, 161, 0.16);
  }

  body.vel-dark-mode & .trendChart .trendArea {
    fill: rgba(56, 189, 248, 0.22);
  }

  .trendChart .trendLine {
    fill: none;
    stroke: #0369a1;
    stroke-width: 2.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  body.vel-dark-mode & .trendChart .trendLine {
    stroke: #7dd3fc;
  }

  .chartFallback {
    border-radius: 12px;
    border: 1px dashed rgba(148, 163, 184, 0.45);
    padding: 24px;
    text-align: center;
    color: #64748b;
    font-size: 0.9rem;
  }

  body.vel-dark-mode & .chartFallback {
    border-color: #345169;
    color: #a8c0d3;
    background: #1a2d3f;
  }

  .trendResume {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .trendResume p {
    margin: 0;
    border: 1px solid rgba(148, 163, 184, 0.25);
    border-radius: 10px;
    background: #f8fafc;
    padding: 9px 10px;
    color: #475569;
    font-size: 0.82rem;
  }

  body.vel-dark-mode & .trendResume p {
    border-color: #345169;
    background: #1a2d3f;
    color: #a8c0d3;
  }

  .trendResume strong {
    color: #0f172a;
  }

  body.vel-dark-mode & .trendResume strong {
    color: #e2ecf7;
  }

  .tableWrap {
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 12px;
    overflow: auto;
    max-height: 480px;
  }

  body.vel-dark-mode & .tableWrap {
    border-color: #345169;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 860px;
  }

  thead th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #f8fafc;
    color: #334155;
    text-align: left;
    font-size: 0.78rem;
    letter-spacing: 0.01em;
    padding: 12px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.35);
    text-transform: uppercase;
  }

  body.vel-dark-mode & thead th {
    background: #1a2d3f;
    color: #dbeafe;
    border-bottom-color: #345169;
  }

  tbody td {
    padding: 11px 12px;
    border-bottom: 1px solid rgba(226, 232, 240, 0.9);
    color: #1e293b;
    font-size: 0.88rem;
    white-space: nowrap;
  }

  body.vel-dark-mode & tbody td {
    color: #dbeafe;
    border-bottom-color: rgba(52, 81, 105, 0.66);
  }

  tbody tr:hover {
    background: #f8fbff;
  }

  body.vel-dark-mode & tbody tr:hover {
    background: #1b3144;
  }

  .liquidoPositivo {
    color: #0f9f6e;
    font-weight: 700;
  }

  .liquidoNegativo {
    color: #dc2626;
    font-weight: 700;
  }

  .statusTag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 84px;
    padding: 5px 9px;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 700;
  }

  .statusTag.ok {
    color: #0f9f6e;
    background: rgba(16, 185, 129, 0.14);
  }

  body.vel-dark-mode & .statusTag.ok {
    color: #6ee7b7;
    background: rgba(16, 185, 129, 0.2);
  }

  .statusTag.warn {
    color: #b45309;
    background: rgba(245, 158, 11, 0.16);
  }

  body.vel-dark-mode & .statusTag.warn {
    color: #fdba74;
    background: rgba(245, 158, 11, 0.22);
  }

  .emptyCell {
    text-align: center;
    color: #64748b;
    padding: 24px !important;
  }

  body.vel-dark-mode & .emptyCell {
    color: #a8c0d3;
  }

  .tableFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding-top: 4px;
  }

  .tableFooter p {
    margin: 0;
    color: #64748b;
    font-size: 0.82rem;
  }

  body.vel-dark-mode & .tableFooter p,
  body.vel-dark-mode & .tableFooter label {
    color: #a8c0d3;
  }

  .tableFooterActions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .tableFooter label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #475569;
    font-size: 0.8rem;
  }

  .paginationControls {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .paginationControls button.active {
    background: #0369a1;
    border-color: #0369a1;
    color: #ffffff;
  }

  body.vel-dark-mode & .paginationControls button.active {
    background: #2563eb;
    border-color: #2563eb;
    color: #f8fbff;
  }

  .paginationControls button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .rankingList {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  .rankingList li {
    border: 1px solid rgba(148, 163, 184, 0.28);
    border-radius: 10px;
    background: #f8fafc;
    padding: 10px 12px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  body.vel-dark-mode & .rankingList li {
    background: #1a2d3f;
    border-color: #345169;
  }

  .rankingList strong {
    display: block;
    color: #0f172a;
    font-size: 0.88rem;
  }

  body.vel-dark-mode & .rankingList strong {
    color: #e2ecf7;
  }

  .rankingList small {
    color: #64748b;
    font-size: 0.75rem;
  }

  body.vel-dark-mode & .rankingList small,
  body.vel-dark-mode & .rankingList .emptyLine {
    color: #a8c0d3;
  }

  .rankingList span {
    color: #0369a1;
    font-weight: 700;
    font-size: 0.85rem;
  }

  body.vel-dark-mode & .rankingList span {
    color: #7dd3fc;
  }

  .rankingList .emptyLine {
    justify-content: center;
    color: #64748b;
  }

  .extraInfo {
    margin-top: 2px;
    padding-top: 10px;
    border-top: 1px dashed rgba(148, 163, 184, 0.4);
    display: grid;
    gap: 9px;
  }

  body.vel-dark-mode & .extraInfo {
    border-top-color: rgba(148, 163, 184, 0.35);
  }

  .extraInfo p {
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #475569;
    font-size: 0.84rem;
  }

  body.vel-dark-mode & .extraInfo p {
    color: #a8c0d3;
  }

  .extraInfo strong {
    color: #0f172a;
  }

  body.vel-dark-mode & .extraInfo strong {
    color: #e2ecf7;
  }

  .modalOverlay {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .modalBackdrop {
    position: absolute;
    inset: 0;
    border: none;
    background: rgba(2, 14, 24, 0.5);
    cursor: pointer;
  }

  .modalCard {
    position: relative;
    z-index: 1;
    width: min(760px, 92vw);
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: #ffffff;
    box-shadow: 0 20px 44px rgba(2, 15, 25, 0.34);
    padding: 18px;
    display: grid;
    gap: 14px;
  }

  body.vel-dark-mode & .modalCard {
    border-color: #345169;
    background: #152535;
    box-shadow: 0 20px 44px rgba(0, 0, 0, 0.46);
  }

  .modalCard header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .modalCard h2 {
    margin: 0;
    color: #0f172a;
    font-size: 1.1rem;
  }

  body.vel-dark-mode & .modalCard h2 {
    color: #e2ecf7;
  }

  .modalCard header button {
    border: 1px solid rgba(148, 163, 184, 0.5);
    background: #f8fafc;
    color: #334155;
    border-radius: 10px;
    padding: 7px 11px;
    cursor: pointer;
    font-weight: 600;
  }

  body.vel-dark-mode & .modalCard header button {
    border-color: #345169;
    background: #1a2d3f;
    color: #dbeafe;
  }

  .modalGrid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }

  .modalGrid div,
  .modalMetrics div {
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 10px;
    background: #f8fafc;
    padding: 10px;
  }

  body.vel-dark-mode & .modalGrid div,
  body.vel-dark-mode & .modalMetrics div {
    border-color: #345169;
    background: #1a2d3f;
  }

  .modalGrid span {
    display: block;
    color: #64748b;
    font-size: 0.76rem;
    margin-bottom: 5px;
  }

  body.vel-dark-mode & .modalGrid span,
  body.vel-dark-mode & .modalMetrics p {
    color: #a8c0d3;
  }

  .modalGrid strong {
    color: #0f172a;
    font-size: 0.92rem;
  }

  body.vel-dark-mode & .modalGrid strong,
  body.vel-dark-mode & .modalMetrics strong {
    color: #e2ecf7;
  }

  .modalMetrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .modalMetrics p {
    margin: 0;
    color: #64748b;
    font-size: 0.78rem;
  }

  .modalMetrics strong {
    display: block;
    margin-top: 5px;
    color: #0f172a;
    font-size: 1.04rem;
  }

  @media (max-width: 1450px) {
    .statsCard {
      grid-column: span 6;
    }

    .trendPanel,
    .rankingPanel {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 980px) {
    .pagamentosMain {
      padding: 64px 12px 12px;
    }

    .statsCard {
      grid-column: 1 / -1;
    }

    .filtersRow {
      grid-template-columns: 1fr;
    }

    .trendResume {
      grid-template-columns: 1fr;
    }

    .modalGrid,
    .modalMetrics {
      grid-template-columns: 1fr;
    }
  }
`;
