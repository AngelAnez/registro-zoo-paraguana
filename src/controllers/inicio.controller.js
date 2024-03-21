import { bcvDolar } from "bcv-divisas";
import Config from "../models/config.model.js";

export const renderInicio = (req, res) => {
  const {username, admin} = req.user;
  res.render("inicio", {
    username,
    admin
  });
};

export const getDolarValue = async (req, res) => {
  const {defaultDolarValue, internetDolarValue} = await Config.findOne()
  const internetDolar = internetDolarValue;
  if (internetDolar == "on") {
    try {
      const searchingDolar = new Promise(async (resolve, reject) => {
        try {
          let data = await bcvDolar()
          resolve(data._dolar)
        } catch (error) {
          reject(error)
        }
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