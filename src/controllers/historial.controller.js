import { pool } from "../db.js";

export const renderHistorial = async (req, res, alert) => {
  try {
    const { username, admin } = req.user;

    let showAlert, messageAlert, typeAlert
    if (alert){
        showAlert = alert.showAlert
        messageAlert = alert.messageAlert
        typeAlert = alert.typeAlert
    } else {
        showAlert = false
        messageAlert = ""
        typeAlert = ""
    }

    let pag = 1;
    let sort = ""; // Puede ser cualquier propiedad de las visitas
    let order = ""; // Puede ser asc o dec
    let searchFilter = "";
    let query = `SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS dateStyled, TIME_FORMAT(time, "%h:%i %p") AS timeStyled, visits._id AS visit_id, kids._id AS kids_id, adults._id AS adults_id, elders._id AS elders_id FROM visits INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id
    INNER JOIN elders ON visits.elders_id=elders._id
    INNER JOIN adults ON visits.adults_id=adults._id
    INNER JOIN kids ON visits.kids_id=kids._id
    `
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
      DATE_FORMAT(visits.date, '%d/%m/%Y') LIKE '%${searchFilter}%' OR
      TIME_FORMAT(visits.time, "%h:%i %p") LIKE '%${searchFilter}%' OR
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
      if (sort == "date"){
        query += ` ORDER BY ${table}.${sort} ${order.toUpperCase()}, time DESC`
      } else {
        query += ` ORDER BY ${table}.${sort} ${order.toUpperCase()}, date DESC`
      }
      
    } else {
      query += ' ORDER BY visits._id DESC'
    }
    query+= ` LIMIT 8`
    if (req.query.pag) {
      pag = parseInt(req.query.pag);
      if (pag > 1){
        query+= ` OFFSET ${8*(pag-1)}`
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
      pag,
      sort,
      order,
      searchFilter,
      showAlert,
      messageAlert,
      typeAlert
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const modifyVisit = async (req, res) => {
  const {deleteVisit, _id, representativeName, representativePhone, boys, girls, courtesyKids, men, women, courtesyAdults, elderMen, elderWomen, method, paymentInfo, totalBolivars, totalDolars, kids_id, adults_id, elders_id} = req.body
  const totalBolivarsValid = totalBolivars.replace(',', '.')
  const totalDolarsValid = totalDolars.replace(',', '.')
  if (parseInt(courtesyKids) > (parseInt(boys) + parseInt(girls))){
    return renderHistorial(req, res, {
      showAlert: true,
      messageAlert: "El número de entradas de cortesía no puede ser mayor al total de niños y niñas",
      typeAlert: "danger"
    })
  }
  if (parseInt(courtesyAdults) > (parseInt(men) + parseInt(women))){
    return renderHistorial(req, res, {
      showAlert: true,
      messageAlert: "El número de entradas de cortesía no puede ser mayor al total de adultos",
      typeAlert: "danger"
    })
  }
  if (method == "Efectivo" && paymentInfo != "Dolar" && paymentInfo != "Bolivar"){
    return renderHistorial(req, res, {
      showAlert: true,
      messageAlert: 'El pago en Moneda debe registrarse como "Dolar" o "Bolivar"',
      typeAlert: "danger"
    })
  }
  try {
    let message = ""
    if (deleteVisit && _id){
      await pool.query(`DELETE FROM visits WHERE _id = '${_id}'`)
      await pool.query(`DELETE FROM kids WHERE _id = '${kids_id}'`)
      await pool.query(`DELETE FROM adults WHERE _id = '${adults_id}'`)
      await pool.query(`DELETE FROM elders WHERE _id = '${elders_id}'`)
      message = "La visita ha sido eliminada exitosamente"
    }
    if (_id && !deleteVisit){
      const paymentMethodQuery = await pool.query(`SELECT _id FROM paymentMethod WHERE method="${method}"`)
      const paymentId = paymentMethodQuery[0][0]._id

      await pool.query(`UPDATE kids SET boys = ${boys}, girls = ${girls}, courtesyKids = ${courtesyKids} WHERE _id = ${kids_id}`)

      await pool.query(`UPDATE adults SET men = ${men}, women = ${women}, courtesyAdults = ${courtesyAdults} WHERE _id = ${adults_id}`)

      await pool.query(`UPDATE elders SET elderMen = ${elderMen}, elderWomen = ${elderWomen} WHERE _id = ${elders_id}`)

      await pool.query(`UPDATE visits SET representativeName = '${representativeName}', representativePhone = '${representativePhone}', totalBolivars = '${totalBolivarsValid}', totalDolars = '${totalDolarsValid}', paymentMethod_id = ${paymentId}, paymentInfo = '${paymentInfo}' WHERE _id = '${_id}'`)
      
      message = "Los cambios en la visita han sido realizados exitosamente"
    }
    const alert = {
      showAlert: true,
      messageAlert: message,
      typeAlert: "success"
    }
    renderHistorial(req, res, alert)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}