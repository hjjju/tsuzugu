import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import AdminClient from "../../admin/AdminClient";

export const runtime = "edge";

export default function AdminPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return <AdminClient locale={params.locale} copy={dict.admin} />;
}
