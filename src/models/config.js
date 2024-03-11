import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

const filePath = "/data/config.json";

export const getConfig = () => {
  return JSON.parse(fs.readFileSync(path.join(DIR_APP, filePath), {
    encoding: "utf-8",
  }));
};

export const postConfig = (content) => {
    fs.writeFileSync(path.join(DIR_APP, filePath), content);
  };