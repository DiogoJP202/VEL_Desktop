import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";
import {
  MdLanguage,
  MdOutlinePassword,
  MdPrivacyTip,
} from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiPhoneCallLight } from "react-icons/pi";
import {
  LuCheck,
  LuLogOut,
  LuMoon,
  LuRefreshCcw,
  LuSave,
  LuShieldCheck,
} from "react-icons/lu";
import MenuLateralOwner from "../MenuLateral/MenuLateral.jsx";
import MenuLateralEquipe from "../MenuLateralAtendenteCoordenador/MenuLateral.jsx";
import style from "./PaginaConfiguracoes.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { AUTH_ROLE } from "../../services/auth";
import Http from "../RequisicaoHTTP/Http.jsx";
import { apiFetchJson } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { showToastInfo, showToastSuccess } from "../../services/toast";

const SETTINGS_STORAGE_KEY = "vel:settings:v1";

const DEFAULT_SETTINGS = {
  darkMode: false,
  notifications: true,
  marketingEmails: false,
  language: "pt-BR",
};

function getInitialSettings() {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    return {
      darkMode: Boolean(parsed?.darkMode),
      notifications: parsed?.notifications ?? true,
      marketingEmails: Boolean(parsed?.marketingEmails),
      language: parsed?.language === "en-US" ? "en-US" : "pt-BR",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function normalizeCpf(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function normalizeCnpj(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 14);
}

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function applyPhoneMask(value) {
  const digits = normalizePhone(value);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function normalizeName(raw) {
  return String(raw?.nome || raw?.NOME || raw?.proprietario || "").trim();
}

function normalizeEmail(raw) {
  return String(raw?.email || "").trim();
}

function normalizeUserRole(role) {
  if (role === AUTH_ROLE.OWNER) {
    return "Proprietario";
  }
  return "Equipe";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export default function PaginaConfiguracoes() {
  const navigate = useNavigate();
  const { role, userId, logout } = useAuth();
  const isOwner = role === AUTH_ROLE.OWNER;
  const MenuLateral = isOwner ? MenuLateralOwner : MenuLateralEquipe;

  const [settings, setSettings] = useState(getInitialSettings);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileDraft, setProfileDraft] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const accountLabel = useMemo(() => normalizeUserRole(role), [role]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.body.classList.toggle("vel-dark-mode", settings.darkMode);
  }, [settings.darkMode]);

  const loadProfile = useCallback(async () => {
    if (userId === null || userId === undefined) {
      return;
    }

    setLoadingProfile(true);
    try {
      if (isOwner) {
        const cnpj = normalizeCnpj(userId);
        const companyData = await apiFetchJson(`/empresa/cnpj/${cnpj}`);
        const normalized = {
          id: cnpj,
          roleLabel: "Empresa",
          name: normalizeName(companyData),
          email: normalizeEmail(companyData),
          phone: applyPhoneMask(companyData?.telefone),
          address: String(companyData?.endereco || "").trim(),
          companyId: cnpj,
        };

        setProfile(normalized);
        setProfileDraft({
          name: normalized.name,
          email: normalized.email,
          phone: normalized.phone,
          address: normalized.address,
        });
      } else {
        const cpf = normalizeCpf(userId);
        const coordinatorData = await apiFetchJson(`/coordenador/id/${cpf}`);
        const normalized = {
          id: cpf,
          roleLabel: "Coordenador",
          name: normalizeName(coordinatorData),
          email: normalizeEmail(coordinatorData),
          phone: applyPhoneMask(coordinatorData?.telefone || coordinatorData?.TELEFONE),
          address: "",
          companyId: normalizeCnpj(coordinatorData?.idCnpj),
        };

        setProfile(normalized);
        setProfileDraft({
          name: normalized.name,
          email: normalized.email,
          phone: normalized.phone,
          address: "",
        });
      }
    } catch (error) {
      notifyApiError(error, "Nao foi possivel carregar os dados da conta.");
    } finally {
      setLoadingProfile(false);
    }
  }, [isOwner, userId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleToggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleLanguageChange = (event) => {
    setSettings((current) => ({ ...current, language: event.target.value }));
    showToastInfo(
      event.target.value === "en-US"
        ? "Idioma definido para ingles."
        : "Idioma definido para portugues.",
    );
  };

  const handleProfileFieldChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      setProfileDraft((current) => ({ ...current, phone: applyPhoneMask(value) }));
      return;
    }
    setProfileDraft((current) => ({ ...current, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profile) {
      return;
    }

    const name = profileDraft.name.trim();
    const email = profileDraft.email.trim().toLowerCase();
    const phoneDigits = normalizePhone(profileDraft.phone);

    if (name.length < 2) {
      showToastInfo("Informe um nome valido.");
      return;
    }

    if (!isValidEmail(email)) {
      showToastInfo("Informe um email valido.");
      return;
    }

    setSavingProfile(true);
    try {
      if (isOwner) {
        await apiFetchJson(
          "/empresa/editar",
          Http("PUT", {
            idCnpj: profile.companyId,
            proprietario: name,
            email,
            telefone: phoneDigits,
            endereco: profileDraft.address.trim(),
          }),
        );
      } else {
        await apiFetchJson(
          "/coordenador/editar",
          Http("PUT", {
            idCpf: profile.id,
            nome: name,
            telefone: phoneDigits,
            email,
            idCnpj: profile.companyId,
          }),
        );
      }

      showToastSuccess("Dados atualizados com sucesso.");
      setLastSavedAt(new Date());
      await loadProfile();
    } catch (error) {
      notifyApiError(error, "Nao foi possivel salvar as alteracoes.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordFieldChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((current) => ({ ...current, [name]: value }));
  };

  const handleSavePassword = async () => {
    if (!profile) {
      return;
    }

    const newPassword = passwordForm.newPassword.trim();
    const confirmPassword = passwordForm.confirmPassword.trim();

    if (newPassword.length < 6) {
      showToastInfo("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToastInfo("A confirmacao de senha nao confere.");
      return;
    }

    setSavingPassword(true);
    try {
      if (isOwner) {
        await apiFetchJson(
          "/empresa/editar",
          Http("PUT", {
            idCnpj: profile.companyId,
            proprietario: profileDraft.name.trim(),
            email: profileDraft.email.trim().toLowerCase(),
            telefone: normalizePhone(profileDraft.phone),
            endereco: profileDraft.address.trim(),
            senha: newPassword,
          }),
        );
      } else {
        await apiFetchJson(
          "/coordenador/editar",
          Http("PUT", {
            idCpf: profile.id,
            nome: profileDraft.name.trim(),
            telefone: normalizePhone(profileDraft.phone),
            email: profileDraft.email.trim().toLowerCase(),
            idCnpj: profile.companyId,
            senha: newPassword,
          }),
        );
      }

      showToastSuccess("Senha atualizada com sucesso.");
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      notifyApiError(error, "Nao foi possivel atualizar a senha.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    showToastInfo("Preferencias restauradas.");
  };

  const handleExportSettings = () => {
    const payload = {
      role: accountLabel,
      user: String(userId || ""),
      generatedAt: new Date().toISOString(),
      settings,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "preferencias-vel.json";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const settingsClassName = `${style.page} ${settings.darkMode ? style.dark : ""}`;

  return (
    <div className={settingsClassName}>
      <MenuLateral pagina="Configuracao" />

      <main className={style.content}>
        <header className={style.hero}>
          <div>
            <h1>Configuracoes da conta</h1>
            <p>Gerencie preferenicas locais, seguranca e dados de acesso em um unico lugar.</p>
            <small>
              Conta atual: <strong>{accountLabel}</strong>
            </small>
          </div>
          <div className={style.heroActions}>
            <button type="button" className={style.ghostButton} onClick={loadProfile} disabled={loadingProfile}>
              <LuRefreshCcw />
              Atualizar dados
            </button>
            <button type="button" className={style.primaryButton} onClick={handleExportSettings}>
              <LuSave />
              Exportar preferencias
            </button>
          </div>
        </header>

        <section className={style.grid}>
          <article className={style.card}>
            <div className={style.cardHeader}>
              <h2>
                <GoBell />
                Preferencias
              </h2>
              <button type="button" className={style.textButton} onClick={handleResetSettings}>
                Restaurar padrao
              </button>
            </div>

            <div className={style.preferenceList}>
              <label className={style.preferenceRow}>
                <div>
                  <strong>
                    <LuMoon />
                    Tema escuro
                  </strong>
                  <span>Aplica um visual com contraste maior nesta area.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleToggleSetting("darkMode")}
                />
              </label>

              <label className={style.preferenceRow}>
                <div>
                  <strong>
                    <GoBell />
                    Notificacoes internas
                  </strong>
                  <span>Exibe alertas da aplicacao para eventos importantes.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleToggleSetting("notifications")}
                />
              </label>

              <label className={style.preferenceRow}>
                <div>
                  <strong>
                    <MdPrivacyTip />
                    Emails promocionais
                  </strong>
                  <span>Receber comunicacoes de recursos e novidades da plataforma.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.marketingEmails}
                  onChange={() => handleToggleSetting("marketingEmails")}
                />
              </label>

              <label className={style.selectRow}>
                <strong>
                  <MdLanguage />
                  Idioma preferido
                </strong>
                <select value={settings.language} onChange={handleLanguageChange}>
                  <option value="pt-BR">Portugues (Brasil)</option>
                  <option value="en-US">English (US)</option>
                </select>
              </label>
            </div>
          </article>

          <article className={style.card}>
            <div className={style.cardHeader}>
              <h2>
                <LuShieldCheck />
                Perfil da conta
              </h2>
              <small>{loadingProfile ? "Carregando..." : "Atualize seus dados cadastrais."}</small>
            </div>

            <div className={style.formGrid}>
              <label>
                Nome
                <input
                  type="text"
                  name="name"
                  value={profileDraft.name}
                  onChange={handleProfileFieldChange}
                  placeholder="Nome responsavel"
                  disabled={loadingProfile}
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={profileDraft.email}
                  onChange={handleProfileFieldChange}
                  placeholder="email@empresa.com"
                  disabled={loadingProfile}
                />
              </label>

              <label>
                Telefone
                <input
                  type="tel"
                  name="phone"
                  value={profileDraft.phone}
                  onChange={handleProfileFieldChange}
                  placeholder="(11) 99999-9999"
                  maxLength={16}
                  disabled={loadingProfile}
                />
              </label>

              {isOwner ? (
                <label>
                  Endereco
                  <input
                    type="text"
                    name="address"
                    value={profileDraft.address}
                    onChange={handleProfileFieldChange}
                    placeholder="Rua, numero e bairro"
                    disabled={loadingProfile}
                  />
                </label>
              ) : null}
            </div>

            <div className={style.cardActions}>
              <button type="button" className={style.primaryButton} onClick={handleSaveProfile} disabled={savingProfile || loadingProfile}>
                <LuCheck />
                {savingProfile ? "Salvando..." : "Salvar dados"}
              </button>
              <button type="button" className={style.ghostButton} onClick={loadProfile} disabled={loadingProfile}>
                Recarregar
              </button>
            </div>

            {lastSavedAt ? (
              <p className={style.metaText}>
                Ultima alteracao salva as {lastSavedAt.toLocaleTimeString("pt-BR")}.
              </p>
            ) : null}
          </article>
        </section>

        <section className={style.grid}>
          <article className={style.card}>
            <div className={style.cardHeader}>
              <h2>
                <MdOutlinePassword />
                Seguranca
              </h2>
              <small>Defina uma nova senha para a sua conta.</small>
            </div>

            <div className={style.formGrid}>
              <label>
                Nova senha
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordFieldChange}
                  placeholder="Minimo de 6 caracteres"
                />
              </label>
              <label>
                Confirmar senha
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordFieldChange}
                  placeholder="Repita a senha"
                />
              </label>
            </div>

            <div className={style.cardActions}>
              <button type="button" className={style.primaryButton} onClick={handleSavePassword} disabled={savingPassword || loadingProfile}>
                {savingPassword ? "Atualizando..." : "Atualizar senha"}
              </button>
            </div>
          </article>

          <article className={style.card}>
            <div className={style.cardHeader}>
              <h2>Acoes rapidas</h2>
              <small>Atalhos para documentos e suporte.</small>
            </div>

            <div className={style.quickActions}>
              <button type="button" onClick={() => navigate("/privacidade")}>
                <MdPrivacyTip />
                Politica de privacidade
              </button>
              <button type="button" onClick={() => navigate("/termos")}>
                <IoDocumentTextOutline />
                Termos de uso
              </button>
              <button type="button" onClick={() => window.location.assign("mailto:suporte@virtualeasylog.com.br")}>
                <PiPhoneCallLight />
                Contatar suporte
              </button>
              {isOwner ? (
                <button type="button" onClick={() => navigate("/perfilempresa")}>
                  <LuShieldCheck />
                  Ver perfil da empresa
                </button>
              ) : (
                <button type="button" onClick={() => navigate("/atendente")}>
                  <LuShieldCheck />
                  Voltar para operacao
                </button>
              )}
            </div>

            <button type="button" className={style.logoutButton} onClick={handleLogout}>
              <LuLogOut />
              Encerrar sessao
            </button>
          </article>
        </section>
      </main>
    </div>
  );
}
