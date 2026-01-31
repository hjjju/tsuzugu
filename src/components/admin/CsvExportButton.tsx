import type { RSVP } from "@/lib/data/rsvps";

function formatCsvField(value: string | number) {
  const stringValue = String(value ?? "");
  if (stringValue.includes(",") || stringValue.includes("\n") || stringValue.includes("\"")) {
    return `"${stringValue.replace(/\"/g, '""')}"`;
  }
  return stringValue;
}

function createCsvContent(rows: RSVP[]) {
  const header = [
    "姓",
    "名",
    "ふりがな",
    "出欠",
    "同伴者",
    "アレルギー",
    "メッセージ",
    "メール",
    "電話",
    "回答日時",
  ];
  const lines = rows.map((row) => [
    row.lastName,
    row.firstName,
    row.furigana,
    row.attendance === "attend" ? "出席" : "欠席",
    row.guestsCount,
    row.allergyText,
    row.messageToCouple,
    row.email,
    row.phone ?? "",
    row.createdAtISO,
  ]);
  return [header, ...lines]
    .map((line) => line.map(formatCsvField).join(","))
    .join("\n");
}

type CsvExportButtonProps = {
  rsvps: RSVP[];
  filename: string;
};

export default function CsvExportButton({ rsvps, filename }: CsvExportButtonProps) {
  function handleExport() {
    const csv = createCsvContent(rsvps);
    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="flex h-11 items-center justify-center rounded-full border border-ink/20 bg-white px-4 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
    >
      CSVを書き出す
    </button>
  );
}
