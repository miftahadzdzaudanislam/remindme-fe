import BaseModal from "@/components/modal/BaseModal";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChangeStatusModal({
  open,
  currentStatus = "active",
  onClose,
  onConfirm,
}) {
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setStatus(currentStatus);
      setError("");
    }
  }, [open, currentStatus]);

  const handleConfirm = async () => {
    if (!status || status === currentStatus) {
      setError("Pilih status yang berbeda.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await onConfirm({ status });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal mengubah status";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Ubah Status User"
      icon={AlertTriangle}
      iconColor="text-warning"
      confirmText="UBAH STATUS"
      confirmButtonText={isLoading ? "Menyimpan..." : "Ubah"}
      confirmButtonColor="bg-warning hover:bg-warning-hover"
      customError={error}
      isLoading={isLoading}
      onCloseCallback={() => setError("")}
    >
      <p className="text-sm text-gray-600">
        Pilih status yang diinginkan untuk user ini.
      </p>
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setError("");
        }}
        disabled={isLoading}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="active">✅ Active</option>
        <option value="inactive">⏸️ Inactive</option>
        <option value="suspended">🚫 Suspended</option>
      </select>
    </BaseModal>
  );
}
