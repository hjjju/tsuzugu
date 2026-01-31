export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-background">
      <div className="mx-auto flex w-full max-w-md flex-col gap-3 px-4 py-6">
        <div className="text-sm text-ink/70">
          <p className="font-medium text-ink">Tsuzugu</p>
          <p>© Tsuzugu – 想いをつづぐウェディングサービス</p>
        </div>
        <p className="text-xs text-ink/50">日本向けウェディング招待状サービス</p>
        <p className="text-xs text-ink/40">tsuzugu.jp</p>
      </div>
    </footer>
  );
}
