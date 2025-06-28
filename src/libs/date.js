const addZero = (number) => {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
};

export const getDateandTime = () => {
  let hoy = new Date();
  let hour = hoy.getHours();
  let minutes = hoy.getMinutes();
  let period = "";
  let day = hoy.getDate();
  let month = hoy.getMonth() + 1;
  let year = hoy.getFullYear();

  if (hour >= 12) {
    period = "PM";
    if (hour > 12) {
      hour = hour - 12;
    }
  } else {
    period = "AM";
    if (hour == 0) {
      hour = 12;
    }
  }

  minutes = addZero(minutes);
  day = addZero(day);
  month = addZero(month);

  return {
    date: `${day}/${month}/${year}`,
    time: `${hour}:${minutes} ${period}`,
  };
};

export const dateStyleYMD = (date) => {
  return date.split("/").reverse().join("-");
};

export const dateStyleDMY = (date) => {
  return date.split("-").reverse().join("/");
};
