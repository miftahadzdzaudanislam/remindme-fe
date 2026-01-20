import BaseModal from "@/components/BaseModal";
import { AlertOctagon } from "lucide-react";

export default function DeleteModal({ open, onClose, onConfirm }) {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Apakah anda yakin?"
      icon={AlertOctagon}
      iconColor="text-danger"
      confirmButtonText="Ya, Hapus!"
      confirmButtonColor="bg-danger hover:bg-danger-hover"
    >
      <p className="text-sm text-gray-600">
        Kamu tidak bisa mengembalikan ini!
      </p>
    </BaseModal>
  );
}
