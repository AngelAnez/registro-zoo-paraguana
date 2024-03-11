import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

const filePath = "/data/visits.json";

export const getVisits = () => {
  const data = fs.readFileSync(path.join(DIR_APP, filePath), {
    encoding: "utf-8",
  });
  /* return data.length > 0 ? data : {}; */
  return data.length > 0 ? JSON.parse(data) : []
};

export const postVisits = (newVisit) => {
  let visits = getVisits()
  visits.push(newVisit)
  const data = JSON.stringify(visits, null, 2)
  fs.writeFile(
    path.join(DIR_APP, filePath),
    data,
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
