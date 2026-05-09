"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setIsChecking] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
          if (pathname === "/sign-in" || pathname === "/sign-up") {
            router.replace("/profile");
          }
        } else {
          clearIsAuthenticated();
          if (
            pathname.startsWith("/profile") ||
            pathname.startsWith("/notes")
          ) {
            router.replace("/sign-in");
          }
        }
      } catch {
        clearIsAuthenticated();
        if (pathname.startsWith("/profile") || pathname.startsWith("/notes")) {
          router.replace("/sign-in");
        }
      } finally {
        if (active) setIsChecking(false);
      }
    };

    verifySession();

    return () => {
      active = false;
    };
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
