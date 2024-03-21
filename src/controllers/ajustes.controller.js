import { getConfig, postConfig } from "../models/config.js";
import Config from "../models/config.model.js";

export const getAjustes = (req, res) => {
  renderAjustes(req, res, {showAlert: false, messageAlert: "", typeAlert: ""});
};

export const renderAjustes = async (req, res, alert) => {
  const {username, admin} = req.user;
  try {
    const configDocument = await Config.findOne();

    const {
    internetDolarValue,
    defaultDolarValue,
    childrenTicketPrice,
    adultsTicketPrice,
    seniorsTicketPrice,
  } = configDocument; 

  const {showAlert, messageAlert, typeAlert} = alert

  res.render("ajustes", {
    username,
    admin,
    internetDolarValue,
    defaultDolarValue,
    childrenTicketPrice,
    adultsTicketPrice,
    seniorsTicketPrice,
    showAlert,
    messageAlert,
    typeAlert
  });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  

/*   const {
    internetDolarValue,
    defaultDolarValue,
    childrenTicketPrice,
    adultsTicketPrice,
    seniorsTicketPrice,
  } = getConfig();

  const {showAlert, messageAlert, typeAlert} = alert

  res.render("ajustes", {
    username,
    admin,
    internetDolarValue,
    defaultDolarValue,
    childrenTicketPrice,
    adultsTicketPrice,
    seniorsTicketPrice,
    showAlert,
    messageAlert,
    typeAlert
  }); */
};

export const changeConfig = (req, res) => {
  const {
    internetDolarValue
  } = req.body;

  let configData = {
    ...req.body,
    internetDolarValue: internetDolarValue ?? "off",
  };

  const internetDolarRegex = /^(on|off)$/;
  const numberRegex = /^[0-9]+([.][0-9]+)?$/;

  if (!internetDolarRegex.test(configData.internetDolarValue)) {
    return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
  }

  if (!numberRegex.test(configData.defaultDolarValue)) {
    return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
  }

  if (!configData.childrenTicketPrice || !configData.adultsTicketPrice || !configData.seniorsTicketPrice){
    const {childrenTicketPrice, adultsTicketPrice, seniorsTicketPrice} = getConfig()
    configData = {
      ...configData,
      childrenTicketPrice,
      adultsTicketPrice,
      seniorsTicketPrice
    }
  } else {
    if (!numberRegex.test(configData.childrenTicketPrice)) {
      return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
    }

    if (!numberRegex.test(configData.adultsTicketPrice)) {
      return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
    }
  
    if (!numberRegex.test(configData.seniorsTicketPrice)) {
      return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
    }
  }

  

  configData = JSON.stringify(configData, null, 2);
  postConfig(configData);

  renderAjustes(req, res, {showAlert: true, messageAlert: "Los cambios han sido guardados exitosamente", typeAlert: "success"});
};
