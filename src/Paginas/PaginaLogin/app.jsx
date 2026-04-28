import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Http from "../../components/RequisicaoHTTP/Http.jsx";
import LogoVEL from "../../assets/images/VEL.png";
import CelularImg from "../../assets/images/Celular.png";
import { LoginShell } from "./loginstyle";
import GlobalStyle from "../../components/globalStyles";
import { apiFetchJson } from "../../services/httpClient";
import { getApiErrorMessage } from "../../services/uiFeedback";
import { AUTH_ROLE, getAuthRole, hasUserContext, isAuthenticated } from "../../services/auth";
import { showToastError, showToastInfo, showToastSuccess } from "../../services/toast";
import { useAuth } from "../../contexts/AuthContext";
import { setPageSeo } from "../../utils/seo";

const REMEMBER_EMAIL_KEY = "VEL_LOGIN_REMEMBER_EMAIL";

const COPY = {
  pt: {
    seoTitle: "Entrar — VEL",
    seoDescription: "Aceda à plataforma Virtual Easy Log com o seu e-mail e palavra-passe.",
    htmlLang: "pt-BR",
    homePath: "/inicial",
    plansPath: "/inicial",
    otherLangPath: "/loginingles",
    otherLangLabel: "English",
    heroTitleBefore: "Gestão de entregas",
    heroTitleAccent: "sem complicações",
    heroText:
      "Acompanhe pedidos, equipas e operações num só lugar. Entre para continuar de onde parou.",
    navBack: "Voltar ao site",
    eyebrow: "Acesso à conta",
    title: "Bem-vindo de volta",
    subtitle: "Use o e-mail da empresa e a sua palavra-passe para entrar na plataforma.",
    labelEmail: "E-mail",
    placeholderEmail: "nome@empresa.pt",
    labelPassword: "Palavra-passe",
    remember: "Lembrar o meu e-mail neste dispositivo",
    forgot: "Esqueceu a palavra-passe?",
    forgotPath: "/recuperarsenha",
    submit: "Entrar",
    submitting: "A entrar…",
    footerPrefix: "Ainda não tem plano?",
    footerLink: "Ver planos e começar",
    errorEmpty: "Preencha o e-mail e a palavra-passe.",
    errorEmail: "Introduza um endereço de e-mail válido.",
    toastOwner: "Sessão iniciada como proprietário.",
    toastAttendant: "Sessão iniciada como atendente.",
    toastApi: "E-mail ou palavra-passe incorretos.",
    toggleHide: "Ocultar palavra-passe",
    toggleShow: "Mostrar palavra-passe",
  },
  en: {
    seoTitle: "Sign in — VEL",
    seoDescription: "Sign in to Virtual Easy Log with your work email and password.",
    htmlLang: "en",
    homePath: "/inicialingles",
    plansPath: "/inicialingles",
    otherLangPath: "/login",
    otherLangLabel: "Português",
    heroTitleBefore: "Delivery operations",
    heroTitleAccent: "made simple",
    heroText:
      "Track orders, teams, and day-to-day operations in one place. Sign in to pick up where you left off.",
    navBack: "Back to website",
    eyebrow: "Account access",
    title: "Welcome back",
    subtitle: "Use your company email and password to access the platform.",
    labelEmail: "Email",
    placeholderEmail: "you@company.com",
    labelPassword: "Password",
    remember: "Remember my email on this device",
    forgot: "Forgot password?",
    forgotPath: "/recuperarsenhaingles",
    submit: "Sign in",
    submitting: "Signing in…",
    footerPrefix: "No plan yet?",
    footerLink: "View plans and get started",
    errorEmpty: "Enter your email and password.",
    errorEmail: "Enter a valid email address.",
    toastOwner: "Signed in as owner.",
    toastAttendant: "Signed in as attendant.",
    toastApi: "Incorrect email or password.",
    toggleHide: "Hide password",
    toggleShow: "Show password",
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lang = pathname.toLowerCase().includes("loginingles") ? "en" : "pt";
  const t = useMemo(() => COPY[lang] ?? COPY.pt, [lang]);

  const { isAuthenticated: hasActiveSession, role, login, logout } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", senha: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setPageSeo({
      title: t.seoTitle,
      description: t.seoDescription,
      htmlLang: t.htmlLang,
    });
  }, [t.seoTitle, t.seoDescription, t.htmlLang]);

  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_EMAIL_KEY);
    if (saved) {
      setCredentials((c) => ({ ...c, email: saved }));
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (hasActiveSession) {
      const currentRole = role || getAuthRole();
      if (currentRole === AUTH_ROLE.OWNER) {
        navigate("/dashboard", { replace: true });
        return;
      }
      if (currentRole === AUTH_ROLE.ATTENDANT) {
        navigate("/atendente", { replace: true });
        return;
      }
    }

    if (!hasActiveSession && (isAuthenticated() || hasUserContext())) {
      logout();
    }

    const authNotice = sessionStorage.getItem("AuthNotice");
    if (authNotice) {
      showToastInfo(authNotice);
      sessionStorage.removeItem("AuthNotice");
    }
  }, [hasActiveSession, role, navigate, logout]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const email = credentials.email.trim().toLowerCase();
    const senha = credentials.senha;

    if (!email || !senha) {
      setFormError(t.errorEmpty);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError(t.errorEmail);
      return;
    }

    const payload = { email, senha };

    try {
      setIsSubmitting(true);
      const response = await apiFetchJson("/login/usuario", Http("POST", payload));

      if (rememberMe) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      if (response.isproprietario) {
        login({ token: response.accessToken, userId: response.id, role: AUTH_ROLE.OWNER });
        showToastSuccess(t.toastOwner);
        navigate("/dashboard", { replace: true });
        return;
      }

      login({ token: response.accessToken, userId: response.id, role: AUTH_ROLE.ATTENDANT });
      showToastSuccess(t.toastAttendant);
      navigate("/atendente", { replace: true });
    } catch (error) {
      showToastError(getApiErrorMessage(error, t.toastApi));
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
                <label className="loginLabel" htmlFor="login-email">
                  {t.labelEmail}
                </label>
                <div className="loginInputWrap">
                  <span className="loginInputIcon">
                    <FaEnvelope aria-hidden />
                  </span>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className="loginInput"
                    placeholder={t.placeholderEmail}
                    value={credentials.email}
                    onChange={(event) => {
                      setFormError("");
                      setCredentials((c) => ({ ...c, email: event.target.value }));
                    }}
                    disabled={isSubmitting}
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="loginField">
                <label className="loginLabel" htmlFor="login-password">
                  {t.labelPassword}
                </label>
                <div className="loginInputWrap loginInputWrapPassword">
                  <span className="loginInputIcon">
                    <FaLock aria-hidden />
                  </span>
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="loginInput"
                    placeholder="••••••••"
                    value={credentials.senha}
                    onChange={(event) => {
                      setFormError("");
                      setCredentials((c) => ({ ...c, senha: event.target.value }));
                    }}
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    className="loginTogglePw"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? t.toggleHide : t.toggleShow}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <FaEyeSlash aria-hidden /> : <FaEye aria-hidden />}
                  </button>
                </div>
              </div>

              {formError ? (
                <p className="loginError" role="alert">
                  {formError}
                </p>
              ) : null}

              <div className="loginRow">
                <label className="loginRemember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isSubmitting}
                  />
                  {t.remember}
                </label>
                <Link to={t.forgotPath} className="loginForgot">
                  {t.forgot}
                </Link>
              </div>

              <button type="submit" className="loginSubmit" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? t.submitting : t.submit}
              </button>
            </form>
          </div>
        </main>

        <footer className="loginFooter">
          <p>
            {t.footerPrefix}{" "}
            <Link to={t.plansPath}>{t.footerLink}</Link>
          </p>
          <p className="loginLangSwitch">
            <Link to={t.otherLangPath}>{t.otherLangLabel}</Link>
          </p>
        </footer>
      </div>
    </LoginShell>
  );
}
