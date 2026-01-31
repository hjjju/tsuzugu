"use client";

import { useEffect, useMemo, useState } from "react";
import InvitationSelector from "@/components/admin/InvitationSelector";
import KpiCards from "@/components/admin/KpiCards";
import FiltersBar from "@/components/admin/FiltersBar";
import RsvpTable from "@/components/admin/RsvpTable";
import CheckInPanel from "@/components/admin/CheckInPanel";
import CsvExportButton from "@/components/admin/CsvExportButton";
import { listInvitations } from "@/lib/services/invitations";
import { checkInByQrToken, listCheckIns, listRSVPs } from "@/lib/services/rsvps";
import type { Invitation } from "@/lib/data/invitations";
import type { RSVP } from "@/lib/data/rsvps";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export default function AdminClient({
  locale,
  copy,
}: {
  locale?: Locale;
  copy?: ReturnType<typeof getDictionary>["admin"];
}) {
  const dict = copy ?? getDictionary(locale ?? "jp").admin;
  const activeLocale = locale ?? "jp";
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [filters, setFilters] = useState<{
    query: string;
    attendance: "all" | RSVP["attendance"];
    allergyOnly: boolean;
  }>({
    query: "",
    attendance: "all",
    allergyOnly: false,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [checkedInIds, setCheckedInIds] = useState(new Set<string>());
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loadingInvites, setLoadingInvites] = useState(true);
  const [loadingRsvps, setLoadingRsvps] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadInvitesErrorLabel = dict.loadInvitesError;
  const loadRsvpsErrorLabel = dict.loadRsvpsError;

  useEffect(() => {
    let cancelled = false;
    async function loadInvitations() {
      setLoadingInvites(true);
      setErrorMessage(null);
      try {
        const data = await listInvitations();
        if (!cancelled) {
          setInvitations(data);
          setSelectedSlug((prev) => prev || data[0]?.slug || "");
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(loadInvitesErrorLabel);
        }
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoadingInvites(false);
        }
      }
    }
    loadInvitations();
    return () => {
      cancelled = true;
    };
  }, [loadInvitesErrorLabel]);

  useEffect(() => {
    let cancelled = false;
    async function loadRsvps() {
      if (!selectedSlug) {
        setRsvps([]);
        setCheckedInIds(new Set());
        return;
      }
      setLoadingRsvps(true);
      try {
        const [rsvpData, checkIns] = await Promise.all([
          listRSVPs(selectedSlug),
          listCheckIns(selectedSlug),
        ]);
        if (!cancelled) {
          setRsvps(rsvpData);
          setCheckedInIds(new Set(checkIns.map((checkIn) => checkIn.rsvpId)));
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(loadRsvpsErrorLabel);
        }
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoadingRsvps(false);
        }
      }
    }
    loadRsvps();
    return () => {
      cancelled = true;
    };
  }, [selectedSlug, loadRsvpsErrorLabel]);

  const filteredRsvps = useMemo(() => {
    return rsvps.filter((rsvp) => {
      const matchesQuery =
        !filters.query ||
        `${rsvp.lastName}${rsvp.firstName}${rsvp.furigana}`
          .toLowerCase()
          .includes(filters.query.toLowerCase());
      const matchesAttendance =
        filters.attendance === "all" ||
        rsvp.attendance === filters.attendance;
      const matchesAllergy =
        !filters.allergyOnly || rsvp.allergyText.trim().length > 0;
      return matchesQuery && matchesAttendance && matchesAllergy;
    });
  }, [filters, rsvps]);

  async function handleCheckIn(qrToken: string) {
    if (!selectedSlug) {
      return false;
    }
    const checkIn = await checkInByQrToken(selectedSlug, qrToken);
    if (!checkIn) {
      setToastMessage(dict.checkInFailed);
      window.setTimeout(() => setToastMessage(null), 2000);
      return false;
    }
    setCheckedInIds((prev) => new Set(prev).add(checkIn.rsvpId));
    setToastMessage(dict.checkInSuccess);
    window.setTimeout(() => setToastMessage(null), 2000);
    const refreshed = await listRSVPs(selectedSlug);
    setRsvps(refreshed);
    return true;
  }

  if (loadingInvites) {
    return (
      <div className="mx-auto w-full max-w-md px-4 pb-12 pt-8">
        <div className="rounded-2xl border border-black/5 bg-white/70 p-6 text-center text-sm text-ink/60">
          {dict.loadingInvites}
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="mx-auto w-full max-w-md px-4 pb-12 pt-8">
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white/70 p-6 text-center text-sm text-ink/60">
          {errorMessage}
        </div>
      </div>
    );
  }

  if (invitations.length === 0) {
    return (
      <div className="mx-auto w-full max-w-md px-4 pb-12 pt-8">
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white/70 p-6 text-center text-sm text-ink/60">
          {dict.emptyInvites}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12 pt-8">
      <section className="fade-in space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Admin</p>
        <h1 className="text-2xl font-semibold text-ink">{dict.title}</h1>
        <p className="text-sm text-ink/70">{dict.subtitle}</p>
      </section>

      <section className="fade-in mt-6 space-y-4">
        <InvitationSelector
          invitations={invitations}
          selectedSlug={selectedSlug}
          onChange={setSelectedSlug}
          label={dict.selectInvitation}
        />
        <KpiCards
          rsvps={rsvps}
          labels={{
            total: dict.kpiTotal,
            attend: dict.kpiAttend,
            decline: dict.kpiDecline,
            allergy: dict.kpiAllergy,
          }}
        />
        <FiltersBar
          filters={filters}
          onChange={setFilters}
          labels={{
            placeholder: dict.filtersPlaceholder,
            all: dict.filterAll,
            attend: dict.filterAttend,
            decline: dict.filterDecline,
            allergyOnly: dict.filterAllergyOnly,
          }}
        />
        <div className="flex flex-col gap-3">
          <CheckInPanel
            onCheckIn={handleCheckIn}
            toastMessage={toastMessage}
            labels={{
              title: dict.checkInTitle,
              placeholder: dict.checkInPlaceholder,
              button: dict.checkInButton,
            }}
          />
          <CsvExportButton
            rsvps={rsvps}
            filename={`rsvps_${selectedSlug}.csv`}
            label={dict.csvExport}
            headers={dict.csvHeaders}
            attendanceLabels={{ attend: dict.tableAttend, decline: dict.tableDecline }}
          />
        </div>
      </section>

      <section className="fade-in mt-6">
        <h2 className="text-lg font-semibold text-ink">{dict.listTitle}</h2>
        <p className="mt-1 text-sm text-ink/60">
          {dict.listCount.replace("{count}", String(filteredRsvps.length))}
        </p>
        <div className="mt-4">
          {loadingRsvps ? (
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6 text-center text-sm text-ink/60">
              {dict.loadingRsvps}
            </div>
          ) : (
            <RsvpTable
              rsvps={filteredRsvps}
              checkedInIds={checkedInIds}
              locale={activeLocale}
              labels={{
                attend: dict.tableAttend,
                decline: dict.tableDecline,
                companion: dict.tableCompanion,
                guestsUnit: dict.tableGuestsUnit,
                allergy: dict.tableAllergy,
                message: dict.tableMessage,
                email: dict.tableEmail,
                phone: dict.tablePhone,
                createdAt: dict.tableCreatedAt,
                checkIn: dict.tableCheckIn,
                checkInDone: dict.tableCheckInDone,
                checkInPending: dict.tableCheckInPending,
                noData: dict.tableNoData,
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
