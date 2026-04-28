import { apiUrl } from "./api";
import { getStoredToken, logout } from "./auth";

function getAuthHeader() {
  const token = getStoredToken();
  if (!token) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
}

export async function apiFetch(path, options = {}) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...(options.headers || {}),
  };

  const response = await fetch(apiUrl(path), {
    ...options,
    headers,
  });

  return response;
}

export async function apiFetchJson(path, options = {}) {
  const response = await apiFetch(path, options);
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (response.status === 401) {
    logout();
    sessionStorage.setItem("AuthNotice", "Sessao expirada. Faca login novamente.");
    window.location.assign("/login");
    const unauthorizedError = new Error("Sessao expirada. Faca login novamente.");
    unauthorizedError.status = 401;
    unauthorizedError.payload = payload;
    throw unauthorizedError;
  }

  if (!response.ok) {
    const message = payload?.message || "Erro ao comunicar com a API";
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}
