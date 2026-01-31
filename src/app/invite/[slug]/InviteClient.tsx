"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { Invitation } from "@/lib/data/invitations";
import type { Locale } from "@/lib/i18n";
import { submitRsvp, RsvpFormState } from "./actions";

const RsvpSubmitButton = ({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80 disabled:opacity-40"
      disabled={pending}
    >
      {pending ? pendingLabel : label}
    </button>
  );
};

export default function InviteClient({
  invitation,
  copy,
  locale,
}: {
  invitation: Invitation;
  copy: {
    greetingTitle: string;
    greetingDefault: string;
    scheduleTitle: string;
    dateLabel: string;
    venueLabel: string;
    addressLabel: string;
    rsvpTitle: string;
    rsvpNoticeFallback: string;
    rsvpDeadlineLabel: string;
    nameLabel: string;
    nameLastPlaceholder: string;
    nameFirstPlaceholder: string;
    furiganaLabel: string;
    furiganaPlaceholder: string;
    emailLabel: string;
    attendanceLabel: string;
    attend: string;
    decline: string;
    allergyLabel: string;
    allergyPlaceholder: string;
    companionLabel: string;
    companionPlaceholder: string;
    shuttleLabel: string;
    shuttleYes: string;
    shuttleNo: string;
    speechLabel: string;
    speechYes: string;
    speechNo: string;
    submit: string;
    submitPending: string;
    rsvpThanksTitle: string;
    rsvpThanksNote: string;
    qrButton: string;
    lineSelfShare: string;
    paypayTitle: string;
    paypayFallbackNote: string;
    paypayButton: string;
    paypayBrideButton: string;
    paypayGroomButton: string;
    paypayModalTitle: string;
    paypayModalEmpty: string;
    paypayClose: string;
    qrModalTitle: string;
    qrModalNote: string;
    close: string;
    lineShareText: string;
    qrAlt: string;
  };
  locale: Locale;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const initialState: RsvpFormState = { errors: {}, message: undefined, qrToken: undefined };
  const [state, formAction] = useFormState(submitRsvp, initialState);
  const [paypayOpen, setPaypayOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>({});
  const rsvpRequireName = invitation.rsvpRequireName ?? true;
  const rsvpRequireFurigana = invitation.rsvpRequireFurigana ?? true;
  const rsvpAllergyEnabled = invitation.rsvpAllergyEnabled ?? true;
  const rsvpCompanionEnabled = invitation.rsvpCompanionEnabled ?? true;
  const rsvpShuttleEnabled = invitation.rsvpShuttleEnabled ?? false;
  const rsvpSpeechEnabled = invitation.rsvpSpeechEnabled ?? false;
  const rsvpNotice = invitation.rsvpNotice || copy.rsvpNoticeFallback;
  const intlLocale =
    locale === "ko" ? "ko-KR" : locale === "en" ? "en-US" : "ja-JP";

  const eventDate = useMemo(() => {
    const date = new Date(invitation.dateTimeISO);
    return new Intl.DateTimeFormat(intlLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    }).format(date);
  }, [invitation.dateTimeISO, intlLocale]);

  const eventTime = useMemo(() => {
    const date = new Date(invitation.dateTimeISO);
    return new Intl.DateTimeFormat(intlLocale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }, [invitation.dateTimeISO, intlLocale]);

  const qrUrl = state.qrToken
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${state.qrToken}`
    : "";

  const lineShareUrl = state.qrToken
    ? `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(
        copy.lineShareText.replace("{qrToken}", state.qrToken)
      )}`
    : "";

  const greetingMessage = invitation.messageJP || copy.greetingDefault;

  const deadlineLabel = useMemo(() => {
    if (!invitation.rsvpDeadline) return "";
    const date = new Date(invitation.rsvpDeadline);
    return new Intl.DateTimeFormat(intlLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }, [invitation.rsvpDeadline, intlLocale]);

  const paypaySteps = useMemo(
    () =>
      (invitation.paypayGuideText || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    [invitation.paypayGuideText]
  );
  const paypayEnabled = invitation.paypayEnabled ?? !!invitation.paypayReceiveLink;
  const paypayBrideLink = invitation.paypayBrideLink || "";
  const paypayGroomLink = invitation.paypayGroomLink || "";

  useEffect(() => {
    const elements = sectionRefs.current.filter(Boolean);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-section-index"));
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el as Element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#f9f8f6] text-ink">
      <header className="relative min-h-[520px] w-full overflow-hidden md:min-h-[640px] lg:min-h-[720px]">
        <img
          src={invitation.heroImageUrl}
          alt="招待状メインビジュアル"
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className={`space-y-4 ${imageLoaded ? "fade-in" : "opacity-0"}`}>
            <p className="font-display text-lg tracking-[0.2em] text-white/80">
              {invitation.mainVisualText || "Our Wedding Day"}
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-wide text-white md:text-5xl">
              {invitation.brideName} & {invitation.groomName}
            </h1>
          </div>
        </div>
      </header>

      <main className="tsz-page mx-auto max-w-6xl pb-16 pt-12">
        <section
          className={`tsz-card space-y-4 p-6 transition-all duration-700 md:p-8 lg:max-w-4xl lg:mx-auto ${
            visibleSections[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          data-section-index={0}
        >
          <h2 className="font-display text-xl font-semibold text-ink">
            {copy.greetingTitle}
          </h2>
          <p className="text-sm leading-relaxed text-ink/70 whitespace-pre-line">
            {greetingMessage}
          </p>
          <div className="grid gap-2 text-sm text-ink/70">
            <div className="flex items-center justify-between">
              <span>{copy.dateLabel}</span>
              <span>
                {eventDate} {eventTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>{copy.venueLabel}</span>
              <span>{invitation.venueName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{copy.addressLabel}</span>
              <span className="text-right">{invitation.venueAddress}</span>
            </div>
          </div>
        </section>

        <section
          className={`tsz-section tsz-card p-6 transition-all duration-700 md:p-8 lg:max-w-4xl lg:mx-auto ${
            visibleSections[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          data-section-index={1}
        >
          <div className="space-y-2">
            <h2 className="font-display text-lg font-semibold text-ink">
              {copy.rsvpTitle}
            </h2>
            <p className="text-sm text-ink/70">
              {rsvpNotice}
            </p>
            {deadlineLabel ? (
              <p className="text-xs text-ink/60">
                {copy.rsvpDeadlineLabel}: {deadlineLabel}
              </p>
            ) : null}
          </div>

          {state.message && state.qrToken ? (
            <div className="mt-6 text-center">
              <p className="text-base font-semibold text-ink">
                {state.message || copy.rsvpThanksTitle}
              </p>
              <p className="mt-2 text-sm text-ink/70">
                {copy.rsvpThanksNote}
              </p>
              <div className="mt-4 flex justify-center">
                <img
                  src={qrUrl}
                  alt={copy.qrAlt}
                  className="h-40 w-40 rounded-2xl border border-black/10 bg-white"
                />
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  className="flex h-11 items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink"
                  onClick={() => setQrOpen(true)}
                >
                  {copy.qrButton}
                </button>
                <a
                  href={lineShareUrl}
                  className="flex h-11 items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink"
                >
                  {copy.lineSelfShare}
                </a>
              </div>
            </div>
          ) : (
            <form className="mt-5 space-y-5" action={formAction}>
              <input type="hidden" name="invitationSlug" value={invitation.slug} />
              <input type="hidden" name="locale" value={locale} />

              {rsvpRequireName ? (
                <div className="space-y-2">
                  <label className="text-sm text-ink">{copy.nameLabel}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      name="lastName"
                      className="h-11 rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
                      placeholder={copy.nameLastPlaceholder}
                      required
                    />
                    <input
                      name="firstName"
                      className="h-11 rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
                      placeholder={copy.nameFirstPlaceholder}
                      required
                    />
                  </div>
                  {state.errors?.lastName && (
                    <p className="text-xs text-red-500">
                      {state.errors.lastName[0]}
                    </p>
                  )}
                </div>
              ) : null}

              {rsvpRequireFurigana ? (
                <div className="space-y-2">
                  <label className="text-sm text-ink">{copy.furiganaLabel}</label>
                  <input
                    name="furigana"
                    className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
                    placeholder={copy.furiganaPlaceholder}
                    required
                  />
                  {state.errors?.furigana && (
                    <p className="text-xs text-red-500">
                      {state.errors.furigana[0]}
                    </p>
                  )}
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="text-sm text-ink">{copy.emailLabel}</label>
                <input
                  name="email"
                  type="email"
                  className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
                  placeholder="example@example.com"
                  required
                />
                {state.errors?.email && (
                  <p className="text-xs text-red-500">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-ink">{copy.attendanceLabel}</label>
                <div className="flex gap-2">
                  <label className="flex h-11 flex-1 items-center justify-center rounded-full border border-ink/20 text-sm">
                    <input
                      type="radio"
                      name="attendance"
                      value="attend"
                      defaultChecked
                      className="mr-2"
                    />
                    {copy.attend}
                  </label>
                  <label className="flex h-11 flex-1 items-center justify-center rounded-full border border-ink/20 text-sm">
                    <input
                      type="radio"
                      name="attendance"
                      value="decline"
                      className="mr-2"
                    />
                    {copy.decline}
                  </label>
                </div>
              </div>

              {rsvpAllergyEnabled ? (
                <div className="space-y-2">
                  <label className="text-sm text-ink">{copy.allergyLabel}</label>
                  <textarea
                    name="allergyText"
                    className="min-h-[96px] w-full rounded-2xl border border-ink/15 bg-white/70 px-3 py-2 text-sm"
                    placeholder={copy.allergyPlaceholder}
                  />
                </div>
              ) : null}

              {rsvpCompanionEnabled ? (
                <div className="space-y-2">
                  <label className="text-sm text-ink">{copy.companionLabel}</label>
                  <input
                    name="companionName"
                    className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
                    placeholder={copy.companionPlaceholder}
                  />
                </div>
              ) : null}

              {rsvpShuttleEnabled ? (
                <div className="space-y-2">
                  <label className="text-sm text-ink">{copy.shuttleLabel}</label>
                  <div className="flex gap-2">
                    <label className="flex h-11 flex-1 items-center justify-center rounded-full border border-ink/20 text-sm">
                      <input type="radio" name="shuttleBus" value="yes" className="mr-2" />
                      {copy.shuttleYes}
                    </label>
                    <label className="flex h-11 flex-1 items-center justify-center rounded-full border border-ink/20 text-sm">
                      <input type="radio" name="shuttleBus" value="no" className="mr-2" />
                      {copy.shuttleNo}
                    </label>
                  </div>
                </div>
              ) : null}

              {rsvpSpeechEnabled ? (
                <div className="space-y-2">
                  <label className="text-sm text-ink">{copy.speechLabel}</label>
                  <div className="flex gap-2">
                    <label className="flex h-11 flex-1 items-center justify-center rounded-full border border-ink/20 text-sm">
                      <input type="radio" name="speechRole" value="yes" className="mr-2" />
                      {copy.speechYes}
                    </label>
                    <label className="flex h-11 flex-1 items-center justify-center rounded-full border border-ink/20 text-sm">
                      <input type="radio" name="speechRole" value="no" className="mr-2" />
                      {copy.speechNo}
                    </label>
                  </div>
                </div>
              ) : null}

              <RsvpSubmitButton label={copy.submit} pendingLabel={copy.submitPending} />
            </form>
          )}
        </section>

        {paypayEnabled ? (
          <section
            className={`tsz-section tsz-card p-6 transition-all duration-700 md:p-8 lg:max-w-4xl lg:mx-auto ${
              visibleSections[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            ref={(el) => {
              sectionRefs.current[2] = el;
            }}
            data-section-index={2}
          >
          <h2 className="font-display text-lg font-semibold text-ink">
            {copy.paypayTitle}
          </h2>
          <p className="mt-2 text-sm text-ink/70">
            {invitation.paypayNotice ||
              copy.paypayFallbackNote}
          </p>
          <div className="mt-4 grid gap-3">
            {paypayBrideLink ? (
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#ff0033] text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80"
                onClick={() => setPaypayOpen(true)}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#ff0033]">
                  Pay
                </span>
                {copy.paypayBrideButton}
              </button>
            ) : null}
            {paypayGroomLink ? (
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#ff0033] text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80"
                onClick={() => setPaypayOpen(true)}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#ff0033]">
                  Pay
                </span>
                {copy.paypayGroomButton}
              </button>
            ) : null}
            {!paypayBrideLink && !paypayGroomLink ? (
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink/30 text-sm font-semibold text-white"
                disabled
              >
                {copy.paypayButton}
              </button>
            ) : null}
          </div>
        </section>
        ) : null}
      </main>

      {paypayOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#f9f8f6] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-ink">
                {copy.paypayModalTitle}
              </h3>
              <button
                type="button"
                className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/70"
                onClick={() => setPaypayOpen(false)}
              >
                {copy.paypayClose}
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm text-ink/70">
              {paypaySteps.length ? (
                paypaySteps.map((step, index) => (
                  <p key={step}>{index + 1}. {step}</p>
                ))
              ) : (
                <p>{copy.paypayModalEmpty}</p>
              )}
            </div>
            <div className="mt-4 grid gap-2">
              {paypayBrideLink ? (
                <a
                  href={paypayBrideLink}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#ff0033] text-sm font-semibold text-white"
                >
                  {copy.paypayBrideButton}
                </a>
              ) : null}
              {paypayGroomLink ? (
                <a
                  href={paypayGroomLink}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#ff0033] text-sm font-semibold text-white"
                >
                  {copy.paypayGroomButton}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {qrOpen && state.qrToken ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xs rounded-3xl bg-[#f9f8f6] p-6 text-center shadow-xl">
            <h3 className="font-display text-lg font-semibold text-ink">
              {copy.qrModalTitle}
            </h3>
            <p className="mt-2 text-sm text-ink/70">
              {copy.qrModalNote}
            </p>
            <div className="mt-4 flex justify-center">
              <img
                src={qrUrl}
                alt={copy.qrAlt}
                className="h-44 w-44 rounded-2xl border border-black/10 bg-white"
              />
            </div>
            <button
              type="button"
              className="mt-4 h-10 w-full rounded-full border border-ink/20 text-sm"
              onClick={() => setQrOpen(false)}
            >
              {copy.close}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
