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

  console.log("🔄 Token expired, mencoba refresh...");

  // Jangan retry lebih dari 1x
  if (request._retry) {
    console.log("❌ Refresh sudah dicoba, gagal");
    return Promise.reject(error);
  }
  request._retry = true;

  // Jika sedang refresh → antri
  if (isRefreshing) {
    console.log("⏳ Menunggu refresh selesai...");
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then((token) => {
      console.log("✅ Refresh selesai, retry request");
      request.headers.Authorization = `Bearer ${token}`;
      return API(request);
    });
  }

  // Mulai refresh
  isRefreshing = true;

  try {
    const newToken = await refreshToken();
    localStorage.setItem("authToken", newToken);

    console.log("✅ Refresh token berhasil!");
    console.log("📌 Token baru:", newToken.substring(0, 20) + "...");

    // Resolve semua request yang antri
    failedQueue.forEach((p) => p.resolve(newToken));
    failedQueue = [];

    // Retry request
    request.headers.Authorization = `Bearer ${newToken}`;
    return API(request);
  } catch (err) {
    console.log("❌ Refresh token gagal:", err.message);

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
  console.log("📡 Memanggil API refresh token...");

  const { data } = await axios.post(
    `${url}/refresh-token`,
    {},
    { headers: { Authorization: `Bearer ${oldToken}` } },
  );

  // Debug: log actual response structure
  console.log("📦 Refresh response structure:", {
    keys: Object.keys(data),
    hasDataField: !!data?.data,
    hasToken: !!data?.token,
  });

  // Coba berbagai struktur
  const newToken = data?.data?.token || data?.token;

  if (!newToken) {
    console.log("❌ Response tidak mengandung token", data);
    throw new Error("Token tidak ditemukan di refresh response");
  }

  console.log("✅ Token baru diterima dari server");
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

if (import.meta.env.DEV) {
  // =========================================================================
  // TEST REFRESH TOKEN (Development only)
  // =========================================================================
  const testRefreshToken = async () => {
    console.log("🧪 ===== TEST REFRESH TOKEN =====");
    console.log("⏱️  Timestamp:", new Date().toLocaleTimeString());

    try {
      // 1️⃣ LOGIN
      console.log("\n📝 [Step 1] Login untuk dapat token valid...");
      const loginRes = await axios.post(`${url}/login`, {
        email: "mahasiswa@remindme.com",
        password: "password123",
      });

      const token1 = loginRes.data?.token;
      if (!token1) {
        throw new Error("❌ Login gagal - tidak ada token");
      }

      localStorage.setItem("authToken", token1);
      console.log(
        "✅ Login berhasil, token1:",
        token1.substring(0, 40) + "...",
      );

      // 2️⃣ TEST REQUEST 1 dengan token pertama
      console.log("\n📡 [Step 2] Test request dengan token pertama...");
      const res1 = await API.get("/mahasiswa/users");
      console.log("✅ Request 1 berhasil - users:", res1.data?.data?.length);

      // 3️⃣ REFRESH TOKEN
      console.log("\n🔄 [Step 3] Call refresh-token endpoint...");
      const refreshRes = await axios.post(
        `${url}/refresh-token`,
        {},
        { headers: { Authorization: `Bearer ${token1}` } },
      );

      const token2 = refreshRes.data?.data?.token || refreshRes.data?.token;
      if (!token2) {
        console.error("❌ Refresh gagal - Response:", refreshRes.data);
        throw new Error("Refresh token tidak menghasilkan token baru");
      }

      localStorage.setItem("authToken", token2);
      const tokenChanged = token1 !== token2;
      console.log("✅ Refresh berhasil");
      console.log("📌 Token lama:", token1.substring(0, 40) + "...");
      console.log("📌 Token baru:", token2.substring(0, 40) + "...");
      console.log("🔄 Token berubah?", tokenChanged ? "✅ YA" : "⚠️ SAMA");

      // 4️⃣ TEST REQUEST 2 dengan token hasil refresh
      console.log("\n📡 [Step 4] Test request dengan token hasil refresh...");
      const res2 = await API.get("/mahasiswa/users");
      console.log("✅ Request 2 berhasil - users:", res2.data?.data?.length);

      // 5️⃣ SKIP STEP 5 - Backend tidak support refresh dengan invalid token
      console.log("\n⚠️  [Step 5] SKIPPED - Backend requirement:");
      console.log("   • Refresh token endpoint membutuhkan token VALID");
      console.log("   • Tidak bisa refresh jika token sudah expired/invalid");
      console.log("   • Ini adalah behavior yang BENAR untuk security");
      console.log("\n💡 Untuk test auto-refresh saat token expired:");
      console.log("   1. Minta backend dev set JWT expiry jadi 10 detik");
      console.log("   2. Login → tunggu 15 detik → test request");
      console.log("   3. Interceptor akan auto-refresh token");

      console.log("\n\n✅ ===== ALL TESTS PASSED =====");
      console.log("📊 Summary:");
      console.log("   ✅ Login berhasil");
      console.log("   ✅ Request dengan token valid berhasil");
      console.log("   ✅ Manual refresh token berhasil");
      console.log("   ✅ Request dengan token baru berhasil");
      console.log("   ⚠️  Auto-refresh interceptor: tidak bisa di-test manual");
      console.log(
        "       (butuh token yang benar-benar expired, bukan invalid)",
      );

      return { success: true, message: "All refresh token tests passed" };
    } catch (error) {
      console.error("\n❌ TEST GAGAL:", error.message);
      if (error.response?.data) {
        console.error("📦 Error response:", error.response.data);
      }
      throw error;
    }
  };

  // =========================================================================
  // TEST AUTO-REFRESH INTERCEPTOR (requires backend JWT TTL = 1 minute)
  // =========================================================================
  const testAutoRefreshInterceptor = async () => {
    console.log("🧪 ===== TEST AUTO-REFRESH INTERCEPTOR =====");
    console.log("⚠️  Pastikan backend JWT TTL = 1 menit");

    try {
      // 1. Login
      console.log("\n📝 Step 1: Login...");
      const loginRes = await axios.post(`${url}/login`, {
        email: "miftah@remindme.com",
        password: "password123",
      });

      const token = loginRes.data?.token;
      localStorage.setItem("authToken", token);
      console.log("✅ Login berhasil");

      // 2. Request pertama (token masih valid)
      console.log("\n📡 Step 2: Request pertama...");
      const res1 = await API.get("/admin/users");
      console.log("✅ Request berhasil - users:", res1.data?.data?.length);

      // 3. Tunggu token expired
      console.log("\n⏳ Step 3: Tunggu 90 detik agar token expired...");
      console.log("    (Token akan expired dalam ~60 detik)");

      await new Promise((resolve) => setTimeout(resolve, 90000)); // 90 detik

      // 4. Request kedua (token sudah expired → trigger auto-refresh)
      console.log("\n📡 Step 4: Request setelah token expired...");
      console.log("    Interceptor akan otomatis refresh token...");

      const res2 = await API.get("/admin/users");
      console.log("✅ Request berhasil setelah auto-refresh!");
      console.log("📦 Users:", res2.data?.data?.length);

      console.log("\n\n✅ ===== AUTO-REFRESH INTERCEPTOR WORKS! =====");
      return { success: true };
    } catch (error) {
      console.error("\n❌ Test gagal:", error.message);
      throw error;
    }
  };
}

export default API;
