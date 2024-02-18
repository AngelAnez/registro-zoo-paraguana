import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

export const getUsers = () => {
  return fs.readFileSync(path.join(DIR_APP, "/data/users.txt"), {
    encoding: "utf-8",
  });
};
