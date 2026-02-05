import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { getInvitationBySlug } from "@/lib/services/invitations";
import InviteClient from "../../../invite/[slug]/InviteClient";
import GuestInviteClient from "./GuestInviteClient";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: Locale };
}): Promise<Metadata> {
  const invite = await getInvitationBySlug(params.slug);
  if (!invite) {
    return {};
  }

  const imageUrl = invite.heroImageUrl || "/og-default.jpg";
  const coupleName = `${invite.brideName} & ${invite.groomName}`;
  const dict = getDictionary(params.locale);

  return {
    title: `つづぐ | ${coupleName} ご招待`,
    description: dict.invite.rsvpNoticeFallback,
    openGraph: {
      title: `つづぐ | ${coupleName} ご招待`,
      description: dict.invite.rsvpNoticeFallback,
      images: [imageUrl],
      type: "website",
    },
  };
}

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: { slug: string; locale: Locale };
  searchParams?: { data?: string };
}) {
  if (searchParams?.data) {
    return <GuestInviteClient data={searchParams.data} />;
  }

  const invite = await getInvitationBySlug(params.slug);

  if (!invite) {
    notFound();
  }

  const dict = getDictionary(params.locale);
  return <InviteClient invitation={invite} copy={dict.invite} locale={params.locale} />;
}
