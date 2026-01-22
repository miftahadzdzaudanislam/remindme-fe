import { Link } from "react-router-dom";

export default function MenuItem({
  id,
  label,
  isActive,
  isMobile = false,
  scrolled = false,
  onClick,
}) {
  const baseClass = `
    inline-flex items-center justify-center transition-all duration-300 ease-in-out transform cursor-pointer font-medium
  `;

  const mobileClass = isMobile
    ? "w-full py-4 border-b border-gray-300"
    : "px-5 py-2 rounded-3xl";

  const isSpecial = label === "Home" && !scrolled;

  const stateClass = isSpecial
    ? "bg-light text-primary"
    : isActive
      ? "bg-primary text-white"
      : isMobile
        ? "text-primary hover:bg-gray-100"
        : scrolled
          ? "text-primary hover:bg-primary/10"
          : "text-light hover:bg-white/10";

  const interactionClass = isMobile
    ? ""
    : "hover:scale-105 active:scale-95";

  return (
    <Link
      to="#"
      onClick={(e) => {
        e.preventDefault();
        onClick?.(id);
      }}
      className={`${baseClass} ${mobileClass} ${stateClass} ${interactionClass}`}
    >
      {label}
    </Link>
  );
}
