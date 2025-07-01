import { bcvDolar } from "../libs/bcv-divisas.js";
import { pool } from "../db.js";
import { DEFAULT_ALERT } from "../libs/default-alert.js";

export const renderHome = (req, res) => {
  const { username, admin } = req.user;
  res.render("app/modules/home/home", {
    username,
    admin,
    ...DEFAULT_ALERT,
  });
};

export const getDolarValue = async (req, res) => {
  const [dolarQuery] = await pool.query("SELECT * FROM configs LIMIT 1");
  const { internetDolar, defaultDolar } = dolarQuery[0];
  if (internetDolar == "on") {
    try {
      const searchingDolar = new Promise(async (resolve, reject) => {
        try {
          let data = await bcvDolar();
          resolve(data._dolar);
        } catch (error) {
          reject(error);
        }
      });
      const waitingTime = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(defaultDolar);
        }, 5000);
      });
      return Promise.any([searchingDolar, waitingTime]).then((value) => {
        res.send(value);
      });
    } catch (error) {
      console.log("Ha ocurrido un error de conexión");
    }
  }
  res.send(defaultDolar);
};
