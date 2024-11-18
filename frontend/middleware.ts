import { NextResponse } from 'next/server';

export function middleware(req) {
  const cookie = req.cookies.get("session"); // 假設 session 是你的登入狀態的 cookie
  
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // 如果已登入，繼續執行
}

export const config = {
  matcher: ['/home'], // 只在這些路徑上觸發
};