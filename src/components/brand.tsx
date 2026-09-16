type BrandProps = {
  compact?: boolean;
  descriptor?: boolean;
};

export function Brand({ compact = false, descriptor = false }: BrandProps) {
  return (
    <span className="block min-w-0 text-[#171717]">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.25em]">Control</span>
      <span className={compact ? "mt-0.5 block text-[19px] font-medium leading-none tracking-[-0.05em]" : "mt-1 block text-[22px] font-medium leading-none tracking-[-0.05em]"}>Tower</span>
      {descriptor && <span className="mt-3 block text-[10px] uppercase tracking-[0.14em] text-[#777770]">Operations Intelligence</span>}
    </span>
  );
}
