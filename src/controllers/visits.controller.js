import { pool } from "../db.js";
import { DEFAULT_ALERT } from "../libs/default-alert.js";

export const getVisitantes = (req, res) => {
  renderVisitantes(req, res, DEFAULT_ALERT);
};

export const renderVisitantes = async (req, res, alert) => {
  const { username, admin } = req.user;
  try {
    const [pricesQuery] = await pool.query("SELECT * FROM configs LIMIT 1");
    const { kidsPrice, adultsPrice } = pricesQuery[0];

    const { showAlert, messageAlert, typeAlert } = alert;
    res.render("app/modules/visits/new-visit", {
      username,
      admin,
      kidsPrice,
      adultsPrice,
      showAlert,
      messageAlert,
      typeAlert,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    representativeName,
    representativePhone,
    paymentData,
    paymentMethod
  } = req.body;

  let formData = {
    ...req.body,
    boys: boys != "" ? +boys : 0,
    girls: girls != "" ? +girls : 0,
    men: men != "" ? +men : 0,
    women: women != "" ? +women : 0,
    elderMen: elderMen != "" ? +elderMen : 0,
    elderWomen: elderWomen != "" ? +elderWomen : 0,
    representativeName:
      representativeName != "" ? representativeName : "Sin Asignar",
    representativePhone:
      representativePhone != "" ? representativePhone : "+580000000000",
    paymentData:
      paymentMethod === "Efectivo"
        ? paymentData[1]
        : paymentMethod === "Otro"
        ? paymentData[2]
        : paymentData[0],
  };

  try {
    const kidsInsertQuery =
      await pool.query(`INSERT INTO kids (boys, girls, courtesyKids) VALUES 
    ("${formData.boys}","${formData.girls}","${+formData.courtesyKids}")`);
    const kidsId = kidsInsertQuery[0].insertId;

    const adultsQuery =
      await pool.query(`INSERT INTO adults (men, women, courtesyAdults) VALUES 
    ("${formData.men}","${formData.women}","${+formData.courtesyAdults}")`);
    const adultsId = adultsQuery[0].insertId;

    const eldersQuery =
      await pool.query(`INSERT INTO elders (elderMen, elderWomen) VALUES 
    ("${formData.elderMen}","${formData.elderWomen}")`);
    const eldersId = eldersQuery[0].insertId;

    const paymentMethodQuery = await pool.query(
      `SELECT _id FROM paymentMethod WHERE method="${formData.paymentMethod}"`
    );
    const paymentId = paymentMethodQuery[0][0]._id;

    await pool.query(`INSERT INTO visits (kids_id, adults_id, elders_id, totalFamily, totalDollars, totalBolivars, paymentMethod_id, paymentData, representativeName, representativePhone, date_time) VALUES
    (${kidsId},${adultsId},${eldersId},${+formData.totalFamily},${
      formData.totalDollars
    },${formData.totalBolivars},${paymentId},"${formData.paymentData}","${
      formData.representativeName
    }","${formData.representativePhone}", STR_TO_DATE('${formData.date_time}', '%d/%m/%Y, %H:%i:%s' ));`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  renderVisitantes(req, res, {
    showAlert: true,
    messageAlert: "Los visitantes han sido guardados exitosamente",
    typeAlert: "success",
  });
};
