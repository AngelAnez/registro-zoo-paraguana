import { getUserSession } from "../models/userSession.js";
import { postVisits } from "../models/visits.js";
import { getConfig } from "../models/config.js";
export const getVisitantes = (req, res) => {
  renderVisitantes(res, { showAlert: false, messageAlert: "", typeAlert: "" });
};

export const renderVisitantes = (res, alert) => {
  const user = getUserSession();
  const {childrenTicketPrice, adultsTicketPrice, seniorsTicketPrice} = getConfig()

  const { showAlert, messageAlert, typeAlert } = alert;
  res.render("visitantes", {
    username: user.username,
    childrenTicketPrice,
    adultsTicketPrice,
    seniorsTicketPrice,
    showAlert,
    messageAlert,
    typeAlert
  });
};

export const addNewVisit = (req, res) => {
  const {
    childrenNumber,
    adultsNumber,
    seniorsNumber,
    totalDolars,
    totalBolivars
  } = req.body;

  let formData = {
    ...req.body,
    childrenNumber: childrenNumber != "" ? childrenNumber : "0",
    adultsNumber: adultsNumber != "" ? adultsNumber : "0",
    seniorsNumber: seniorsNumber != "" ? seniorsNumber : "0",
    totalDolars: totalDolars.replace("$", ""),
    totalBolivars: totalBolivars.replace(" Bs.", "")
  }

  formData = JSON.stringify(formData) + "\n";
  postVisits(formData);

  renderVisitantes(res, {
    showAlert: true,
    messageAlert: "Los visitantes han sido guardados exitosamente",
    typeAlert: "success",
  });
};
