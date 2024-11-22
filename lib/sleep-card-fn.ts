import { SleepSession } from "@prisma/client";

// Function to calculate average sleep duration for a given period (in days) and the comparison with the previous period
export function calculateAvgSleepDuration(
  sessions: SleepSession[],
  period: number
): { average: number; difference: string } {
  // Get the current date
  const now = new Date();

  // Calculate the start and end dates for the current period
  const periodStartDate = new Date(now);
  periodStartDate.setDate(now.getDate() - period);

  // Calculate the start and end dates for the previous period
  const previousPeriodStartDate = new Date(periodStartDate);
  previousPeriodStartDate.setDate(periodStartDate.getDate() - period);

  // Filter sessions for the current period
  const currentPeriodSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.wentToBedAt);
    return sessionDate >= periodStartDate;
  });

  // Filter sessions for the previous period
  const previousPeriodSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.wentToBedAt);
    return (
      sessionDate >= previousPeriodStartDate && sessionDate < periodStartDate
    );
  });

  // Function to calculate total sleep time in minutes
  const calculateTotalSleepTimeInMinutes = (
    sessions: SleepSession[]
  ): number => {
    return sessions.reduce((sum, session) => {
      const wentToBedAt = new Date(session.wentToBedAt);
      const wokeUpAt = new Date(session.wokeUpAt);
      const sleepDurationInMinutes =
        (wokeUpAt.getTime() - wentToBedAt.getTime()) / (1000 * 60);
      return sum + sleepDurationInMinutes;
    }, 0);
  };

  // Calculate the total sleep time for the current period and previous period
  const totalSleepTimeCurrentPeriod = calculateTotalSleepTimeInMinutes(
    currentPeriodSessions
  );
  const totalSleepTimePreviousPeriod = calculateTotalSleepTimeInMinutes(
    previousPeriodSessions
  );

  // Calculate the average sleep time for the current period
  const averageSleepTimeCurrentPeriod =
    currentPeriodSessions.length > 0
      ? totalSleepTimeCurrentPeriod / currentPeriodSessions.length
      : 0;

  // Calculate the average sleep time for the previous period
  const averageSleepTimePreviousPeriod =
    previousPeriodSessions.length > 0
      ? totalSleepTimePreviousPeriod / previousPeriodSessions.length
      : 0;

  // Convert average sleep times from minutes to hours (rounded to 1 decimal place)
  const averageSleepInHoursCurrentPeriod =
    Math.round((averageSleepTimeCurrentPeriod / 60) * 10) / 10;

  const averageSleepInHoursPreviousPeriod =
    Math.round((averageSleepTimePreviousPeriod / 60) * 10) / 10;

  // Calculate the difference between the current period and previous period
  const differenceInSleepTime =
    averageSleepInHoursCurrentPeriod - averageSleepInHoursPreviousPeriod;

  // Return the average sleep in hours and the difference as a formatted string
  const differenceString =
    differenceInSleepTime >= 0
      ? `+${differenceInSleepTime.toFixed(1)}h from last ${period} days`
      : `${differenceInSleepTime.toFixed(1)}h from last ${period} days`;

  return {
    average: averageSleepInHoursCurrentPeriod,
    difference: differenceString,
  };
}
