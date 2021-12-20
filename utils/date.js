export function getFormatedDateObj(dateTimeString) {
  if (!dateTimeString)
    return null;
  const monthNames = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct",
  "Nov", "Dec"
  ];
  let date = parseDateString(dateTimeString);
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  return {day, month: monthNames[monthIndex], year};
}

export function parseDateString(dateString) {
  if (!dateString)
    return null;

  let arr = dateString.split('-').map(part => {return parseInt(part);});
  return new Date(arr[0], arr[1] - 1, arr[2]);
}

export function getOrdinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = n%100;
  return (s[(v-20)%10] || s[v] || s[0]);
}