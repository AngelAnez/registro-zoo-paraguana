import Visit from "../models/visit.model.js";
import { pool } from "../mysqlDb.js";

export const renderHistorial = async (req, res) => {
  try {
    const { username, admin } = req.user;
    let pag = 10;
    let sort = ""; // Puede ser cualquier propiedad de las visitas
    let order = ""; // Puede ser asc o dec
    let searchFilter = "";
    let query = `SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS date, TIME_FORMAT(time, "%h:%i %p") AS time FROM visits INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id
    INNER JOIN kids ON visits.kids_id=kids._id
    INNER JOIN adults ON visits.adults_id=adults._id
    INNER JOIN elders ON visits.elders_id=elders._id`
    let whereQuery = ""
    if (req.query.filter) {
      searchFilter = req.query.filter
        .replaceAll(/[^a-zA-Z0-9áéíóúÁÉÍÓÚÑñ/.:\- ]+/g, "")
        .toLowerCase()
      whereQuery = ` WHERE visits.totalFamily LIKE '%${searchFilter}%' OR 
      visits.totalDolars LIKE '%${searchFilter}%' OR
      visits.totalBolivars LIKE '%${searchFilter}%' OR
      visits.paymentInfo LIKE '%${searchFilter}%' OR
      visits.representativeName LIKE '%${searchFilter}%' OR
      visits.representativePhone LIKE '%${searchFilter}%' OR
      visits.date LIKE '%${searchFilter}%' OR
      visits.time LIKE '%${searchFilter}%' OR
      paymentMethod.method LIKE '%${searchFilter}%' OR
      paymentMethod.extraInfoTitle LIKE '%${searchFilter}%' OR
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
      elders.totalElders LIKE '%${searchFilter}%'`
      query += whereQuery
    }

    const totalVisitsQuery = await pool.query(`${query.replace("*", "COUNT(*)")};`)
    let total = Object.values(totalVisitsQuery[0][0])[0]

    if (req.query.sort && req.query.order) {
      sort = req.query.sort;
      order = req.query.order;
      let table
      if (sort == "totalKids" || sort == "totalAdults" || sort == "totalElders"){
        table = sort.slice(5).toLowerCase()
      } else if (sort == "method"){
        table = "paymentMethod"
      } else {
        table = "visits"
      }
      query += ` ORDER BY ${table}.${sort} ${order.toUpperCase()}`
    } else {
      query += ' ORDER BY visits._id DESC'
    }
    query+= ` LIMIT 10`
    if (req.query.pag) {
      pag = parseInt(req.query.pag) * 10;
      if (pag-10 > 0){
        query+= ` OFFSET ${pag-10}`
      }
    }
    const visitsQuery = await pool.query(query + ";")
    const visits = visitsQuery[0]
    if (!visits) {
      visits = [];
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