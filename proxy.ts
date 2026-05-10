import { redirect } from "next/navigation";

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
  // Session check is handled by AuthProvider in client
  // This is just a server-side helper for redirects
  
  return { user: null };
}
