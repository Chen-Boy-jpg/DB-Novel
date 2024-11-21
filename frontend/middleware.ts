import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("session"); // 假設 session 是你的登入狀態的 cookie

  if (pathname === "/") {
    
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/login" && cookie) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!cookie && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/login"],
};
