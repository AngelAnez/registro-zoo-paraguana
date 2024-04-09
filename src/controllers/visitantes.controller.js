import Config from "../models/config.model.js";
import Visit from "../models/visit.model.js";
import { pool } from "../mysqlDb.js";

export const getVisitantes = (req, res) => {
  renderVisitantes(req, res, { showAlert: false, messageAlert: "", typeAlert: "" });
};

export const renderVisitantes = async (req, res, alert) => {
  const { username, admin } = req.user
  try {
    /* const {childrenTicketPrice, adultsTicketPrice, seniorsTicketPrice} = await Config.findOne() */
    const [pricesQuery] = await pool.query('SELECT * FROM configs LIMIT 1')
    const {kidsPrice, adultsPrice} = pricesQuery[0] 

    const { showAlert, messageAlert, typeAlert } = alert;
    res.render("visitantes", {
      username,
      admin,
      kidsPrice,
      adultsPrice,
      showAlert,
      messageAlert,
      typeAlert
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const addNewVisit = async (req, res) => {
  const {
    boys,
    girls,
    men,
    women,
    elderMen,
    elderWomen,
    totalDolars,
    totalBolivars
  } = req.body;

  let formData = {
    ...req.body,
    boys: boys != "" ? +boys : 0,
    girls: girls != "" ? +girls : 0,
    men: men != "" ? +men : 0,
    women: women != "" ? +women : 0,
    elderMen: elderMen != "" ? +elderMen : 0,
    elderWomen: elderWomen != "" ? +elderWomen : 0,
    totalDolars: +(totalDolars.replace("$", "")),
    totalBolivars: +(totalBolivars.replace(" Bs.", ""))
  }
  
  try {
    /* await Vsisit.create(formData) */

    /* let kidsId  */ 
    /* const kidsSearchQuery = await pool.query(`SELECT _id FROM kids WHERE boys=${formData.boys} AND girls="${formData.girls}" AND courtesyKids=${+formData.courtesyKids} LIMIT 1`) */

    const kidsInsertQuery = await pool.query(`INSERT INTO kids (boys, girls, courtesyKids) VALUES 
    ("${formData.boys}","${formData.girls}","${+formData.courtesyKids}")`)
    const kidsId = kidsInsertQuery[0].insertId

    const adultsQuery = await pool.query(`INSERT INTO adults (men, women, courtesyAdults) VALUES 
    ("${formData.men}","${formData.women}","${formData.courtesyAdults}")`)
    const adultsId = adultsQuery[0].insertId

    const eldersQuery = await pool.query(`INSERT INTO elders (elderMen, elderWomen) VALUES 
    ("${formData.men}","${formData.elderWomen}")`)
    const eldersId = eldersQuery[0].insertId

    const paymentMethodQuery = await pool.query(`SELECT _id FROM paymentMethod WHERE method="${formData.paymentMethod}"`)
    const paymentId = paymentMethodQuery[0][0]._id

    const visitQuery = await pool.query(`INSERT INTO visits (kids_id, adults_id, elders_id, totalFamily, totalDolars, totalBolivars, paymentMethod_id, paymentInfo, representativeName, representativePhone, date, time) VALUES
    (${kidsId},${adultsId},${eldersId},${+formData.totalFamily},${formData.totalDolars},${formData.totalBolivars},${paymentId},"${formData.extraInfoPayment}","${formData.representativeName}","${formData.representativePhone}","${formData.date}","${formData.time}");`)

  } catch (error) {
    res.status(500).json({message: error.message})
  }

  renderVisitantes(req, res, {
    showAlert: true,
    messageAlert: "Los visitantes han sido guardados exitosamente",
    typeAlert: "success",
  });
};
