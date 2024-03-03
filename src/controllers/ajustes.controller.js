import { getConfig, postConfig } from "../models/config.js";

export const getAjustes = (req, res) => {
  renderAjustes(req, res, {showAlert: false, messageAlert: "", typeAlert: ""});
};

export const renderAjustes = (req, res, alert) => {
  const {username, admin} = req.user;
  const {
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
  });
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

  if (!numberRegex.test(configData.childrenTicketPrice)) {
    return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
  }

  if (!numberRegex.test(configData.adultsTicketPrice)) {
    return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
  }

  if (!numberRegex.test(configData.seniorsTicketPrice)) {
    return renderAjustes(req, res, {showAlert: true, messageAlert: "Se ha producido un error al momento de guardar los cambios", typeAlert: "danger"});
  }

  configData = JSON.stringify(configData);
  postConfig(configData);

  renderAjustes(req, res, {showAlert: true, messageAlert: "Los cambios han sido guardados exitosamente", typeAlert: "success"});
};
