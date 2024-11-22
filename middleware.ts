import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default withAuth(async function middleware(req: any) {}, {
  isReturnToCurrentPage: true,
  loginPage: "/api/auth/login",
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
