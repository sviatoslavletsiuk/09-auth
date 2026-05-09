import { redirect } from "next/navigation";
import { checkSession } from "@/lib/api/serverApi";

interface ProxyOptions {
  cookiesString?: string;
  privateRoute?: boolean;
  authRoute?: boolean;
}

export async function proxy({
  cookiesString,
  privateRoute = false,
  authRoute = false,
}: ProxyOptions) {
  const user = await checkSession({ cookies: cookiesString ?? "" });

  if (privateRoute && !user) {
    redirect("/sign-in");
  }

  if (authRoute && user) {
    redirect("/profile");
  }

  return { user };
}
