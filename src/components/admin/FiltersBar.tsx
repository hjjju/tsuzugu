import type { RSVP } from "@/lib/data/rsvps";

type FiltersState = {
  query: string;
  attendance: "all" | RSVP["attendance"];
  allergyOnly: boolean;
};

type FiltersBarProps = {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  labels: {
    placeholder: string;
    all: string;
    attend: string;
    decline: string;
    allergyOnly: string;
  };
};

export default function FiltersBar({ filters, onChange, labels }: FiltersBarProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-black/5 bg-white/70 p-4">
      <input
        className="h-11 w-full rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
        placeholder={labels.placeholder}
        value={filters.query}
        onChange={(event) =>
          onChange({ ...filters, query: event.target.value })
        }
      />
      <div className="flex flex-wrap gap-2">
        {[
          { label: labels.all, value: "all" },
          { label: labels.attend, value: "attend" },
          { label: labels.decline, value: "decline" },
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
          {labels.allergyOnly}
        </button>
      </div>
    </div>
  );
}
