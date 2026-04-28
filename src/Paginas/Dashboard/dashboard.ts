import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background:
    radial-gradient(circle at 8% -20%, rgba(14, 165, 233, 0.14), transparent 36%),
    radial-gradient(circle at 92% 0%, rgba(251, 146, 60, 0.12), transparent 30%),
    #ecf3fb;

  body.vel-dark-mode & {
    background:
      radial-gradient(circle at 8% -20%, rgba(59, 130, 246, 0.2), transparent 36%),
      radial-gradient(circle at 92% 0%, rgba(34, 197, 94, 0.16), transparent 32%),
      #0f1822;
  }

  .dashboardMain {
    flex: 1;
    min-width: 0;
    padding: clamp(16px, 2.8vw, 28px);
    overflow: auto;
  }

  .dashboardGrid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    align-items: start;
  }

  .heroCard {
    grid-column: 1 / -1;
    border-radius: 18px;
    padding: clamp(16px, 3vw, 22px);
    background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
    border: 1px solid rgba(148, 163, 184, 0.3);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 18px;
    flex-wrap: wrap;
  }

  body.vel-dark-mode & .heroCard {
    background: linear-gradient(135deg, #152535 0%, #1a2d3f 100%);
    border-color: #345169;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  }

  .heroCard h1 {
    font-size: clamp(1.25rem, 2.4vw, 1.75rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: #0f172a;
    margin-bottom: 8px;
  }

  body.vel-dark-mode & .heroCard h1 {
    color: #e2ecf7;
  }

  .heroCard p {
    color: #475569;
    max-width: 58ch;
    font-size: 0.96rem;
  }

  body.vel-dark-mode & .heroCard p {
    color: #a8c0d3;
  }

  .heroActions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .periodSwitch {
    background: #f1f5f9;
    padding: 4px;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    display: inline-flex;
    gap: 2px;
    flex-wrap: wrap;
  }

  body.vel-dark-mode & .periodSwitch {
    background: #1a2d3f;
    border-color: #345169;
  }

  .periodBtn {
    border: none;
    background: transparent;
    color: #475569;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 8px 12px;
    border-radius: 999px;
    cursor: pointer;
  }

  body.vel-dark-mode & .periodBtn {
    color: #b8cede;
  }

  .periodBtn.active {
    background: #0369a1;
    color: #fff;
  }

  body.vel-dark-mode & .periodBtn.active {
    background: #2563eb;
    color: #f8fbff;
  }

  .refreshBtn {
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: #fff;
    color: #334155;
    border-radius: 10px;
    padding: 8px 12px;
    font-weight: 600;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
  }

  body.vel-dark-mode & .refreshBtn {
    border-color: #345169;
    background: #1a2d3f;
    color: #dbeafe;
  }

  .insightCard {
    grid-column: span 3;
    background: #fff;
    border-radius: 16px;
    padding: 14px 16px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
    display: grid;
    gap: 8px;
  }

  body.vel-dark-mode & .insightCard {
    background: #152535;
    border-color: #345169;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
  }

  .insightCard header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .insightCard p {
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 600;
  }

  body.vel-dark-mode & .insightCard p,
  body.vel-dark-mode & .insightCard small {
    color: #a8c0d3;
  }

  .insightCard strong {
    font-size: 1.35rem;
    color: #0f172a;
    line-height: 1.2;
  }

  body.vel-dark-mode & .insightCard strong {
    color: #e2ecf7;
  }

  .insightCard small {
    color: #64748b;
    font-size: 0.8rem;
  }

  .insightIcon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .insightCard.green .insightIcon {
    background: linear-gradient(135deg, #0ea05f 0%, #34d399 100%);
  }
  .insightCard.orange .insightIcon {
    background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%);
  }
  .insightCard.blue .insightIcon {
    background: linear-gradient(135deg, #0369a1 0%, #38bdf8 100%);
  }
  .insightCard.purple .insightIcon {
    background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
  }

  .panel {
    background: #fff;
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.07);
    padding: 16px;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  body.vel-dark-mode & .panel {
    background: #152535;
    border-color: #345169;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.32);
  }

  .panelLarge {
    grid-column: 1 / 8;
  }

  .panelCompact {
    grid-column: 8 / 13;
  }

  .panelWide {
    grid-column: 1 / 9;
  }

  .rankingPanel {
    grid-column: 9 / 13;
  }

  .statusPanel {
    grid-column: 1 / -1;
  }

  .panelHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .panelHead h2 {
    font-size: 1rem;
    color: #0f172a;
    line-height: 1.2;
  }

  body.vel-dark-mode & .panelHead h2 {
    color: #e2ecf7;
  }

  .panelHead button {
    border: 1px solid rgba(148, 163, 184, 0.4);
    border-radius: 10px;
    background: #f8fafc;
    color: #334155;
    padding: 7px 10px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
  }

  body.vel-dark-mode & .panelHead button {
    border-color: #345169;
    background: #1a2d3f;
    color: #dbeafe;
  }

  .valueHighlight {
    font-size: 1.6rem;
    font-weight: 800;
    color: #ea580c;
  }

  body.vel-dark-mode & .valueHighlight {
    color: #fb923c;
  }

  .rankingHint {
    font-size: 0.82rem;
    color: #64748b;
  }

  body.vel-dark-mode & .rankingHint {
    color: #9eb8ca;
  }

  .rankingList,
  .statusList {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  .rankingList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 10px;
    padding: 10px 12px;
  }

  body.vel-dark-mode & .rankingList li,
  body.vel-dark-mode & .statusList li {
    background: #1a2d3f;
    border-color: #345169;
  }

  .rankingList li strong {
    color: #0f172a;
    font-size: 0.9rem;
  }

  body.vel-dark-mode & .rankingList li strong,
  body.vel-dark-mode & .statusList strong {
    color: #e2ecf7;
  }

  .rankingList li small {
    display: block;
    color: #64748b;
    font-size: 0.78rem;
    margin-top: 2px;
  }

  body.vel-dark-mode & .rankingList li small,
  body.vel-dark-mode & .statusList small,
  body.vel-dark-mode & .statusList span,
  body.vel-dark-mode & .statusList .emptyLine {
    color: #a8c0d3;
  }

  .rankingList li span {
    color: #0369a1;
    font-weight: 700;
    font-size: 0.9rem;
  }

  body.vel-dark-mode & .rankingList li span {
    color: #7dd3fc;
  }

  .statusList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 10px;
    padding: 10px 12px;
    position: relative;
  }

  .statusList li::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 10px;
    flex: 0 0 auto;
  }

  .statusList li.online::before {
    background: #10b981;
  }

  .statusList li.offline::before {
    background: #64748b;
  }

  body.vel-dark-mode & .statusList li.offline::before {
    background: #94a3b8;
  }

  .statusList li > div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .statusList strong {
    color: #0f172a;
    font-size: 0.9rem;
  }

  .statusList small {
    color: #64748b;
    font-size: 0.78rem;
  }

  .statusList span {
    color: #334155;
    font-size: 0.82rem;
    font-weight: 600;
  }

  .statusList .emptyLine {
    justify-content: center;
    color: #64748b;
  }

  body.vel-dark-mode & .highcharts-background {
    fill: transparent;
  }

  body.vel-dark-mode & .highcharts-title,
  body.vel-dark-mode & .highcharts-subtitle,
  body.vel-dark-mode & .highcharts-axis-title,
  body.vel-dark-mode & .highcharts-axis-labels text,
  body.vel-dark-mode & .highcharts-legend-item text {
    fill: #dbeafe !important;
  }

  body.vel-dark-mode & .highcharts-grid-line,
  body.vel-dark-mode & .highcharts-axis-line,
  body.vel-dark-mode & .highcharts-tick {
    stroke: #334155 !important;
  }

  body.vel-dark-mode & .highcharts-tooltip text {
    fill: #dbeafe !important;
  }

  @media (max-width: 1420px) {
    .insightCard {
      grid-column: span 6;
    }
    .panelLarge,
    .panelCompact,
    .panelWide,
    .rankingPanel {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 880px) {
    .dashboardMain {
      padding: 64px 12px 12px;
    }
    .insightCard {
      grid-column: 1 / -1;
    }
    .heroCard {
      border-radius: 14px;
    }
  }
`;
