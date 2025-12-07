import express from "express";
import { calculateCheckins } from "../src/checkinUtils.js";

const app = express();

// In-memory store for local simulation
global.checkinDates = [];

app.get("/", (req, res) => {
  // Step 1: Get date parameter or default to today
  const dateParam = req.query.date;
  const referenceDate = dateParam ? new Date(dateParam) : new Date();
  const dateStr = referenceDate.toISOString().split("T")[0];

  // Step 2: Add date if not already present
  if (!global.checkinDates.includes(dateStr)) {
    global.checkinDates.push(dateStr);
  }

  // Step 3: Calculate stats using pure function
  const result = calculateCheckins(global.checkinDates, referenceDate);

  // Step 4: Return JSON response
  res.json({
    simulatedDate: dateStr,
    ...result
  });
});

app.listen(3000, () => {
  console.log("Local server running at http://localhost:3000");
  console.log("Try: http://localhost:3000/?date=2025-12-01");
});