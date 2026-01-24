import axios from "axios";

const url = "http://127.0.0.1:8000/api";

// State untuk prevent multiple refresh calls
let isRefreshing = false;
let failedQueue = [];

// ============================================================================
// API INSTANCE
// ============================================================================
const API = axios.create({ baseURL: url });

// ============================================================================
// REQUEST INTERCEPTOR: Auto attach token
// ============================================================================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ============================================================================
// RESPONSE INTERCEPTOR: Handle errors
// ============================================================================
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Jangan handle 401/403/422 untuk endpoint login & register
    const isAuthEndpoint =
      error.config?.url?.includes("/login") ||
      error.config?.url?.includes("/register");

    if (isAuthEndpoint) {
      logError(error);
      return Promise.reject(error);
    }

    // Handle 401 hanya untuk authenticated routes
    if (error.response?.status === 401) {
      return handleTokenExpired(error);
    }

    logError(error);
    return Promise.reject(error);
  },
);

// ============================================================================
// HANDLE 401: Token Expired
// ============================================================================
async function handleTokenExpired(error) {
  const request = error.config;

  // Jangan retry lebih dari 1x
  if (request._retry) return Promise.reject(error);
  request._retry = true;

  // Jika sedang refresh → antri
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then((token) => {
      request.headers.Authorization = `Bearer ${token}`;
      return API(request);
    });
  }

  // Mulai refresh
  isRefreshing = true;

  try {
    const newToken = await refreshToken();
    localStorage.setItem("authToken", newToken);

    // Resolve semua request yang antri
    failedQueue.forEach((p) => p.resolve(newToken));
    failedQueue = [];

    // Retry request
    request.headers.Authorization = `Bearer ${newToken}`;
    return API(request);
  } catch (err) {
    // Reject semua request yang antri
    failedQueue.forEach((p) => p.reject(err));
    failedQueue = [];

    // Logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.location.href = "/login";

    return Promise.reject(err);
  } finally {
    isRefreshing = false;
  }
}

// ============================================================================
// REFRESH TOKEN: Get new token from server
// ============================================================================
async function refreshToken() {
  const oldToken = localStorage.getItem("authToken");

  const { data } = await axios.post(
    `${url}/refresh-token`,
    {},
    { headers: { Authorization: `Bearer ${oldToken}` } },
  );

  const newToken = data?.data?.token;
  if (!newToken) throw new Error("Token tidak ditemukan");

  return newToken;
}

// ============================================================================
// ERROR LOGGER
// ============================================================================
function logError(error) {
  if (error.response) {
    // Error dari server
    const { status, data } = error.response;
    console.error(`❌ [${status}]`, data?.message || "Server error");
  } else if (error.request) {
    // Network error
    console.error("❌ Network error - Cek koneksi internet");
  } else {
    // Request setup error
    console.error("❌", error.message);
  }
}

export default API;
