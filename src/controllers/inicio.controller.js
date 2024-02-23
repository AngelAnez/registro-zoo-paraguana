import { bcvDolar } from "bcv-divisas";
import { getUserSession } from "../models/userSession.js";
import { getConfig } from "../models/config.js";

export const renderInicio = (req, res) => {
  const {username} = getUserSession();
  res.render("inicio", {
    username
  });
};

export const getDolarValue = async (req, res) => {
  const {defaultDolarValue, internetDolarValue} = getConfig()
  const internetDolar = internetDolarValue;
  if (internetDolar == "on") {
    try {
      const bcv = await bcvDolar();
      return res.send(bcv._dolar);
    } catch (error) {
      console.log("Ha ocurrido un error de conexión");
    }
  }
  const defaultDolar = defaultDolarValue;
  res.send(defaultDolar); 
};
