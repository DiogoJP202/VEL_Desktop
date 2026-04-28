import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import LogoVEL from "../../assets/images/VEL.png";
import CelularImg from "../../assets/images/Celular.png";
import { LoginShell } from "../PaginaLogin/loginstyle";
import GlobalStyle from "../../components/globalStyles";
import { setPageSeo } from "../../utils/seo";
import { showToastSuccess } from "../../services/toast";

const COPY = {
  pt: {
    seoTitle: "Recuperar palavra-passe — VEL",
    seoDescription: "Solicite o restabelecimento da palavra-passe da sua conta VEL.",
    htmlLang: "pt-BR",
    homePath: "/inicial",
    loginPath: "/login",
    otherLangPath: "/recuperarsenhaingles",
    otherLangLabel: "English",
    navBack: "Voltar ao site",
    heroTitleBefore: "Recuperar o acesso",
    heroTitleAccent: "em segurança",
    heroText:
      "Vamos enviar um código de verificação para o seu e-mail. No passo seguinte confirma o código para definir uma nova palavra-passe.",
    eyebrow: "Palavra-passe",
    title: "Esqueceu a palavra-passe?",
    subtitle:
      "Indique o e-mail da conta VEL. Na página seguinte poderá introduzir o código que receber (quando o envio automático estiver configurado no servidor).",
    labelEmail: "E-mail da conta",
    placeholderEmail: "nome@empresa.pt",
    hint: "Use o mesmo e-mail com que se regista na plataforma.",
    submit: "Continuar",
    submitting: "A processar…",
    errorEmpty: "Introduza o e-mail da conta.",
    errorEmail: "Introduza um endereço de e-mail válido.",
    afterToast: "Avance para introduzir o código de verificação.",
    backLogin: "Voltar ao início de sessão",
  },
  en: {
    seoTitle: "Reset password — VEL",
    seoDescription: "Request a password reset for your VEL account.",
    htmlLang: "en",
    homePath: "/inicialingles",
    loginPath: "/loginingles",
    otherLangPath: "/recuperarsenha",
    otherLangLabel: "Português",
    navBack: "Back to website",
    heroTitleBefore: "Regain access",
    heroTitleAccent: "securely",
    heroText:
      "We will send a verification code to your email. On the next step you can enter the code to set a new password.",
    eyebrow: "Password",
    title: "Forgot your password?",
    subtitle:
      "Enter the email on your VEL account. On the next page you can enter the code you receive (when automated email delivery is enabled on the server).",
    labelEmail: "Account email",
    placeholderEmail: "you@company.com",
    hint: "Use the same email you use to sign in.",
    submit: "Continue",
    submitting: "Processing…",
    errorEmpty: "Enter your account email.",
    errorEmail: "Enter a valid email address.",
    afterToast: "Continue to enter your verification code.",
    backLogin: "Back to sign in",
  },
};

export default function RecuperarSenha() {
  const navigate = useNavigate();
  const { pathname, state: locationState } = useLocation();
  const lang = pathname.toLowerCase().includes("recuperarsenhaingles") ? "en" : "pt";
  const t = useMemo(() => COPY[lang] ?? COPY.pt, [lang]);

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const prefill = locationState?.prefillEmail;
    if (typeof prefill === "string") {
      setEmail(prefill);
    }
  }, [locationState?.prefillEmail]);

  useEffect(() => {
    setPageSeo({
      title: t.seoTitle,
      description: t.seoDescription,
      htmlLang: t.htmlLang,
    });
  }, [t.seoTitle, t.seoDescription, t.htmlLang]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setFormError(t.errorEmpty);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setFormError(t.errorEmail);
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 450));
      showToastSuccess(t.afterToast);
      navigate("/codigovalidacao", { state: { email: trimmed, recoverLang: lang } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginShell>
      <GlobalStyle />
      <aside className="loginHero">
        <div className="loginHeroInner">
          <p className="loginHeroBadge">Virtual Easy Log</p>
          <h1 className="loginHeroTitle">
            {t.heroTitleBefore} <span>{t.heroTitleAccent}</span>
          </h1>
          <p className="loginHeroText">{t.heroText}</p>
          <figure className="loginHeroFigure">
            <img src={CelularImg} alt="" width={420} height={420} decoding="async" />
          </figure>
        </div>
      </aside>

      <div className="loginPanel">
        <header className="loginNav">
          <Link to={t.homePath} className="loginBrand">
            <img src={LogoVEL} alt="" width={48} height={48} decoding="async" />
            <span>VEL</span>
          </Link>
          <Link to={t.homePath} className="loginNavLink">
            {t.navBack}
          </Link>
        </header>

        <main className="loginMain">
          <div className="loginCard">
            <div className="loginCardHeader">
              <p className="loginEyebrow">{t.eyebrow}</p>
              <h2 className="loginTitle">{t.title}</h2>
              <p className="loginSubtitle">{t.subtitle}</p>
            </div>

            <form className="loginForm" onSubmit={handleSubmit} noValidate>
              <div className="loginField">
                <label className="loginLabel" htmlFor="recover-email">
                  {t.labelEmail}
                </label>
                <div className="loginInputWrap">
                  <span className="loginInputIcon">
                    <FaEnvelope aria-hidden />
                  </span>
                  <input
                    id="recover-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className="loginInput"
                    placeholder={t.placeholderEmail}
                    value={email}
                    onChange={(event) => {
                      setFormError("");
                      setEmail(event.target.value);
                    }}
                    disabled={isSubmitting}
                    autoFocus
                    required
                  />
                </div>
                <p className="loginRecoverHint">{t.hint}</p>
              </div>

              {formError ? (
                <p className="loginError" role="alert">
                  {formError}
                </p>
              ) : null}

              <button type="submit" className="loginSubmit" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? t.submitting : t.submit}
              </button>
            </form>

            <p className="loginRecoverBack">
              <Link to={t.loginPath}>{t.backLogin}</Link>
            </p>
          </div>
        </main>

        <footer className="loginFooter">
          <p className="loginLangSwitch">
            <Link to={t.otherLangPath}>{t.otherLangLabel}</Link>
          </p>
        </footer>
      </div>
    </LoginShell>
  );
}
