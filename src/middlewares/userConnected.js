import { getUserSession } from "../models/userSession.js";

export const userConnected = (req, res, next) => {
    const data = getUserSession()
    if (JSON.stringify(data) === "{}"){
        console.log("Un usuario sin autorización ha intentado acceder a " + req.path)
        return res.redirect("/login")
    }
    next()
}