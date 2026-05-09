import { forwardRequest } from "@/app/api/_helpers";

export async function GET(req: Request) {
  return forwardRequest(req, "/users/me");
}

export async function PATCH(req: Request) {
  return forwardRequest(req, "/users/me");
}
