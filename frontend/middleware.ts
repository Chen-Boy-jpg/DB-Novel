import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("session"); // 假設 session 是你的登入狀態的 cookie

  // 如果用户访问首页，且未登录，则重定向到登录页
  if (pathname === '/') {
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next(); // 已登录则正常访问首页
  }

  // 如果用户访问登录页，且已登录，重定向到主页
  if (pathname === '/login' && cookie) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  // 对于其他页面，如果未登录，跳转到登录页面
  if (!cookie && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // 如果已登录，继续执行
}

export const config = {
  matcher: ['/','/home','/login'], // 使所有路径都经过此中间件处理
};