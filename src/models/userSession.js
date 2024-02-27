import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

const filePath = "/data/userSession.txt";

export const getUserSession = () => {
  const data = fs.readFileSync(path.join(DIR_APP, filePath), {
    encoding: "utf-8",
  });
  return data.length > 0 ? JSON.parse(data) : {};
};

export const postUserSession = (user) => {
  fs.writeFileSync(path.join(DIR_APP, filePath), user);
};

export const deleteUserSession = () => {
  fs.writeFileSync(path.join(DIR_APP, filePath), "");
}