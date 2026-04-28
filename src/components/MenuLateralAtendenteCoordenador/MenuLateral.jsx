import image from "../../assets/images/logoExemplo.png";
import iconeCoordenadores from "../../assets/images/icons/Coordenadores.png";
import iconeConfiguracao from "../../assets/images/icons/Configura\u00E7\u00E3o.png";
import iconeMenu from "../../assets/images/icons/Menu.png";
import LogoVEL from "../../assets/images/VEL2.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "../MenuLateral/menulateralstyle.ts";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { AUTH_ROLE } from "../../services/auth";
import { apiFetchJson } from "../../services/httpClient";
import { showToastInfo } from "../../services/toast";
import { getCompanyProfileImage } from "../../services/companyBranding";

const STORAGE_KEY = "vel:sidebar:collapsed";
const MOBILE_QUERY = "(max-width: 920px)";

function getInitialCollapsedState() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

function doesPathMatch(currentPath, targetPath) {
  const current = currentPath.toLowerCase();
  const target = targetPath.toLowerCase();
  return current === target || current.startsWith(`${target}/`);
}

function formatCnpj(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length !== 14) {
    return String(value || "");
  }
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function getInitials(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "VE";
}

export default function MenuLateral({ pagina }) {
  const { logout, role, userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsedState);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia(MOBILE_QUERY).matches;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: "Empresa",
    subtitle: "Carregando...",
    cnpj: "",
    cnpjRaw: "",
    loading: true,
  });
  const [companyLogoSrc, setCompanyLogoSrc] = useState(image);

  const mainLinks = [
    { key: "Coordenadores", label: "Atribuir entrega", icon: iconeCoordenadores, path: "/atribuirentrega", iconAlt: "Icone de atribuir entrega" },
    { key: "Atendente", label: "Adicionar pedido", icon: iconeCoordenadores, path: "/atendente", iconAlt: "Icone de adicionar pedido" },
  ];

  const supportLinks = [
    { key: "Configuracao", label: "Configuracao", icon: iconeConfiguracao, path: "/configuracao", iconAlt: "Icone de configuracao" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const media = window.matchMedia(MOBILE_QUERY);
    const syncMedia = () => {
      setIsMobile(media.matches);
    };

    syncMedia();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", syncMedia);
      return () => media.removeEventListener("change", syncMedia);
    }

    media.addListener(syncMedia);
    return () => media.removeListener(syncMedia);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, isCollapsed ? "1" : "0");
  }, [isCollapsed]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    let active = true;

    async function loadCompanyInfo() {
      if (userId === null || userId === undefined) {
        if (active) {
          setCompanyInfo({
            name: "Empresa",
            subtitle: "Conta da equipe",
            cnpj: "",
            cnpjRaw: "",
            loading: false,
          });
        }
        return;
      }

      const roleLabel = role === AUTH_ROLE.OWNER ? "Conta proprietaria" : "Conta da equipe";

      try {
        let cnpj = role === AUTH_ROLE.OWNER ? String(userId) : "";
        if (!cnpj) {
          const coordenador = await apiFetchJson(`/coordenador/id/${userId}`);
          cnpj = String(coordenador?.idCnpj || "").trim();
        }

        if (!cnpj) {
          throw new Error("CNPJ nao encontrado");
        }

        const empresa = await apiFetchJson(`/empresa/cnpj/${cnpj}`);
        if (!active) {
          return;
        }

        setCompanyInfo({
          name: String(empresa?.proprietario || "Empresa"),
          subtitle: String(empresa?.email || roleLabel),
          cnpj: formatCnpj(cnpj),
          cnpjRaw: cnpj,
          loading: false,
        });
      } catch {
        if (!active) {
          return;
        }

        setCompanyInfo({
          name: "Empresa",
          subtitle: roleLabel,
          cnpj: "",
          cnpjRaw: "",
          loading: false,
        });
      }
    }

    setCompanyInfo((current) => ({ ...current, loading: true }));
    loadCompanyInfo();

    return () => {
      active = false;
    };
  }, [role, userId]);

  const companyInitials = useMemo(() => getInitials(companyInfo.name), [companyInfo.name]);
  const companyBrandingId = useMemo(
    () => String(companyInfo.cnpjRaw || "").trim(),
    [companyInfo.cnpjRaw],
  );

  useEffect(() => {
    const syncCompanyLogo = (targetCompanyId = "") => {
      if (!companyBrandingId) {
        setCompanyLogoSrc(image);
        setLogoError(false);
        return;
      }

      if (targetCompanyId && targetCompanyId !== companyBrandingId) {
        return;
      }

      const customImage = getCompanyProfileImage(companyBrandingId);
      setCompanyLogoSrc(customImage || image);
      setLogoError(false);
    };

    syncCompanyLogo();

    const handleCompanyPhotoUpdate = (event) => {
      const targetCompanyId = String(event?.detail?.companyId || "").trim();
      syncCompanyLogo(targetCompanyId);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("vel-company-photo-updated", handleCompanyPhotoUpdate);
      return () => window.removeEventListener("vel-company-photo-updated", handleCompanyPhotoUpdate);
    }

    return undefined;
  }, [companyBrandingId]);

  const isSelected = (link) => {
    if (doesPathMatch(location.pathname, link.path)) {
      return true;
    }
    return pagina === link.key;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleToggleMenu = () => {
    if (isMobile) {
      setIsMobileOpen(false);
      return;
    }
    setIsCollapsed((current) => !current);
  };

  const openMobileMenu = () => setIsMobileOpen(true);
  const closeMobileMenu = () => setIsMobileOpen(false);

  const handleCopyCnpj = async () => {
    if (!companyInfo.cnpj || !navigator?.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(companyInfo.cnpj);
      showToastInfo("CNPJ copiado.");
    } catch {
      // sem acao para navegadores sem permissao de clipboard
    }
  };

  const asideClasses = ["MenuLateral"];
  if (isCollapsed && !isMobile) {
    asideClasses.push("shrinkedAside");
  }
  if (isMobile) {
    asideClasses.push("mobileMode");
  }
  if (isMobileOpen) {
    asideClasses.push("mobileOpen");
  }

  const shellClasses = ["menuShell"];
  if (isCollapsed && !isMobile) {
    shellClasses.push("shrinkedAside");
  }
  if (isMobile) {
    shellClasses.push("mobileMode");
  }

  return (
    <Container>
      <div className={shellClasses.join(" ")}>
        {isMobile ? (
          <button
            type="button"
            className={`mobileMenuTrigger ${isMobileOpen ? "open" : ""}`}
            onClick={openMobileMenu}
            aria-label="Abrir menu lateral"
          >
            <img src={iconeMenu} alt="" />
            <span>Menu</span>
          </button>
        ) : null}

        {isMobile && isMobileOpen ? <button type="button" className="menuOverlay" onClick={closeMobileMenu} aria-label="Fechar menu" /> : null}

        <aside className={asideClasses.join(" ") }>
          <header className="menuHeader">
            <img src={LogoVEL} className="LogoVEL" alt="Logo VEL" />
            <button
              type="button"
              className={`ToggleButton ${isCollapsed ? "collapsed" : ""}`}
              onClick={handleToggleMenu}
              aria-label={isMobile ? "Fechar menu" : isCollapsed ? "Expandir menu" : "Recolher menu"}
            >
              <img src={iconeMenu} alt="" className={isCollapsed && !isMobile ? "flip" : ""} />
            </button>
          </header>

          <main>
            <div className="logoEmpresa">
              <div className="logoEmpresaHeader">
                <button type="button" className="logoEmpresaAvatarBtn" onClick={() => navigate("/perfilempresa")}>
                  {!logoError ? (
                    <img src={companyLogoSrc} alt="Logo da empresa" className="imgEmpresa" onError={() => setLogoError(true)} />
                  ) : (
                    <span className="imgEmpresaFallback">{companyInitials}</span>
                  )}
                </button>
                {!isCollapsed || isMobile ? (
                  <div className="logoEmpresaInfo">
                    <h2 className="nomeEmpresa">{companyInfo.loading ? "Carregando..." : companyInfo.name}</h2>
                    <p className="nomeEmpresaSub">{companyInfo.subtitle}</p>
                    {companyInfo.cnpj ? (
                      <button type="button" className="logoEmpresaMeta" onClick={handleCopyCnpj} title="Copiar CNPJ">
                        {companyInfo.cnpj}
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
              {!isCollapsed || isMobile ? (
                <button type="button" className="logoEmpresaAction" onClick={() => navigate("/perfilempresa")}>
                  Ver perfil da empresa
                </button>
              ) : null}
            </div>

            <nav aria-label="Navegacao principal">
              {!isCollapsed || isMobile ? <h3 className="menuSectionTitle">Principal</h3> : null}
              <ul className="menuList">
                {mainLinks.map((link) => {
                  const active = isSelected(link);
                  return (
                    <li className={active ? "pageSelected" : ""} key={link.key}>
                      <button
                        type="button"
                        onClick={() => navigate(link.path)}
                        title={isCollapsed && !isMobile ? link.label : undefined}
                        aria-current={active ? "page" : undefined}
                      >
                        <img src={link.icon} alt={link.iconAlt} />
                        {!isCollapsed || isMobile ? <span className="spanName">{link.label}</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </main>

          <footer>
            {!isCollapsed || isMobile ? <h3 className="menuSectionTitle">Conta</h3> : null}
            <ul className="menuList">
              {supportLinks.map((link) => {
                const active = isSelected(link);
                return (
                  <li className={active ? "pageSelected" : ""} key={link.key}>
                    <button
                      type="button"
                      onClick={() => navigate(link.path)}
                      title={isCollapsed && !isMobile ? link.label : undefined}
                      aria-current={active ? "page" : undefined}
                    >
                      <img src={link.icon} alt={link.iconAlt} />
                      {!isCollapsed || isMobile ? <span className="spanName">{link.label}</span> : null}
                    </button>
                  </li>
                );
              })}
              <li className="dangerAction">
                <button type="button" onClick={handleLogout} title={isCollapsed && !isMobile ? "Sair" : undefined}>
                  <img src={iconeConfiguracao} alt="Icone de sair" />
                  {!isCollapsed || isMobile ? <span className="spanName">Sair</span> : null}
                </button>
              </li>
            </ul>
          </footer>
        </aside>
      </div>
    </Container>
  );
}
