import { NextRequest } from "next/server";
import { forwardRequest } from "../_helpers";

export async function GET(req: NextRequest) {
  return forwardRequest(req, "/notes");
}

export async function POST(req: NextRequest) {
  return forwardRequest(req, "/notes");
}
