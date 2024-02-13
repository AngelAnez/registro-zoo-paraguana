import { bcvDolar } from "bcv-divisas"
import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

export const renderInicio = (req, res) => {
    const user = JSON.parse(fs.readFileSync(path.join(DIR_APP, "/data/userSession.txt"), {encoding: "utf-8"}))
    res.render("inicio", {
        username: user.username
    })
}

export const getDolarValue = async (req, res) => {
    // Consulta a la BDD
    const customDolar = false
    if (!customDolar){
        try {
            const bcv = await bcvDolar()
            return res.send(bcv._dolar)
        } catch (error) {
            console.log("Ha ocurrido un error de conexión")
        }
    }
    // Consulta a la BDD
    const defaultDolar = "12"
    res.send(defaultDolar)
}