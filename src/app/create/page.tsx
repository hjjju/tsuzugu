import { redirect } from "next/navigation";

export const runtime = "edge";

export default function CreateRedirect() {
  redirect("/jp/create");
}
