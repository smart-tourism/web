import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const authPage = "/login";
const dashboardPath = "/dashboard";

const extractPathname = (pathname: string) => {
  const parts = pathname.split("/");
  return parts[1];
};

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const path = extractPathname(pathname);

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token && authPage.includes(pathname)) {
      return NextResponse.redirect(new URL(dashboardPath, req.url));
    }

    if (requireAuth.includes(path)) {
      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
    }

    return middleware(req, next);
  };
}
