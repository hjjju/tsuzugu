import type { Invitation } from "@/lib/data/invitations";

type InvitationSelectorProps = {
  invitations: Invitation[];
  selectedSlug: string;
  onChange: (slug: string) => void;
  label: string;
};

export default function InvitationSelector({
  invitations,
  selectedSlug,
  onChange,
  label,
}: InvitationSelectorProps) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/70 p-4">
      <label className="text-xs uppercase tracking-[0.2em] text-ink/50">
        {label}
      </label>
      <select
        className="mt-2 h-11 w-full rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
        value={selectedSlug}
        onChange={(event) => onChange(event.target.value)}
      >
        {invitations.map((invite) => (
          <option key={invite.slug} value={invite.slug}>
            {invite.brideName} & {invite.groomName}
          </option>
        ))}
      </select>
    </div>
  );
}
