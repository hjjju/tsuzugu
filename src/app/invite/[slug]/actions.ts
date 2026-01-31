"use server";

import { z } from "zod";
import { createRSVP } from "@/lib/services/rsvps";
import { getInvitationBySlug } from "@/lib/services/invitations";

export type RsvpFormState = {
  errors?: {
    lastName?: string[];
    firstName?: string[];
    furigana?: string[];
    email?: string[];
    attendance?: string[];
    allergyText?: string[];
    companionName?: string[];
  };
  message?: string;
  qrToken?: string;
};

export async function submitRsvp(
  prevState: RsvpFormState,
  formData: FormData
): Promise<RsvpFormState> {
  const invitationSlugValue = formData.get("invitationSlug");
  const invitationSlug =
    typeof invitationSlugValue === "string" ? invitationSlugValue : "";
  const invitation = invitationSlug
    ? await getInvitationBySlug(invitationSlug)
    : undefined;
  const requireName = invitation?.rsvpRequireName ?? true;
  const requireFurigana = invitation?.rsvpRequireFurigana ?? true;

  const schema = z.object({
    invitationSlug: z.string(),
    lastName: requireName
      ? z.string().min(1, "姓をご入力ください")
      : z.string().optional(),
    firstName: requireName
      ? z.string().min(1, "名をご入力ください")
      : z.string().optional(),
    furigana: requireFurigana
      ? z.string().min(1, "フリガナをご入力ください")
      : z.string().optional(),
    email: z.string().email({ message: "有効なメールアドレスをご入力ください" }),
    attendance: z.enum(["attend", "decline"]),
    allergyText: z.string().optional(),
    companionName: z.string().optional(),
  });

  const validatedFields = schema.safeParse({
    invitationSlug,
    lastName: formData.get("lastName"),
    firstName: formData.get("firstName"),
    furigana: formData.get("furigana"),
    email: formData.get("email"),
    attendance: formData.get("attendance"),
    allergyText: formData.get("allergyText"),
    companionName: formData.get("companionName"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const rsvp = await createRSVP({
      invitationSlug: validatedFields.data.invitationSlug,
      lastName: validatedFields.data.lastName ?? "",
      firstName: validatedFields.data.firstName ?? "",
      furigana: validatedFields.data.furigana ?? "",
      email: validatedFields.data.email,
      attendance: validatedFields.data.attendance,
      allergyText: validatedFields.data.allergyText || "",
      messageToCouple: validatedFields.data.companionName || "",
      guestsCount: validatedFields.data.companionName ? 2 : 1,
    });
    return {
      message: "축하해 주셔서 감사합니다",
      qrToken: rsvp.qrToken,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "エラーが発生しました。もう一度お試しください。",
    };
  }
}
