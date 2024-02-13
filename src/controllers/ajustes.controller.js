import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

export const renderAjustes = (req, res) => {
    const user = JSON.parse(fs.readFileSync(path.join(DIR_APP, "/data/userSession.txt"), {encoding: "utf-8"}))
    res.render("ajustes", {
        username: user.username
    })
}