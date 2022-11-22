const moment = require("moment/moment");

const checkItem = (check) => {
  return check === 'true' || check === "1" || check === 1 ? true : false;
}

// const checkEmpty=(check,currentItem,data) => {
//   if(Number(check)>0 && check > currentItem ){
     
//   }
// }

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

// const check

module.exports = {
  checkSameDay,
  checkItem
}

