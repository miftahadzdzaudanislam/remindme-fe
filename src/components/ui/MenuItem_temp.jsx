import { Link } from "react-router-dom";

export default function MenuItem({
  id,
  label,
  isActive,
  isMobile,
  scrolled,
  onClick,
}) {
  return (
    <Link
      to="#"
      onClick={(e) => {
        e.preventDefault();
        onClick?.(id);
      }}
      className={`${
        isMobile
          ? "block py-4 border-b border-gray-300"
          : "px-5 py-2 rounded-3xl"
      } transition cursor-pointer ${
        isActive
          ? "bg-primary text-white"
          : isMobile
            ? "text-primary hover:bg-gray-100"
            : scrolled
              ? "text-primary"
              : "text-light"
      }`}
    >
      {label}
    </Link>
  );
}
