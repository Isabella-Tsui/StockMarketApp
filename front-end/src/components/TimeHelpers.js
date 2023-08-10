// Function Name: convertUnixTimestampToDate
// Purpose: Convert time into unix stamp
// Parameters: unixTimestamp

const convertUnixTimestampToDate = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000;
  return new Date(milliseconds).toLocaleDateString();
};

const createDate = (date, days, weeks, months, years) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

const convertDateToUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};
