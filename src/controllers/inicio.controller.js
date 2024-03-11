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
      const searchingDolar = new Promise(async (resolve, reject) => {
        let data = await bcvDolar()
        resolve(data._dolar)
      })
      const waitingTime = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(defaultDolarValue);
        }, 5000);
      })
      return Promise.any([searchingDolar, waitingTime]).then((value) => {
        res.send(value)
      })
    } catch (error) {
      console.log("Ha ocurrido un error de conexión")
    }
  }
  const defaultDolar = defaultDolarValue;
  res.send(defaultDolar); 
};