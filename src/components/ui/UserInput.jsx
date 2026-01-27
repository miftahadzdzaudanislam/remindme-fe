import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const UserInput = forwardRef(
  (
    {
      label,
      icon: Icon,
      as = "input",
      type = "text",
      options = [],
      color = "white",
      className = "",
      passwordSuffix = false,
      error,
      disabled = false,
      required,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password" && passwordSuffix;

    const leftPad = Icon ? "pl-11" : "pl-3";
    const rightPad = isPassword ? "pr-10" : "pr-3";
    const labelColor = color === "dark" ? "text-dark" : "text-white";

    const inputColor =
      color === "dark"
        ? "border-primary focus:ring-primary/40"
        : "border-white/40 focus:ring-light/50";

    const errorBorder = error ? "border-red-400" : "";
    const disabledStyle = disabled
      ? "cursor-not-allowed bg-white/50"
      : "bg-white/70";

    const inputClasses = `
    w-full rounded-lg border py-3 text-sm ${leftPad} ${rightPad}
    focus:outline-none focus:ring-2 transition ${className} ${inputColor} ${errorBorder} ${disabledStyle}
  `;

    return (
      <div>
        {label && (
          <label className={`mb-2 block text-sm font-medium ${labelColor}`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <Icon
              size={20}
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                disabled ? "text-gray-400" : "text-gray-500"
              }`}
            />
          )}

          {as === "select" ? (
            <select
              ref={ref}
              className={inputClasses}
              disabled={disabled}
              {...props}
            >
              {options.map((opt) => (
                <option key={opt.value ?? opt.label} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : as === "textarea" ? (
            <textarea
              ref={ref}
              className={inputClasses}
              rows={4}
              disabled={disabled}
              {...props}
            />
          ) : (
            <input
              ref={ref}
              type={isPassword && showPassword ? "text" : type}
              className={inputClasses}
              disabled={disabled}
              {...props}
            />
          )}

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className={`absolute right-3 top-1/2 -translate-y-1/2 align-middle ${
                disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      </div>
    );
  },
);

UserInput.displayName = "UserInput";

export default UserInput;
