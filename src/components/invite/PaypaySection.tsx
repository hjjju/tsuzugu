import { copyJa } from "@/lib/copy/ja";

type PaypaySectionProps = {
  paypayReceiveLink?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function PaypaySection({
  paypayReceiveLink,
  isOpen,
  onOpen,
  onClose,
}: PaypaySectionProps) {
  return (
    <>
      <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-ink">{copyJa.paypay.title}</h2>
        <p className="mt-2 text-sm text-ink/70">{copyJa.paypay.mainNote}</p>
        <p className="mt-2 text-sm text-ink/70">{copyJa.paypay.secondaryNote}</p>
        <div className="mt-4 flex flex-col gap-3">
          <a
            href={paypayReceiveLink || "#"}
            className={`flex h-11 items-center justify-center rounded-full text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80 ${
              paypayReceiveLink ? "bg-paypay" : "bg-ink/30"
            }`}
            aria-disabled={!paypayReceiveLink}
          >
            {copyJa.paypay.button}
          </a>
          <button
            type="button"
            className="flex h-11 items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
            onClick={onOpen}
          >
            {copyJa.paypay.title}
          </button>
        </div>
      </section>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-6">
            <h3 className="text-lg font-semibold text-ink">{copyJa.paypay.title}</h3>
            <ol className="mt-4 space-y-3 text-sm text-ink/70">
              {copyJa.paypay.modalSteps.map((step, index) => (
                <li key={step}>{index + 1}. {step}</li>
              ))}
            </ol>
            <button
              type="button"
              className="mt-6 flex h-11 w-full items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink"
              onClick={onClose}
            >
              閉じる
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
