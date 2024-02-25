import { getUserSession } from "../models/userSession.js";
import { getTodayDate } from "../middlewares/todayDate.js";
import { getVisits } from "../models/visits.js";
import decimal from "decimal.js-light"; 

export const getEstadisticas = (req, res) => {
  renderEstadisticas(res, getTodayDate(), getTodayDate())
}

export const postEstadisticas = (req, res) => {
  const dateRange = formatDateRange(req.body.startDate, req.body.endDate)
  renderEstadisticas(res, dateRange[0], dateRange[1])
}

export const renderEstadisticas = (res, startDate, endDate) => {
  const user = getUserSession();
  const today = getTodayDate().split("/").reverse().join("-")

  startDate = startDate.split("/").reverse().join("-")
  endDate = endDate.split("/").reverse().join("-")

  let { childrenNumber, adultsNumber, seniorsNumber, totalBolivars, totalDolars, yearIncome } = showStats(
    startDate,
    endDate
  );

  res.render("estadisticas", {
    username: user.username,
    childrenNumber,
    adultsNumber,
    seniorsNumber,
    totalBolivars,
    totalDolars,
    yearIncome,
    startDate,
    endDate,
    today
  });
};

const showStats = (startDate, endDate) => {
  const data = getVisits();

  let yearIncome = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  let visits = data
  .split("\n")
  .filter((e) => e != "")
  .reverse()
  .map((visit) => {
    return JSON.parse(visit);
  });

  let actualDate = new Date(startDate + 'T00:00:00')
  const endIn = new Date(endDate + 'T00:00:00')
  
  let dataStats = {
    childrenNumber: 0,
    adultsNumber: 0,
    seniorsNumber: 0,
    totalBolivars: 0,
    totalDolars: 0,
    yearIncome
  }

  while(endIn.getTime() >= actualDate.getTime()){
    let styledDate = stylingDate(actualDate)
    visits.forEach((visit) => {
     if (visit.date == styledDate){
       dataStats.childrenNumber += parseInt(visit.childrenNumber)
       dataStats.adultsNumber += parseInt(visit.adultsNumber)
       dataStats.seniorsNumber += parseInt(visit.seniorsNumber)

       let bolivarsValue = new decimal(visit.totalBolivars)
       dataStats.totalBolivars = bolivarsValue.plus(new decimal(dataStats.totalBolivars)).toNumber()

       let dolarsValue = new decimal(visit.totalDolars)
       dataStats.totalDolars = dolarsValue.plus(new decimal(dataStats.totalDolars)).toNumber()
     }
    });
    actualDate.setDate(actualDate.getDate() + 1);
  }
  return dataStats
}

const formatDateRange = (start, end) => {
  const startDate = new Date(start + 'T00:00:00')
  const endDate = new Date(end + 'T00:00:00')
  return [stylingDate(startDate), stylingDate(endDate)]
}

const stylingDate = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  return day + '/' + month + '/' + year;
}