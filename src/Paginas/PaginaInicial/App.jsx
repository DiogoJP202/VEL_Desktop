import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CelularImg from "../../assets/images/Celular.png";
import { FaStar } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa6";
import LogoVEL from "../../assets/images/VEL.png";
import English from "../../assets/images/En.png";
import Portuguese from "../../assets/images/pt.png";
import linkedinIcon from "../../assets/images/icons/Linkedin.png";
import instagramIcon from "../../assets/images/icons/Instagram.png";
import githubIcon from "../../assets/images/icons/Github.png";
import gmailIcon from "../../assets/images/icons/Gmail.png";
import { Container } from "./styledContainer";
import GlobalStyle from "../../components/globalStyles";
import { setPageSeo } from "../../utils/seo";

const LANDING_SIGNUP_URL = (import.meta.env.VITE_LANDING_SIGNUP_URL || "").trim();
const SETTINGS_KEY = "vel:settings:v1";

function getStoredSettings() {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function getInitialDarkMode() {
  const settings = getStoredSettings();
  return Boolean(settings.darkMode);
}

function persistDarkMode(darkMode) {
  if (typeof window === "undefined") {
    return;
  }
  const current = getStoredSettings();
  window.localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      ...current,
      darkMode: Boolean(darkMode),
    }),
  );
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

const CONTENT = {
  pt: {
    about: "Sobre",
    aboutPath: "/sobrenos",
    plans: "Nossos Planos",
    switchLangAria: "Mudar idioma para ingles",
    login: "Login",
    ctaTop: "Comece agora",
    heroTitle: "Simplificando a gestão de entregas para você",
    heroSubtitle: "Descubra o segredo para entregas mais eficientes e lucrativas!",
    heroButton: "Torne sua produtividade 3x maior",
    heroTrust: "Plataforma segura, estavel e usada diariamente por operacoes reais.",
    phraseTitle: "DIGA ADEUS AS COMANDAS DE PAPEL!",
    phraseText:
      "Com a VEL, você digitaliza seus pedidos e elimina a necessidade de impressões. Isso significa menos papel, menos custos e um ambiente mais sustentável.",
    sectionTitle: "Simplificando Sua Gestão de Entregas",
    solutionTitle: "A Solução Completa para Restaurantes e Empresas de entregas rápidas",
    solutionP1:
      "Diga adeus às complicações da gestão de entregas e adote uma plataforma que transforma a relação entre restaurantes, empresas de entregas rápidas e seus entregadores. Desenvolvida para proporcionar eficiência, transparência e segurança, nossa solução digital oferece uma visão integrada de todo o seu fluxo de trabalho e finanças, tudo em um só lugar.",
    solutionP2:
      "Deixe as planilhas no passado e venha para o futuro da gestão de entregas, com toda a praticidade e confiabilidade que você precisa para levar seu negócio ao próximo nível.",
    featuresTitle: "Funcionalidades que fazem diferença",
    features: [
      "FÁCIL USABILIDADE",
      "GESTÃO SIMPLIFICADA",
      "GERENCIAMENTO DE COMANDAS DIGITAIS",
      "ACESSO A EDUCACAO FINANCEIRA PARA ENTREGADORES",
    ],
    testimonialsTitle: "Quem usa, recomenda",
    testimonialsSubtitle: "Historias de quem simplificou a operacao com a VEL.",
    testimonialsPrevAria: "Depoimento anterior",
    testimonialsNextAria: "Proximo depoimento",
    testimonialsGoToPrefix: "Ir para depoimento",
    testimonials: [
      {
        quote:
          "Adorei! Agora consigo organizar entregas e entregadores de forma muito mais clara. Nao me arrependo de ter fechado com a VEL.",
        name: "Johnny Owens",
        role: "Dono de restaurante",
        rating: 5,
      },
      {
        quote:
          "Antes era planilha e grupo de WhatsApp no fim do expediente. Hoje fecho o dia em minutos e todo mundo ve o mesmo painel.",
        name: "Marina Costa",
        role: "Gestora de dark kitchen",
        rating: 5,
      },
      {
        quote:
          "Escalamos de uma unidade para cinco sem perder o controle financeiro. O time de suporte nos ajudou na migracao.",
        name: "Ricardo Almeida",
        role: "Diretor de operacoes",
        rating: 4,
      },
      {
        quote:
          "Os entregadores entendem melhor ganhos e metas. Menos atrito, mais entregas no horario.",
        name: "Paula Mendes",
        role: "Coordenadora de frota",
        rating: 5,
      },
      {
        quote:
          "Relatorios simples e diretos. Consigo mostrar resultado para franqueados sem montar apresentacao do zero.",
        name: "Felipe Nogueira",
        role: "Franqueador",
        rating: 4,
      },
    ],
    plansTitlePrefix: "Temos o",
    plansTitleHighlight1: "plano perfeito",
    plansTitleMiddle: "para sua",
    plansTitleHighlight2: "empresa",
    plansSubtitle: "Comece agora e simplifique a gestao da sua empresa",
    planCta: "Comece gratis",
    planNames: ["Desperte", "Conquiste", "Domine", "Transforme"],
    planDescriptions: [
      "Acesso a toda nossa plataforma e cadastro de ate 10 entregadores",
      "Acesso a toda nossa plataforma e cadastro de ate 30 entregadores",
      "Acesso a toda nossa plataforma e cadastro de ate 60 entregadores",
      "Acesso a toda nossa plataforma e cadastro ilimitado de entregadores",
    ],
    rights: "© 2024 VEL. Todos os direitos reservados.",
    terms: "Termos de Uso",
    privacy: "Política de Privacidade",
    footerSocialLinkedin: "LinkedIn",
    footerSocialInstagram: "@vel_proa",
    footerSocialGithub: "GitHub",
    footerSocialEmail: "E-mail",
    footerTitleLinkedin: "https://www.linkedin.com/company/vel-br",
    footerTitleInstagram: "https://www.instagram.com/vel_proa/",
    footerTitleGithub: "https://github.com/VELPR0A",
    footerTitleEmail: "virtualeasylog@gmail.com",
    footerAriaLinkedin: "Abrir LinkedIn da VEL em nova aba",
    footerAriaInstagram: "Abrir Instagram @vel_proa da VEL em nova aba",
    footerAriaGithub: "Abrir GitHub da VEL em nova aba",
    footerAriaEmail: "Enviar e-mail para a VEL",
    metaTitle: "VEL — Gestão de entregas para restaurantes e frotas",
    metaDescription:
      "Plataforma VEL: pedidos digitais, gestão de entregadores e visão financeira num só lugar. Planos para restaurantes, dark kitchens e operações com frota.",
    footerTermsPath: "/termos",
    footerPrivacyPath: "/privacidade",
    bestSeller: "Mais vendido",
    menuAria: "Abrir menu de navegacao",
    colorModeLabel: "Alternar cor da interface",
    colorModeDark: "Modo escuro",
    colorModeLight: "Modo claro",
    stats: [
      { value: 5000, suffix: "+", label: "Pedidos por dia" },
      { value: 98, suffix: "%", label: "Satisfacao media" },
      { value: 24, suffix: "/7", label: "Disponibilidade" },
    ],
    plansCards: [
      {
        title: "Desperte",
        description: "Acesso a toda nossa plataforma e cadastro de ate 10 entregadores",
        oldPrice: "R$ 149,90",
        newPrice: "R$ 119,90/mês",
        value: 119.9,
      },
      {
        title: "Conquiste",
        description: "Acesso a toda nossa plataforma e cadastro de ate 30 entregadores",
        oldPrice: "R$ 279,90",
        newPrice: "R$ 219,90/mês",
        value: 219.9,
      },
      {
        title: "Domine",
        description: "Acesso a toda nossa plataforma e cadastro de ate 60 entregadores",
        oldPrice: "R$ 339,90",
        newPrice: "R$ 269,90/mês",
        value: 269.9,
        featured: true,
      },
      {
        title: "Transforme",
        description: "Acesso a toda nossa plataforma e cadastro ilimitado de entregadores",
        oldPrice: "R$ 669,90",
        newPrice: "R$ 539,90/mês",
        value: 539.9,
      },
    ],
  },
  en: {
    about: "About",
    aboutPath: "/sobrenosen",
    plans: "Our Plans",
    switchLangAria: "Switch language to Portuguese",
    login: "Login",
    ctaTop: "Get Started",
    heroTitle: "Simplifying delivery management for you",
    heroSubtitle: "Discover the secret to more efficient and profitable deliveries!",
    heroButton: "Boost your productivity by 3x",
    heroTrust: "Secure and stable platform used daily by real operations.",
    phraseTitle: "SAY GOODBYE TO PAPER ORDERS!",
    phraseText:
      "With VEL, you digitize your orders and eliminate the need for printing. This means less paper, lower costs, and a more sustainable environment.",
    sectionTitle: "Simplifying Your Delivery Management",
    solutionTitle: "The Complete Solution for Restaurants and Courier Companies",
    solutionP1:
      "Say goodbye to delivery management complications and adopt a platform that transforms the relationship between restaurants, courier companies, and their couriers. Developed to provide efficiency, transparency, and security, our digital solution offers an integrated view of your entire workflow and finances, all in one place.",
    solutionP2:
      "Leave spreadsheets in the past and step into the future of delivery management, with all the practicality and reliability you need to take your business to the next level.",
    featuresTitle: "Features that make a real difference",
    features: [
      "EASY USABILITY",
      "SIMPLIFIED MANAGEMENT",
      "DIGITAL ORDER MANAGEMENT",
      "ACCESS TO FINANCIAL EDUCATION FOR COURIERS",
    ],
    testimonialsTitle: "Loved by teams on the ground",
    testimonialsSubtitle: "Real stories from operators who simplified delivery with VEL.",
    testimonialsPrevAria: "Previous testimonial",
    testimonialsNextAria: "Next testimonial",
    testimonialsGoToPrefix: "Go to testimonial",
    testimonials: [
      {
        quote:
          "I love it! Deliveries and couriers are finally organized in one place. Zero regrets about signing with VEL.",
        name: "Johnny Owens",
        role: "Restaurant owner",
        rating: 5,
      },
      {
        quote:
          "We used to live in spreadsheets and end-of-day WhatsApp threads. Now we close the day in minutes with one shared view.",
        name: "Marina Costa",
        role: "Dark kitchen manager",
        rating: 5,
      },
      {
        quote:
          "We grew from one site to five without losing financial control. Support helped us migrate smoothly.",
        name: "Ricardo Almeida",
        role: "Head of operations",
        rating: 4,
      },
      {
        quote:
          "Couriers understand earnings and goals better. Less friction, more on-time drops.",
        name: "Paula Mendes",
        role: "Fleet coordinator",
        rating: 5,
      },
      {
        quote:
          "Reports are clear and to the point. I can show franchisees results without building decks from scratch.",
        name: "Felipe Nogueira",
        role: "Franchise lead",
        rating: 4,
      },
    ],
    plansTitlePrefix: "We have the",
    plansTitleHighlight1: "perfect plan",
    plansTitleMiddle: "for your",
    plansTitleHighlight2: "company",
    plansSubtitle: "Start simplifying your company management now",
    planCta: "Start for free",
    planNames: ["Awaken", "Conquer", "Dominate", "Transform"],
    planDescriptions: [
      "Access our full platform with up to 10 couriers",
      "Access our full platform with up to 30 couriers",
      "Access our full platform with up to 60 couriers",
      "Access our full platform with unlimited couriers",
    ],
    rights: "© 2024 VEL. All rights reserved.",
    terms: "Terms of use",
    privacy: "Privacy Policy",
    footerSocialLinkedin: "LinkedIn",
    footerSocialInstagram: "@vel_proa",
    footerSocialGithub: "GitHub",
    footerSocialEmail: "Email",
    footerTitleLinkedin: "https://www.linkedin.com/company/vel-br",
    footerTitleInstagram: "https://www.instagram.com/vel_proa/",
    footerTitleGithub: "https://github.com/VELPR0A",
    footerTitleEmail: "virtualeasylog@gmail.com",
    footerAriaLinkedin: "Open VEL LinkedIn in a new tab",
    footerAriaInstagram: "Open VEL Instagram @vel_proa in a new tab",
    footerAriaGithub: "Open VEL GitHub in a new tab",
    footerAriaEmail: "Send email to VEL",
    metaTitle: "VEL — Delivery management for restaurants and fleets",
    metaDescription:
      "VEL platform: digital orders, courier management, and financial visibility in one place. Plans for restaurants, dark kitchens, and fleet-based operations.",
    footerTermsPath: "/terms",
    footerPrivacyPath: "/privacy",
    bestSeller: "Best seller",
    menuAria: "Open navigation menu",
    colorModeLabel: "Toggle color mode",
    colorModeDark: "Dark mode",
    colorModeLight: "Light mode",
    stats: [
      { value: 5000, suffix: "+", label: "Orders per day" },
      { value: 98, suffix: "%", label: "Average satisfaction" },
      { value: 24, suffix: "/7", label: "Availability" },
    ],
    plansCards: [
      {
        title: "Awaken",
        description: "Access our full platform with up to 10 couriers",
        oldPrice: "R$ 149,90",
        newPrice: "R$ 119,90/month",
        value: 119.9,
      },
      {
        title: "Conquer",
        description: "Access our full platform with up to 30 couriers",
        oldPrice: "R$ 279,90",
        newPrice: "R$ 219,90/month",
        value: 219.9,
      },
      {
        title: "Dominate",
        description: "Access our full platform with up to 60 couriers",
        oldPrice: "R$ 339,90",
        newPrice: "R$ 269,90/month",
        value: 269.9,
        featured: true,
      },
      {
        title: "Transform",
        description: "Access our full platform with unlimited couriers",
        oldPrice: "R$ 669,90",
        newPrice: "R$ 539,90/month",
        value: 539.9,
      },
    ],
  },
};

function PaginaInicial() {
  const location = useLocation();
  const navigate = useNavigate();
  const isEnglish = location.pathname.toLowerCase().includes("inicialingles");
  const lang = isEnglish ? "en" : "pt";
  const t = CONTENT[lang];
  const plansRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialsPaused, setTestimonialsPaused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setPageSeo({
      title: t.metaTitle,
      description: t.metaDescription,
      htmlLang: isEnglish ? "en" : "pt-BR",
    });
  }, [t.metaTitle, t.metaDescription, isEnglish]);

  useEffect(() => {
    setTestimonialIndex(0);
  }, [lang]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("vel-dark-mode", isDarkMode);
    persistDarkMode(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === SETTINGS_KEY) {
        setIsDarkMode(getInitialDarkMode());
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const intervalMs = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      setAnimatedStats(
        t.stats.map((stat) => Math.round((stat.value * step) / steps)),
      );
      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [t]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = t.testimonials.length;
    if (reduced || testimonialsPaused || count <= 1) {
      return undefined;
    }
    const id = window.setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % count);
    }, 6400);
    return () => window.clearInterval(id);
  }, [lang, t.testimonials.length, testimonialsPaused]);

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const primaryLandingCta = () => {
    if (LANDING_SIGNUP_URL) {
      window.open(LANDING_SIGNUP_URL, "_blank", "noopener,noreferrer");
      setMenuOpen(false);
      return;
    }
    scrollToPlans();
  };

  const toggleLanguage = () => {
    setMenuOpen(false);
    navigate(isEnglish ? "/inicial" : "/inicialingles");
  };

  const toggleColorMode = () => {
    setIsDarkMode((current) => !current);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const enviarPlano = (value) => {
    localStorage.setItem("Plano", value);
    setMenuOpen(false);

    navigate(isEnglish ? "/pagamentoingles" : "/pagamento");
  };

  const testimonialCount = t.testimonials.length;
  const activeTestimonial = t.testimonials[testimonialIndex];
  const goTestimonialPrev = () => {
    setTestimonialIndex((i) => (i - 1 + testimonialCount) % testimonialCount);
  };
  const goTestimonialNext = () => {
    setTestimonialIndex((i) => (i + 1) % testimonialCount);
  };

  return (
    <Container>
      <GlobalStyle />
      <div className="container">
        <div className="nav-bar">
          <nav>
            <img
              src={LogoVEL}
              alt="Logo VEL"
              style={{ width: "65px", borderRadius: "10px" }}
            />
            <button
              type="button"
              className="menuToggle"
              aria-label={t.menuAria}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className={`ul ${menuOpen ? "open" : ""}`}>
              <li>
                <button type="button" className="navLink" onClick={() => {
                  setMenuOpen(false);
                  navigate(t.aboutPath);
                }}>
                  {t.about}
                </button>
              </li>
              <li className="pointer">
                <button type="button" className="navLink" onClick={scrollToPlans}>
                  {t.plans}
                </button>
              </li>
              <li>
                <button type="button" onClick={toggleLanguage} className="navLink idioma" aria-label={t.switchLangAria}>
                  <img
                    src={isEnglish ? Portuguese : English}
                    alt={isEnglish ? "Portuguese logo" : "English logo"}
                    style={{ width: "35px" }}
                  />
                </button>
              </li>
              <li>
                <button type="button" className="navLink colorModeBtn" onClick={toggleColorMode} aria-label={t.colorModeLabel}>
                  {isDarkMode ? <FaSun aria-hidden /> : <FaMoon aria-hidden />}
                  <span>{isDarkMode ? t.colorModeLight : t.colorModeDark}</span>
                </button>
              </li>
              <li>
                <button type="button" className="Login" onClick={() => {
                  setMenuOpen(false);
                  navigate(isEnglish ? "/loginingles" : "/login");
                }}>
                  {t.login}
                </button>
              </li>

              <button type="button" className="Cadastro" onClick={primaryLandingCta}>
                {t.ctaTop}
                <div className="arrow-wrapper">
                  {" "}
                  <div className="arrow"></div>
                </div>
              </button>
            </ul>
          </nav>
        </div>

        <div className="Video">
          <div className="conteudo">
            <h1>
              {t.heroTitle}
            </h1>
            <h2>
              {t.heroSubtitle}
            </h2>
            <button type="button" onClick={primaryLandingCta} className="torneProdutividade">
              {t.heroButton}
            </button>
            <p className="heroTrust">{t.heroTrust}</p>
            <div className="heroStats">
              {t.stats.map((stat, index) => (
                <div className="heroStat" key={stat.label}>
                  <strong>
                    {animatedStats[index]}
                    {stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Frase">
          <h1>{t.phraseTitle}</h1>

          <p>
            {t.phraseText}
          </p>
        </div>

        <div className="solution-description">
          <h1 className="simplificando">
            {t.sectionTitle}
          </h1>

          <div className="um">
            <img src={CelularImg} alt="Celular" className="imgNotebook" />

            <div className="dois">
              <h2>
                {t.solutionTitle}
              </h2>
              <p>
                {t.solutionP1}
              </p>
              <p>
                {t.solutionP2}
              </p>
            </div>
          </div>
        </div>

        <div className="Funcionalidades">
          <h1>{t.featuresTitle}</h1>

          <div className="Func">
            <div className="facilUsabilidade">
              <div className="usabilidade"></div>
              <p>
                {t.features[0]}
              </p>
            </div>

            <div className="gestaoSimplificada">
              <div className="gestao"></div>
              <p>
                {t.features[1]}
              </p>
            </div>

            <div className="gerenciamentoComandas">
              <div className="Comandas"></div>
              <p>
                {t.features[2]}
              </p>
            </div>

            <div className="Financeiro">
              <div className="educacao"></div>
              <p>
                {t.features[3]}
              </p>
            </div>
          </div>
        </div>

        <section id="avaliacoes" className="testimonialsSection" aria-labelledby="testimonials-heading">
          <div className="testimonialsHeader">
            <h2 id="testimonials-heading">{t.testimonialsTitle}</h2>
            <p className="testimonialsLead">{t.testimonialsSubtitle}</p>
          </div>
          <div
            className="testimonialsCarousel"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={t.testimonialsTitle}
            onMouseEnter={() => setTestimonialsPaused(true)}
            onMouseLeave={() => setTestimonialsPaused(false)}
            onFocus={() => setTestimonialsPaused(true)}
            onBlur={() => setTestimonialsPaused(false)}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                goTestimonialPrev();
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                goTestimonialNext();
              }
            }}
          >
            <button
              type="button"
              className="testimonialNav testimonialNavPrev"
              aria-controls="testimonial-panel"
              aria-label={t.testimonialsPrevAria}
              onClick={goTestimonialPrev}
            >
              ‹
            </button>
            <div className="testimonialViewport">
              <div
                id="testimonial-panel"
                key={testimonialIndex}
                className="testimonialSlide"
                aria-live="polite"
              >
                <blockquote className="testimonialQuote">
                  <p>{activeTestimonial.quote}</p>
                </blockquote>
                <div className="testimonialAuthor">
                  <span className="testimonialAvatar" aria-hidden="true">
                    {getInitials(activeTestimonial.name)}
                  </span>
                  <div className="testimonialMeta">
                    <span className="testimonialName">{activeTestimonial.name}</span>
                    <span className="testimonialRole">{activeTestimonial.role}</span>
                    <span className="testimonialStars" aria-label={`${activeTestimonial.rating} / 5`}>
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <FaStar
                          key={`${testimonialIndex}-star-${starIndex}`}
                          className={starIndex < activeTestimonial.rating ? "starW" : "starDim"}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="testimonialNav testimonialNavNext"
              aria-controls="testimonial-panel"
              aria-label={t.testimonialsNextAria}
              onClick={goTestimonialNext}
            >
              ›
            </button>
          </div>
          <div className="testimonialDots" role="tablist">
            {t.testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={index === testimonialIndex}
                aria-label={`${t.testimonialsGoToPrefix} ${index + 1}`}
                className={`testimonialDot ${index === testimonialIndex ? "active" : ""}`}
                onClick={() => setTestimonialIndex(index)}
              />
            ))}
          </div>
        </section>

        <div className="NossosPlanos" ref={plansRef}>
          <h1>
            {t.plansTitlePrefix} <span className="blue">{t.plansTitleHighlight1}</span> {t.plansTitleMiddle}{" "}
            <span className="blue">{t.plansTitleHighlight2}</span>!
          </h1>
          <p>{t.plansSubtitle}</p>

          <div className="TiposPlanos">
            {t.plansCards.map((plan, index) => (
              <div className={`Desperte ${plan.featured ? "featured" : ""}`} key={plan.title}>
                <div>
                  {plan.featured && <span className="badge">{t.bestSeller}</span>}
                  <h2 className="tituloCard">{plan.title}</h2>
                  <p className="conteudoPlano">{plan.description}</p>
                  <p className="precoVelho">{plan.oldPrice}</p>
                  <p className="precoNovo">{plan.newPrice}</p>
                  <button onClick={() => enviarPlano(plan.value)} className={`buttonCard plan-${index + 1}`}>
                    {t.planCta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer>
          <div className="branco">
            <img src={LogoVEL} alt="Icone da empresa" className="footerLogo" />
            <div className="icones footerSocial">
              <a
                className="footerSocialLink"
                href="https://www.linkedin.com/company/vel-br"
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t.footerAriaLinkedin}
                title={t.footerTitleLinkedin}
              >
                <img src={linkedinIcon} alt="" width="22" height="22" decoding="async" />
                <span className="footerSocialLabel">{t.footerSocialLinkedin}</span>
              </a>
              <a
                className="footerSocialLink"
                href="https://www.instagram.com/vel_proa/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t.footerAriaInstagram}
                title={t.footerTitleInstagram}
              >
                <img src={instagramIcon} alt="" width="22" height="22" decoding="async" />
                <span className="footerSocialLabel">{t.footerSocialInstagram}</span>
              </a>
              <a
                className="footerSocialLink"
                href="https://github.com/VELPR0A"
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t.footerAriaGithub}
                title={t.footerTitleGithub}
              >
                <img src={githubIcon} alt="" width="22" height="22" decoding="async" />
                <span className="footerSocialLabel">{t.footerSocialGithub}</span>
              </a>
              <a
                className="footerSocialLink"
                href="mailto:virtualeasylog@gmail.com"
                aria-label={t.footerAriaEmail}
                title={t.footerTitleEmail}
              >
                <img src={gmailIcon} alt="" width="22" height="22" decoding="async" />
                <span className="footerSocialLabel">{t.footerSocialEmail}</span>
              </a>
            </div>
          </div>
          <div className="azul">
            <span>
              <p>{t.rights}</p>
            </span>
            <span>
              <Link to={t.footerTermsPath}>{t.terms}</Link>
              <Link to={t.footerPrivacyPath}>{t.privacy}</Link>
            </span>
          </div>
        </footer>
        <button
          type="button"
          className={`backToTop ${showBackToTop ? "show" : ""}`}
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      </div>
    </Container>
  );
}

export default PaginaInicial;
