import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

const filePath = "/data/users.txt"

export const getUsers = () => {
  return fs.readFileSync(path.join(DIR_APP, filePath), {
    encoding: "utf-8",
  });
};

export const postUsers = (contenido) => {
  fs.writeFile(
    path.join(DIR_APP, filePath),
    contenido,
    { flag: "a" },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("El usuario fue creado exitosamente");
      }
    }
  );
};