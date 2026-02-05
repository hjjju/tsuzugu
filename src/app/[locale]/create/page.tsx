import type { Locale } from "@/lib/i18n";
import CreatePage from "../../create/page";

export const runtime = "edge";

export default function LocaleCreatePage({ params }: { params: { locale: Locale } }) {
  return <CreatePage locale={params.locale} />;
}
