import Badge from "@/components/ui/Badge";
import { Heart } from "lucide-react";

export default function MainFooter() {
  return (
    <footer className="relative bg-primary text-light py-15 rounded-t-verybig overflow-hidden md:py-20">
      {/* DECORATION CIRCLES */}
      <div className="absolute left-20 -bottom-60 w-100 h-100 rounded-full border-2 border-white/20" />
      <div className="absolute left-35 -bottom-43 w-70 h-70 rounded-full border-3 border-white/20" />
      <div className="absolute left-50 -bottom-28 w-40 h-40 rounded-full border border-white/20" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-sm text-white/90 md:flex-row">
        <div>
          <span>Made with</span>{" "}
          <Heart size={16} className="text-red-500 fill-red-500 inline-block" />{" "}
          <span>
            by <span className="font-semibold">MiftahAdz</span>
          </span>
        </div>

        <Badge value={"RemindMe v2.0"} size="sm" className="md:basis-auto" />
      </div>
    </footer>
  );
}
