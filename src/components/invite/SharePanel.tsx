"use client";

import { useState } from "react";
import { copyJa } from "@/lib/copy/ja";

const toastDurationMs = 2000;

type SharePanelProps = {
  url: string;
  text: string;
};

export default function SharePanel({ url, text }: SharePanelProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedText}`;

  async function handleCopy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setToastMessage(copyJa.share.toast);
      window.setTimeout(() => setToastMessage(null), toastDurationMs);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleShare() {
    if (!url) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: copyJa.share.sectionTitle,
          text,
          url,
        });
        return;
      } catch (error) {
        console.error(error);
      }
    }
    handleCopy();
  }

  return (
    <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
      <h2 className="text-lg font-semibold text-ink">{copyJa.share.sectionTitle}</h2>
      <div className="mt-4 flex flex-col gap-3">
        <a
          href={lineShareUrl}
          className="flex h-11 items-center justify-center rounded-full border border-ink/20 bg-white text-sm font-semibold text-ink transition-opacity duration-300 hover:opacity-80"
        >
          {copyJa.share.lineButton}
        </a>
        <button
          type="button"
          onClick={handleShare}
          className="flex h-11 items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
        >
          {copyJa.share.copyLink}
        </button>
      </div>
      {toastMessage ? (
        <p className="mt-3 text-xs text-ink/50">{toastMessage}</p>
      ) : null}
    </section>
  );
}
