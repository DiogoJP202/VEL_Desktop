export const AUTH_ROLE = {
  OWNER: "OWNER",
  ATTENDANT: "ATTENDANT",
};

export function getStoredToken() {
  return localStorage.getItem("AuthToken");
}

export function getStoredUserId() {
  const raw = localStorage.getItem("User");
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getStoredToken());
}

export function hasUserContext() {
  return getStoredUserId() !== null;
}

export function getAuthRole() {
  return localStorage.getItem("AuthRole");
}

export function setAuthRole(role) {
  localStorage.setItem("AuthRole", role);
}

export function hasCompleteSession() {
  return isAuthenticated() && hasUserContext() && Boolean(getAuthRole());
}

export function setStoredSession({ token, userId, role }) {
  if (token) {
    localStorage.setItem("AuthToken", token);
  }
  if (userId !== undefined && userId !== null) {
    localStorage.setItem("User", JSON.stringify(userId));
  }
  if (role) {
    setAuthRole(role);
  }
}

export function logout() {
  localStorage.removeItem("AuthToken");
  localStorage.removeItem("User");
  localStorage.removeItem("AuthRole");
}
