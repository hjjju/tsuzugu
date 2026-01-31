import type { RSVP } from "@/lib/data/rsvps";

type FiltersState = {
  query: string;
  attendance: "all" | RSVP["attendance"];
  allergyOnly: boolean;
};

type FiltersBarProps = {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
};

export default function FiltersBar({ filters, onChange }: FiltersBarProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-black/5 bg-white/70 p-4">
      <input
        className="h-11 w-full rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
        placeholder="お名前 / ふりがなで検索"
        value={filters.query}
        onChange={(event) =>
          onChange({ ...filters, query: event.target.value })
        }
      />
      <div className="flex flex-wrap gap-2">
        {[
          { label: "すべて", value: "all" },
          { label: "出席", value: "attend" },
          { label: "欠席", value: "decline" },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() =>
              onChange({
                ...filters,
                attendance: item.value as FiltersState["attendance"],
              })
            }
            className={`h-9 rounded-full border px-4 text-xs transition-opacity duration-300 hover:opacity-80 ${
              filters.attendance === item.value
                ? "border-accent bg-accent/20 text-ink"
                : "border-ink/20 text-ink/60"
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange({ ...filters, allergyOnly: !filters.allergyOnly })
          }
          className={`h-9 rounded-full border px-4 text-xs transition-opacity duration-300 hover:opacity-80 ${
            filters.allergyOnly
              ? "border-accent bg-accent/20 text-ink"
              : "border-ink/20 text-ink/60"
          }`}
        >
          アレルギーのみ
        </button>
      </div>
    </div>
  );
}
