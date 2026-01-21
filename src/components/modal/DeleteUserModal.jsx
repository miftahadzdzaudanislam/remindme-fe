import BaseModal from "@/components/modal/BaseModal";
import { AlertOctagon } from "lucide-react";

export default function DeleteUserModal({ open, onClose, onConfirm }) {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Hapus User?"
      icon={AlertOctagon}
      iconColor="text-danger"
      confirmText="HAPUS PERMANEN"
      confirmButtonText="Ya, Hapus!"
      confirmButtonColor="bg-danger hover:bg-danger-hover"
    >
      <p className="text-sm font-semibold text-danger">
        ⚠️ Aksi ini tidak bisa dibatalkan!
      </p>
      <p className="text-sm text-gray-600">
        Aksi ini akan menghapus user beserta data terkait seperti mata kuliah
        dan tugas secara <strong>permanen</strong> dari sistem.
      </p>
    </BaseModal>
  );
}
