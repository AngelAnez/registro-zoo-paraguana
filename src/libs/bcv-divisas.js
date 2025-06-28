import axios from "axios";
import https from "https";
import * as cheerio from "cheerio";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const bcvDolar = async () => {
  const result = await axios.get("https://www.bcv.org.ve", { httpsAgent });
  const $ = cheerio.load(result.data);
  const dolar = $("#dolar")
    .text()
    .trim()
    .match(/[0-9]+,[0-9]+/)[0]
    .replace(",", ".")
    .slice(0, 5);
  const euro = $("#euro")
    .text()
    .trim()
    .match(/[0-9]+,[0-9]+/)[0]
    .replace(",", ".")
    .slice(0, 5);
  const yuan = $("#yuan")
    .text()
    .trim()
    .match(/[0-9]+,[0-9]+/)[0]
    .replace(",", ".")
    .slice(0, 5);
  const lira = $("#lira")
    .text()
    .trim()
    .match(/[0-9]+,[0-9]+/)[0]
    .replace(",", ".")
    .slice(0, 5);
  const rublo = $("#rublo")
    .text()
    .trim()
    .match(/[0-9]+,[0-9]+/)[0]
    .replace(",", ".")
    .slice(0, 5);
  return {
    _dolar: dolar,
    _euro: euro,
    _yuan: yuan,
    _lira: lira,
    _rublo: rublo,
  };
};
