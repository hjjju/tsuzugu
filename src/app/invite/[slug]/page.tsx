import { redirect } from "next/navigation";

export default function InviteRedirect({ params }: { params: { slug: string } }) {
  redirect(`/ja/invite/${params.slug}`);
}
