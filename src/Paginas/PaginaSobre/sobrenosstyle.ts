import styled from "styled-components";

export const Container = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .sobreRoot {
    min-height: 100vh;
    width: 100%;
    max-width: 100%;
    overflow-x: clip;
    font-family: Inter, "Segoe UI", system-ui, sans-serif;
    color: #0f172a;
    background:
      radial-gradient(circle at 12% 0%, rgba(56, 189, 248, 0.12), transparent 42%),
      radial-gradient(circle at 88% 20%, rgba(14, 165, 233, 0.08), transparent 38%),
      linear-gradient(180deg, #f0f7ff 0%, #e8f0fa 55%, #eef4fb 100%);
  }

  .sobreNav {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px clamp(16px, 4vw, 32px);
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  }

  .sobreNavBrand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    color: #0369a1;
    text-decoration: none;
  }

  .sobreNavBrand img {
    border-radius: 12px;
    object-fit: cover;
  }

  .sobreNavActions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .sobreNavLink {
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 0.92rem;
    font-weight: 600;
    color: #475569;
    text-decoration: none;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .sobreNavLink:hover {
    color: #0369a1;
    background: rgba(14, 165, 233, 0.1);
  }

  .sobreNavCta {
    padding: 9px 16px;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(90deg, #0284c7, #0369a1);
    box-shadow: 0 6px 16px rgba(3, 105, 161, 0.28);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .sobreNavCta:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(3, 105, 161, 0.35);
  }

  .sobreHero {
    padding: clamp(40px, 8vw, 72px) clamp(18px, 4vw, 32px) clamp(48px, 9vw, 80px);
    text-align: center;
    background: linear-gradient(165deg, #0369a1 0%, #0c4a6e 48%, #075985 100%);
    color: #f8fafc;
    position: relative;
    overflow: hidden;
  }

  .sobreHero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 70% 20%, rgba(56, 189, 248, 0.25), transparent 45%);
    pointer-events: none;
  }

  .sobreHeroInner {
    position: relative;
    z-index: 1;
    max-width: 720px;
    margin: 0 auto;
  }

  .sobreHeroEyebrow {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(224, 242, 254, 0.95);
    margin-bottom: 12px;
  }

  .sobreHero h1 {
    font-size: clamp(1.75rem, 4.5vw, 2.45rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.03em;
    margin-bottom: 16px;
  }

  .sobreHeroLead {
    font-size: clamp(1rem, 2.2vw, 1.12rem);
    line-height: 1.65;
    color: rgba(226, 232, 240, 0.95);
    max-width: 56ch;
    margin: 0 auto;
  }

  .sobreHeroLead strong {
    color: #fff;
    font-weight: 700;
  }

  .sobreSectionHead {
    max-width: 720px;
    margin: 0 auto 28px;
    text-align: center;
  }

  .sobreSectionHead h2 {
    font-size: clamp(1.35rem, 3vw, 1.85rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #0f172a;
    margin-bottom: 10px;
  }

  .sobreSectionSub {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    line-height: 1.6;
    color: #64748b;
  }

  .sobreSectionHeadLight h2 {
    color: #fff;
  }

  .sobreSectionHeadLight .sobreSectionSub {
    color: rgba(226, 232, 240, 0.9);
  }

  .mvvSection {
    padding: clamp(44px, 7vw, 72px) clamp(18px, 4vw, 32px);
  }

  .mvvGrid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 3vw, 24px);
    max-width: 1120px;
    margin: 0 auto;
  }

  .mvvCard {
    background: #fff;
    border-radius: 20px;
    padding: clamp(20px, 3vw, 28px);
    border: 1px solid rgba(148, 163, 184, 0.22);
    box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }

  .mvvCard:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 44px rgba(2, 132, 199, 0.12);
  }

  .mvvIcon {
    margin-bottom: 14px;
    object-fit: contain;
  }

  .mvvCardTitle {
    font-size: 1.2rem;
    font-weight: 800;
    color: #0369a1;
    margin-bottom: 14px;
  }

  .mvvList {
    list-style: none;
    text-align: left;
    width: 100%;
  }

  .mvvList li {
    position: relative;
    padding-left: 1.1rem;
    margin-bottom: 12px;
    font-size: 0.95rem;
    line-height: 1.55;
    color: #475569;
  }

  .mvvList li:last-child {
    margin-bottom: 0;
  }

  .mvvList li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: linear-gradient(135deg, #38bdf8, #0284c7);
  }

  .odsSection {
    padding: clamp(44px, 7vw, 72px) clamp(18px, 4vw, 32px);
    background: #f8fbff;
    border-top: 1px solid rgba(148, 163, 184, 0.2);
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  }

  .odsGrid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 3vw, 24px);
    max-width: 1100px;
    margin: 0 auto;
  }

  .odsCard {
    background: #fff;
    border-radius: 20px;
    padding: clamp(22px, 3vw, 28px) clamp(16px, 2.5vw, 22px);
    text-align: center;
    border: 1px solid rgba(251, 146, 60, 0.35);
    box-shadow: 0 12px 28px rgba(249, 115, 22, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .odsIcon {
    object-fit: contain;
    margin-bottom: 4px;
  }

  .odsNumber {
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: #c2410c;
    text-transform: uppercase;
  }

  .odsCardTitle {
    font-size: 1.02rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.3;
  }

  .odsText {
    font-size: 0.9rem;
    line-height: 1.55;
    color: #64748b;
    text-align: left;
  }

  .futureSection {
    padding: clamp(44px, 7vw, 72px) clamp(18px, 4vw, 32px);
  }

  .futureInner {
    max-width: 1040px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
    gap: clamp(28px, 5vw, 48px);
    align-items: center;
  }

  .futureIllustration {
    width: min(100%, 280px);
    height: auto;
    margin: 0 auto;
    display: block;
    filter: drop-shadow(0 16px 28px rgba(15, 23, 42, 0.12));
  }

  .futureCopy h2 {
    font-size: clamp(1.35rem, 3vw, 1.75rem);
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .futureCopy p {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    line-height: 1.65;
    color: #475569;
    margin-bottom: 16px;
  }

  .futureCopy p:last-child {
    margin-bottom: 0;
  }

  .futureCopy strong {
    color: #0369a1;
    font-weight: 700;
  }

  .teamSection {
    padding: clamp(48px, 8vw, 80px) clamp(18px, 4vw, 32px) clamp(56px, 9vw, 88px);
    background: linear-gradient(160deg, #075985 0%, #0c4a6e 50%, #082f49 100%);
    color: #f8fafc;
  }

  .teamGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .teamCard {
    background: rgba(255, 255, 255, 0.97);
    border-radius: 18px;
    padding: 22px 18px 20px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 16px 36px rgba(2, 6, 23, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .teamCard:hover {
    transform: translateY(-3px);
    box-shadow: 0 22px 48px rgba(2, 6, 23, 0.28);
  }

  .teamAvatar {
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto 12px;
    display: block;
    border: 3px solid rgba(14, 165, 233, 0.45);
  }

  .teamName {
    font-size: 1.05rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 6px;
  }

  .teamRole {
    font-size: 0.86rem;
    line-height: 1.45;
    color: #64748b;
    margin-bottom: 14px;
  }

  .teamLinks {
    display: flex;
    justify-content: center;
    gap: 14px;
  }

  .teamIconLink {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    color: #0369a1;
    background: rgba(14, 165, 233, 0.12);
    font-size: 1.25rem;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .teamIconLink:hover {
    background: rgba(14, 165, 233, 0.22);
    color: #0c4a6e;
    transform: scale(1.06);
  }

  .sobreFooter {
    padding: 20px clamp(18px, 4vw, 32px) 28px;
    text-align: center;
    background: #e2e8f0;
    border-top: 1px solid rgba(148, 163, 184, 0.35);
  }

  .sobreFooter a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    font-size: 0.95rem;
    color: #0369a1;
    text-decoration: none;
  }

  .sobreFooter a:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 900px) {
    .mvvGrid,
    .odsGrid {
      grid-template-columns: 1fr;
      max-width: 480px;
    }

    .futureInner {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .futureCopy h2 {
      text-align: center;
    }

    .futureCopy p {
      text-align: left;
    }
  }

  @media screen and (max-width: 520px) {
    .sobreNav {
      flex-direction: column;
      align-items: stretch;
    }

    .sobreNavActions {
      justify-content: stretch;
    }

    .sobreNavLink,
    .sobreNavCta {
      flex: 1;
      text-align: center;
      justify-content: center;
    }

    .teamGrid {
      grid-template-columns: 1fr;
    }
  }
`;
