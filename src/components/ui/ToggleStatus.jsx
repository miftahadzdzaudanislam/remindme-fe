export default function ToggleStatus({ is_done, onToggle, loading }) {
  return (
    <button
      onClick={onToggle}
      className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center cursor-pointer ${
        is_done ? "bg-success" : "bg-gray-300"
      }`}
      title={is_done ? "Tandai Pending" : "Tandai Selesai"}
      disabled={loading}
      style={{ padding: 0 }}
    >
      <span
        className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
          is_done ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}
