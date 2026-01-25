import BaseModal from "@/components/modal/BaseModal";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function DeleteUserModal({
  open,
  userName = "",
  onClose,
  onConfirm,
}) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setError("");
    }
  }, [open]);

  const handleConfirm = async () => {
    setIsLoading(true);
    setError("");
    try {
      await onConfirm();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Gagal menghapus user";

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
      title="Hapus User"
      icon={Trash2}
      iconColor="text-danger"
      confirmText="HAPUS PERMANEN"
      confirmButtonText={isLoading ? "Menghapus..." : "Hapus"}
      confirmButtonColor="bg-danger hover:bg-danger/90"
      customError={error}
      isLoading={isLoading}
      onCloseCallback={() => setError("")}
    >
      <p className="text-sm text-gray-600">
        Apakah Anda yakin ingin menghapus user{" "}
        <strong className="text-gray-900">{userName}</strong>?
      </p>
      <p className="text-sm text-danger font-medium">
        ⚠️ Tindakan ini tidak dapat dibatalkan!
      </p>
    </BaseModal>
  );
}
