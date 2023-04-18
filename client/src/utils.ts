export function formatDate(date: string) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function formatTime(time: string) {
  var minutes = (parseInt(time) / 60).toFixed(0);
  var seconds = (parseInt(time) % 60).toFixed(0);

  if (parseInt(seconds) < 10) seconds = "0" + seconds;

  return minutes + " min. " + seconds + " sek.";
}
