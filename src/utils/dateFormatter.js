export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const formatMonthYear = (date) => {
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
  });
};

export const getTodayIndonesian = () => {
  return new Date()
    .toLocaleDateString("id-ID", { weekday: "long" })
    .toLowerCase();
};

export const formatHours = (hours) => {
  if (!hours) return "-";
  // Jika format sudah HH:mm, return langsung
  if (/^\d{2}:\d{2}$/.test(hours)) return hours;
  // Jika format HH:mm:ss, ambil jam dan menit saja
  if (/^\d{2}:\d{2}:\d{2}$/.test(hours)) return hours.slice(0, 5);
  return hours;
}

export const toMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export const formatTimeAgo = (dateString) => {
  if (!dateString) return "-";
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // dalam detik

  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
  if (diff < 172800) return "Kemarin";
  if (diff < 2592000) return `${Math.floor(diff / 86400)} hari yang lalu`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} bulan yang lalu`;
  return `${Math.floor(diff / 31536000)} tahun yang lalu`;
};