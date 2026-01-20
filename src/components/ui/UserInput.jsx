export default function InputFieldAuth({
  label,
  icon: Icon,
  children,
  type = "text",
  ...props
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        )}
        {children || (
          <input
            type={type}
            className="w-full pl-11 pr-10 py-3 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-light/50 transition"
            {...props}
          />
        )}
      </div>
    </div>
  );
}
