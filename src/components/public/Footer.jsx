export default function MainFooter() {
  return (
    <footer className="relative bg-primary text-light py-15 rounded-t-verybig overflow-hidden md:py-20">
      {/* DECORATION CIRCLES */}
      <div className="absolute left-20 -bottom-60 w-100 h-100 rounded-full border-2 border-white/20" />
      <div className="absolute left-35 -bottom-43 w-70 h-70 rounded-full border-3 border-white/20" />
      <div className="absolute left-50 -bottom-28 w-40 h-40 rounded-full border border-white/20" />

      {/* CONTENT */}
      <div className="relative z-10 text-center">
        Made with ♥️. By MiftahAdz
        <span className="ml-2 text-xs bg-white/10 px-2 py-1 rounded-full">RemindMe.v2</span>
      </div>
    </footer>
  );
}
