const moment = require("moment");

const checkItem = (check) => {
  return check === 'true' || check === "1" || check === 1 ? true : false;
}

const checkObjItem = (object, item) => {
  for (let i in object) {
    if (i !== 'id') {
      let temp = object[i];
      if (item[i] !== undefined && item[i] !== null && Boolean(item[i])) {
        if (item[i] === 'true' || item[i] === 'false') {
          temp = checkItem(item[i]);
          object[i] = temp;
        } else if (Number(item[i]) >= 0) {
          object[i] = Number(item[i]);
        } else {
          object[i] = item[i];
        }
      }
    }
  }
  return object;
}

const checkDay = (dIn, dCreIN, dOut, dCreOut) => {
  const formatDate = "MM/DD/YYYY";
  const date1 = moment(dIn).format(formatDate);
  const date2 = moment(dCreIN).format(formatDate);
  const date3 = moment(dOut).format(formatDate);
  const date4 = moment(dCreOut).format(formatDate);
  const currentDate = moment().format(formatDate);

  //   console.log(date2);
  //   console.log(currentDate)
  // console.log(moment(date2).isAfter(currentDate, 'date'))


  if ((moment(date2).isAfter(currentDate, 'date') || moment(date2).isSame(currentDate, 'date')) && moment(date2).isBefore(date4, 'date')) {
    if (moment(date2).isSame(date1, 'date') && moment(date4).isSame(date3, 'date')) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }

}

const checkDayValid = (dIn, dCreIN, dOut, dCreOut) => {
  const formatDate = "MM-DD-YYYY";
  const date1 = moment(dIn).format(formatDate);
  const date2 = moment(dCreIN).format(formatDate);
  const date3 = moment(dOut).format(formatDate);
  const date4 = moment(dCreOut).format(formatDate);
  const currentDate = moment().format(formatDate);
  let temp = false;

  if ((moment(date2).isAfter(currentDate, 'date') || moment(date2).isSame(currentDate, 'date')) && moment(date2).isBefore(date4, 'date')) {
    if (moment(date2).isAfter(date3, 'date')) {
      temp = true;
    } else if (moment(date4).isBefore(date1, 'date')) {
      temp = true;
    } else {
      temp = false;
    }
  } else {
    temp = false;
  }
  return temp;
}

module.exports = {
  checkDayValid,
  checkDay,
  checkItem,
  checkObjItem
}

