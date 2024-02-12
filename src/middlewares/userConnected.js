import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

export const userConnected = (req, res, next) => {
    if (fs.readFileSync(path.join(DIR_APP, "/data/userSession.txt")).length == 0){
        console.log("Un usuario sin autorización ha intentado acceder a " + req.path)
        return res.redirect("/login")
    }
    next()
}