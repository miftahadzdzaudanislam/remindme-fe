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