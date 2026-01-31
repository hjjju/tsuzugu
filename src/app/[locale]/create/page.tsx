import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import CreatePage from "../../create/page";

export default function LocaleCreatePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return <CreatePage locale={params.locale} copy={dict.create} />;
}
