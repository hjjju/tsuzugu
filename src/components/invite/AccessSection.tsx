import { copyJa } from "@/lib/copy/ja";

type AccessSectionProps = {
  venueAddress: string;
  mapEmbedUrl?: string;
  onCopy: () => void;
  copyNotice?: string | null;
};

export default function AccessSection({
  venueAddress,
  mapEmbedUrl,
  onCopy,
  copyNotice,
}: AccessSectionProps) {
  return (
    <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">
          {copyJa.infoLabels.access}
        </h2>
        <button
          type="button"
          className="rounded-full border border-ink/20 px-3 py-1 text-xs text-ink"
          onClick={onCopy}
        >
          {copyJa.addressCopy.button}
        </button>
      </div>
      <div className="mt-4 h-40 rounded-2xl bg-ink/5 p-4 text-sm text-ink/60">
        {mapEmbedUrl ? (
          <a
            href={mapEmbedUrl}
            className="flex h-full items-center justify-center rounded-2xl border border-dashed border-ink/30"
          >
            Google Map を開く
          </a>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-ink/30">
            Map Placeholder
          </div>
        )}
      </div>
      {copyNotice ? (
        <p className="mt-3 text-xs text-ink/50">{copyNotice}</p>
      ) : null}
      <p className="mt-3 text-xs text-ink/60">{venueAddress}</p>
    </section>
  );
}
