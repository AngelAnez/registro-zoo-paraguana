import { getTodayDate, dateStyleYMD, dateStyleDMY } from "../lib/date.js";
import decimal from "decimal.js-light"; 
import { pool } from "../mysqlDb.js";

export const getEstadisticas = (req, res) => {
  renderEstadisticas(req, res, getTodayDate(), getTodayDate())
}

export const postEstadisticas = (req, res) => {
  const startDate = dateStyleDMY(req.body.startDate)
  const endDate = dateStyleDMY(req.body.endDate)
  renderEstadisticas(req, res, startDate, endDate)
}

export const renderEstadisticas = async (req, res, startDate, endDate) => {
  try {
    const {username, admin} = req.user
    const today = dateStyleYMD(getTodayDate())
    startDate = dateStyleYMD(startDate)
    endDate = dateStyleYMD(endDate)
    const dataQuery = await pool.query(`SELECT * FROM visits INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id
    INNER JOIN kids ON visits.kids_id=kids._id
    INNER JOIN adults ON visits.adults_id=adults._id
    INNER JOIN elders ON visits.elders_id=elders._id
    WHERE date BETWEEN '${startDate}' AND '${endDate}'`)
    
    const data = dataQuery[0]
    
    const { totalKids, totalAdults, totalElders, totalBolivars, totalDolars, cash, bankTransfer, mobilePay, other } = getVisitStats(
      data
    );
    res.render("estadisticas", {
      username,
      admin,
      totalKids,
      totalAdults,
      totalElders,
      totalBolivars,
      totalDolars,
      startDate,
      endDate,
      today,
      cash,
      bankTransfer,
      mobilePay,
      other
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const getVisitStats = (data) => {
  
  let dataStats = {
    totalKids: 0,
    totalAdults: 0,
    totalElders: 0,
    totalBolivars: 0,
    totalDolars: 0,
    cashBolivars: 0,
    cashDolars: 0,
    eMoneyBolivars: 0,
    bankTransfer: 0,
    mobilePay: 0,
    cash: 0,
    other: 0
  }

  data.forEach(visit => {
    dataStats.totalKids += parseInt(visit.totalKids)
    dataStats.totalAdults += parseInt(visit.totalAdults)
    dataStats.totalElders += parseInt(visit.totalElders)
    let bolivarsValue = new decimal(visit.totalBolivars)
    let dolarsValue = new decimal(visit.totalDolars)
    if (visit.method == "Efectivo"){
      dataStats.cash = dolarsValue.plus(new decimal(dataStats.cash)).toNumber()
    } else if (visit.method == "Pago Móvil"){
      dataStats.mobilePay = dolarsValue.plus(new decimal(dataStats.mobilePay)).toNumber()
    } else if (visit.method == "Transferencia"){
      dataStats.bankTransfer = dolarsValue.plus(new decimal(dataStats.bankTransfer)).toNumber()
    } else if (visit.method == "Otro"){
      dataStats.other = dolarsValue.plus(new decimal(dataStats.other)).toNumber()
    }
    dataStats.totalDolars = dolarsValue.plus(new decimal(dataStats.totalDolars)).toNumber()
  })
  return dataStats
}