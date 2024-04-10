export const getTodayDate = () => {
  const createDate = new Date();
  let day = createDate.getDate();
  let month = createDate.getMonth() + 1;
  let year = createDate.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${day}/${month}/${year}`;
};

export const dateStyleYMD = (date) => {
  return date.split("/").reverse().join("-")
}

export const dateStyleDMY = (date) => {
  return date.split("-").reverse().join("/")
}