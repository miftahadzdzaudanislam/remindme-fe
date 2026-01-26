import BaseModal from "@/components/modal/BaseModal";
import { AlertOctagon } from "lucide-react";
import { useEffect, useState } from "react";

export default function DeleteModal({ open, onClose, onConfirm }) {
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
        err.response?.data?.message || err.message || "Gagal menghapus";

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
      title="Apakah anda yakin?"
      icon={AlertOctagon}
      iconColor="text-danger"
      confirmButtonText={isLoading ? "Menghapus..." : "Ya Hapus!"}
      confirmButtonColor="bg-danger hover:bg-danger-hover"
      customError={error}
      isLoading={isLoading}
      onCloseCallback={() => setError("")}
    >
      <p className="text-sm text-gray-600">
        Kamu tidak bisa mengembalikan ini!
      </p>
    </BaseModal>
  );
}
