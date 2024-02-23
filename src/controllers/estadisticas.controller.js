import { getUserSession } from "../models/userSession.js";
import { getTodayDate } from "../middlewares/todayDate.js";
import { getVisits } from "../models/visits.js";

export const renderEstadisticas = (req, res) => {
  const user = getUserSession();
  let date = req.query.date ?? getTodayDate();
  let year = date.split("/")[2];

  let { childrenStats, adultsStats, seniorsStats, totalBolivars, totalDolars, yearIncome } = showStats(
    date,
    year
  );

  let monthlyIncome = yearIncome;

  let child = childrenStats ?? 0;
  let adult = adultsStats ?? 0;
  let senior = seniorsStats ?? 0;
  let incomeBs = totalBolivars ?? 0;
  let incomeDolar = totalDolars ?? 0;

  res.render("estadisticas", {
    username: user.username,
    child,
    adult,
    senior,
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
      acc[month - 1] += parseInt(val.totalBolivars);
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
        acc.childrenNumber += parseInt(val.childrenNumber);
        acc.adultsNumber += parseInt(val.adultsNumber);
        acc.seniorsNumber += parseInt(val.seniorsNumber);
        acc.totalBolivars += parseFloat(val.totalBolivars);
        acc.totalDolars += parseInt(val.totalDolars);

        return acc;
      },
      { childrenNumber: 0, adultsNumber: 0, seniorsNumber: 0, totalBolivars: 0, totalDolars: 0 }
    );

    let { childrenNumber, adultsNumber, seniorsNumber, totalBolivars, totalDolars } = dateStats;

    return {
      childrenStats: childrenNumber,
      adultsStats: adultsNumber,
      seniorsStats: seniorsNumber,
      totalBolivars: parseFloat(totalBolivars).toFixed(2),
      totalDolars,
      yearIncome,
    };
  } else {
    return {};
  }
};
