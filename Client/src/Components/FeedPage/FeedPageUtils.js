export function convertHMS(value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  if (hours < 12) {
    return hours + ':' + minutes + ' AM';
  }

  hours = Math.abs(12 - hours);
  return hours + ':' + minutes + ' PM'; // Return is HH : MM
}

export function convertDays(day) {
  var dayString;
  switch (day) {
    case 0:
      dayString = 'M';
      break;
    case 1:
      dayString = 'Tu';
      break;
    case 2:
      dayString = 'W';
      break;
    case 3:
      dayString = 'Th';
      break;
    case 4:
      dayString = 'F';
      break;
    case 5:
      dayString = 'Sa';
      break;
    default:
      dayString = 'Su';
      break;
  }
  return dayString + ' ';
}
