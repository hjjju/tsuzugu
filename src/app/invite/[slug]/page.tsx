import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InviteClient from "./InviteClient";
import { getInvitationBySlug, listInvitations } from "@/lib/services/invitations";

export function generateStaticParams() {
  return listInvitations().map((invite) => ({ slug: invite.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const invite = getInvitationBySlug(params.slug);
  const coupleName = invite
    ? `${invite.brideName} & ${invite.groomName}`
    : "ご招待";
  const eventDate = invite
    ? new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
      }).format(new Date(invite.dateTimeISO))
    : "";
  const description = invite
    ? `${invite.brideName}と${invite.groomName}の結婚式のご案内です。${eventDate}、${invite.venueName}にてお待ちしております。`
    : "結婚式のご案内ページです。";
  const image = invite?.heroImageUrl || "/og-default.jpg";

  return {
    title: `つづぐ | ${coupleName} ご招待`,
    description,
    openGraph: {
      title: `つづぐ | ${coupleName} ご招待`,
      description,
      images: [image],
      type: "website",
    },
  };
}

export default function InvitePage({ params }: { params: { slug: string } }) {
  const invite = getInvitationBySlug(params.slug);

  if (!invite) {
    notFound();
  }

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${invite.brideName} & ${invite.groomName} Wedding`,
    startDate: invite.dateTimeISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: invite.venueName,
      address: invite.venueAddress,
    },
    description: invite.messageJP,
    image: invite.heroImageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <InviteClient invitation={invite} />
    </>
  );
}
