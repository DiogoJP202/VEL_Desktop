import styled from "styled-components";

export const Container = styled.div.attrs({ className: "container" })`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(circle at 92% -20%, rgba(8, 125, 191, 0.16), transparent 36%),
    radial-gradient(circle at 0% 0%, rgba(243, 131, 66, 0.12), transparent 28%),
    #eef4fb;

  body.vel-dark-mode & {
    background:
      radial-gradient(circle at 92% -20%, rgba(56, 189, 248, 0.2), transparent 36%),
      radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.16), transparent 32%),
      #0f1822;
  }

  .faturamentoMain {
    flex: 1;
    min-width: 0;
    padding: clamp(16px, 2.6vw, 28px);
    overflow: auto;
  }

  .faturamentoGrid {
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
    cursor: pointer;
    font-weight: 600;
  }

  .metricCard {
    grid-column: span 2;
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.28);
    border-radius: 14px;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
    padding: 14px 16px;
    display: grid;
    gap: 8px;
  }

  body.vel-dark-mode & .metricCard {
    background: #152535;
    border-color: #345169;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
  }

  .metricCard span {
    font-size: 0.84rem;
    color: #64748b;
    font-weight: 600;
  }

  body.vel-dark-mode & .metricCard span,
  body.vel-dark-mode & .metricCard small {
    color: #a8c0d3;
  }

  .metricCard strong {
    color: #0f172a;
    font-size: 1.2rem;
    line-height: 1.2;
  }

  body.vel-dark-mode & .metricCard strong {
    color: #e2ecf7;
  }

  .metricCard small {
    color: #64748b;
    font-size: 0.78rem;
  }

  .metricCard.blue {
    border-top: 4px solid #0ea5e9;
  }

  .metricCard.teal {
    border-top: 4px solid #14b8a6;
  }

  .metricCard.green {
    border-top: 4px solid #22c55e;
  }

  .metricCard.orange {
    border-top: 4px solid #f97316;
  }

  .metricCard.purple {
    border-top: 4px solid #8b5cf6;
  }

  .metricCard.red {
    border-top: 4px solid #ef4444;
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
    color: #0f172a;
    font-size: 1rem;
  }

  body.vel-dark-mode & .panelHead h2 {
    color: #e2ecf7;
  }

  .panelHead span {
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 600;
  }

  body.vel-dark-mode & .panelHead span {
    color: #a8c0d3;
  }

  .filtersRow {
    display: grid;
    grid-template-columns: 1.9fr repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .searchField {
    display: flex;
    align-items: center;
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

  .filtersRow .ghost {
    border: 1px solid rgba(148, 163, 184, 0.45);
    border-radius: 10px;
    background: transparent;
    color: #475569;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }

  body.vel-dark-mode & .filtersRow .ghost {
    border-color: #345169;
    background: #1a2d3f;
    color: #dbeafe;
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

  .rankingList {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 8px;
  }

  .rankingList li {
    border: 1px solid rgba(148, 163, 184, 0.25);
    border-radius: 10px;
    background: #f8fafc;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  body.vel-dark-mode & .rankingList li {
    border-color: #345169;
    background: #1a2d3f;
  }

  .rankingList li div {
    display: grid;
    gap: 2px;
  }

  .rankingList li span {
    color: #64748b;
    font-size: 0.72rem;
  }

  body.vel-dark-mode & .rankingList li span,
  body.vel-dark-mode & .rankingList li small,
  body.vel-dark-mode & .emptyLine,
  body.vel-dark-mode & .rankingFooter {
    color: #a8c0d3;
  }

  .rankingList li strong {
    color: #0f172a;
    font-size: 0.9rem;
  }

  body.vel-dark-mode & .rankingList li strong {
    color: #e2ecf7;
  }

  .rankingList li small {
    color: #64748b;
    font-size: 0.76rem;
  }

  .rankingList li p {
    margin: 0;
    color: #0369a1;
    font-weight: 700;
    font-size: 0.85rem;
  }

  body.vel-dark-mode & .rankingList li p {
    color: #7dd3fc;
  }

  .rankingFooter {
    margin: 2px 0 0;
    color: #64748b;
    font-size: 0.8rem;
  }

  .emptyLine {
    text-align: center;
    color: #64748b;
    padding: 18px 10px !important;
    justify-content: center;
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
    min-width: 940px;
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

  .resultadoTag {
    font-weight: 700;
  }

  .resultadoTag.positivo {
    color: #0f9f6e;
  }

  body.vel-dark-mode & .resultadoTag.positivo {
    color: #6ee7b7;
  }

  .resultadoTag.negativo {
    color: #dc2626;
  }

  body.vel-dark-mode & .resultadoTag.negativo {
    color: #fca5a5;
  }

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

  body.vel-dark-mode & .btnDetalhes,
  body.vel-dark-mode & .paginationControls button {
    border-color: #345169;
    background: #1a2d3f;
    color: #dbeafe;
  }

  .emptyRow {
    text-align: center;
    color: #64748b;
  }

  body.vel-dark-mode & .emptyRow {
    color: #a8c0d3;
  }

  .tableFooter {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    color: #64748b;
    font-size: 0.8rem;
  }

  body.vel-dark-mode & .tableFooter,
  body.vel-dark-mode & .tableFooter label {
    color: #a8c0d3;
  }

  .tableFooter label {
    color: #475569;
    font-weight: 600;
  }

  .paginationControls {
    margin-left: auto;
    display: flex;
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

  .detailBackdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.46);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    padding: 16px;
  }

  .detailModal {
    width: min(620px, 100%);
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: #ffffff;
    box-shadow: 0 18px 38px rgba(15, 23, 42, 0.25);
    padding: 16px;
    display: grid;
    gap: 14px;
  }

  body.vel-dark-mode & .detailModal {
    border-color: #345169;
    background: #152535;
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.4);
  }

  .detailModal > button {
    justify-self: end;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: #f8fafc;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
  }

  body.vel-dark-mode & .detailModal > button {
    border-color: #345169;
    background: #1a2d3f;
    color: #dbeafe;
  }

  .detailModal h3 {
    margin: 0;
    color: #0f172a;
    font-size: 1.08rem;
  }

  body.vel-dark-mode & .detailModal h3 {
    color: #e2ecf7;
  }

  .detailGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .detailGrid div {
    border: 1px solid rgba(148, 163, 184, 0.25);
    border-radius: 10px;
    background: #f8fafc;
    padding: 10px;
    display: grid;
    gap: 3px;
  }

  body.vel-dark-mode & .detailGrid div {
    border-color: #345169;
    background: #1a2d3f;
  }

  .detailGrid span {
    color: #64748b;
    font-size: 0.74rem;
  }

  body.vel-dark-mode & .detailGrid span {
    color: #a8c0d3;
  }

  .detailGrid strong {
    color: #0f172a;
    font-size: 0.9rem;
  }

  body.vel-dark-mode & .detailGrid strong {
    color: #e2ecf7;
  }

  .detailGrid .positive {
    color: #0f9f6e;
  }

  body.vel-dark-mode & .detailGrid .positive {
    color: #6ee7b7;
  }

  .detailGrid .negative {
    color: #dc2626;
  }

  body.vel-dark-mode & .detailGrid .negative {
    color: #fca5a5;
  }

  @media (max-width: 1220px) {
    .metricCard {
      grid-column: span 4;
    }

    .trendPanel,
    .rankingPanel {
      grid-column: 1 / -1;
    }

    .filtersRow {
      grid-template-columns: 1fr 1fr;
    }

    .searchField {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 760px) {
    .faturamentoMain {
      padding: 12px;
    }

    .metricCard {
      grid-column: span 6;
    }

    .filtersRow {
      grid-template-columns: 1fr;
    }

    .trendResume {
      grid-template-columns: 1fr;
    }

    .tableFooter {
      flex-direction: column;
      align-items: flex-start;
    }

    .paginationControls {
      margin-left: 0;
      flex-wrap: wrap;
    }

    .detailGrid {
      grid-template-columns: 1fr;
    }
  }
`;
