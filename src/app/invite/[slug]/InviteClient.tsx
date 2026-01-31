"use client";

import { useMemo, useState } from "react";
import type { Invitation } from "@/lib/data/invitations";
import { createRSVP } from "@/lib/services/rsvps";
import { copyJa } from "@/lib/copy/ja";
import HeroSection from "@/components/invite/HeroSection";
import InfoCards from "@/components/invite/InfoCards";
import GallerySection from "@/components/invite/GallerySection";
import ScheduleSection from "@/components/invite/ScheduleSection";
import AccessSection from "@/components/invite/AccessSection";
import PaypaySection from "@/components/invite/PaypaySection";
import SharePanel from "@/components/invite/SharePanel";
import RsvpSection, { RsvpFormState } from "@/components/invite/RsvpSection";

const MAX_GUESTS = 5;

type InviteClientProps = {
  invitation: Invitation;
};

const emptyForm: RsvpFormState = {
  lastName: "",
  firstName: "",
  furigana: "",
  attendance: "attend",
  guestsCount: 1,
  allergyText: "",
  messageToCouple: "",
  email: "",
  phone: "",
};

export default function InviteClient({ invitation }: InviteClientProps) {
  const [currentUrl] = useState(() =>
    typeof window !== "undefined" ? window.location.href : ""
  );
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [showPaypayModal, setShowPaypayModal] = useState(false);
  const [formState, setFormState] = useState<RsvpFormState>(emptyForm);
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);

  const galleryImages = useMemo(() => {
    const base = [invitation.heroImageUrl, ...invitation.galleryImageUrls];
    const filled = [...base];
    while (filled.length < 6) {
      filled.push(invitation.heroImageUrl);
    }
    return filled.slice(0, 10);
  }, [invitation.galleryImageUrls, invitation.heroImageUrl]);

  const eventDate = useMemo(() => {
    const date = new Date(invitation.dateTimeISO);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    }).format(date);
  }, [invitation.dateTimeISO]);

  const eventTime = useMemo(() => {
    const date = new Date(invitation.dateTimeISO);
    return new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }, [invitation.dateTimeISO]);

  const heroSlogan = copyJa.headerMain.casual;

  function handleFormChange<K extends keyof RsvpFormState>(
    key: K,
    value: RsvpFormState[K]
  ) {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rsvp = createRSVP({
      invitationSlug: invitation.slug,
      lastName: formState.lastName,
      firstName: formState.firstName,
      furigana: formState.furigana,
      email: formState.email,
      phone: formState.phone || undefined,
      attendance: formState.attendance,
      guestsCount: formState.attendance === "decline" ? 0 : formState.guestsCount,
      allergyText: formState.allergyText,
      messageToCouple: formState.messageToCouple,
    });
    setQrToken(rsvp.qrToken);
    setSubmitMessage(copyJa.rsvp.thanksTitle);
  }

  async function handleCopy(
    text: string,
    message: string,
    failMessage?: string
  ) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyNotice(message);
      window.setTimeout(() => setCopyNotice(null), 2000);
    } catch (error) {
      if (failMessage) {
        setCopyNotice(failMessage);
        window.setTimeout(() => setCopyNotice(null), 2000);
      }
      console.error(error);
    }
  }

  const shareText =
    invitation.lineShareText || "ご招待の詳細をご確認ください。";
  return (
    <div className="mx-auto w-full max-w-md px-4 pb-16 pt-8">
      <HeroSection
        invitation={invitation}
        eventDate={eventDate}
        heroSlogan={heroSlogan}
      />
      <InfoCards
        dateTimeLabel={`${eventDate} ${eventTime}`}
        venueName={invitation.venueName}
        venueAddress={invitation.venueAddress}
      />
      <GallerySection
        images={galleryImages}
        selectedIndex={galleryIndex}
        onSelect={setGalleryIndex}
        onClose={() => setGalleryIndex(null)}
      />
      <ScheduleSection scheduleItems={invitation.scheduleItems} />
      <AccessSection
        venueAddress={invitation.venueAddress}
        mapEmbedUrl={invitation.mapEmbedUrl}
        onCopy={() =>
          handleCopy(
            invitation.venueAddress,
            copyJa.addressCopy.toastSuccess,
            copyJa.addressCopy.toastFail
          )
        }
        copyNotice={copyNotice}
      />
      <RsvpSection
        formState={formState}
        maxGuests={MAX_GUESTS}
        submitMessage={submitMessage}
        qrToken={qrToken}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
      <PaypaySection
        paypayReceiveLink={invitation.paypayReceiveLink}
        isOpen={showPaypayModal}
        onOpen={() => setShowPaypayModal(true)}
        onClose={() => setShowPaypayModal(false)}
      />
      <SharePanel url={currentUrl} text={shareText} />
    </div>
  );
}
