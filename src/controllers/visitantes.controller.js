import Config from "../models/config.model.js";
import Visit from "../models/visit.model.js";

export const getVisitantes = (req, res) => {
  renderVisitantes(req, res, { showAlert: false, messageAlert: "", typeAlert: "" });
};

export const renderVisitantes = async (req, res, alert) => {
  const { username, admin } = req.user
  try {
    const {childrenTicketPrice, adultsTicketPrice, seniorsTicketPrice} = await Config.findOne()

    const { showAlert, messageAlert, typeAlert } = alert;
    res.render("visitantes", {
      username,
      admin,
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
};

export const addNewVisit = async (req, res) => {
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
  
  try {
    await Visit.create(formData)
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  renderVisitantes(req, res, {
    showAlert: true,
    messageAlert: "Los visitantes han sido guardados exitosamente",
    typeAlert: "success",
  });
};
