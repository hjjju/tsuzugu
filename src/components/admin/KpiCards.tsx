import type { RSVP } from "@/lib/data/rsvps";

function countAllergy(rsvps: RSVP[]) {
  return rsvps.filter((item) => item.allergyText.trim().length > 0).length;
}

type KpiCardsProps = {
  rsvps: RSVP[];
};

export default function KpiCards({ rsvps }: KpiCardsProps) {
  const total = rsvps.length;
  const attending = rsvps.filter((item) => item.attendance === "attend").length;
  const declined = rsvps.filter((item) => item.attendance === "decline").length;
  const allergy = countAllergy(rsvps);

  const cards = [
    { label: "総回答", value: total },
    { label: "出席", value: attending },
    { label: "欠席", value: declined },
    { label: "アレルギー", value: allergy },
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
