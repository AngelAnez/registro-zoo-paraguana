import { bcvDolar } from "bcv-divisas";
import { pool } from "../mysqlDb.js";

export const renderInicio = (req, res) => {
  const {username, admin} = req.user;
  res.render("inicio", {
    username,
    admin
  });
};

export const getDolarValue = async (req, res) => {
  const [dolarQuery] = await pool.query('SELECT * FROM configs LIMIT 1')
  const {internetDolar, defaultDolar} = dolarQuery[0]
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
          resolve(defaultDolar);
        }, 5000);
      })
      return Promise.any([searchingDolar, waitingTime]).then((value) => {
        res.send(value)
      })
    } catch (error) {
      console.log("Ha ocurrido un error de conexión")
    }
  }
  res.send(defaultDolar); 
};