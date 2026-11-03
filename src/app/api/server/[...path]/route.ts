type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxyToBookServer(request: Request, context: RouteContext) {
  const serverUrl = (
    process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8000"
  ).replace(/\/+$/, "");
  const { path } = await context.params;
  const targetUrl = new URL(
    `${path.map(encodeURIComponent).join("/")}${new URL(request.url).search}`,
    `${serverUrl}/`,
  );
  const headers = new Headers();
  const cookie = request.headers.get("cookie");
  const authorization = request.headers.get("authorization");
  const contentType = request.headers.get("content-type");

  if (cookie) {
    headers.set("cookie", cookie);
  }
  if (authorization) {
    headers.set("authorization", authorization);
  }
  if (contentType) {
    headers.set("content-type", contentType);
  }

  const body =
    request.method === "GET" || request.method === "HEAD" || !request.body
      ? undefined
      : await request.arrayBuffer();

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });
    const responseHeaders = new Headers();
    const responseContentType = response.headers.get("content-type");

    if (responseContentType) {
      responseHeaders.set("content-type", responseContentType);
    }

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      { error: "Could not reach the book server." },
      { status: 502 },
    );
  }
}

export async function GET(request: Request, context: RouteContext) {
  return proxyToBookServer(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  return proxyToBookServer(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return proxyToBookServer(request, context);
}

export async function DELETE(request: Request, context: RouteContext) {
  return proxyToBookServer(request, context);
}