import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import iconVisao from "../../assets/images/icons/Visão.png";
import iconValores from "../../assets/images/icons/Valores.png";
import iconMissoes from "../../assets/images/icons/Missao.png";
import iconOds09 from "../../assets/images/icons/ODS9.png";
import iconOds08 from "../../assets/images/icons/ODS08.png";
import iconOds11 from "../../assets/images/icons/ODS11.png";
import telescopio from "../../assets/images/icons/telescopio.webp";
import Diogo from "../../assets/images/Diogo.png";
import Elias from "../../assets/images/Elias.png";
import Emilly from "../../assets/images/Emilly.png";
import Gabrielle from "../../assets/images/Gabrielle.png";
import Gustavo from "../../assets/images/Gustavo.png";
import Iago from "../../assets/images/Iago.png";
import Isabella from "../../assets/images/Isabella.png";
import LogoVEL from "../../assets/images/VEL.png";
import GlobalStyle from "../../components/globalStyles";
import { Container } from "../PaginaSobre/sobrenosstyle";
import { setPageSeo } from "../../utils/seo";

const MVV_BLOCKS = [
  {
    id: "mission",
    icon: iconMissoes,
    iconAlt: "Icon representing mission",
    title: "Mission",
    items: [
      "Deliver a clear, reliable digital solution for delivery management—from order to payout.",
      "Reduce paper and rework for restaurants and logistics teams.",
      "Help courier earnings be understood and tracked with transparency.",
    ],
  },
  {
    id: "vision",
    icon: iconVisao,
    iconAlt: "Icon representing vision",
    title: "Vision",
    items: [
      "Become a reference in delivery-management software for businesses of every size.",
      "Grow with our customers through a stable product and continuous improvement.",
      "Bring restaurants, delivery operations, and couriers into one simple experience.",
    ],
  },
  {
    id: "values",
    icon: iconValores,
    iconAlt: "Icon representing values",
    title: "Values",
    items: [
      "Transparency, data security, and accountability in how we handle information.",
      "Financial clarity for whoever runs the operation and whoever completes deliveries.",
      "Respect for people on the road and for those coordinating the team.",
    ],
  },
];

const SDG_CARDS = [
  {
    icon: iconOds09,
    iconAlt: "SDG 9 symbol — Industry, innovation and infrastructure",
    number: "SDG 9",
    title: "Industry, innovation and infrastructure",
    text: "Digitizing orders and workflows, less reliance on paper, and more resilient day-to-day operations.",
  },
  {
    icon: iconOds08,
    iconAlt: "SDG 8 symbol — Decent work and economic growth",
    number: "SDG 8",
    title: "Decent work and economic growth",
    text: "Tools that support transparent pay and financial education tailored to couriers.",
  },
  {
    icon: iconOds11,
    iconAlt: "SDG 11 symbol — Sustainable cities and communities",
    number: "SDG 11",
    title: "Sustainable cities and communities",
    text: "More organized urban logistics with less friction between restaurants, fleets, and deliveries.",
  },
];

const TEAM = [
  {
    name: "Diogo Antonny",
    role: "Scrum Master · Full-stack developer",
    github: "https://github.com/DiogoJP202",
    linkedin: "https://www.linkedin.com/in/diogo-antonny/",
    img: Diogo,
  },
  {
    name: "Elias Andrade",
    role: "Database administration · Back-end developer",
    github: "https://github.com/EliasAndrad",
    linkedin: "https://www.linkedin.com/in/elias-andrade-/",
    img: Elias,
  },
  {
    name: "Emilly Freitas",
    role: "Front-end developer · Design",
    github: "https://github.com/EmillyMLFreitas",
    linkedin: "https://www.linkedin.com/in/emillymlfreitas/",
    img: Emilly,
  },
  {
    name: "Gabrielle Correa",
    role: "Front-end developer · Design",
    github: "https://github.com/gabriellecorrea",
    linkedin: "https://www.linkedin.com/in/gabriellecorrealeme/",
    img: Gabrielle,
  },
  {
    name: "Gustavo Teixeira",
    role: "Finance · Front-end developer",
    github: "https://github.com/PettaDev",
    linkedin: "https://www.linkedin.com/in/gustavoteixeira2005/",
    img: Gustavo,
  },
  {
    name: "Iago Matheus",
    role: "Full-stack developer · Design",
    github: "https://github.com/IagoMat",
    linkedin: "https://www.linkedin.com/in/iagomatheus/",
    img: Iago,
  },
  {
    name: "Isabella Ribas",
    role: "Product Owner · Full-stack developer",
    github: "https://github.com/Isabella2709",
    linkedin: "https://www.linkedin.com/in/isabella-ribas-46579b176/",
    img: Isabella,
  },
];

export default function PaginaSobreEn() {
  useEffect(() => {
    setPageSeo({
      title: "About us — VEL",
      description:
        "Mission, vision, values, and team behind VEL: delivery-management software for restaurants and fleets.",
      htmlLang: "en",
    });
  }, []);

  return (
    <Container>
      <GlobalStyle />
      <div className="sobreRoot">
        <header className="sobreNav">
          <Link to="/inicialingles" className="sobreNavBrand">
            <img src={LogoVEL} alt="VEL — home" width="56" height="56" decoding="async" />
            <span>VEL</span>
          </Link>
          <nav className="sobreNavActions" aria-label="Secondary navigation">
            <Link to="/inicialingles" className="sobreNavLink">
              Home
            </Link>
            <Link to="/loginingles" className="sobreNavCta">
              Sign in
            </Link>
          </nav>
        </header>

        <main>
          <section className="sobreHero" aria-labelledby="about-hero-title">
            <div className="sobreHeroInner">
              <p className="sobreHeroEyebrow">About us</p>
              <h1 id="about-hero-title">Who we are and what drives us</h1>
              <p className="sobreHeroLead">
                We are the team behind <strong>VEL (Virtual Easy Log)</strong>: a platform built to simplify orders,
                couriers, and financial visibility—from the restaurant to the street.
              </p>
            </div>
          </section>

          <section className="mvvSection" aria-labelledby="mvv-heading">
            <div className="sobreSectionHead">
              <h2 id="mvv-heading">Mission, vision, and values</h2>
              <p className="sobreSectionSub">
                What we commit to customers and teams who rely on the product every day.
              </p>
            </div>
            <div className="mvvGrid">
              {MVV_BLOCKS.map((block) => (
                <article key={block.id} className="mvvCard">
                  <img className="mvvIcon" src={block.icon} alt={block.iconAlt} width="72" height="72" loading="lazy" />
                  <h3 className="mvvCardTitle">{block.title}</h3>
                  <ul className="mvvList">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="odsSection" aria-labelledby="ods-heading">
            <div className="sobreSectionHead">
              <h2 id="ods-heading">Sustainability and the SDGs</h2>
              <p className="sobreSectionSub">
                We map product impact to the UN <strong>Sustainable Development Goals</strong> where VEL&apos;s
                technology can contribute directly.
              </p>
            </div>
            <div className="odsGrid">
              {SDG_CARDS.map((card) => (
                <article key={card.number} className="odsCard">
                  <img src={card.icon} alt={card.iconAlt} className="odsIcon" width="96" height="96" loading="lazy" />
                  <p className="odsNumber">{card.number}</p>
                  <h3 className="odsCardTitle">{card.title}</h3>
                  <p className="odsText">{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="futureSection" aria-labelledby="future-heading">
            <div className="futureInner">
              <img
                src={telescopio}
                alt=""
                className="futureIllustration"
                width="280"
                height="280"
                loading="lazy"
                decoding="async"
              />
              <div className="futureCopy">
                <h2 id="future-heading">What&apos;s next</h2>
                <p>
                  We want to deepen <strong>partnerships</strong> with restaurants and delivery operators to grow
                  sustainably—starting with excellence in our home market, then exploring international opportunities
                  when the product and support are ready.
                </p>
                <p>
                  We are also exploring collaborations with <strong>financial educators</strong> to strengthen
                  accessible financial education for couriers, aligned with the transparency the platform already aims
                  to provide day to day.
                </p>
              </div>
            </div>
          </section>

          <section className="teamSection" aria-labelledby="team-heading">
            <div className="sobreSectionHead sobreSectionHeadLight">
              <h2 id="team-heading">Development team</h2>
              <p className="sobreSectionSub">
                The people who build and maintain VEL—reach out on LinkedIn or explore the code on GitHub.
              </p>
            </div>
            <div className="teamGrid">
              {TEAM.map((member) => (
                <article key={member.name} className="teamCard">
                  <img
                    src={member.img}
                    alt=""
                    className="teamAvatar"
                    width="104"
                    height="104"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="teamName">{member.name}</h3>
                  <p className="teamRole">{member.role}</p>
                  <div className="teamLinks">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="teamIconLink"
                      aria-label={`${member.name} on GitHub`}
                    >
                      <FaGithub aria-hidden="true" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="teamIconLink"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <FaLinkedin aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className="sobreFooter">
          <Link to="/inicialingles">← Back to home</Link>
        </footer>
      </div>
    </Container>
  );
}
