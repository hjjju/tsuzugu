import GuestInviteClient from "./GuestInviteClient";

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { data?: string };
}) {
  return <GuestInviteClient slug={params.slug} encodedData={searchParams?.data} />;
}
