import { redirect } from "next/navigation";

export default function Home({ children }) {
  redirect("/text-generator");
  return;
}
