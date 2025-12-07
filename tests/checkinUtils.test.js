import { calculateCheckins } from "../src/checkinUtils.js";

describe("calculateCheckins", () => {
  const referenceDate = new Date("2025-12-07"); // December 7, 2025

  it("should count dates in current month", () => {
    const dates = ["2025-12-01", "2025-12-05", "2025-11-20"];
    const result = calculateCheckins(dates, referenceDate);

    expect(result.currentMonth.count).toBe(2);
    expect(result.currentMonth.dates).toEqual([1, 5]);
  });

  it("should count dates in last month", () => {
    const dates = ["2025-11-01", "2025-11-15", "2025-12-02"];
    const result = calculateCheckins(dates, referenceDate);

    expect(result.lastMonth.count).toBe(2);
    expect(result.lastMonth.dates).toEqual([1, 15]);
  });

  it("should handle year rollover correctly (January reference)", () => {
    const janRef = new Date("2025-01-10");
    const dates = ["2025-01-05", "2024-12-31"];
    const result = calculateCheckins(dates, janRef);

    expect(result.currentMonth.count).toBe(1);
    expect(result.currentMonth.dates).toEqual([5]);
    expect(result.lastMonth.count).toBe(1);
    expect(result.lastMonth.dates).toEqual([31]);
  });

  it("should return zero counts when no dates match", () => {
    const dates = ["2025-10-01"];
    const result = calculateCheckins(dates, referenceDate);

    expect(result.currentMonth.count).toBe(0);
    expect(result.lastMonth.count).toBe(0);
  });
});
