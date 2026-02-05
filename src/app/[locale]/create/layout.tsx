import type { ReactNode } from "react";
import { CreateFlowProvider } from "@/components/CreateFlowProvider";

export const runtime = "edge";

export default function CreateLayout({ children }: { children: ReactNode }) {
  // Wrap multi-step builder with shared state.
  return <CreateFlowProvider>{children}</CreateFlowProvider>;
}
