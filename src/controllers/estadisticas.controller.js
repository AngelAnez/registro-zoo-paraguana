import { getUserSession } from "../models/userSession.js";
import { getTodayDate } from "../middlewares/todayDate.js";
import { getVisits } from "../models/visits.js";

export const renderEstadisticas = (req, res) => {
  const user = getUserSession();
  let date = req.query.date ?? getTodayDate();
  let year = date.split("/")[2];

  let { childStats, adultStats, olderStats, bs, dolar, yearIncome } = showStats(
    date,
    year
  );

  let monthlyIncome = yearIncome;

  let child = childStats ?? 0;
  let adult = adultStats ?? 0;
  let older = olderStats ?? 0;
  let incomeBs = bs ?? 0;
  let incomeDolar = dolar ?? 0;

  res.render("estadisticas", {
    username: user.username,
    child,
    adult,
    older,
    incomeBs,
    incomeDolar,
    monthlyIncome,
  });
};

const showStats = (date, year) => {
  const data = getVisits();
  let visits = data
    .split("\n")
    .filter((e) => e != "")
    .reverse()
    .map((visit) => {
      return JSON.parse(visit);
    });

  visits = visits.filter((visit) => {
    return Object.values(visit)
      .join("")
      .toLowerCase()
      .includes("/" + year);
  });

  let yearIncome = visits.reduce(
    (acc, val) => {
      let month = parseInt(val.date.split("/")[1]);
      acc[month - 1] += parseInt(val.bolivares);
      return acc;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

  visits = visits.filter((visit) => {
    return Object.values(visit).join("").toLowerCase().includes(date);
  });

  if (visits.length > 0) {
    let dateStats = visits.reduce(
      (acc, val) => {
        acc.child += parseInt(val.child);
        acc.adult += parseInt(val.adult);
        acc.older += parseInt(val.older);
        acc.bolivares += parseFloat(val.bolivares);
        acc.dolar += parseInt(val.dolar);

        return acc;
      },
      { child: 0, adult: 0, older: 0, bolivares: 0, dolar: 0 }
    );

    let { child, adult, older, bolivares, dolar } = dateStats;

    return {
      childStats: child,
      adultStats: adult,
      olderStats: older,
      bs: parseFloat(bolivares).toFixed(2),
      dolar,
      yearIncome,
    };
  } else {
    return {};
  }
};
