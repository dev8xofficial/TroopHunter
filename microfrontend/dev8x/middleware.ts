// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Normalize country code; Cloudflare sets `cf-ipcountry` in production.
  const rawCountry = request.headers.get("cf-ipcountry") || "PK";
  const countryCode = rawCountry.trim().toUpperCase();
  
  const response = NextResponse.next();
  response.headers.set("x-user-country", countryCode);

  return response;
}

export const config = {
  matcher: ["/:path*"],
};
