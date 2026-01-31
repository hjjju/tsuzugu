"use client";

import { useMemo, useState } from "react";
import InvitationSelector from "@/components/admin/InvitationSelector";
import KpiCards from "@/components/admin/KpiCards";
import FiltersBar from "@/components/admin/FiltersBar";
import RsvpTable from "@/components/admin/RsvpTable";
import CheckInPanel from "@/components/admin/CheckInPanel";
import CsvExportButton from "@/components/admin/CsvExportButton";
import { listInvitations } from "@/lib/services/invitations";
import {
  checkInByQrToken,
  listCheckIns,
  listRSVPs,
} from "@/lib/services/rsvps";
import type { RSVP } from "@/lib/data/rsvps";

const invites = listInvitations();

export default function AdminClient() {
  const [selectedSlug, setSelectedSlug] = useState(
    invites[0]?.slug ?? ""
  );
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
  const [checkedInIds, setCheckedInIds] = useState(
    new Set(listCheckIns().map((checkIn) => checkIn.rsvpId))
  );

  const rsvps = useMemo(() => {
    const base = listRSVPs(selectedSlug);
    return base.filter((rsvp) => {
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
  }, [filters, selectedSlug]);

  async function handleCheckIn(qrToken: string) {
    const checkIn = checkInByQrToken(qrToken);
    if (!checkIn) {
      setToastMessage("チェックインに失敗しました");
      window.setTimeout(() => setToastMessage(null), 2000);
      return false;
    }
    setCheckedInIds((prev) => new Set(prev).add(checkIn.rsvpId));
    setToastMessage("チェックイン完了");
    window.setTimeout(() => setToastMessage(null), 2000);
    return true;
  }

  if (invites.length === 0) {
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
          invitations={invites}
          selectedSlug={selectedSlug}
          onChange={setSelectedSlug}
        />
        <KpiCards rsvps={listRSVPs(selectedSlug)} />
        <FiltersBar filters={filters} onChange={setFilters} />
        <div className="flex flex-col gap-3">
          <CheckInPanel onCheckIn={handleCheckIn} toastMessage={toastMessage} />
          <CsvExportButton
            rsvps={listRSVPs(selectedSlug)}
            filename={`rsvps_${selectedSlug}.csv`}
          />
        </div>
      </section>

      <section className="fade-in mt-6">
        <h2 className="text-lg font-semibold text-ink">回答一覧</h2>
        <p className="mt-1 text-sm text-ink/60">
          表示中 {rsvps.length} 件
        </p>
        <div className="mt-4">
          <RsvpTable rsvps={rsvps} checkedInIds={checkedInIds} />
        </div>
      </section>
    </div>
  );
}
