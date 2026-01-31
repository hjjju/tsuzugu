"use server";

import { z } from "zod";
import { createRSVP } from "@/lib/services/rsvps";
import { getInvitationBySlug } from "@/lib/services/invitations";
import { getDictionary } from "@/lib/i18n";

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
    locale: z.string().optional(),
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
    locale: formData.get("locale"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const dict = getDictionary(validatedFields.data.locale || "jp");
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
      message: dict.invite.rsvpThanksTitle,
      qrToken: rsvp.qrToken,
    };
  } catch (error) {
    console.error(error);
    const dict = getDictionary(
      typeof formData.get("locale") === "string"
        ? (formData.get("locale") as string)
        : "jp"
    );
    return {
      message: dict.invite.rsvpError,
    };
  }
}
