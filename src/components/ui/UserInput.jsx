import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function UserInput({
  label,
  icon: Icon,
  as = "input", // "input" | "select" | "textarea"
  type = "text",
  options = [],
  color = "white",
  className = "",
  passwordSuffix = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password" && passwordSuffix;

  const leftPad = Icon ? "pl-11" : "pl-3";
  const rightPad = isPassword ? "pr-10" : "pr-3";
  const labelColor = color === "dark" ? "text-dark" : "text-white";

  const inputColor =
    color === "dark"
      ? "border-primary focus:ring-primary/40"
      : "border-white/40 focus:ring-light/50";

  const inputClasses = `
    w-full rounded-lg border bg-white/70 py-3 text-sm ${leftPad} ${rightPad}
    focus:outline-none focus:ring-2 transition ${className} ${inputColor}
  `;

  return (
    <div>
      {label && (
        <label className={`mb-2 block text-sm font-medium ${labelColor}`}>
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        )}

        {as === "select" ? (
          <select className={inputClasses} {...props}>
            {options.map((opt) => (
              <option key={opt.value ?? opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : as === "textarea" ? (
          <textarea className={inputClasses} rows={4} {...props} />
        ) : (
          <input
            type={isPassword && showPassword ? "text" : type}
            className={inputClasses}
            {...props}
          />
        )}

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 align-middle"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
