import { showToastError } from "./toast";

const ERROR_MESSAGES_BY_STATUS = {
  400: "Dados invalidos. Revise os campos e tente novamente.",
  401: "Sessao expirada. Faca login novamente.",
  403: "Voce nao tem permissao para executar esta acao.",
  404: "Recurso nao encontrado.",
  409: "Operacao em conflito com dados existentes.",
  500: "Erro interno do servidor. Tente novamente mais tarde.",
};

export function getApiErrorMessage(error, fallback = "Nao foi possivel concluir a operacao.") {
  if (!error) {
    return fallback;
  }

  if (error.payload?.message) {
    return error.payload.message;
  }

  if (error.message && !/^Status\s+\d{3}$/.test(error.message)) {
    return error.message;
  }

  if (error.status && ERROR_MESSAGES_BY_STATUS[error.status]) {
    return ERROR_MESSAGES_BY_STATUS[error.status];
  }

  return fallback;
}

export function notifyApiError(error, fallback) {
  showToastError(getApiErrorMessage(error, fallback));
}
