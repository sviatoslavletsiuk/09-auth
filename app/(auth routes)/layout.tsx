import type { Metadata } from "next";
import AuthLayoutClient from "./AuthLayoutClient";

export const metadata: Metadata = {
  title: "Authentication - NoteHub",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}
