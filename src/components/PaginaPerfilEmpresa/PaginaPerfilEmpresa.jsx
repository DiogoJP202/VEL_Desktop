import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaBuilding,
  FaChartPie,
  FaCopy,
  FaFileContract,
  FaFloppyDisk,
  FaGear,
  FaPenToSquare,
  FaRotate,
  FaShieldHalved,
  FaXmark,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import MenuLateral from "../MenuLateral/MenuLateral.jsx";
import { Container } from "./perfil.ts";
import { useAuth } from "../../contexts/AuthContext";
import { apiFetchJson } from "../../services/httpClient";
import Http from "../RequisicaoHTTP/Http.jsx";
import DataState from "../DataState.jsx";
import { notifyApiError } from "../../services/uiFeedback";
import { showToastError, showToastInfo, showToastSuccess } from "../../services/toast";
import image from "../../assets/images/logoExemplo.png";
import {
  getCompanyProfileImage,
  prepareCompanyProfileImage,
  removeCompanyProfileImage,
  setCompanyProfileImage,
} from "../../services/companyBranding";

function formatCnpj(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length !== 14) {
    return String(value || "--");
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function applyPhoneMask(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getPlanoNome(plano) {
  if (!plano) {
    return "Nao informado";
  }

  if (typeof plano === "string") {
    return plano;
  }

  return plano.nomePlano || plano.nome || `Plano #${plano.id || "--"}`;
}

function formatDateTime(value) {
  if (!value) {
    return "--";
  }
  return value.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PerfilEmpresa() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const photoInputRef = useRef(null);

  const [perfil, setPerfil] = useState(null);
  const [formData, setFormData] = useState({
    proprietario: "",
    telefone: "",
    email: "",
    endereco: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoLoadError, setPhotoLoadError] = useState(false);

  const hidratarFormulario = useCallback((empresa) => {
    setFormData({
      proprietario: empresa?.proprietario || "",
      telefone: empresa?.telefone || "",
      email: empresa?.email || "",
      endereco: empresa?.endereco || "",
    });
  }, []);

  const carregarPerfil = useCallback(async () => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const resposta = await apiFetchJson(`/empresa/cnpj/${userId}`);
      setPerfil(resposta);
      hidratarFormulario(resposta);
      setUltimaAtualizacao(new Date());
    } catch (error) {
      setErrorMessage(error.message || "Nao foi possivel carregar o perfil.");
      notifyApiError(error, "Erro ao carregar o perfil da empresa.");
    } finally {
      setLoading(false);
    }
  }, [hidratarFormulario, userId]);

  useEffect(() => {
    carregarPerfil();
  }, [carregarPerfil]);

  const companyBrandingId = useMemo(
    () => String(perfil?.idCnpj || userId || "").trim(),
    [perfil?.idCnpj, userId],
  );

  useEffect(() => {
    if (!companyBrandingId) {
      setProfilePhoto(null);
      return;
    }

    const savedPhoto = getCompanyProfileImage(companyBrandingId);
    setProfilePhoto(savedPhoto);
    setPhotoLoadError(false);
  }, [companyBrandingId]);

  const preenchimento = useMemo(() => {
    const campos = [formData.proprietario, formData.telefone, formData.email, formData.endereco];
    const preenchidos = campos.filter((campo) => String(campo || "").trim().length > 0).length;
    const total = campos.length;

    return {
      preenchidos,
      total,
      percentual: Math.round((preenchidos / total) * 100),
    };
  }, [formData]);

  const iniciarEdicao = () => {
    if (!perfil) {
      return;
    }
    hidratarFormulario(perfil);
    setIsEditing(true);
  };

  const cancelarEdicao = () => {
    hidratarFormulario(perfil);
    setIsEditing(false);
  };

  const copiarCnpj = async () => {
    if (!perfil?.idCnpj || !navigator?.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(String(perfil.idCnpj));
    showToastInfo("CNPJ copiado para a area de transferencia.");
  };

  const abrirSeletorFoto = () => {
    photoInputRef.current?.click();
  };

  const notificarAlteracaoFoto = useCallback((companyId) => {
    if (typeof window === "undefined") {
      return;
    }
    window.dispatchEvent(
      new CustomEvent("vel-company-photo-updated", {
        detail: { companyId: String(companyId || "") },
      }),
    );
  }, []);

  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !companyBrandingId) {
      return;
    }

    try {
      setIsUpdatingPhoto(true);
      const imageDataUrl = await prepareCompanyProfileImage(file);
      setCompanyProfileImage(companyBrandingId, imageDataUrl);
      setProfilePhoto(imageDataUrl);
      setPhotoLoadError(false);
      notificarAlteracaoFoto(companyBrandingId);
      showToastSuccess("Foto de perfil atualizada com sucesso.");
    } catch (error) {
      showToastError(error.message || "Nao foi possivel atualizar a foto.");
    } finally {
      setIsUpdatingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    if (!companyBrandingId) {
      return;
    }
    removeCompanyProfileImage(companyBrandingId);
    setProfilePhoto(null);
    setPhotoLoadError(false);
    notificarAlteracaoFoto(companyBrandingId);
    showToastInfo("Foto de perfil removida.");
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    if (id === "telefone") {
      setFormData((current) => ({ ...current, telefone: applyPhoneMask(value) }));
      return;
    }

    setFormData((current) => ({ ...current, [id]: value }));
  };

  const salvarEdicao = async (event) => {
    event.preventDefault();

    if (!perfil) {
      return;
    }

    const payload = {
      ...perfil,
      idCnpj: String(perfil.idCnpj || userId),
      proprietario: formData.proprietario.trim(),
      telefone: formData.telefone.trim(),
      email: formData.email.trim().toLowerCase(),
      endereco: formData.endereco.trim(),
    };

    try {
      setIsSaving(true);
      await apiFetchJson("/empresa/editar", Http("PUT", payload));
      setPerfil((current) => ({
        ...(current || {}),
        ...payload,
      }));
      setUltimaAtualizacao(new Date());
      setIsEditing(false);
      showToastSuccess("Perfil da empresa atualizado com sucesso.");
    } catch (error) {
      notifyApiError(error, "Erro ao salvar o perfil da empresa.");
    } finally {
      setIsSaving(false);
    }
  };

  const planoNome = getPlanoNome(perfil?.plano);

  return (
    <Container>
      <MenuLateral />

      <main className="perfilMain">
        <DataState
          loading={loading}
          error={errorMessage}
          empty={!loading && !errorMessage && !perfil}
          emptyMessage="Perfil da empresa nao encontrado."
          errorMessage="Nao foi possivel carregar o perfil da empresa."
          onRetry={carregarPerfil}
        />

        {!loading && !errorMessage && perfil ? (
          <section className="perfilGrid">
            <header className="heroCard">
              <div className="heroIdentity">
                <div className="avatar" aria-hidden>
                  <img
                    src={!photoLoadError && profilePhoto ? profilePhoto : image}
                    alt="Foto de perfil da empresa"
                    onError={() => setPhotoLoadError(true)}
                  />
                </div>
                <div className="heroText">
                  <h1>Perfil da empresa</h1>
                  <p>CNPJ: {formatCnpj(perfil.idCnpj)}</p>
                  <small>Ultima atualizacao: {formatDateTime(ultimaAtualizacao)}</small>
                </div>
              </div>

              <div className="heroActions">
                <button type="button" className="ghost" onClick={carregarPerfil}>
                  <FaRotate aria-hidden />
                  Atualizar
                </button>
                <button type="button" className="ghost" onClick={abrirSeletorFoto} disabled={isUpdatingPhoto}>
                  <FaBuilding aria-hidden />
                  {isUpdatingPhoto ? "Atualizando foto..." : "Trocar foto"}
                </button>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="photoInputHidden"
                  onChange={handlePhotoChange}
                />
                {profilePhoto ? (
                  <button type="button" className="ghost" onClick={handleRemovePhoto} disabled={isUpdatingPhoto}>
                    <FaXmark aria-hidden />
                    Remover foto
                  </button>
                ) : null}
                <button type="button" className="ghost" onClick={copiarCnpj}>
                  <FaCopy aria-hidden />
                  Copiar CNPJ
                </button>
                <button type="button" className="ghost" onClick={() => navigate("/contratoempregador") }>
                  <FaFileContract aria-hidden />
                  Contratos
                </button>
                <button type="button" className="ghost" onClick={() => navigate("/configuracao") }>
                  <FaGear aria-hidden />
                  Configuracao
                </button>
              </div>
            </header>

            <article className="statsCard blue">
              <header>
                <span>Plano atual</span>
                <FaChartPie aria-hidden />
              </header>
              <strong>{planoNome}</strong>
              <small>Modelo contratado para operacao da conta.</small>
            </article>

            <article className="statsCard green">
              <header>
                <span>Cadastro completo</span>
                <FaShieldHalved aria-hidden />
              </header>
              <strong>{preenchimento.percentual}%</strong>
              <small>
                {preenchimento.preenchidos}/{preenchimento.total} campos principais preenchidos.
              </small>
            </article>

            <article className="statsCard orange">
              <header>
                <span>Coordenador vinculado</span>
                <FaBuilding aria-hidden />
              </header>
              <strong>{perfil.idCpfCoord || "Nao vinculado"}</strong>
              <small>CPF do coordenador principal da empresa.</small>
            </article>

            <article className="panel profilePanel">
              <div className="panelHead">
                <h2>Dados da empresa</h2>
                <div className="panelActions">
                  {!isEditing ? (
                    <button type="button" className="primary" onClick={iniciarEdicao}>
                      <FaPenToSquare aria-hidden />
                      Editar perfil
                    </button>
                  ) : (
                    <>
                      <button type="button" className="ghost" onClick={cancelarEdicao} disabled={isSaving}>
                        <FaXmark aria-hidden />
                        Cancelar
                      </button>
                      <button type="submit" form="perfilEmpresaForm" className="primary" disabled={isSaving}>
                        <FaFloppyDisk aria-hidden />
                        {isSaving ? "Salvando..." : "Salvar"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {!isEditing ? (
                <div className="infoGrid">
                  <article>
                    <span>Responsavel</span>
                    <strong>{perfil.proprietario || "--"}</strong>
                  </article>
                  <article>
                    <span>Email</span>
                    <strong>{perfil.email || "--"}</strong>
                  </article>
                  <article>
                    <span>Telefone</span>
                    <strong>{perfil.telefone || "--"}</strong>
                  </article>
                  <article>
                    <span>Endereco</span>
                    <strong>{perfil.endereco || "--"}</strong>
                  </article>
                  <article>
                    <span>CNPJ</span>
                    <strong>{formatCnpj(perfil.idCnpj)}</strong>
                  </article>
                  <article>
                    <span>ID contrato</span>
                    <strong>{perfil.idContrato || "--"}</strong>
                  </article>
                </div>
              ) : (
                <form id="perfilEmpresaForm" className="formGrid" onSubmit={salvarEdicao}>
                  <label htmlFor="proprietario">
                    Responsavel
                    <input
                      id="proprietario"
                      type="text"
                      value={formData.proprietario}
                      onChange={handleChange}
                      placeholder="Nome do responsavel"
                      required
                    />
                  </label>

                  <label htmlFor="email">
                    Email
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contato@empresa.com"
                      required
                    />
                  </label>

                  <label htmlFor="telefone">
                    Telefone
                    <input
                      id="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                    />
                  </label>

                  <label htmlFor="endereco">
                    Endereco
                    <input
                      id="endereco"
                      type="text"
                      value={formData.endereco}
                      onChange={handleChange}
                      placeholder="Rua, numero, bairro e cidade"
                    />
                  </label>

                  <label htmlFor="cnpj" className="readOnly">
                    CNPJ
                    <input id="cnpj" type="text" value={formatCnpj(perfil.idCnpj)} readOnly />
                  </label>

                  <label htmlFor="plano" className="readOnly">
                    Plano
                    <input id="plano" type="text" value={planoNome} readOnly />
                  </label>
                </form>
              )}
            </article>
          </section>
        ) : null}
      </main>
    </Container>
  );
}
