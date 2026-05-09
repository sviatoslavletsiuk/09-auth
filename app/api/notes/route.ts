import { forwardRequest } from "@/app/api/_helpers";

export async function GET(req: Request) {
  return forwardRequest(req, "/notes");
}

export async function POST(req: Request) {
  return forwardRequest(req, "/notes");
}
