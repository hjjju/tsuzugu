import { useState } from "react";

type CheckInPanelProps = {
  onCheckIn: (qrToken: string) => Promise<boolean>;
  toastMessage?: string | null;
};

export default function CheckInPanel({
  onCheckIn,
  toastMessage,
}: CheckInPanelProps) {
  const [qrToken, setQrToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!qrToken.trim()) return;
    setIsSubmitting(true);
    await onCheckIn(qrToken.trim());
    setIsSubmitting(false);
    setQrToken("");
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white/70 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">QRチェックイン</p>
        {toastMessage ? (
          <span className="rounded-full bg-ink/10 px-3 py-1 text-xs text-ink/70">
            {toastMessage}
          </span>
        ) : null}
      </div>
      <form className="mt-3 flex gap-2" onSubmit={handleSubmit}>
        <input
          className="h-11 flex-1 rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
          placeholder="QRトークンを入力"
          value={qrToken}
          onChange={(event) => setQrToken(event.target.value)}
        />
        <button
          type="submit"
          className="h-11 rounded-2xl bg-accent px-4 text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80 disabled:opacity-40"
          disabled={isSubmitting}
        >
          チェックイン
        </button>
      </form>
    </div>
  );
}
