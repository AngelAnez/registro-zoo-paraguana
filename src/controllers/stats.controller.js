import { getDateandTime, dateStyleYMD, dateStyleDMY } from "../libs/date.js";
import decimal from "decimal.js-light";
import { pool } from "../db.js";
import { DEFAULT_ALERT } from "../libs/default-alert.js";

export const getStats = (req, res) => {
  const data = {
    startDate: getDateandTime().date,
    endDate: getDateandTime().date,
  };
  renderStats(req, res, data);
};

export const postStats = (req, res) => {
  const data = {
    startDate: dateStyleDMY(req.body.startDate),
    endDate: dateStyleDMY(req.body.endDate),
  };
  renderStats(req, res, data);
};

export const renderStats = async (
  req,
  res,
  { startDate, endDate, alert = DEFAULT_ALERT }
) => {
  try {
    const { username, admin } = req.user;
    const today = dateStyleYMD(getDateandTime().date);
    startDate = dateStyleYMD(startDate);
    endDate = dateStyleYMD(endDate);
    const dataQuery =
      await pool.query(`SELECT * FROM visits INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id
    INNER JOIN kids ON visits.kids_id=kids._id
    INNER JOIN adults ON visits.adults_id=adults._id
    INNER JOIN elders ON visits.elders_id=elders._id
    WHERE DATE(date_time) BETWEEN '${startDate}' AND '${endDate}'`);

    const data = dataQuery[0];

    const {
      totalKids,
      totalAdults,
      totalElders,
      totalBolivars,
      totalDolars,
      cash,
      bankTransfer,
      mobilePay,
      other,
    } = getVisitStats(data);
    res.render("app/modules/stats/stats", {
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
      other,
      ...alert,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getVisitStats = (data) => {
  let dataStats = {
    boys: 0,
    girls: 0,
    courtesyKids: 0,
    men: 0,
    women: 0,
    courtesyAdults: 0,
    elderMen: 0,
    elderWomen: 0,
    totalKids: 0,
    totalAdults: 0,
    totalElders: 0,
    totalBolivars: 0,
    totalDolars: 0,
    bankTransfer: {
      dolars: 0,
      bolivars: 0,
    },
    mobilePay: {
      dolars: 0,
      bolivars: 0,
    },
    cash: {
      dolars: 0,
      bolivars: 0,
    },
    other: {
      dolars: 0,
      bolivars: 0,
    },
  };

  data.forEach((visit) => {
    dataStats.boys += parseInt(visit.boys);
    dataStats.girls += parseInt(visit.girls);
    dataStats.courtesyKids += parseInt(visit.courtesyKids);
    dataStats.men += parseInt(visit.men);
    dataStats.women += parseInt(visit.women);
    dataStats.courtesyAdults += parseInt(visit.courtesyAdults);
    dataStats.elderMen += parseInt(visit.elderMen);
    dataStats.elderWomen += parseInt(visit.elderWomen);
    dataStats.totalKids += parseInt(visit.totalKids);
    dataStats.totalAdults += parseInt(visit.totalAdults);
    dataStats.totalElders += parseInt(visit.totalElders);
    let bolivarsValue = new decimal(visit.totalBolivars);
    let dolarsValue = new decimal(visit.totalDollars);
    if (visit.method == "Efectivo") {
      dataStats.cash.dolars = dolarsValue
        .plus(new decimal(dataStats.cash.dolars))
        .toNumber();
      dataStats.cash.bolivars = bolivarsValue
        .plus(new decimal(dataStats.cash.bolivars))
        .toNumber();
    } else if (visit.method == "Pago Móvil") {
      dataStats.mobilePay.dolars = dolarsValue
        .plus(new decimal(dataStats.mobilePay.dolars))
        .toNumber();
      dataStats.mobilePay.bolivars = bolivarsValue
        .plus(new decimal(dataStats.mobilePay.bolivars))
        .toNumber();
    } else if (visit.method == "Transferencia") {
      dataStats.bankTransfer.dolars = dolarsValue
        .plus(new decimal(dataStats.bankTransfer.dolars))
        .toNumber();
      dataStats.bankTransfer.bolivars = bolivarsValue
        .plus(new decimal(dataStats.bankTransfer.bolivars))
        .toNumber();
    } else if (visit.method == "Otro") {
      dataStats.other.dolars = dolarsValue
        .plus(new decimal(dataStats.other.dolars))
        .toNumber();
      dataStats.other.bolivars = bolivarsValue
        .plus(new decimal(dataStats.other.bolivars))
        .toNumber();
    }
    dataStats.totalDolars = dolarsValue
      .plus(new decimal(dataStats.totalDolars))
      .toNumber();
  });
  return dataStats;
};
