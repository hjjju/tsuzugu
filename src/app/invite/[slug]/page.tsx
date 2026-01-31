import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInvitationBySlug, listInvitations } from "@/lib/services/invitations";
import InviteClient from "./InviteClient";

export async function generateStaticParams() {
  const invites = await listInvitations();
  return invites.map((invite) => ({ slug: invite.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const invite = await getInvitationBySlug(params.slug);
  if (!invite) {
    return {};
  }

  const coupleName = `${invite.brideName} & ${invite.groomName}`;
  const description = `| ${coupleName}様の結婚式へのご招待です。`;
  const imageUrl = invite.heroImageUrl || "/og-default.jpg";

  return {
    title: `Tsuzugu ${description}`,
    description: `Tsuzugu.jp - ${invite.brideName}と${invite.groomName}からの特別なご招待状`,
    openGraph: {
      title: `Tsuzugu ${description}`,
      description: `Tsuzugu.jp - ${invite.brideName}と${invite.groomName}からの特別なご招待状`,
      images: [imageUrl],
      type: "website",
    },
  };
}

export default async function InvitePage({ params }: { params: { slug: string } }) {
  const invite = await getInvitationBySlug(params.slug);

  if (!invite) {
    notFound();
  }

  return <InviteClient invitation={invite} />;
}
