import { motion } from "framer-motion";

export default function StatCard({
  icon: Icon,
  title,
  value,
  color,
  children,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeIn" }}
      className={`rounded-2xl border p-5 shadow-md ${color}`}
    >
      <div className="mb-3 flex items-center gap-3">
        {Icon && <Icon className="h-6 w-6" />}
        <h2 className="text-md font-semibold">{title}</h2>
      </div>

      {value && <p className="text-3xl font-bold mb-2">{value}</p>}

      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
}
