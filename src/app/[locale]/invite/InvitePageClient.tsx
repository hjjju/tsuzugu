"use client";

import { useSearchParams } from "next/navigation";
import GuestInviteClient from "./GuestInviteClient";

export default function InvitePageClient() {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data") ?? undefined;
  const inviteId = searchParams.get("id") ?? undefined;

  return <GuestInviteClient encodedData={encodedData} inviteId={inviteId} />;
}
