import styled from "styled-components";

export const Container = styled.div.attrs({ className: "container" })`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(circle at 92% -20%, rgba(8, 125, 191, 0.16), transparent 36%),
    radial-gradient(circle at 0% 0%, rgba(243, 131, 66, 0.12), transparent 28%),
    #eef4fb;

  .contratosMain {
    flex: 1;
    min-width: 0;
    padding: clamp(16px, 2.6vw, 28px);
    overflow: auto;
  }

  .contratosGrid {
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

  .heroCard h1 {
    margin: 0;
    color: #0f172a;
    font-size: clamp(1.35rem, 2.5vw, 1.9rem);
  }

  .heroCard p {
    margin: 8px 0 0;
    color: #475569;
    max-width: 68ch;
    font-size: 0.94rem;
  }

  .heroActions button {
    height: 40px;
    border-radius: 10px;
    border: none;
    padding: 0 14px;
    background: linear-gradient(135deg, #005a8d 0%, #0e84ca 100%);
    color: #ffffff;
    font-size: 0.86rem;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .tabsCard {
    grid-column: 1 / -1;
    display: inline-flex;
    gap: 8px;
  }

  .tab {
    height: 38px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    background: #ffffff;
    color: #334155;
    font-size: 0.84rem;
    font-weight: 700;
    padding: 0 14px;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }

  .tab.active {
    border-color: transparent;
    background: #005a8d;
    color: #ffffff;
    cursor: default;
  }

  .metricCard {
    grid-column: span 3;
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.28);
    border-radius: 14px;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
    padding: 14px 16px;
    display: grid;
    gap: 6px;
  }

  .metricCard span {
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .metricCard strong {
    color: #0f172a;
    font-size: 1.25rem;
    line-height: 1.2;
  }

  .panel {
    grid-column: 1 / -1;
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.28);
    border-radius: 16px;
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.07);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
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

  .panelHead span {
    color: #64748b;
    font-size: 0.82rem;
    font-weight: 600;
  }

  .filtersRow {
    display: grid;
    grid-template-columns: 2.2fr repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .filtersRow label {
    height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    background: #ffffff;
    color: #64748b;
    font-size: 0.82rem;
    display: inline-flex;
    align-items: center;
    padding: 0 10px;
    gap: 8px;
  }

  .filtersRow input,
  .filtersRow select {
    width: 100%;
    border: none;
    background: transparent;
    color: #334155;
    font-size: 0.84rem;
    height: 100%;
  }

  .filtersRow input:focus,
  .filtersRow select:focus {
    outline: none;
  }

  .tableWrap {
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 12px;
    overflow: auto;
    max-height: 500px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 1100px;
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

  tbody td {
    padding: 11px 12px;
    border-bottom: 1px solid rgba(226, 232, 240, 0.9);
    color: #1e293b;
    font-size: 0.88rem;
    white-space: nowrap;
  }

  tbody tr:hover {
    background: #f8fbff;
  }

  .statusTag {
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.76rem;
    font-weight: 700;
  }

  .statusTag.ok {
    background: rgba(34, 197, 94, 0.14);
    color: #166534;
  }

  .statusTag.warn {
    background: rgba(245, 158, 11, 0.18);
    color: #92400e;
  }

  .statusTag.danger {
    background: rgba(239, 68, 68, 0.15);
    color: #991b1b;
  }

  .actions {
    display: inline-flex;
    gap: 6px;
  }

  .iconBtn {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    background: #f8fafc;
    color: #005a8d;
    font-size: 1rem;
    cursor: pointer;
  }

  .emptyRow {
    text-align: center;
    color: #64748b;
    padding: 18px !important;
  }

  .tableFooter {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    color: #64748b;
    font-size: 0.8rem;
  }

  .tableFooter label {
    color: #475569;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .tableFooter select {
    height: 36px;
    border-radius: 9px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    padding: 0 10px;
  }

  .pagination {
    margin-left: auto;
    display: flex;
    gap: 6px;
  }

  .pagination button {
    border: 1px solid rgba(148, 163, 184, 0.45);
    border-radius: 9px;
    background: #ffffff;
    color: #334155;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 700;
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
  }

  .pagination button.active {
    background: #0369a1;
    border-color: #0369a1;
    color: #ffffff;
  }

  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .modalBackdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 30;
    padding: clamp(12px, 3vw, 24px);
  }

  .modalCard {
    width: min(760px, 100%);
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 20px;
    background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
    box-shadow: 0 22px 52px rgba(15, 23, 42, 0.28);
    padding: clamp(14px, 2.2vw, 22px);
    display: grid;
    gap: 16px;
    animation: modalFadeIn 180ms ease-out;
  }

  .modalCard::backdrop {
    display: none;
  }

  .modalCard h3 {
    margin: 0;
    color: #0f172a;
    font-size: 1.14rem;
    line-height: 1.3;
  }

  .closeBtn {
    justify-self: end;
    width: 36px;
    height: 36px;
    border-radius: 11px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: #f8fafc;
    color: #334155;
    cursor: pointer;
    font-size: 1.15rem;
    line-height: 1;
    transition: all 160ms ease;
  }

  .closeBtn:hover {
    background: #eef3f8;
    border-color: rgba(100, 116, 139, 0.45);
  }

  .formGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .formGrid label {
    display: grid;
    gap: 6px;
    color: #475569;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: rgba(248, 250, 252, 0.68);
    transition: border-color 150ms ease, background-color 150ms ease;
  }

  .formGrid label:focus-within {
    border-color: rgba(14, 132, 202, 0.35);
    background: #f8fcff;
  }

  .formGrid input,
  .formGrid select {
    height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.5);
    background: #ffffff;
    color: #0f172a;
    padding: 0 12px;
    font-size: 0.84rem;
    transition: border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease;
  }

  .formGrid input::placeholder {
    color: #94a3b8;
  }

  .formGrid input:hover,
  .formGrid select:hover {
    border-color: rgba(100, 116, 139, 0.55);
  }

  .formGrid input:focus,
  .formGrid select:focus {
    outline: none;
    border-color: #0e84ca;
    box-shadow: 0 0 0 3px rgba(14, 132, 202, 0.14);
    background: #ffffff;
  }

  .fullRow {
    grid-column: 1 / -1;
  }

  .formActions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 2px;
  }

  .formActions button {
    height: 40px;
    border-radius: 10px;
    padding: 0 16px;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 120ms ease, filter 120ms ease, box-shadow 150ms ease, border-color 150ms ease;
  }

  .formActions button:hover {
    transform: translateY(-1px);
  }

  .formActions button:active {
    transform: translateY(0);
  }

  .formActions .ghost {
    background: #ffffff;
    color: #334155;
    border: 1px solid rgba(148, 163, 184, 0.45);
  }

  .formActions .ghost:hover {
    border-color: rgba(100, 116, 139, 0.55);
    background: #f8fafc;
  }

  .formActions .primary {
    background: linear-gradient(135deg, #0369a1 0%, #0e84ca 100%);
    color: #ffffff;
    border: none;
    box-shadow: 0 10px 18px rgba(3, 105, 161, 0.28);
  }

  .formActions .primary:hover {
    filter: brightness(1.06);
  }

  .formActions button:focus-visible,
  .closeBtn:focus-visible {
    outline: 2px solid rgba(14, 132, 202, 0.55);
    outline-offset: 2px;
  }

  .detail .detailGrid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .detail .detailGrid div {
    border: 1px solid rgba(148, 163, 184, 0.25);
    border-radius: 10px;
    background: #f8fafc;
    padding: 10px;
    display: grid;
    gap: 3px;
  }

  .detail .detailGrid span {
    color: #64748b;
    font-size: 0.74rem;
  }

  .detail .detailGrid strong {
    color: #0f172a;
    font-size: 0.9rem;
  }

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(6px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 1200px) {
    .metricCard {
      grid-column: span 6;
    }

    .filtersRow {
      grid-template-columns: 1fr 1fr;
    }

    .searchField {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 760px) {
    .contratosMain {
      padding: 12px;
    }

    .metricCard {
      grid-column: span 12;
    }

    .filtersRow {
      grid-template-columns: 1fr;
    }

    .tableFooter {
      flex-direction: column;
      align-items: flex-start;
    }

    .pagination {
      margin-left: 0;
      flex-wrap: wrap;
    }

    .formGrid {
      grid-template-columns: 1fr;
    }

    .detail .detailGrid {
      grid-template-columns: 1fr;
    }
  }
`;
