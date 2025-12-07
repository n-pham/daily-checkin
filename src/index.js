import { withDurableExecution } from "@aws/durable-execution-sdk-js";

import { calculateCheckins } from "./checkinUtils.js";

export const handler = withDurableExecution(
  async (event, context /** DurableContext */) => {
    // Step 1: Determine simulated date (from event or default today)
    const dateParam = event?.date;
    const referenceDate = dateParam ? new Date(dateParam) : new Date();
    const dateStr = referenceDate.toISOString().split("T")[0];

    // Step 2: Retrieve existing dates (checkpointed in a step)
    const dates = await context.step("get-checkins", async () => {
      // First run: initialize empty array
      return [];
    });

    // Step 3: Add today’s date if not already present
    const updatedDates = await context.step("record-checkin", async () => {
      if (!dates.includes(dateStr)) {
        return [...dates, dateStr];
      }
      return dates; // unchanged if already present
    });

    // Step 4: Calculate stats (day numbers only)
    const result = calculateCheckins(updatedDates, referenceDate);

    // Step 5: Return response
    return {
      today: dateStr,
      ...result
    };
  }
);
