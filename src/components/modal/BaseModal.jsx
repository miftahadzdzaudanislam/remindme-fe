import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function BaseModal({
  open,
  onClose,
  onConfirm,
  title,
  icon: Icon,
  iconColor,
  confirmText,
  children,
  confirmButtonText = "Konfirmasi",
  confirmButtonColor = "bg-primary hover:bg-primary-hover",
  customError,
  onCloseCallback,
  isLoading = false,
}) {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setInputText("");
      setError("");
    }
  }, [open]);

  const handleConfirm = () => {
    if (confirmText && inputText !== confirmText) {
      setError(`Ketik "${confirmText}" untuk konfirmasi.`);
      return;
    }
    onConfirm();
  };

  const handleClose = () => {
    if (isLoading) return;
    onCloseCallback?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/50"
            onClick={handleClose}
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-full max-w-md rounded-xl bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6">
                <div className="flex items-center gap-3">
                  {Icon && <Icon className={`h-6 w-6 ${iconColor}`} />}
                  <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-4 space-y-4">
                {children}

                {confirmText && (
                  <>
                    <div className="text-xs text-gray-500">
                      Ketik <strong>{confirmText}</strong> untuk konfirmasi.
                    </div>
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={confirmText}
                      disabled={isLoading}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </>
                )}

                {(customError || error) && (
                  <p className="text-sm text-danger">{customError || error}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 px-6 py-4">
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className={`rounded-md px-4 py-2 text-sm text-white flex items-center justify-center gap-2 ${confirmButtonColor} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {confirmButtonText}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
