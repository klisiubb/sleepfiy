"use server";

import { ActionReturnType } from "@/lib/actionReturnType";
import { prisma } from "@/lib/db";
import { sleepFormSchema } from "@/schemas/sleep";

import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function CreateSleepSession({
  wentToBedAt,
  wokeUpAt,
  note,
  sleepRate,
  userId,
}: {
  wentToBedAt: Date;
  wokeUpAt: Date;
  note: string | null;
  sleepRate: number;
  userId: string;
}): Promise<ActionReturnType> {
  let sleepSession;

  try {
    await sleepFormSchema.parseAsync({
      wentToBedAt,
      wokeUpAt,
      note,
      sleepRate,
    });

    sleepSession = await prisma.sleepSession.create({
      data: {
        wentToBedAt,
        wokeUpAt,
        note,
        sleepRate,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: 400,
        message: `${e.issues[0].message}`,
      };
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          status: 400,
          message: "Database error",
        };
      }
    } else {
      return {
        status: 400,
        message: "Error. Try again later.",
      };
    }
  }

  if (!sleepSession) {
    return {
      status: 500,
      message: "Sleep session creation failed.",
    };
  }
  return {
    id: sleepSession.id,
    status: 201,
    message: "Sleep session created. Refreshing...",
  };
}
