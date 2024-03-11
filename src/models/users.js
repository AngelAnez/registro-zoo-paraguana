import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

const filePath = "/data/users.json"

export const getUsers = () => {
  return JSON.parse(fs.readFileSync(path.join(DIR_APP, filePath), {
    encoding: "utf-8",
  }))
};

export const postUsers = (newUser) => {
  let users = getUsers()
  users.push(newUser)
  const data = JSON.stringify(users, null, 2)
  fs.writeFile(
    path.join(DIR_APP, filePath),
    data,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("El usuario fue creado exitosamente");
      }
    }
  );
};