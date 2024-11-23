import AddSessionDialog from "@/components/add-session-dialog";
import { SleepCards } from "@/components/sleep-cards";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Tabs } from "@radix-ui/react-tabs";
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
        <h1 className="text-5xl font-bold tracking-tight">
          Hey 👋, {user.given_name}!
        </h1>
        <p className="text-muted-foreground">
          Track and analyze your sleep patterns to improve your rest quality.
        </p>
      </div>
      <AddSessionDialog />
      <Tabs defaultValue="week">
        <TabsList>
          <TabsTrigger value="week">Last week</TabsTrigger>
          <TabsTrigger value="month">Last month</TabsTrigger>
        </TabsList>
        <TabsContent value="week">
          Show your sleep stats from last 7 days.
          <SleepCards sessions={sessions} />
        </TabsContent>
        <TabsContent value="month">
          Show your sleep stats from last 30 days.
          <SleepCards sessions={sessions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
