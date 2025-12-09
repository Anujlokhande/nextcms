import { NextResponse } from "next/server";
import { rateLimit } from "./utils/rate-limit";

export default async function middleware(request) {
  const allowedOrigins = ["http://localhost:3000"];

  if (request.method == "POST") {
    const origin = request.headers.get("origin");
    if (!allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { message: "Unauthorized Origin" },
        { status: 403 }
      );
    }
    let ip = request.ip || request.headers.get("x-forwaded-for") || "unknown";
    const { limit, remaining, reset } = await rateLimit.limit(ip);
    if (remaining == 0) {
      return NextResponse.json(
        { message: "You Have Reached Req Limit" },
        { status: 429 }
      );
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/api/v1/:path",
};
