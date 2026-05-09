import { redirect } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

// This is a server component, so we can't use the store directly.
// For simplicity, we'll assume auth is checked elsewhere.
// In a real app, you'd check cookies or headers here.

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For now, just render children
  // In production, check auth and redirect if not authenticated
  return <>{children}</>;
}
