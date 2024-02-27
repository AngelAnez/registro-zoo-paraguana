import { deleteUserSession } from "../models/userSession.js";

export const getLogout = (req, res, next) =>{
    deleteUserSession()
    return res.redirect("/login")
}