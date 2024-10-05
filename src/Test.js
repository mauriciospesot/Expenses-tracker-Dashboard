export const formatMonthYear = (month, year) => {
  if (month === null || year === null) return;

  let monthSubstring = month.toLowerCase().substring(0, 3);
  monthSubstring =
    monthSubstring.charAt(0).toUpperCase() + monthSubstring.slice(1);
  let yearSubstring = year.toString().substring(2, 4);

  return monthSubstring + "/" + yearSubstring;
};

console.log(formatMonthYear("feBrErO", 2024));
