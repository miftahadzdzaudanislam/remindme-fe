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

export const formatJam = (jam) => {
  if (!jam) return "-";
  // Jika format sudah HH:mm, return langsung
  if (/^\d{2}:\d{2}$/.test(jam)) return jam;
  // Jika format HH:mm:ss, ambil jam dan menit saja
  if (/^\d{2}:\d{2}:\d{2}$/.test(jam)) return jam.slice(0, 5);
  return jam;
}

export const toMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};
