export function AdSlot({ label = "AdSense" }: { label?: string }) {
  return (
    <div className="grid min-h-24 place-items-center rounded-lg border border-dashed border-white/12 bg-white/[0.025] text-xs font-bold uppercase tracking-wide text-white/32">
      {label}
    </div>
  );
}
