import { getTodayDate, dateStyleForm } from "../lib/date.js";
import Visit from "../models/visit.model.js";
import decimal from "decimal.js-light"; 

export const getEstadisticas = (req, res) => {
  renderEstadisticas(req, res, getTodayDate(), getTodayDate())
}

export const postEstadisticas = (req, res) => {
  const dateRange = formatDateRange(req.body.startDate, req.body.endDate)
  renderEstadisticas(req, res, dateRange[0], dateRange[1])
}

export const renderEstadisticas = async (req, res, startDate, endDate) => {
  try {
    const {username, admin} = req.user
    const today = dateStyleForm(getTodayDate())
    const data = await Visit.find()
    
    startDate = dateStyleForm(startDate)
    endDate = dateStyleForm(endDate)
    
    const { childrenNumber, adultsNumber, seniorsNumber, totalBolivars, totalDolars, cashBolivars, cashDolars, eMoneyBolivars } = getVisitStats(
      data,
      startDate,
      endDate
    );
    res.render("estadisticas", {
      username,
      admin,
      childrenNumber,
      adultsNumber,
      seniorsNumber,
      totalBolivars,
      totalDolars,
      cashBolivars,
      cashDolars,
      eMoneyBolivars,
      startDate,
      endDate,
      today
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

const getVisitStats = (data, startDate, endDate) => {
  let visits = data.reverse()

  let actualDateRange = new Date(startDate + 'T00:00:00')
  const endDateRange = new Date(endDate + 'T00:00:00')
  
  let dataStats = {
    childrenNumber: 0,
    adultsNumber: 0,
    seniorsNumber: 0,
    totalBolivars: 0,
    totalDolars: 0,
    cashBolivars: 0,
    cashDolars: 0,
    eMoneyBolivars: 0
  }

  while(endDateRange.getTime() >= actualDateRange.getTime()){
    let styledDate = stylingDate(actualDateRange)
    visits.forEach((visit) => {
     if (visit.date == styledDate){
       dataStats.childrenNumber += parseInt(visit.childrenNumber)
       dataStats.adultsNumber += parseInt(visit.adultsNumber)
       dataStats.seniorsNumber += parseInt(visit.seniorsNumber)

       let bolivarsValue = new decimal(visit.totalBolivars)
       let dolarsValue = new decimal(visit.totalDolars)
       
       if (visit.paymentMethod == "Efectivo"){
          if (visit.extraInfoPayment == "Dolar"){
            dataStats.totalDolars = dolarsValue.plus(new decimal(dataStats.totalDolars)).toNumber()
            dataStats.cashDolars = bolivarsValue.plus(new decimal(dataStats.cashDolars)).toNumber()
          } else{
            dataStats.totalBolivars = bolivarsValue.plus(new decimal(dataStats.totalBolivars)).toNumber()
            dataStats.cashBolivars = bolivarsValue.plus(new decimal(dataStats.cashBolivars)).toNumber()
          }
       } else {
          dataStats.totalBolivars = bolivarsValue.plus(new decimal(dataStats.totalBolivars)).toNumber()
          dataStats.eMoneyBolivars = bolivarsValue.plus(new decimal(dataStats.eMoneyBolivars)).toNumber()
       }
     }
    });
    actualDateRange.setDate(actualDateRange.getDate() + 1);
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