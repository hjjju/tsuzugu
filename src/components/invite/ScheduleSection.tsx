import type { ScheduleItem } from "@/lib/data/invitations";

type ScheduleSectionProps = {
  scheduleItems: ScheduleItem[];
};

export default function ScheduleSection({ scheduleItems }: ScheduleSectionProps) {
  return (
    <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
      <h2 className="text-lg font-semibold text-ink">当日の流れ</h2>
      <div className="mt-4 space-y-3">
        {scheduleItems.map((item, index) => (
          <div key={`${item.time}-${index}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-accent" />
              {index < scheduleItems.length - 1 ? (
                <div className="h-full w-px bg-ink/10" />
              ) : null}
            </div>
            <div className="flex-1 rounded-2xl bg-white/70 px-4 py-3 text-sm">
              <p className="font-semibold text-ink">{item.time}</p>
              <p className="text-ink/70">{item.label}</p>
              {item.detail ? (
                <p className="text-xs text-ink/50">{item.detail}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
