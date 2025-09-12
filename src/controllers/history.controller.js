import { pool } from "../db.js";
import { DEFAULT_ALERT } from "../libs/default-alert.js";

export const getHistory = async (req, res) => {
  renderHistory(req, res, DEFAULT_ALERT);
};

export const renderHistory = async (req, res, alert) => {
  try {
    const { username, admin } = req.user;

    let searchFilter = "";
    const { pag = 1, sort = "", order = "ASC", filter } = req.query;

    const [totalVisitsQuery] = await pool.query(
      "SELECT COUNT(*) as total FROM visits;"
    );
    const { total } = totalVisitsQuery[0];

    if (total === 0) {
      return res.render("app/modules/history/history", {
        username,
        admin,
        visits,
        total,
        pag,
        sort,
        order,
        searchFilter,
        ...alert,
      });
    }

    const { timezone } = req.cookies;

    let query = `SELECT *, CONVERT_TZ(date_time, @@session.time_zone, '${timezone}') as date_time , visits._id AS visit_id, kids._id AS kids_id, adults._id AS adults_id, elders._id AS elders_id FROM visits INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id
    INNER JOIN elders ON visits.elders_id=elders._id
    INNER JOIN adults ON visits.adults_id=adults._id
    INNER JOIN kids ON visits.kids_id=kids._id
    `;
    let whereQuery = "";
    if (filter) {
      searchFilter = filter
        .replaceAll(/[^a-zA-Z0-9áéíóúÁÉÍÓÚÑñ/.:\- ]+/g, "")
        .toLowerCase();
      whereQuery = ` WHERE visits.totalFamily LIKE '%${searchFilter}%' OR 
      visits.totalDollars LIKE '%${searchFilter}%' OR
      visits.totalBolivars LIKE '%${searchFilter}%' OR
      visits.paymentData LIKE '%${searchFilter}%' OR
      visits.representativeName LIKE '%${searchFilter}%' OR
      visits.representativePhone LIKE '%${searchFilter}%' OR
      DATE_FORMAT(CONVERT_TZ(date_time, @@session.time_zone, '${timezone}'), '%d/%m/%Y') LIKE '%${searchFilter}%' OR
      DATE_FORMAT(CONVERT_TZ(date_time, @@session.time_zone, '${timezone}'), "%h:%i %p") LIKE '%${searchFilter}%' OR
      paymentMethod.method LIKE '%${searchFilter}%' OR
      paymentMethod.methodValidation LIKE '%${searchFilter}%' OR
      kids.boys LIKE '%${searchFilter}%' OR
      kids.girls LIKE '%${searchFilter}%' OR
      kids.courtesyKids LIKE '%${searchFilter}%' OR
      kids.totalKids LIKE '%${searchFilter}%' OR
      adults.men LIKE '%${searchFilter}%' OR
      adults.women LIKE '%${searchFilter}%' OR
      adults.courtesyAdults LIKE '%${searchFilter}%' OR
      adults.totalAdults LIKE '%${searchFilter}%' OR
      elders.elderMen LIKE '%${searchFilter}%' OR
      elders.elderWomen LIKE '%${searchFilter}%' OR
      elders.totalElders LIKE '%${searchFilter}%'`;
      query += whereQuery;
    }

    if (sort.length > 0 && order.length > 0) {
      if (sort == "date") {
        query += ` ORDER BY DATE(CONVERT_TZ(visits.date_time, @@session.time_zone, '${timezone}')) ${order.toUpperCase()}`;
      } else if (sort === "time") {
        query += ` ORDER BY TIME(CONVERT_TZ(visits.date_time, @@session.time_zone, '${timezone}')) ${order.toUpperCase()}`;
      } else {
        let table;
        if (
          sort == "totalKids" ||
          sort == "totalAdults" ||
          sort == "totalElders"
        ) {
          table = sort.slice(5).toLowerCase();
        } else if (sort == "method") {
          table = "paymentMethod";
        } else {
          table = "visits";
        }
        query += ` ORDER BY ${table}.${sort} ${order.toUpperCase()}`;
      }
    } else {
      query += " ORDER BY visits._id DESC";
    }
    query += ` LIMIT 8`;
    if (parseInt(pag) > 1) {
      query += ` OFFSET ${8 * (parseInt(pag) - 1)}`;
    }
    const visitsQuery = await pool.query(query + ";");
    const visits = visitsQuery[0];
    if (!visits) {
      visits = [];
    }

    res.render("app/modules/history/history", {
      username,
      admin,
      visits,
      total,
      pag: parseInt(pag),
      sort,
      order,
      searchFilter,
      ...alert,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const modifyVisit = async (req, res) => {
  const {
    deleteVisit,
    _id,
    representativeName,
    representativePhone,
    method,
    paymentData,
    totalBolivars,
    totalDollars,
    kids_id,
    adults_id,
    elders_id,
  } = req.body;

  const {
    boys,
    girls,
    courtesyKids,
    men,
    women,
    courtesyAdults,
    elderMen,
    elderWomen,
  } = {
    boys:
      typeof +req.body.boys == "number" && +req.body.boys >= 0
        ? +req.body.boys
        : 0,
    girls:
      typeof +req.body.girls == "number" && +req.body.girls >= 0
        ? +req.body.girls
        : 0,
    courtesyKids:
      typeof +req.body.courtesyKids == "number" && +req.body.courtesyKids >= 0
        ? +req.body.courtesyKids
        : 0,
    men:
      typeof +req.body.men == "number" && +req.body.men >= 0
        ? +req.body.men
        : 0,
    women:
      typeof +req.body.women == "number" && +req.body.women >= 0
        ? +req.body.women
        : 0,
    courtesyAdults:
      typeof +req.body.courtesyAdults == "number" &&
      +req.body.courtesyAdults >= 0
        ? +req.body.courtesyAdults
        : 0,
    elderMen:
      typeof +req.body.elderMen == "number" && +req.body.elderMen >= 0
        ? +req.body.elderMen
        : 0,
    elderWomen:
      typeof +req.body.elderWomen == "number" && +req.body.elderWomen >= 0
        ? +req.body.elderWomen
        : 0,
  };

  if (deleteVisit) {
    return removeVisit(req, res);
  }

  if (parseInt(courtesyKids) > parseInt(boys) + parseInt(girls)) {
    return renderHistory(req, res, {
      showAlert: true,
      messageAlert:
        "El número de entradas de cortesía no puede ser mayor al total de niños y niñas",
      typeAlert: "danger",
    });
  }
  if (parseInt(courtesyAdults) > parseInt(men) + parseInt(women)) {
    return renderHistory(req, res, {
      showAlert: true,
      messageAlert:
        "El número de entradas de cortesía no puede ser mayor al total de adultos",
      typeAlert: "danger",
    });
  }
  if (
    method == "Efectivo" &&
    paymentData != "Dolar" &&
    paymentData != "Bolivar"
  ) {
    return renderHistory(req, res, {
      showAlert: true,
      messageAlert:
        'El pago en Moneda debe registrarse como "Dolar" o "Bolivar"',
      typeAlert: "danger",
    });
  }
  if (method === "Transferencia" || method === "Pago Móvil") {
    if (isNaN(paymentData))
      return renderHistory(req, res, {
        showAlert: true,
        messageAlert:
          "El pago por medios digitales debe registrarse con un número de referencia válido",
        typeAlert: "danger",
      });
  }
  try {
    const paymentMethodQuery = await pool.query(
      `SELECT _id FROM paymentMethod WHERE method="${method}"`
    );
    const paymentId = paymentMethodQuery[0][0]._id;

    await pool.query(
      `UPDATE kids SET boys = ${boys}, girls = ${girls}, courtesyKids = ${courtesyKids} WHERE _id = ${kids_id}`
    );

    await pool.query(
      `UPDATE adults SET men = ${men}, women = ${women}, courtesyAdults = ${courtesyAdults} WHERE _id = ${adults_id}`
    );

    await pool.query(
      `UPDATE elders SET elderMen = ${elderMen}, elderWomen = ${elderWomen} WHERE _id = ${elders_id}`
    );

    await pool.query(
      `UPDATE visits SET representativeName = '${representativeName}', representativePhone = '${representativePhone}', totalBolivars = '${totalBolivars}', totalDollars = '${totalDollars}', paymentMethod_id = ${paymentId}, paymentData = '${paymentData}' WHERE _id = '${_id}'`
    );

    renderHistory(req, res, {
      showAlert: true,
      messageAlert: "Los cambios en la visita han sido realizados exitosamente",
      typeAlert: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeVisit = async (req, res) => {
  const { _id, kids_id, adults_id, elders_id } = req.body;
  try {
    await pool.query(`DELETE FROM visits WHERE _id = '${_id}'`);
    await pool.query(`DELETE FROM kids WHERE _id = '${kids_id}'`);
    await pool.query(`DELETE FROM adults WHERE _id = '${adults_id}'`);
    await pool.query(`DELETE FROM elders WHERE _id = '${elders_id}'`);
    return renderHistory(req, res, {
      showAlert: true,
      messageAlert: "La visita ha sido eliminada exitosamente",
      typeAlert: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
