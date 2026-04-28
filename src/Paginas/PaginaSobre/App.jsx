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
import { Container } from "./sobrenosstyle";
import { setPageSeo } from "../../utils/seo";

const MVV_BLOCKS = [
  {
    id: "missao",
    icon: iconMissoes,
    iconAlt: "Ícone representando missão",
    title: "Missão",
    items: [
      "Oferecer uma solução digital clara e fiável para a gestão de entregas, do pedido ao pagamento.",
      "Reduzir papel e retrabalho nas operações de restaurantes e equipas de logística.",
      "Ajudar a que a remuneração dos entregadores seja compreendida e acompanhada com transparência.",
    ],
  },
  {
    id: "visao",
    icon: iconVisao,
    iconAlt: "Ícone representando visão",
    title: "Visão",
    items: [
      "Ser referência em software de gestão de entregas para negócios de todos os portes.",
      "Crescer com os nossos clientes, com produto estável e evolução contínua.",
      "Aproximar restaurantes, operações de delivery e entregadores numa mesma experiência simples.",
    ],
  },
  {
    id: "valores",
    icon: iconValores,
    iconAlt: "Ícone representando valores",
    title: "Valores",
    items: [
      "Transparência, segurança de dados e responsabilidade no tratamento da informação.",
      "Clareza financeira para quem gere a operação e para quem faz as entregas.",
      "Respeito pelo tempo de quem trabalha na rua e por quem coordena a equipa.",
    ],
  },
];

const SDG_CARDS = [
  {
    icon: iconOds09,
    iconAlt: "Símbolo ODS 9 — Indústria, inovação e infraestruturas",
    number: "ODS 9",
    title: "Indústria, inovação e infraestruturas",
    text: "Digitalização de pedidos e processos, menos dependência de papel e maior resiliência operacional.",
  },
  {
    icon: iconOds08,
    iconAlt: "Símbolo ODS 8 — Trabalho digno e crescimento econômico",
    number: "ODS 8",
    title: "Trabalho digno e crescimento econômico",
    text: "Ferramentas que apoiam remuneração transparente e formação financeira orientada a entregadores.",
  },
  {
    icon: iconOds11,
    iconAlt: "Símbolo ODS 11 — Cidades e comunidades sustentáveis",
    number: "ODS 11",
    title: "Cidades e comunidades sustentáveis",
    text: "Logística urbana mais organizada, com menos fricção entre restaurantes, frotas e entregas.",
  },
];

const TEAM = [
  {
    name: "Diogo Antonny",
    role: "Scrum Master · Desenvolvedor full-stack",
    github: "https://github.com/DiogoJP202",
    linkedin: "https://www.linkedin.com/in/diogo-antonny/",
    img: Diogo,
  },
  {
    name: "Elias Andrade",
    role: "Administração de bases de dados · Desenvolvedor back-end",
    github: "https://github.com/EliasAndrad",
    linkedin: "https://www.linkedin.com/in/elias-andrade-/",
    img: Elias,
  },
  {
    name: "Emilly Freitas",
    role: "Desenvolvedora front-end · Design",
    github: "https://github.com/EmillyMLFreitas",
    linkedin: "https://www.linkedin.com/in/emillymlfreitas/",
    img: Emilly,
  },
  {
    name: "Gabrielle Correa",
    role: "Desenvolvedora front-end · Design",
    github: "https://github.com/gabriellecorrea",
    linkedin: "https://www.linkedin.com/in/gabriellecorrealeme/",
    img: Gabrielle,
  },
  {
    name: "Gustavo Teixeira",
    role: "Financeiro · Desenvolvedor front-end",
    github: "https://github.com/PettaDev",
    linkedin: "https://www.linkedin.com/in/gustavoteixeira2005/",
    img: Gustavo,
  },
  {
    name: "Iago Matheus",
    role: "Desenvolvedor full-stack · Design",
    github: "https://github.com/IagoMat",
    linkedin: "https://www.linkedin.com/in/iagomatheus/",
    img: Iago,
  },
  {
    name: "Isabella Ribas",
    role: "Product Owner · Desenvolvedora full-stack",
    github: "https://github.com/Isabella2709",
    linkedin: "https://www.linkedin.com/in/isabella-ribas-46579b176/",
    img: Isabella,
  },
];

export default function PaginaSobre() {
  useEffect(() => {
    setPageSeo({
      title: "Sobre nós — VEL",
      description:
        "Missão, visão, valores e equipa por trás da VEL: plataforma de gestão de entregas para restaurantes e frotas.",
      htmlLang: "pt-BR",
    });
  }, []);

  return (
    <Container>
      <GlobalStyle />
      <div className="sobreRoot">
        <header className="sobreNav">
          <Link to="/inicial" className="sobreNavBrand">
            <img src={LogoVEL} alt="VEL — página inicial" width="56" height="56" decoding="async" />
            <span>VEL</span>
          </Link>
          <nav className="sobreNavActions" aria-label="Navegação secundária">
            <Link to="/inicial" className="sobreNavLink">
              Página inicial
            </Link>
            <Link to="/login" className="sobreNavCta">
              Entrar
            </Link>
          </nav>
        </header>

        <main>
          <section className="sobreHero" aria-labelledby="sobre-hero-title">
            <div className="sobreHeroInner">
              <p className="sobreHeroEyebrow">Sobre nós</p>
              <h1 id="sobre-hero-title">Quem somos e o que nos move</h1>
              <p className="sobreHeroLead">
                Somos a equipa por trás da <strong>VEL (Virtual Easy Log)</strong>: uma plataforma pensada para
                simplificar pedidos, entregadores e visão financeira — do restaurante à rua.
              </p>
            </div>
          </section>

          <section className="mvvSection" aria-labelledby="mvv-heading">
            <div className="sobreSectionHead">
              <h2 id="mvv-heading">Missão, visão e valores</h2>
              <p className="sobreSectionSub">O que prometemos aos clientes e às equipas que usam o produto todos os dias.</p>
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
              <h2 id="ods-heading">Sustentabilidade e ODS</h2>
              <p className="sobreSectionSub">
                Enquadramos o impacto do produto nos{" "}
                <strong>Objetivos de Desenvolvimento Sustentável</strong> da ONU nas áreas em que a tecnologia da VEL
                contribui de forma direta.
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
                <h2 id="future-heading">Próximos passos</h2>
                <p>
                  Queremos aprofundar <strong>parcerias</strong> com restaurantes e operadores de delivery para
                  crescer de forma sustentável — primeiro com excelência no território nacional, com vista a
                  oportunidades internacionais quando o produto e o suporte estiverem preparados.
                </p>
                <p>
                  Estamos também a explorar colaborações com <strong>educadores financeiros</strong>, para reforçar
                  iniciativas de educação financeira acessíveis a entregadores, alinhadas com a transparência que a
                  plataforma já procura oferecer no dia a dia.
                </p>
              </div>
            </div>
          </section>

          <section className="teamSection" aria-labelledby="team-heading">
            <div className="sobreSectionHead sobreSectionHeadLight">
              <h2 id="team-heading">Equipa de desenvolvimento</h2>
              <p className="sobreSectionSub">
                Quem constrói e mantém a VEL — fale conosco no LinkedIn ou veja o código no GitHub.
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
                      aria-label={`GitHub de ${member.name}`}
                    >
                      <FaGithub aria-hidden="true" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="teamIconLink"
                      aria-label={`LinkedIn de ${member.name}`}
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
          <Link to="/inicial">← Voltar à página inicial</Link>
        </footer>
      </div>
    </Container>
  );
}
