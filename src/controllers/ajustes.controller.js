import { pool } from "../db.js";

export const getAjustes = (req, res) => {
  renderAjustes(req, res, {showAlert: false, messageAlert: "", typeAlert: ""});
};

export const renderAjustes = async (req, res, alert) => {
  const {username, admin} = req.user;
  try {
    const [configsQuery] = await pool.query("SELECT * FROM configs LIMIT 1")
    const configDocument = configsQuery[0]
    const {
    internetDolar,
    defaultDolar,
    kidsPrice,
    adultsPrice,
  } = configDocument; 

  const {showAlert, messageAlert, typeAlert} = alert

  res.render("ajustes", {
    username,
    admin,
    internetDolar,
    defaultDolar,
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

export const changeConfig = async (req, res) => {
  const {
    internetDolar
  } = req.body;

  let configData = {
    ...req.body,
    internetDolar: internetDolar ?? "off",
  };

  const internetDolarRegex = /^(on|off)$/;
  const numberRegex = /^[0-9]+([.][0-9]+)?$/;

  if (!internetDolarRegex.test(configData.internetDolar)) {
    return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
  }

  if (!numberRegex.test(configData.defaultDolar)) {
    return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
  }

  if (!configData.kidsPrice || !configData.adultsPrice){
    try {
      await pool.query(`UPDATE configs
      SET internetDolar = '${internetDolar}', defaultDolar = '${defaultDolar}';`)
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
    
  } else {
    if (!numberRegex.test(configData.kidsPrice)) {
      return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
    }

    if (!numberRegex.test(configData.adultsPrice)) {
      return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
    }
    try { 
      await pool.query(`UPDATE configs
      SET internetDolar = '${configData.internetDolar}',
      defaultDolar = '${configData.defaultDolar}',
      kidsPrice = '${configData.kidsPrice}',
      adultsPrice = ${configData.adultsPrice};`)
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }

  renderAjustes(req, res, {showAlert: true, messageAlert: "Los cambios han sido guardados exitosamente", typeAlert: "success"});
};
