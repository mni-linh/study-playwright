/* JAVASCRIPT */
function calculateDateDiff(fromDate, toDate) {
  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  const from = parseDate(fromDate);
  const to = parseDate(toDate);

  const diffInTime = to - from;
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
  return Math.abs(diffInDays);
}

const fromDate = "20/01/2023";
const toDate = "20/05/2023";

console.log("Số ngày:", calculateDateDiff(fromDate, toDate));
