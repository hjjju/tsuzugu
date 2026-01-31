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

export default function AdminClient() {
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
          setErrorMessage("招待状の読み込みに失敗しました。");
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
  }, []);

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
          setErrorMessage("回答一覧の読み込みに失敗しました。");
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
  }, [selectedSlug]);

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
      setToastMessage("チェックインに失敗しました");
      window.setTimeout(() => setToastMessage(null), 2000);
      return false;
    }
    setCheckedInIds((prev) => new Set(prev).add(checkIn.rsvpId));
    setToastMessage("チェックイン完了");
    window.setTimeout(() => setToastMessage(null), 2000);
    const refreshed = await listRSVPs(selectedSlug);
    setRsvps(refreshed);
    return true;
  }

  if (loadingInvites) {
    return (
      <div className="mx-auto w-full max-w-md px-4 pb-12 pt-8">
        <div className="rounded-2xl border border-black/5 bg-white/70 p-6 text-center text-sm text-ink/60">
          招待状を読み込み中...
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
          招待状がまだ作成されていません。
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12 pt-8">
      <section className="fade-in space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Admin</p>
        <h1 className="text-2xl font-semibold text-ink">招待状の管理</h1>
        <p className="text-sm text-ink/70">
          ローカル管理モード。Firebase Auth 連携に備えた構成です。
        </p>
      </section>

      <section className="fade-in mt-6 space-y-4">
        <InvitationSelector
          invitations={invitations}
          selectedSlug={selectedSlug}
          onChange={setSelectedSlug}
        />
        <KpiCards rsvps={rsvps} />
        <FiltersBar filters={filters} onChange={setFilters} />
        <div className="flex flex-col gap-3">
          <CheckInPanel onCheckIn={handleCheckIn} toastMessage={toastMessage} />
          <CsvExportButton
            rsvps={rsvps}
            filename={`rsvps_${selectedSlug}.csv`}
          />
        </div>
      </section>

      <section className="fade-in mt-6">
        <h2 className="text-lg font-semibold text-ink">回答一覧</h2>
        <p className="mt-1 text-sm text-ink/60">
          表示中 {filteredRsvps.length} 件
        </p>
        <div className="mt-4">
          {loadingRsvps ? (
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6 text-center text-sm text-ink/60">
              回答を読み込み中...
            </div>
          ) : (
            <RsvpTable rsvps={filteredRsvps} checkedInIds={checkedInIds} />
          )}
        </div>
      </section>
    </div>
  );
}
