import type { Invitation } from "@/lib/data/invitations";
import { copyJa } from "@/lib/copy/ja";

type HeroSectionProps = {
  invitation: Invitation;
  eventDate: string;
  heroSlogan: string;
};

export default function HeroSection({
  invitation,
  eventDate,
  heroSlogan,
}: HeroSectionProps) {
  return (
    <section className="fade-in space-y-5 rounded-3xl border border-black/5 bg-white/70 p-6">
      <div
        className="relative h-56 overflow-hidden rounded-2xl bg-ink/5"
        style={{
          backgroundImage: `linear-gradient(140deg, rgba(255,255,255,0.2), rgba(0,0,0,0.35)), url(${invitation.heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Wedding Invitation
          </p>
          <h1 className="text-2xl font-semibold">
            {invitation.brideName} & {invitation.groomName}
          </h1>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-ink/70">{copyJa.headerMain.title}</p>
        <p className="text-sm text-ink/70">{copyJa.headerMain.sub}</p>
        <p className="text-sm text-ink/60">{heroSlogan}</p>
        <p className="text-sm text-ink/70">{eventDate}</p>
        <p className="text-sm text-ink/70">{invitation.venueName}</p>
      </div>
    </section>
  );
}
