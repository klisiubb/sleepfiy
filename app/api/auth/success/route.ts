import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000/";

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
      },
    });
  }

  return NextResponse.redirect(URL);
}
