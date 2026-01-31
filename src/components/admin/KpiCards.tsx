import type { RSVP } from "@/lib/data/rsvps";

function countAllergy(rsvps: RSVP[]) {
  return rsvps.filter((item) => item.allergyText.trim().length > 0).length;
}

type KpiCardsProps = {
  rsvps: RSVP[];
  labels: {
    total: string;
    attend: string;
    decline: string;
    allergy: string;
  };
};

export default function KpiCards({ rsvps, labels }: KpiCardsProps) {
  const total = rsvps.length;
  const attending = rsvps.filter((item) => item.attendance === "attend").length;
  const declined = rsvps.filter((item) => item.attendance === "decline").length;
  const allergy = countAllergy(rsvps);

  const cards = [
    { label: labels.total, value: total },
    { label: labels.attend, value: attending },
    { label: labels.decline, value: declined },
    { label: labels.allergy, value: allergy },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-black/5 bg-white/70 p-4"
        >
          <p className="text-xs text-ink/50">{card.label}</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
