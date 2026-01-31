import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            aria-label="メニューを開く"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-ink transition-opacity duration-300 hover:opacity-80"
            type="button"
          >
            <span className="flex h-4 w-4 flex-col justify-between">
              <span className="block h-0.5 w-full rounded-full bg-ink" />
              <span className="block h-0.5 w-full rounded-full bg-ink" />
              <span className="block h-0.5 w-full rounded-full bg-ink" />
            </span>
          </button>
          <div>
            <Link href="/" className="text-lg font-semibold tracking-wide">
              Tsuzugu
            </Link>
            <p className="text-xs text-ink/60">つづぐ</p>
          </div>
        </div>
        <Link
          href="/create"
          className="rounded-full border border-accent/40 bg-accent/20 px-4 py-2 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
        >
          招待状を作る
        </Link>
      </div>
    </header>
  );
}
