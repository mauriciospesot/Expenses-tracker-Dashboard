import MONTHS from "./Constants.jsx";

/* 
This method return current month number. If the current month is Agosto, it will return the number 8. 
*/
export const getCurrentMonthNumber = () => {
  return new Date().getMonth() + 1;
};

/* 
This method return the current year.
*/
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

/* 
This method sums all the values of a given property of an object.
*/
export const sumObjectProp = (arr, prop) => {
  return arr.reduce((sum, item) => {
    return sum + parseFloat(item[prop]);
  }, 0);
};

/* 
This method return Ago/24 if the month is Agosto and the year is 2024.
*/
export const formatMonthYear = (month, year) => {
  if (month === null || year === null) return;

  let monthSubstring = month.toLowerCase().substring(0, 3);
  monthSubstring =
    monthSubstring.charAt(0).toUpperCase() + monthSubstring.slice(1);
  let yearSubstring = year.toString().substring(2, 4);

  return monthSubstring + "/" + yearSubstring;
};

export default {
  getCurrentMonthNumber,
  sumObjectProp,
  formatMonthYear,
  getCurrentYear,
};
