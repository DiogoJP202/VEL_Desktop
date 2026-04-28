import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoVEL from "../../assets/images/VEL.png";
import CelularImg from "../../assets/images/Celular.png";
import { LoginShell } from "../PaginaLogin/loginstyle";
import GlobalStyle from "../../components/globalStyles";
import { setPageSeo } from "../../utils/seo";
import { showToastInfo, showToastSuccess } from "../../services/toast";

function maskEmail(value) {
  const [user, domain] = value.trim().split("@");
  if (!domain) {
    return value;
  }
  const visible = user.slice(0, Math.min(2, user.length));
  return `${visible}•••@${domain}`;
}

const COPY = {
  pt: {
    seoTitle: "Código de verificação — VEL",
    seoDescription: "Introduza o código enviado por e-mail para continuar a recuperação da palavra-passe.",
    htmlLang: "pt-BR",
    homePath: "/inicial",
    loginPath: "/login",
    recoverPath: "/recuperarsenha",
    navBack: "Voltar ao site",
    heroTitleBefore: "Quase lá",
    heroTitleAccent: "confirme o código",
    heroText: "Por segurança, precisamos de confirmar que tem acesso ao e-mail da conta antes de definir uma nova palavra-passe.",
    eyebrow: "Verificação",
    title: "Introduza o código",
    subtitleWithEmail: (masked) => `Enviámos um código para ${masked}. Insira os 6 dígitos abaixo.`,
    subtitleGeneric: "Insira o código de 6 dígitos que recebeu por e-mail.",
    changeEmail: "Alterar e-mail",
    resend: "Reenviar código",
    verify: "Validar e continuar",
    verifying: "A validar…",
    backLogin: "Voltar ao início de sessão",
    resendToast: "Se o envio automático estiver ativo, receberá um novo código em breve.",
    verifyToast: "Em produção o código seria validado no servidor. Avance para iniciar sessão.",
    digitLabel: (n) => `Dígito ${n}`,
  },
  en: {
    seoTitle: "Verification code — VEL",
    seoDescription: "Enter the code sent to your email to continue resetting your password.",
    htmlLang: "en",
    homePath: "/inicialingles",
    loginPath: "/loginingles",
    recoverPath: "/recuperarsenhaingles",
    navBack: "Back to website",
    heroTitleBefore: "Almost there",
    heroTitleAccent: "confirm the code",
    heroText: "For security, we need to confirm you can access the account email before setting a new password.",
    eyebrow: "Verification",
    title: "Enter your code",
    subtitleWithEmail: (masked) => `We sent a code to ${masked}. Enter the 6 digits below.`,
    subtitleGeneric: "Enter the 6-digit code from your email.",
    changeEmail: "Change email",
    resend: "Resend code",
    verify: "Verify and continue",
    verifying: "Verifying…",
    backLogin: "Back to sign in",
    resendToast: "If automated delivery is enabled, you will receive a new code shortly.",
    verifyToast: "In production the code would be validated on the server. Continue to sign in.",
    digitLabel: (n) => `Digit ${n}`,
  },
};

export default function CodigoValidacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email;
  const lang = location.state?.recoverLang === "en" ? "en" : "pt";
  const t = useMemo(() => COPY[lang] ?? COPY.pt, [lang]);

  const [digits, setDigits] = useState(() => Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    setPageSeo({
      title: t.seoTitle,
      description: t.seoDescription,
      htmlLang: t.htmlLang,
    });
  }, [t.seoTitle, t.seoDescription, t.htmlLang]);

  const setDigit = useCallback((index, raw) => {
    const v = raw.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = v;
      return next;
    });
    if (v && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (index, event) => {
      if (event.key === "Backspace" && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  const handlePaste = useCallback((event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) {
      return;
    }
    const chars = text.split("");
    setDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < 6; i += 1) {
        next[i] = chars[i] ?? "";
      }
      return next;
    });
    const focusIndex = Math.min(chars.length, 5);
    requestAnimationFrame(() => {
      inputRefs.current[focusIndex]?.focus();
    });
  }, []);

  const handleResend = () => {
    showToastInfo(t.resendToast);
  };

  const handleVerify = async () => {
    const code = digits.join("");
    if (code.length !== 6) {
      return;
    }
    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 400));
      showToastSuccess(t.verifyToast);
      navigate(t.loginPath, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtitle = emailFromState ? t.subtitleWithEmail(maskEmail(emailFromState)) : t.subtitleGeneric;
  const codeComplete = digits.every((d) => d.length === 1);

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
              <p className="loginSubtitle">{subtitle}</p>
            </div>

            {emailFromState ? (
              <p className="loginRecoverBack">
                <Link to={t.recoverPath} state={{ prefillEmail: emailFromState }}>
                  {t.changeEmail}
                </Link>
              </p>
            ) : null}

            <div className="loginCodeGrid" role="group" aria-label={lang === "en" ? "6-digit code" : "Código de 6 dígitos"}>
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  className="loginCodeCell"
                  value={digit}
                  onChange={(e) => setDigit(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  disabled={isSubmitting}
                  autoFocus={index === 0}
                  aria-label={t.digitLabel(index + 1)}
                />
              ))}
            </div>

            <div className="loginCodeActions">
              <button type="button" className="loginBtnSecondary" onClick={handleResend} disabled={isSubmitting}>
                {t.resend}
              </button>
              <button
                type="button"
                className="loginSubmit"
                onClick={handleVerify}
                disabled={isSubmitting || !codeComplete}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? t.verifying : t.verify}
              </button>
            </div>

            <p className="loginRecoverBack">
              <Link to={t.loginPath}>{t.backLogin}</Link>
            </p>
          </div>
        </main>
      </div>
    </LoginShell>
  );
}
