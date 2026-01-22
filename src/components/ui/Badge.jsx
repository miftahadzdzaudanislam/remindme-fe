import { motion } from "framer-motion";

export default function Badge({
  value,
  variant = "default",
  size = "md",
}) {
  const variants = {
    default: "whitespace-nowrap rounded-full border bg-gray-100/40 font-medium text-light",
    success: "whitespace-nowrap rounded-full border bg-success/40 font-medium text-green-800",
    warning: "whitespace-nowrap rounded-full border bg-warning/40 font-medium text-yellow-800",
    danger: "whitespace-nowrap rounded-full border bg-danger/40 font-medium text-red-800",
    info: "whitespace-nowrap rounded-full border bg-info/40 font-medium text-indigo-800",
    primary: "whitespace-nowrap rounded-full border bg-primary/40 font-medium text-primary",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full font-medium ${variantClass} ${sizeClass}`}
    >
      {value}
    </motion.span>
  );
}