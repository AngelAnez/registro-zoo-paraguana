import Visit from "../models/visit.model.js";

export const renderHistorial = async (req, res) => {
  try {
    const { username, admin } = req.user;
    const data = await Visit.find()
    let pag = 10;
    let sort = ""; // Puede ser cualquier propiedad de las visitas
    let order = ""; // Puede ser asc o dec
    let searchFilter = "";
    if (req.query.pag) {
      pag = parseInt(req.query.pag) * 10;
    }
    if (req.query.sort && req.query.order) {
      sort = req.query.sort;
      order = req.query.order;
    }
    if (req.query.filter) {
      searchFilter = req.query.filter
        .replaceAll(/[^a-zA-Z0-9áéíóúÁÉÍÓÚÑñ/.: ]+/g, "")
        .toLowerCase();
    }
    let { visits, total } = showVisits(data, pag, sort, order, searchFilter);
    if (!visits) {
      visits = [];
    }
    if (!total) {
      total = 1;
    }
    res.render("historial", {
      username,
      admin,
      visits,
      total,
      pag: pag / 10,
      sort,
      order,
      searchFilter,
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

const showVisits = (data, pag, sort, order, searchFilter) => {
  let visits = data.reverse();

  if (searchFilter != "") {
    visits = visits.filter((visit) => {
      return Object.values(visit).join("").toLowerCase().includes(searchFilter);
    });
  }

  let totalData = visits.length;
  if (sort != "" && order != "") {
    if (order == "dec") {
      visits.sort((a, b) => {
        if (a[sort].includes(":")) {
          return comparingTime(a[sort], b[sort], order);
        }
        if (a[sort].includes("/")) {
          return comparingDate(a[sort], b[sort], order);
        }
        if (a[sort].includes("i")) {
          if (a[sort] > b[sort]) {
            return -1;
          }
          if (a[sort] < b[sort]) {
            return 1;
          }
          if (a[sort] == b[sort]) {
            return comparingTime(a.time, b.time, "dec");
          }
        }
        return parseInt(b[sort]) - parseInt(a[sort]);
      });
    }
    if (order == "asc") {
      visits.sort((a, b) => {
        if (a[sort].includes(":")) {
          return comparingTime(a[sort], b[sort], order);
        }
        if (a[sort].includes("/")) {
          return comparingDate(a[sort], b[sort], order);
        }
        if (a[sort].includes("i")) {
          if (a[sort] > b[sort]) {
            return 1;
          }
          if (a[sort] < b[sort]) {
            return -1;
          }
          if (a[sort] == b[sort]) {
            return comparingTime(a.time, b.time, "dec");
          }
        }
        return parseInt(a[sort]) - parseInt(b[sort]);
      });
    }
  }
  visits = visits.filter((e, index) => {
    if (index > pag - 11 && index < pag) {
      return e;
    }
  });
  return { visits, total: totalData };
};

function comparingTime(a, b, order) {
  let hours = [a, b];
  hours = hours.map((hour) => {
    hour = hour.split(":");
    if (hour[1].includes("pm") && hour[0] != "12") {
      hour[0] = parseInt(hour[0]) + 12;
    }
    hour[1] = hour[1].replaceAll(/ [a|p]m/g, "");
    hour[1] = parseInt(hour[1]);
    hour = hour[0] * 3600 + hour[1] * 60;
    return hour;
  });
  return order === "asc" ? hours[0] - hours[1] : hours[1] - hours[0];
}

function comparingDate(a, b, order) {
  let dates = [a, b];
  dates = dates.map((date) => {
    date = date.split("/");
    return { day: date[0], month: date[1], year: date[2] };
  });

  if (dates[0].year != dates[1].year) {
    return order === "asc"
      ? dates[0].year - dates[1].year
      : dates[1].year - dates[0].year;
  }
  if (dates[0].month != dates[1].month) {
    return order === "asc"
      ? dates[0].month - dates[1].month
      : dates[1].month - dates[0].month;
  }
  return order === "asc"
    ? dates[0].day - dates[1].day
    : dates[1].day - dates[0].day;
}
