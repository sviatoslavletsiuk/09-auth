import { forwardRequest } from "@/app/api/_helpers";

export async function GET(req: Request) {
  return forwardRequest(
    req,
    "/notes" + new URL(req.url).pathname.split("/notes")[1],
  );
}

export async function DELETE(req: Request) {
  return forwardRequest(
    req,
    "/notes" + new URL(req.url).pathname.split("/notes")[1],
  );
}
