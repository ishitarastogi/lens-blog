
export const setAuthenticationToken = async (_a) => {
  if (typeof window !== "undefined") {
    let token=_a.token
    sessionStorage.setItem("access_token", token.accessToken);
    sessionStorage.setItem("refresh_token", token.refreshToken);
    return;
  }
};

export const getAuthenticationToken = () => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("access_token");
    return token;
  }
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("refresh_token");
    return token;
  }
};

export const removeAuthenticationToken = async () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.clear();
  }
};