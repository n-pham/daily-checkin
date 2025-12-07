export function calculateCheckins(dates, referenceDate = new Date()) {
  const currentMonth = referenceDate.getMonth(); // 0-11
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentYear = referenceDate.getFullYear();
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  // Helper: extract day number from YYYY-MM-DD
  const getDayNumber = (dateStr) => {
    const dt = new Date(dateStr);
    return dt.getDate(); // returns integer day of month
  };

  const currentMonthDates = dates
    .filter(d => {
      const dt = new Date(d);
      return dt.getMonth() === currentMonth && dt.getFullYear() === currentYear;
    })
    .map(getDayNumber);

  const lastMonthDates = dates
    .filter(d => {
      const dt = new Date(d);
      return dt.getMonth() === lastMonth && dt.getFullYear() === lastMonthYear;
    })
    .map(getDayNumber);

  return {
    currentMonth: {
      count: currentMonthDates.length,
      dates: currentMonthDates
    },
    lastMonth: {
      count: lastMonthDates.length,
      dates: lastMonthDates
    }
  };
}
