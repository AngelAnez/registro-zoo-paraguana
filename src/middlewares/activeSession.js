import { getUserSession } from "../models/userSession.js";

export const activeSession = (req, res, next) => {
    const data = getUserSession()
    if (JSON.stringify(data) != "{}"){
        return res.redirect("/visitantes")
    } 
    next()
}