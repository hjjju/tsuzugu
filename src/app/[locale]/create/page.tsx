import Link from "next/link";

export const runtime = "edge";

export default function CreateStartPage() {
  return (
    <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
      <div className="mx-auto w-full max-w-xl rounded-[2.5rem] border border-black/5 bg-white/80 px-6 py-10 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          招待状の制作フロー
        </p>
        <h1 className="mt-4 font-display text-2xl text-ink">3ステップで、すぐに完成</h1>
        <ul className="mt-6 space-y-3 text-sm text-ink/70">
          <li>1. 基本情報を入力</li>
          <li>2. プレビューを確認</li>
          <li>3. URLをゲストにシェア</li>
        </ul>
        <Link
          href="form"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          制作をはじめる
        </Link>
      </div>
    </div>
  );
}
