import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// THIS is the required new Next.js 15+ export
export async function proxy(request: Request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Protect admin pages
  if (request.url.includes("/admin")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Matcher tells proxy which routes to watch
export const config = {
  matcher: ["/admin/:path*"],
};
