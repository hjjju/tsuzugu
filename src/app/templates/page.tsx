import Link from "next/link";
import { templates } from "@/data/invitations";

export default function TemplatesPage() {
  return (
    <div className="tsz-page pb-12 pt-8">
      <section className="fade-in space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
          Templates
        </p>
        <h1 className="text-2xl font-semibold text-ink">
          和のテンプレートを選ぶ
        </h1>
        <p className="text-sm text-ink/70">
          二人の空気感に合わせて、色と質感を選べます。
        </p>
      </section>

      <section className="fade-in mt-6 grid gap-4">
        {templates.map((template) => (
          <div
            key={template.name}
            className="tsz-card p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">
                {template.name}
              </h2>
              <span className="h-3 w-12 rounded-full bg-accent" />
            </div>
            <p className="mt-3 text-sm text-ink/70">{template.tone}</p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/create"
                className="tsz-button-primary flex-1"
              >
                このテンプレで作る
              </Link>
              <Link
                href="/"
                className="tsz-button-secondary px-4"
              >
                サンプル
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
