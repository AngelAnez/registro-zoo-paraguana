const addZero = (number) => {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
};

export const getDateandTime = () => {
  let todayDate = new Date();
  let hour = todayDate.getHours();
  let minutes = todayDate.getMinutes();
  let period = "";
  let day = todayDate.getDate();
  let month = todayDate.getMonth() + 1;
  let year = todayDate.getFullYear();

  if (hour >= 12) {
    period = "pm";
    if (hour > 12) {
      hour = hour - 12;
    }
  } else {
    period = "am";
    if (hour == 0) {
      hour = 12;
    }
  }

  minutes = addZero(minutes);
  day = addZero(day);
  month = addZero(month);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat(undefined, options).format(
    todayDate
  );

  return {
    date: `${day}/${month}/${year}`,
    time: `${hour}:${minutes} ${period}`,
    date_time: formattedDate,
  };
};

export const dateStyleYMD = (date) => {
  return date.split("/").reverse().join("-");
};

export const dateStyleDMY = (date) => {
  return date.split("-").reverse().join("/");
};
