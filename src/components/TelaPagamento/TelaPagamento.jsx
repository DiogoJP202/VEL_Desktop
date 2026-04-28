import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCreditCard, FaPaypal, FaPix } from "react-icons/fa6";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import LogoVEL from "../../assets/images/VEL.png";
import Http from "../RequisicaoHTTP/Http.jsx";
import { apiFetchJson } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { showToastError, showToastSuccess } from "../../services/toast";
import formatarNumeroBR from "../FormatarNumeroBR/FormatarNumeroBR.jsx";
import { setPageSeo } from "../../utils/seo";

const PLAN_LOCALE = {
  119.9: {
    pt: {
      name: "Desperte",
      tagline: "Até 10 entregadores",
      bullets: ["Acesso à plataforma VEL", "Até 10 entregadores no plano", "Suporte no horário comercial"],
    },
    en: {
      name: "Awaken",
      tagline: "Up to 10 couriers",
      bullets: ["Full VEL platform access", "Up to 10 couriers on this plan", "Business-hours support"],
    },
  },
  219.9: {
    pt: {
      name: "Conquiste",
      tagline: "Até 30 entregadores",
      bullets: ["Acesso à plataforma VEL", "Até 30 entregadores no plano", "Suporte prioritário"],
    },
    en: {
      name: "Conquer",
      tagline: "Up to 30 couriers",
      bullets: ["Full VEL platform access", "Up to 30 couriers on this plan", "Priority support"],
    },
  },
  269.9: {
    pt: {
      name: "Domine",
      tagline: "Até 60 entregadores",
      bullets: ["Acesso à plataforma VEL", "Até 60 entregadores no plano", "Suporte prioritário", "Plano em destaque"],
    },
    en: {
      name: "Dominate",
      tagline: "Up to 60 couriers",
      bullets: ["Full VEL platform access", "Up to 60 couriers on this plan", "Priority support", "Featured plan"],
    },
  },
  539.9: {
    pt: {
      name: "Transforme",
      tagline: "Entregadores ilimitados",
      bullets: ["Acesso à plataforma VEL", "Entregadores ilimitados", "Suporte dedicado"],
    },
    en: {
      name: "Transform",
      tagline: "Unlimited couriers",
      bullets: ["Full VEL platform access", "Unlimited couriers", "Dedicated support"],
    },
  },
};

const COPY = {
  pt: {
    seoTitle: "Pagamento — VEL",
    seoDescription: "Finalize os dados da empresa e confirme o plano VEL (Virtual Easy Log).",
    homePath: "/inicial",
    privacyPath: "/privacidade",
    navBack: "← Escolher outro plano",
    alertTextBefore: "Não encontrámos um plano válido no seu navegador.",
    alertLink: "Volte à página inicial",
    alertTextAfter: ", selecione um plano e clique em continuar.",
    titleBefore: "Complete o cadastro na",
    lead:
      "Dados da empresa para faturação e contacto. O método de pagamento pode ser ajustado com a nossa equipa após o primeiro contacto.",
    labelCompany: "Razão social",
    labelCnpj: "CNPJ",
    placeholderCnpj: "00.000.000/0000-00",
    labelEmail: "E-mail corporativo",
    labelPhone: "Telefone com DDD",
    placeholderPhone: "(11) 98765-4321",
    labelCoupon: "Cupom (opcional)",
    placeholderCoupon: "Código promocional",
    clearCoupon: "Limpar",
    methodsTitle: "Como prefere pagar?",
    methodsGroupLabel: "Método de pagamento",
    trust:
      "A Virtual Easy Log compromete-se com uma experiência clara no onboarding. Oferecemos garantia de reavaliação nos primeiros dias após a ativação, conforme condições comerciais acordadas.",
    asideTitle: "Resumo",
    planBadge: "Plano mensal",
    subtotal: "Subtotal",
    perMonth: "/mês",
    totalMonthly: "Total (mensal)",
    installmentCard: (value) => `Em até 12x de R$ ${value} no cartão`,
    installmentOther: "Pagamento à vista conforme o método escolhido",
    submit: "Confirmar pedido",
    submitting: "A enviar…",
    legalBefore: "Ao continuar, autoriza o tratamento dos dados para contacto comercial e faturação, nos termos da nossa",
    legalLink: "política de privacidade",
    legalAfter: ".",
    defaultPlan: {
      name: "Plano VEL",
      tagline: "Plano selecionado na landing",
      bullets: ["Acesso à plataforma VEL", "Recursos conforme o plano escolhido"],
    },
    payments: [
      { id: "card", label: "Cartão de crédito", hint: "Até 12x", icon: FaCreditCard },
      { id: "paypal", label: "PayPal", hint: "Até 12x", icon: FaPaypal },
      { id: "pix", label: "PIX", hint: "À vista", icon: FaPix },
      { id: "debit", label: "Cartão de débito", hint: "À vista", icon: FaCreditCard },
    ],
    toastInvalidPlan: "Plano inválido. Volte à página inicial e escolha um plano.",
    toastCompany: "Informe a razão social.",
    toastCnpj: "Informe um CNPJ válido (14 dígitos).",
    toastEmail: "Informe um e-mail válido.",
    toastPhone: "Informe um telefone com DDD (mínimo 10 dígitos).",
    toastSuccess: "Pedido registado! Verifique o e-mail para os próximos passos.",
    toastApiFail: "Não foi possível validar o pagamento. Tente novamente.",
    toastRequestError: "Erro ao enviar o pedido de pagamento.",
  },
  en: {
    seoTitle: "Checkout — VEL",
    seoDescription: "Enter your company details and confirm your VEL (Virtual Easy Log) plan.",
    homePath: "/inicialingles",
    privacyPath: "/privacy",
    navBack: "← Choose another plan",
    alertTextBefore: "We could not find a valid plan in your browser.",
    alertLink: "Return to the home page",
    alertTextAfter: ", pick a plan, and continue.",
    titleBefore: "Complete your signup with",
    lead:
      "Company details for billing and contact. Payment method can be finalized with our team after the first touchpoint.",
    labelCompany: "Legal company name",
    labelCnpj: "CNPJ (Brazil tax ID)",
    placeholderCnpj: "14 digits",
    labelEmail: "Work email",
    labelPhone: "Phone with area code",
    placeholderPhone: "+55 area code + number",
    labelCoupon: "Coupon (optional)",
    placeholderCoupon: "Promo code",
    clearCoupon: "Clear",
    methodsTitle: "How would you like to pay?",
    methodsGroupLabel: "Payment method",
    trust:
      "Virtual Easy Log is committed to a clear onboarding experience. We offer a reassessment window in the first days after activation, per agreed commercial terms.",
    asideTitle: "Summary",
    planBadge: "Monthly plan",
    subtotal: "Subtotal",
    perMonth: "/month",
    totalMonthly: "Total (monthly)",
    installmentCard: (value) => `Up to 12× of R$ ${value} on card`,
    installmentOther: "Pay in full based on the selected method",
    submit: "Confirm request",
    submitting: "Sending…",
    legalBefore: "By continuing you agree to the processing of your data for billing and commercial contact, under our",
    legalLink: "privacy policy",
    legalAfter: ".",
    defaultPlan: {
      name: "VEL plan",
      tagline: "Plan selected from the landing page",
      bullets: ["Access to the VEL platform", "Features according to the selected plan"],
    },
    payments: [
      { id: "card", label: "Credit card", hint: "Up to 12×", icon: FaCreditCard },
      { id: "paypal", label: "PayPal", hint: "Up to 12×", icon: FaPaypal },
      { id: "pix", label: "PIX", hint: "Pay in full", icon: FaPix },
      { id: "debit", label: "Debit card", hint: "Pay in full", icon: FaCreditCard },
    ],
    toastInvalidPlan: "Invalid plan. Go back to the home page and choose a plan.",
    toastCompany: "Enter the legal company name.",
    toastCnpj: "Enter a valid CNPJ (14 digits).",
    toastEmail: "Enter a valid email address.",
    toastPhone: "Enter a phone number with area code (at least 10 digits).",
    toastSuccess: "Request recorded! Check your email for next steps.",
    toastApiFail: "We could not validate the payment. Please try again.",
    toastRequestError: "Error sending the payment request.",
  },
};

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

// eslint-disable-next-line react/prop-types -- props from route parent
export default function TelaPagamento({ valorPlano, lang = "pt" }) {
  const navigate = useNavigate();
  const t = COPY[lang] ?? COPY.pt;
  const htmlLang = lang === "en" ? "en" : "pt-BR";

  const price = useMemo(() => {
    const n = Number(valorPlano);
    return Number.isFinite(n) ? n : NaN;
  }, [valorPlano]);

  const plan = useMemo(() => {
    if (!Number.isFinite(price)) {
      return null;
    }
    const locale = lang === "en" ? "en" : "pt";
    const row = PLAN_LOCALE[price];
    if (row) {
      return row[locale] ?? row.pt;
    }
    return COPY[locale].defaultPlan;
  }, [price, lang]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    IRazaoSocial: "",
    ICNPJ: "",
    IEmail: "",
    ITelefone: "",
    ICupom: "",
  });

  useEffect(() => {
    setPageSeo({
      title: t.seoTitle,
      description: t.seoDescription,
      htmlLang,
    });
  }, [t.seoTitle, t.seoDescription, htmlLang]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((current) => ({ ...current, [id]: value }));
  };

  const clearCoupon = () => {
    setFormData((current) => ({ ...current, ICupom: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!Number.isFinite(price) || price <= 0) {
      showToastError(t.toastInvalidPlan);
      return;
    }

    const razao = formData.IRazaoSocial.trim();
    const cnpjDigits = onlyDigits(formData.ICNPJ);
    const email = formData.IEmail.trim();
    const telDigits = onlyDigits(formData.ITelefone);

    if (razao.length < 2) {
      showToastError(t.toastCompany);
      return;
    }
    if (cnpjDigits.length !== 14) {
      showToastError(t.toastCnpj);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToastError(t.toastEmail);
      return;
    }
    if (telDigits.length < 10) {
      showToastError(t.toastPhone);
      return;
    }

    const payload = {
      RazaoSocial: razao,
      CNPJ: cnpjDigits,
      Email: email,
      Tel: telDigits,
      Cupom: formData.ICupom.trim(),
      Valor: price,
    };

    try {
      setIsSubmitting(true);
      const response = await apiFetchJson("/pagamento/confirmar", Http("POST", payload));
      const resultado = response?.data;

      if (resultado) {
        showToastSuccess(t.toastSuccess);
        navigate(lang === "en" ? "/loginingles" : "/login", { replace: true });
        return;
      }

      showToastError(t.toastApiFail);
    } catch (error) {
      notifyApiError(error, t.toastRequestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const installmentLine =
    Number.isFinite(price) && (paymentMethod === "card" || paymentMethod === "paypal")
      ? t.installmentCard(formatarNumeroBR(price / 12))
      : t.installmentOther;

  const invalidPlan = !Number.isFinite(price) || price <= 0;

  return (
    <div className="pagamentoRoot">
      <header className="pagamentoNav">
        <Link to={t.homePath} className="pagamentoNavBrand">
          <img src={LogoVEL} alt="VEL" width="52" height="52" decoding="async" />
          <span>VEL</span>
        </Link>
        <Link to={t.homePath} className="pagamentoNavBack">
          {t.navBack}
        </Link>
      </header>

      {invalidPlan ? (
        <div className="pagamentoAlert" role="alert">
          {t.alertTextBefore}{" "}
          <Link to={t.homePath}>{t.alertLink}</Link>
          {t.alertTextAfter}
        </div>
      ) : null}

      <div className="pagamentoLayout">
        <div className="pagamentoMain">
          <h1 className="pagamentoTitle">
            {t.titleBefore} <span className="pagamentoTitleAccent">VEL</span>
          </h1>
          <p className="pagamentoLead">{t.lead}</p>

          <form id="pagamento-checkout-form" className="pagamentoForm" onSubmit={handleSubmit}>
            <div className="pagamentoFieldGrid">
              <div className="pagamentoField pagamentoFieldFull">
                <label className="pagamentoLabel" htmlFor="IRazaoSocial">
                  {t.labelCompany}
                </label>
                <input
                  className="pagamentoInput"
                  type="text"
                  id="IRazaoSocial"
                  name="RazaoSocial"
                  autoComplete="organization"
                  value={formData.IRazaoSocial}
                  onChange={handleChange}
                  disabled={invalidPlan}
                  required
                />
              </div>
              <div className="pagamentoField">
                <label className="pagamentoLabel" htmlFor="ICNPJ">
                  {t.labelCnpj}
                </label>
                <input
                  className="pagamentoInput"
                  type="text"
                  id="ICNPJ"
                  name="CNPJ"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder={t.placeholderCnpj}
                  value={formData.ICNPJ}
                  onChange={handleChange}
                  disabled={invalidPlan}
                  required
                />
              </div>
              <div className="pagamentoField">
                <label className="pagamentoLabel" htmlFor="IEmail">
                  {t.labelEmail}
                </label>
                <input
                  className="pagamentoInput"
                  type="email"
                  id="IEmail"
                  name="Email"
                  autoComplete="email"
                  value={formData.IEmail}
                  onChange={handleChange}
                  disabled={invalidPlan}
                  required
                />
              </div>
              <div className="pagamentoField pagamentoFieldFull">
                <label className="pagamentoLabel" htmlFor="ITelefone">
                  {t.labelPhone}
                </label>
                <input
                  className="pagamentoInput"
                  type="tel"
                  id="ITelefone"
                  name="Telefone"
                  autoComplete="tel"
                  placeholder={t.placeholderPhone}
                  value={formData.ITelefone}
                  onChange={handleChange}
                  disabled={invalidPlan}
                  required
                />
              </div>
              <div className="pagamentoField pagamentoFieldFull">
                <label className="pagamentoLabel" htmlFor="ICupom">
                  <CiDiscount1 style={{ verticalAlign: "middle", marginRight: 6 }} aria-hidden />
                  {t.labelCoupon}
                </label>
                <div className="pagamentoCouponRow">
                  <input
                    className="pagamentoInput"
                    type="text"
                    id="ICupom"
                    name="Cupom"
                    placeholder={t.placeholderCoupon}
                    value={formData.ICupom}
                    onChange={handleChange}
                    disabled={invalidPlan}
                  />
                  <button type="button" className="pagamentoBtnGhost" onClick={clearCoupon} disabled={invalidPlan || !formData.ICupom}>
                    {t.clearCoupon}
                  </button>
                </div>
              </div>
            </div>

            <div className="pagamentoMethods" role="group" aria-labelledby="pagamento-metodos">
              <p className="pagamentoMethodsTitle" id="pagamento-metodos">
                {t.methodsTitle}
              </p>
              <div className="pagamentoMethodsGrid">
                {t.payments.map((opt) => {
                  const Icon = opt.icon;
                  const active = paymentMethod === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`pagamentoMethod ${active ? "pagamentoMethodActive" : ""}`}
                      onClick={() => setPaymentMethod(opt.id)}
                      disabled={invalidPlan}
                      aria-pressed={active}
                    >
                      <span className="pagamentoMethodIcon" aria-hidden>
                        <Icon />
                      </span>
                      <span className="pagamentoMethodTitle">{opt.label}</span>
                      <span className="pagamentoMethodHint">{opt.hint}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </form>

          <div className="pagamentoTrust">
            <FaCheckCircle aria-hidden />
            <span>{t.trust}</span>
          </div>
        </div>

        <aside className="pagamentoAside" aria-labelledby="resumo-pagamento">
          <h2 className="pagamentoAsideTitle" id="resumo-pagamento">
            {t.asideTitle}
          </h2>
          <span className="pagamentoPlanBadge">{t.planBadge}</span>
          <p className="pagamentoPlanName">{plan?.name}</p>
          <p className="pagamentoPlanTagline">{plan?.tagline}</p>

          <div className="pagamentoRow">
            <span>{t.subtotal}</span>
            <span>{Number.isFinite(price) ? `R$ ${formatarNumeroBR(price)}${t.perMonth}` : "—"}</span>
          </div>
          <div className="pagamentoRow pagamentoRowTotal">
            <span>{t.totalMonthly}</span>
            <span>
              <strong>{Number.isFinite(price) ? `R$ ${formatarNumeroBR(price)}` : "—"}</strong>
            </span>
          </div>
          <p className="pagamentoInstallment">{installmentLine}</p>

          <ul className="pagamentoBullets">
            {(plan?.bullets ?? []).map((line) => (
              <li key={line}>
                <FaCheck aria-hidden />
                {line}
              </li>
            ))}
          </ul>

          <button
            type="submit"
            form="pagamento-checkout-form"
            className="pagamentoSubmit"
            disabled={isSubmitting || invalidPlan}
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>

          <p className="pagamentoLegal">
            {t.legalBefore}{" "}
            <Link to={t.privacyPath}>{t.legalLink}</Link>
            {t.legalAfter}
          </p>
        </aside>
      </div>
    </div>
  );
}
