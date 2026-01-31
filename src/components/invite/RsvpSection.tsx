import { copyJa } from "@/lib/copy/ja";

export type RsvpFormState = {
  lastName: string;
  firstName: string;
  furigana: string;
  attendance: "attend" | "decline";
  guestsCount: number;
  allergyText: string;
  messageToCouple: string;
  email: string;
  phone?: string;
};

type RsvpSectionProps = {
  formState: RsvpFormState;
  maxGuests: number;
  submitMessage: string | null;
  qrToken: string | null;
  onChange: <K extends keyof RsvpFormState>(
    key: K,
    value: RsvpFormState[K]
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function RsvpSection({
  formState,
  maxGuests,
  submitMessage,
  qrToken,
  onChange,
  onSubmit,
}: RsvpSectionProps) {
  return (
    <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
      <h2 className="text-lg font-semibold text-ink">
        {copyJa.rsvp.sectionTitle}
      </h2>
      <p className="mt-2 text-sm text-ink/70">{copyJa.rsvp.deadline}</p>
      <form className="mt-4 space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <input
            className="h-11 rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
            placeholder={copyJa.rsvp.labels.lastName}
            value={formState.lastName}
            onChange={(event) => onChange("lastName", event.target.value)}
            required
          />
          <input
            className="h-11 rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
            placeholder={copyJa.rsvp.labels.firstName}
            value={formState.firstName}
            onChange={(event) => onChange("firstName", event.target.value)}
            required
          />
        </div>
        <input
          className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
          placeholder={copyJa.rsvp.labels.furigana}
          value={formState.furigana}
          onChange={(event) => onChange("furigana", event.target.value)}
          required
        />
        <input
          className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
          placeholder={copyJa.rsvp.labels.email}
          value={formState.email}
          onChange={(event) => onChange("email", event.target.value)}
          required
          type="email"
        />
        <input
          className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
          placeholder={copyJa.rsvp.labels.phone}
          value={formState.phone}
          onChange={(event) => onChange("phone", event.target.value)}
        />
        <div className="flex gap-2">
          {[
            { label: copyJa.rsvp.labels.attendanceAttend, value: "attend" },
            { label: copyJa.rsvp.labels.attendanceDecline, value: "decline" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onChange(
                  "attendance",
                  option.value as RsvpFormState["attendance"]
                )
              }
              className={`flex h-11 flex-1 items-center justify-center rounded-full border text-sm font-medium transition-opacity duration-300 hover:opacity-80 ${
                formState.attendance === option.value
                  ? "border-accent bg-accent/20 text-ink"
                  : "border-ink/20 text-ink/70"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">
            {copyJa.rsvp.labels.guests}
          </label>
          <div className="mt-2 grid grid-cols-6 gap-2">
            {Array.from({ length: maxGuests + 1 }).map((_, count) => (
              <button
                key={count}
                type="button"
                onClick={() => onChange("guestsCount", count)}
                className={`h-11 rounded-2xl border text-sm ${
                  formState.guestsCount === count
                    ? "border-accent bg-accent/20"
                    : "border-ink/15"
                } ${formState.attendance === "decline" ? "opacity-40" : ""}`}
                disabled={formState.attendance === "decline"}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">
            {copyJa.rsvp.labels.allergy}
          </label>
          <textarea
            className="min-h-[88px] w-full rounded-2xl border border-ink/15 bg-white/70 px-3 py-2 text-sm"
            value={formState.allergyText}
            onChange={(event) => onChange("allergyText", event.target.value)}
          />
          <p className="text-xs text-ink/50">{copyJa.rsvp.allergyNote}</p>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">
            {copyJa.rsvp.labels.message}
          </label>
          <textarea
            className="min-h-[88px] w-full rounded-2xl border border-ink/15 bg-white/70 px-3 py-2 text-sm"
            value={formState.messageToCouple}
            onChange={(event) =>
              onChange("messageToCouple", event.target.value)
            }
          />
        </div>
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80"
        >
          {copyJa.rsvp.submit}
        </button>
      </form>
      <p className="mt-3 text-xs text-ink/50">{copyJa.privacy.shortNotice}</p>
      {submitMessage ? (
        <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-ink">
          <p className="font-semibold">{copyJa.rsvp.thanksTitle}</p>
          <p className="mt-2 text-sm text-ink/70">{copyJa.rsvp.qrGuide}</p>
          <div className="mt-2 space-y-1 text-xs text-ink/50">
            <p>{copyJa.qrHint.line1}</p>
            <p>{copyJa.qrHint.line2}</p>
          </div>
          {qrToken ? (
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-ink/20 bg-white text-[10px] text-ink">
                {qrToken.slice(0, 8)}
              </div>
              <div>
                <p className="text-xs text-ink/60">QRトークン</p>
                <p className="text-sm font-semibold text-ink">{qrToken}</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
