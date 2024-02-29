import { bcvDolar } from "bcv-divisas";
import { getConfig } from "../models/config.js";

export const renderInicio = (req, res) => {
  const {username, admin} = req.user;
  res.render("inicio", {
    username,
    admin
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
