import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

export const getUserSession = () => {
    const data = fs.readFileSync(path.join(DIR_APP, "/data/userSession.txt"), {encoding: "utf-8"})
    return data.length > 0 ? JSON.parse(data) : {}
};