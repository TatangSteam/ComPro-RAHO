/** Lightweight decorative background shared by the program and partner sections. */
export default function WellnessBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_5%,rgba(214,184,90,0.13),transparent_32%),radial-gradient(ellipse_at_100%_85%,rgba(214,184,90,0.10),transparent_30%),linear-gradient(180deg,#FBF8F1_0%,#FFFDFA_50%,#FBF8F1_100%)]" />
      <span className="absolute -left-24 top-10 h-48 w-48 rounded-full border border-[#D6B85A]/20 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.9),rgba(255,255,255,0.06)_60%,rgba(214,184,90,0.08))] shadow-[inset_3px_3px_16px_rgba(255,255,255,0.8)] sm:-left-20 sm:h-64 sm:w-64" />
      <span className="absolute -right-10 top-20 h-32 w-32 rounded-full border border-[#D6B85A]/20 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.85),transparent_65%)] sm:h-48 sm:w-48" />
      <span className="absolute -right-24 bottom-8 h-64 w-64 rounded-full border border-[#D6B85A]/15 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.7),transparent_60%)]" />
      <span className="absolute left-8 bottom-16 hidden h-14 w-14 rounded-full border border-white/90 bg-white/20 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.8)] sm:block" />
    </div>
  );
}
