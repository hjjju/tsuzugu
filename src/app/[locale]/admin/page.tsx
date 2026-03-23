import { getDictionary, locales } from "@/lib/i18n";
import AdminClient from "../../admin/AdminClient";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const normalizedLocale = locales.includes(
    resolvedParams.locale as (typeof locales)[number]
  )
    ? (resolvedParams.locale as (typeof locales)[number])
    : "jp";
  const dict = getDictionary(normalizedLocale);
  return <AdminClient locale={normalizedLocale} copy={dict.admin} />;
}
