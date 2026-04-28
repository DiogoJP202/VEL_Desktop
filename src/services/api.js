const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8084";

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export { API_BASE_URL };
