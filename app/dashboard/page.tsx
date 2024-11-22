import AddSessionDialog from "@/components/add-session-dialog";
import { SleepCards } from "@/components/sleep-cards";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const sessions = await prisma.sleepSession.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Hey 👋, {user.given_name}!
        </h1>
        <p className="text-muted-foreground">
          Track and analyze your sleep patterns to improve your rest quality.
        </p>
      </div>
      <AddSessionDialog />
      <SleepCards sessions={sessions} />
    </div>
  );
}
