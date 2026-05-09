import { forwardRequest } from "@/app/api/_helpers";

export async function POST(req: Request) {
  return forwardRequest(req, "/auth/login");
}
