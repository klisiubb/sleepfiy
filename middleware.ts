import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default withAuth(async function middleware(req: any) {}, {
  isReturnToCurrentPage: true,
  loginPage: "/api/auth/login",
  isAuthorized: true
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
