import { copyJa } from "@/lib/copy/ja";

type InfoCardsProps = {
  dateTimeLabel: string;
  venueName: string;
  venueAddress: string;
};

export default function InfoCards({
  dateTimeLabel,
  venueName,
  venueAddress,
}: InfoCardsProps) {
  const items = [
    { label: copyJa.infoLabels.dateTime, value: dateTimeLabel },
    { label: copyJa.infoLabels.venue, value: venueName },
    { label: copyJa.infoLabels.address, value: venueAddress },
  ];

  return (
    <section className="fade-in mt-6 grid gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between rounded-2xl border border-black/5 bg-white/70 px-4 py-3 text-sm"
        >
          <span className="text-ink/60">{item.label}</span>
          <span className="text-ink">{item.value}</span>
        </div>
      ))}
    </section>
  );
}
