const BACKEND_URL = "https://notehub-api.goit.study";

export async function forwardRequest(req: Request, path: string) {
  const incoming = new URL(req.url);
  const search = incoming.search || "";
  const url = `${BACKEND_URL}${path}${search}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() === "host") {
      return;
    }

    if (key.toLowerCase() === "content-length") {
      return;
    }

    headers.set(key, value);
  });

  const response = await fetch(url, {
    method: req.method,
    headers,
    body:
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : await req.text(),
  });

  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      responseHeaders.append("set-cookie", value);
      return;
    }

    if (key.toLowerCase() === "content-length") {
      return;
    }

    responseHeaders.set(key, value);
  });

  const text = await response.text();
  return new Response(text, {
    status: response.status,
    headers: responseHeaders,
  });
}
