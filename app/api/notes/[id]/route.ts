import { NextRequest } from "next/server";
import { forwardRequest } from "../../_helpers";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return forwardRequest(req, `/notes/${params.id}`);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return forwardRequest(req, `/notes/${params.id}`);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return forwardRequest(req, `/notes/${params.id}`);
}
