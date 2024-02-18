import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

const filePath = "/data/visits.txt";

export const getVisits = () => {
  const data = fs.readFileSync(path.join(DIR_APP, filePath), {
    encoding: "utf-8",
  });
  return data.length > 0 ? data : {};
};

export const postVisits = (contenido) => {
  fs.writeFile(
    path.join(DIR_APP, filePath),
    contenido,
    { flag: "a" },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("El visitante fue añadido exitosamente");
      }
    }
  );
};
