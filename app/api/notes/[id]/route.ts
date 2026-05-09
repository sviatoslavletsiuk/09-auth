import { NextRequest } from "next/server";
import { forwardRequest } from "../../_helpers";

const getIdFromUrl = (req: NextRequest) => {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1] || "";
};

export async function GET(req: NextRequest) {
  const id = getIdFromUrl(req);
  return forwardRequest(req, `/notes/${id}`);
}

export async function PUT(req: NextRequest) {
  const id = getIdFromUrl(req);
  return forwardRequest(req, `/notes/${id}`);
}

export async function DELETE(req: NextRequest) {
  const id = getIdFromUrl(req);
  return forwardRequest(req, `/notes/${id}`);
}
