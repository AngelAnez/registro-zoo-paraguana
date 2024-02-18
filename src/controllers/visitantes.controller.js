import { getUserSession } from "../models/userSession.js";
import { postVisits } from "../models/visits.js";

export const renderVisitantes = (req, res) => {
  const user = getUserSession();
  newVisitAdded(res, false, user.username);
};

export const addNewVisit = (req, res) => {
  const {
    cant_nino,
    cant_adult,
    cant_mayores,
    total_family,
    monto_dolares,
    monto_bolivares,
    metodo_pago,
    info_payment_method,
    nombre_representante,
    telefono_representante,
    date,
    time,
  } = req.body;

  let contenido = {
    date,
    time,
    child: cant_nino != "" ? cant_nino : "0",
    adult: cant_adult != "" ? cant_adult : "0",
    older: cant_mayores != "" ? cant_mayores : "0",
    total: total_family,
    dolar: monto_dolares.replace("$", ""),
    bolivares: monto_bolivares.replace(" Bs.", ""),
    method: metodo_pago,
    infoMethod: info_payment_method,
    name: nombre_representante,
    telephone: telefono_representante,
  };

  contenido = JSON.stringify(contenido);
  contenido += "\n";
  postVisits(contenido);

  newVisitAdded(res, true);
};

const newVisitAdded = (res, hasNewVisit, username) => {
  res.render("visitantes", {
    hasNewVisit,
    username,
  });
};
