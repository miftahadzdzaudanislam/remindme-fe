import BaseModal from "@/components/BaseModal_temp";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChangeStatusModal({
  open,
  onClose,
  onConfirm,
  currentStatus = "active",
}) {
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStatus(currentStatus);
    }
  }, [open, currentStatus]);

  const handleConfirm = () => {
    if (!status || status === currentStatus) {
      setError("Pilih status yang berbeda.");
      return;
    }
    onConfirm({ status });
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
      confirmButtonText="Ubah"
      confirmButtonColor="bg-warning hover:bg-warning-hover"
      customError={error}
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
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="suspended">Suspended</option>
      </select>
    </BaseModal>
  );
}
