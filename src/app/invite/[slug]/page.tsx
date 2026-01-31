import { redirect } from "next/navigation";

export const runtime = "edge";

export default function InviteRedirect({ params }: { params: { slug: string } }) {
  redirect(`/jp/invite/${params.slug}`);
}
