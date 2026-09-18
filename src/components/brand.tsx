type BrandProps = {
  compact?: boolean;
  descriptor?: boolean;
};

export function Brand({ compact = false, descriptor = false }: BrandProps) {
  return (
    <span className="block min-w-0 text-[#171717]">
      <span className={compact ? "block text-[19px] font-medium leading-none tracking-[-0.05em]" : "block text-[22px] font-medium leading-none tracking-[-0.05em]"}>CRM</span>
      {descriptor && <span className="mt-3 block text-[10px] uppercase tracking-[0.14em] text-[#777770]">Customer Relationship Management</span>}
    </span>
  );
}
