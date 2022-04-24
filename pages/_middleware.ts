import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  name: string;
};

export default async function middleware (req: any) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET! });

  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  const url = req.nextUrl.clone()
  url.pathname = '/login'

  if (!token && pathname !== "/login") return NextResponse.redirect(url);
}
