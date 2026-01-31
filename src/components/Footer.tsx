export default function Footer({
  copy,
}: {
  copy: {
    tagline: string;
    market: string;
    domain: string;
  };
}) {
  return (
    <footer className="border-t border-black/5 bg-background">
      <div className="mx-auto flex w-full max-w-md flex-col gap-3 px-4 py-6 md:max-w-3xl lg:max-w-5xl">
        <div className="text-sm text-ink/70">
          <p className="font-medium text-ink">Tsuzugu</p>
          <p>{copy.tagline}</p>
        </div>
        <p className="text-xs text-ink/50">{copy.market}</p>
        <p className="text-xs text-ink/40">{copy.domain}</p>
      </div>
    </footer>
  );
}
