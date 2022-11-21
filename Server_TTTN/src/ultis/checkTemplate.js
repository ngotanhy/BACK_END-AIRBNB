const moment = require("moment/moment");

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

const checkBoolean = (check) => {
  return check === 'true' ? true : false;
}

const checkSameDay = (d1, d2) => {
  const formatDate = "YYYY DD MM"
  const date1 = new Date(moment(d1).format(formatDate));
  const date2 = new Date(moment(d2).format(formatDate));

  if (date1.toDateString() === date2.toDateString()) {
    console.log('✅ dates are the same day');
  } else {
    console.log('⛔️ dates are not the same day');
  }
}

module.exports = {
  checkSameDay,
  checkBoolean
}

