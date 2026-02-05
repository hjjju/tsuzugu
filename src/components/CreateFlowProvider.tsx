"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type InvitationDraft = {
  groomName: string;
  brideName: string;
  title: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  message: string;
  dressCode?: string;
  cashGiftNote?: string;
  notes?: string;
};

type CreateFlowContextValue = {
  draft: InvitationDraft;
  updateField: (field: keyof InvitationDraft, value: string) => void;
  setDraft: (next: InvitationDraft) => void;
  inviteId: string | null;
  ensureInviteId: () => string;
  saveDraftToStorage: () => void;
};

const CreateFlowContext = createContext<CreateFlowContextValue | null>(null);

const initialDraft: InvitationDraft = {
  groomName: "",
  brideName: "",
  title: "結婚パーティー / 二次会",
  date: "",
  time: "",
  venueName: "",
  venueAddress: "",
  message:
    "日頃お世話になっている皆さまと、気楽に集まれる会にしました。\nご都合がよければぜひお越しください！",
  dressCode: "",
  cashGiftNote:
    "当日現金でも、事前にPayPayでの送金でも大丈夫です。\nご都合の良い方法でお気持ちを頂けたら嬉しいです。",
  notes: "",
};

function buildInviteId() {
  return `tsz-${Math.random().toString(36).slice(2, 8)}`;
}

export function CreateFlowProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<InvitationDraft>(initialDraft);
  const [inviteId, setInviteId] = useState<string | null>(null);

  const updateField = useCallback((field: keyof InvitationDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }, []);

  const ensureInviteId = useCallback(() => {
    if (inviteId) return inviteId;
    const nextId = buildInviteId();
    setInviteId(nextId);
    return nextId;
  }, [inviteId]);

  const saveDraftToStorage = useCallback(() => {
    if (typeof window === "undefined") return;
    const id = ensureInviteId();
    // NOTE: Prototype-only persistence. Replace with DB later.
    window.sessionStorage.setItem(`tsz-invite-${id}`, JSON.stringify(draft));
  }, [draft, ensureInviteId]);

  const value = useMemo(
    () => ({
      draft,
      updateField,
      setDraft,
      inviteId,
      ensureInviteId,
      saveDraftToStorage,
    }),
    [draft, updateField, inviteId, ensureInviteId, saveDraftToStorage]
  );

  return <CreateFlowContext.Provider value={value}>{children}</CreateFlowContext.Provider>;
}

export function useCreateFlow() {
  const context = useContext(CreateFlowContext);
  if (!context) {
    throw new Error("useCreateFlow must be used within CreateFlowProvider");
  }
  return context;
}
