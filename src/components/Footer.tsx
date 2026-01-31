export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-background">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-6">
        <div className="text-sm text-ink/70">
          <p className="font-medium text-ink">Tsuzugu</p>
          <p>想いをつづり、縁をつなぐ。</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70">
            <span className="text-xs font-semibold text-ink/60">LINE</span>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70">
            <span className="text-xs font-semibold text-ink/60">Share</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
