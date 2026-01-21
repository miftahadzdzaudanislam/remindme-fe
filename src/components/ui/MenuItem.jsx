import { Link } from "react-router-dom";

export default function MenuItem({
  id,
  label,
  isActive,
  isMobile,
  scrolled,
  onClick,
}) {
  const baseClass = "transition cursor-pointer";

  const mobileClass = isMobile
    ? "block py-4 border-b border-gray-300"
    : "px-5 py-2 rounded-3xl";

  const isSpecial = label === "Home" && !scrolled;

  const stateClass = isSpecial
    ? "bg-light text-primary"
    : isActive
      ? "bg-primary text-white"
      : isMobile
        ? "text-primary hover:bg-gray-100"
        : scrolled
          ? "text-primary"
          : "text-light";

  return (
    <Link
      to="#"
      onClick={(e) => {
        e.preventDefault();
        onClick?.(id);
      }}
      className={`${baseClass} ${mobileClass} ${stateClass}`}
    >
      {label}
    </Link>
  );
}
