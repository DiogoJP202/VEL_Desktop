import styled from "styled-components";

export const Container = styled.div`
  --surface: #f4f8fc;
  --card: #ffffff;
  --text: #1b2a41;
  --muted: #617088;
  --border: #dbe5f0;
  --primary: #0f4c81;
  --primary-soft: #e8f1fb;
  --success: #0f766e;
  --success-soft: #e8f7f3;
  --warning: #92400e;
  --warning-soft: #fff3e7;
  --shadow: 0 18px 42px rgba(14, 42, 71, 0.12);

  background: radial-gradient(circle at top right, #e5eff9 0%, var(--surface) 45%, #eef4fb 100%);
  min-height: 100vh;
  display: flex;
  color: var(--text);

  .perfilMain {
    flex: 1;
    min-width: 0;
    padding: 24px;
  }

  .perfilGrid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 16px;
    align-items: start;
  }

  .heroCard,
  .statsCard,
  .panel {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 18px;
    box-shadow: var(--shadow);
  }

  .heroCard {
    grid-column: span 12;
    display: flex;
    justify-content: space-between;
    gap: 18px;
    padding: 20px;
    flex-wrap: wrap;
  }

  .heroIdentity {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .avatar {
    width: 58px;
    height: 58px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #0f4c81, #2b7cc0);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.35);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .heroText h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .heroText p {
    margin: 4px 0 0;
    color: var(--muted);
    font-weight: 600;
  }

  .heroText small {
    display: inline-block;
    margin-top: 8px;
    color: var(--muted);
    font-size: 0.8rem;
  }

  .heroActions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .heroActions button,
  .panelActions button {
    border: none;
    border-radius: 10px;
    padding: 10px 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;
  }

  button.primary {
    background: linear-gradient(135deg, #0f4c81, #2b7cc0);
    color: #fff;
  }

  button.primary:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.03);
  }

  button.ghost {
    background: #f5f9fd;
    color: var(--text);
    border: 1px solid var(--border);
  }

  button.ghost:hover:not(:disabled) {
    background: #edf4fb;
  }

  button:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .photoInputHidden {
    display: none;
  }

  .statsCard {
    grid-column: span 4;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .statsCard header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--muted);
    font-size: 0.85rem;
  }

  .statsCard strong {
    font-size: 1.55rem;
    line-height: 1.1;
  }

  .statsCard small {
    color: var(--muted);
  }

  .statsCard.blue {
    background: linear-gradient(145deg, #f9fcff, var(--primary-soft));
  }

  .statsCard.green {
    background: linear-gradient(145deg, #f8fefc, var(--success-soft));
  }

  .statsCard.orange {
    background: linear-gradient(145deg, #fffdf8, var(--warning-soft));
  }

  .profilePanel {
    grid-column: span 12;
    padding: 20px;
  }

  .panelHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    flex-wrap: wrap;
  }

  .panelHead h2 {
    margin: 0;
    font-size: 1.08rem;
  }

  .panelActions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .infoGrid,
  .formGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .infoGrid article {
    background: #f8fbfe;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .infoGrid span {
    font-size: 0.8rem;
    color: var(--muted);
  }

  .infoGrid strong {
    font-size: 0.97rem;
    word-break: break-word;
  }

  .formGrid label {
    display: flex;
    flex-direction: column;
    gap: 7px;
    font-size: 0.86rem;
    color: var(--muted);
    font-weight: 600;
  }

  .formGrid input {
    border: 1px solid #c5d5e7;
    border-radius: 10px;
    padding: 11px 12px;
    font-size: 0.94rem;
    color: var(--text);
    background: #fff;
  }

  .formGrid input:focus {
    outline: none;
    border-color: #2b7cc0;
    box-shadow: 0 0 0 3px rgba(43, 124, 192, 0.16);
  }

  .formGrid .readOnly input {
    background: #f4f8fc;
    color: #5d6f87;
  }

  @media (max-width: 1180px) {
    .statsCard {
      grid-column: span 6;
    }
  }

  @media (max-width: 920px) {
    .perfilMain {
      padding-top: 84px;
      padding-left: 16px;
      padding-right: 16px;
    }

    .statsCard,
    .profilePanel {
      grid-column: span 12;
    }

    .infoGrid,
    .formGrid {
      grid-template-columns: 1fr;
    }
  }
`;
